use crate::bonding_curve::BondingCurve;
use crate::pool::precision_pool::PrecisionPool;
use crate::staking::staking::Staking;
use scrypto::prelude::*;

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
pub struct TokenMeta {
    pub collateral_invested: Decimal,
    pub tokens_reserved: Decimal,
}

// A struct to get permissions over staking contract
#[derive(Debug, ScryptoSbor, NonFungibleData)]
struct StakingBadge {
    token_to_stake: ResourceAddress,
}

#[blueprint]
mod token {
    struct TokenSaleManager {
        pub collateral: Vault,
        pub token_presale_vault: Vault,
        pub token_lp_vault: Option<Vault>,
        pub presale_nft_manager: ResourceManager, // Handle presale NFTs
        pub token_manager: ResourceManager,       // Handle actual tokens
        pub curve: BondingCurve,
        pub presale_start: Instant,
        pub presale_end: Instant,
        pub lp_lock_until: Instant,
        pub team_allocation: Decimal,
        pub badge_address: ResourceAddress,
        pub badge_id: NonFungibleLocalId,
        pub presale_goal: Decimal,
        pub presale_success: bool,
        pub lp_pool: Option<Global<PrecisionPool>>,
        pub staking: Option<Global<Staking>>,
    }

    impl TokenSaleManager {
        // Method to handle presale
        pub fn presale_nft_mint(&mut self, mut collateral_bucket: Bucket) -> (Bucket, Bucket) {
            assert!(!collateral_bucket.is_empty(), "Empty collateral sent!");
            assert_eq!(
                collateral_bucket.resource_address(),
                self.collateral.resource_address(),
                "Invalid collateral type sent!"
            );
            assert!(
                Clock::current_time_rounded_to_seconds() >= self.presale_start,
                "Presale has not started yet!"
            );
            assert!(
                Clock::current_time_rounded_to_seconds() <= self.presale_end,
                "Presale has ended!"
            );
            assert!(
                self.collateral.amount() < self.presale_goal,
                "Presale goal reached!"
            );

            let max_buy_amount = self.presale_goal - self.collateral.amount();
            let collateral_in =
                collateral_bucket.take(max_buy_amount.min(collateral_bucket.amount()));

            let tokens_purchased = self.curve.buy_tokens(
                self.collateral.amount(),
                self.token_manager.total_supply().unwrap(),
                collateral_in.amount(),
            );

            let nft = self.presale_nft_manager.mint_non_fungible(
                &NonFungibleLocalId::integer(
                    self.presale_nft_manager // TODO - verify it works if not fallback to internal integer
                        .total_supply()
                        .unwrap()
                        .try_into()
                        .unwrap(),
                ),
                TokenMeta {
                    collateral_invested: collateral_in.amount(),
                    tokens_reserved: tokens_purchased,
                },
            );
            self.collateral.put(collateral_in);
            self.token_presale_vault
                .put(self.token_manager.mint(tokens_purchased));

            if self.collateral.amount() == self.presale_goal {
                self.presale_success = true;
                self.token_manager.set_metadata("presale_success", true);
            }

            (nft, collateral_bucket)
        }

