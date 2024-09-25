use crate::bonding_curve::BondingCurve;
use scrypto::prelude::*;

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
pub struct TokenMeta {
    pub collateral_invested: Decimal,
    pub tokens_reserved: Decimal,
}

#[blueprint]
mod token {
    struct TokenSaleManager {
        pub collateral: Vault,
        pub token_presale_vault: Vault,
        pub presale_nft_manager: ResourceManager, // Handle presale NFTs
        pub token_manager: ResourceManager,       // Handle actual tokens
        pub curve: BondingCurve,
        pub presale_start: Instant,
        pub presale_end: Instant,
        pub presale_goal: Decimal,
    }

    impl TokenSaleManager {
        // Method to handle presale
        pub fn presale_nft_mint(&mut self, collateral_in: Bucket) -> (Bucket, Bucket) {
            assert!(!collateral_in.is_empty(), "Empty collateral sent!");
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
            let tokens_purchased = self.curve.buy_tokens(
                self.collateral.amount(),
                self.token_manager.total_supply().unwrap(),
                collateral_in.amount(),
            );

            let nft = self.presale_nft_manager.mint_non_fungible(
                &NonFungibleLocalId::const_integer(1),
                TokenMeta {
                    collateral_invested: collateral_in.amount(),
                    tokens_reserved: tokens_purchased,
                },
            );
            self.collateral.put(collateral_in);
            self.token_presale_vault
                .put(self.token_manager.mint(tokens_purchased));

            nft
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