        pub fn list_and_enable_staking(
            &mut self,
            registry_address: ComponentAddress,
            dapp_definition_address: ComponentAddress,
        ) -> (Global<Staking>, Bucket, Bucket) {
            assert!(
                Clock::current_time_rounded_to_seconds() > self.presale_end,
                "Presale has not ended!"
            );

            // TODO - check if badge is valid

            assert!(self.presale_success, "Presale has not succeeded :(");
            // TODO - use collateral to create LP and distribute allocations

            // Step 1 - Mint promised tokens to "team" (TODO - speciy team percentage)
            let team_allocation_bucket = self.token_manager.mint(self.team_allocation);

            // Step 2 - Withdraw collateral from bonding curve
            let collateral_withdrawn = self.collateral.take(self.collateral.amount());

            // Step 3 - Create dex pair and get LP tokens
            // We need x < y!
            // TODO - add as a parameter so it can be different from total sold amount, it doesnt affect pricing
            let lp_token_allocation = self.presale_goal;
            // Starting price sqrt, if for example we want starting price of 16 then we should set it to 4
            // Since it's reversed we need to take the inverse, 1 / 4 = 0.25
            let price_sqrt = pdec!(0.25);
            let (lp_pool, lp_bucket, x_bucket, y_bucket) =
                PrecisionPool::instantiate_with_liquidity(
                    collateral_withdrawn,
                    self.token_manager.mint(lp_token_allocation),
                    price_sqrt,
                    1,
                    dec!(0.01),
                    dec!(0.03),
                    registry_address,
                    vec![],
                    dapp_definition_address,
                    -50000,
                    50000,
                );

            // Step 4 - Lock LP tokens (TODO - add time to lock)
            self.token_lp_vault = Some(Vault::new(lp_bucket.resource_address()));
            self.token_lp_vault.as_mut().unwrap().put(lp_bucket);
            self.collateral.put(x_bucket);
            self.token_presale_vault.put(y_bucket);
            self.lp_pool = Some(lp_pool);
            // Step 5 - create staking contract

            // Create a new resource for the EscrowBadge NFT and mint it to the caller
            let badge_nft = ResourceBuilder::new_integer_non_fungible(OwnerRole::None)
                .metadata(metadata!(
                    init {
                        "name" => "Staking Badge for token sale", locked;
                    }
                ))
                .mint_roles(mint_roles!(
                    minter => rule!(deny_all);
                    minter_updater => rule!(deny_all);
                ))
                .burn_roles(burn_roles!(
                    burner => rule!(allow_all); // TODO - allow only the escrow contract to burn?
                    burner_updater => rule!(deny_all);
                ))
                .mint_initial_supply(vec![(
                    IntegerNonFungibleLocalId::new(0),
                    StakingBadge {
                        token_to_stake: self.token_manager.address(),
                    },
                )]);

            let staking = Staking::new(
                badge_nft.resource_address(),
                self.token_manager.address(),
                0,
            );
            self.staking = Some(staking);

            (staking, team_allocation_bucket, badge_nft.into())
        }

        pub fn distribute_rewards(&mut self) -> Vec<Bucket> {
            let lp_vault = &self.token_lp_vault.as_mut().unwrap().as_non_fungible();
            let lp_proof =
                lp_vault.create_proof_of_non_fungibles(&lp_vault.non_fungible_local_ids(100));
            let (x_fees, y_fees) = self.lp_pool.unwrap().claim_fees(lp_proof);
            // .call::<NonFungibleProof, (Bucket, Bucket)>("claim_fees", &lp_proof);
            let mut dust = Vec::new();
            if !x_fees.is_empty() {
                self.staking.unwrap().airdrop(x_fees);
            } else {
                dust.push(x_fees);
            }
            if !y_fees.is_empty() {
                self.staking.unwrap().airdrop(y_fees);
            } else {
                dust.push(y_fees);
            }
            dust
        }

        // TODO - method to get LP tokens after lock time, requires badge

        pub fn presale_nft_redeem(&mut self, nft: Bucket) -> Bucket {
            assert!(!nft.is_empty(), "Empty NFT sent!");
            assert_eq!(
                nft.resource_address(),
                self.presale_nft_manager.address(),
                "Invalid NFT type sent!"
            );
            assert!(
                Clock::current_time_rounded_to_seconds() > self.presale_end,
                "Presale has not ended!"
            );

            let meta = self
                .presale_nft_manager
                .get_non_fungible_data::<TokenMeta>(&nft.as_non_fungible().non_fungible_local_id());

            nft.burn();

            if self.presale_success {
                self.token_presale_vault.take(meta.tokens_reserved)
            } else {
                self.token_presale_vault.take(meta.tokens_reserved).burn();
                self.collateral.take(meta.collateral_invested)
            }
        }

        // Method to exchange presale NFT for tokens or refund

        // pub fn buy(&mut self, collateral_in: Bucket) -> Bucket {
        //     assert!(!collateral_in.is_empty(), "Empty collateral sent!");

        //     assert_eq!(
        //         collateral_in.resource_address(),
        //         self.collateral.resource_address(),
        //         "Invalid collateral type sent!"
        //     );

        //     let amount_out = self.curve.buy_tokens(
        //         self.collateral.amount(),
        //         self.token_manager.total_supply().unwrap(),
        //         collateral_in.amount(),
        //     );

        //     self.collateral.put(collateral_in);

        //     return self.token_manager.mint(amount_out);
        // }

        // pub fn sell(&mut self, tokens: Bucket) -> Bucket {
        //     assert!(!tokens.is_empty(), "Empty tokens sent!");

        //     assert_eq!(
        //         tokens.resource_address(),
        //         self.token_manager.address(),
        //         "Invalid token type sent!"
        //     );

        //     let amount_out = self.curve.sell_tokens(
        //         self.collateral.amount(),
        //         self.token_manager.total_supply().unwrap(),
        //         tokens.amount(),
        //     );

        //     tokens.burn();

        //     return self.collateral.take(amount_out);
        // }
    }
}
