use scrypto::prelude::*;
// Forked from https://github.com/nemster/fomo_staking/tree/main/src
// Event to emit at each airdrop.
#[derive(ScryptoSbor, ScryptoEvent)]
struct AirdropEvent {
    coin: ResourceAddress,
    amount: Decimal,
}

// NonFungibleData for the staking receipt
#[derive(Debug, ScryptoSbor, NonFungibleData)]
struct StakedData {
    id: u64,

    // When stake happened
    stake_date: Instant,

    // Can not be unstaked before this date
    #[mutable]
    minimum_unstake_date: Instant,

    // How many tokens have been staked
    amount_staked: Decimal,

    // A number user to split rewards among the stakers
    #[mutable]
    stake_share: PreciseDecimal,

    // This receipt only allows receiving rewards for airdrops happening after this one
    #[mutable]
    last_airdrop_id: u64,

    #[mutable]
    key_image_url: Url,
}

// A struct to store coins and information about airdrops happened
#[derive(Debug, ScryptoSbor)]
struct Airdrop {
    coin: ResourceAddress,
    amount_per_share: PreciseDecimal,
}

// Maximum number of buckets the remove_stake method will return.
// Raising this limit may cause transactions to fail
static MAX_BUCKETS: usize = 80;

#[blueprint]
#[events(AirdropEvent)]
#[types(u64, Airdrop, StakedData)]
mod staking {

    enable_method_auth! {
        methods {
            // Method to stake a bucket, it returns a staking receipt
            add_stake => PUBLIC;

            remove_stake => PUBLIC;

            // Method to airdrop any fungible coin to current stakers
            airdrop => PUBLIC;

            // This method allows the owner to deposit future staking rewards in the component ahead of time
            deposit_rewards => restrict_to: [OWNER];

            // This method allows the owner to distribute the previously deposited rewards
            airdrop_deposited_amount => restrict_to: [OWNER];
        }
    }

    struct Staking {
        // Vault to keep the staked token
        token_vault: Vault,

        // KVS where the non other coins are stored
        vaults: KeyValueStore<ResourceAddress, Vault>,

        // KVS where all non staked Airdrop objects are stored
        airdrops: KeyValueStore<u64, Airdrop>,

        // Optionally, stake can have a minimum length
        minimum_stake_period: i64,

        // ResourceManager to mint staking receipts
        staked_token_resource_manager: ResourceManager,

        // NonFungibleLocalId of the next staking receipt
        next_staked_token_id: u64,

        // The sum of all of the stake_share in the staking receipt
        total_stake_share: PreciseDecimal,

        // Optionally, the Owner can deposit the future rewards in this Vault ahead of time.
        future_rewards: Vault,

        // Numeric index of the last Airdrop object in the airdrops KVS
        last_airdrop_id: u64,
    }

    impl Staking {
        // IFunction to instantiate a new Staking component
        pub fn new(
            // The resource to set as owner badge for the component and the staking receipts it will mint
            owner_badge_address: ResourceAddress,

            // The resource address of the token to stake
            token_address: ResourceAddress,

            // The minimum time has to pass from stake to unstake (seconds).
            // It can be zero to let the user unstake whenever he wants.
            minimum_stake_period: i64,
        ) -> Global<Staking> {
            // Make sure minimum_stake_period isn't a negative number
            assert!(minimum_stake_period >= 0, "Invalid minimum_stake_period",);

            // Reserve a ComponentAddress for setting rules on resources
            let (address_reservation, component_address) =
                Runtime::allocate_component_address(Staking::blueprint_id());

            // Create a ResourceManager for minting staking receipts
            let staked_token_resource_manager =
                ResourceBuilder::new_integer_non_fungible_with_registered_type::<StakedData>(
                    OwnerRole::Updatable(rule!(require(owner_badge_address))),
                )
                .metadata(metadata!(
                    roles {
                        metadata_setter => rule!(require(owner_badge_address));
                        metadata_setter_updater => rule!(require(owner_badge_address));
                        metadata_locker => rule!(require(owner_badge_address));
                        metadata_locker_updater => rule!(require(owner_badge_address));
                    }
                ))
                .mint_roles(mint_roles!(
                    minter => rule!(require(global_caller(component_address)));
                    minter_updater => rule!(require(owner_badge_address));
                ))
                .non_fungible_data_update_roles(non_fungible_data_update_roles!(
                    non_fungible_data_updater => rule!(require(global_caller(component_address)));
                    non_fungible_data_updater_updater => rule!(require(owner_badge_address));
                ))
                .burn_roles(burn_roles!(
                    burner => rule!(require(global_caller(component_address)));
                    burner_updater => rule!(require(owner_badge_address));
                ))
                .create_with_no_initial_supply();

            // Instantiate the component and globalize it
            Self {
                token_vault: Vault::new(token_address),
                vaults: KeyValueStore::new(),
                airdrops: KeyValueStore::new_with_registered_type(),
                minimum_stake_period: minimum_stake_period,
                staked_token_resource_manager: staked_token_resource_manager,
                next_staked_token_id: 1,
                total_stake_share: PreciseDecimal::ZERO,
                future_rewards: Vault::new(token_address),
                last_airdrop_id: 0,
            }
            .instantiate()
            .prepare_to_globalize(OwnerRole::Updatable(rule!(require(owner_badge_address))))
            .with_address(address_reservation)
            .globalize()
        }

        // Method to stake a bucket of the token, it returns a staking receipt
        pub fn add_stake(&mut self, token: Bucket) -> Bucket {
            // Make sure the bucket contains the required token
            assert!(
                token.resource_address() == self.token_vault.resource_address(),
                "Wrong coin bro",
            );

            // Count the coins in the bucket
            let amount = token.amount();
            assert!(amount > Decimal::ZERO, "No coin bro",);

            // Count the already staked coins
            let vault_amount = self.token_vault.amount();

            // Empty the bucket in the vault
            self.token_vault.put(token);

            // Set stake_share and increase total_stake_share so that stake_share/total_stake_share represents the
            // share of token in the vault for this user.
            let mut stake_share = PreciseDecimal::ONE;
            if vault_amount > Decimal::ZERO {
                stake_share = (self.total_stake_share * amount) / vault_amount;
            }
            self.total_stake_share += stake_share;

            // Get current Instant
            let now = Clock::current_time_rounded_to_seconds();

            // Mint a staking receipt
            let staked_token = self.staked_token_resource_manager.mint_non_fungible(
                &NonFungibleLocalId::integer(self.next_staked_token_id.into()),
                StakedData {
                    id: self.next_staked_token_id,
                    stake_date: now,
                    minimum_unstake_date: Instant {
                        seconds_since_unix_epoch: now.seconds_since_unix_epoch
                            + self.minimum_stake_period,
                    },
                    amount_staked: amount,
                    stake_share: stake_share,
                    last_airdrop_id: self.last_airdrop_id,
                    key_image_url: UncheckedUrl("".to_string()),
                },
            );

            // Prepare for minting the next staking receipt
            self.next_staked_token_id += 1;

            // Return the staking receipt to the user
            staked_token
        }

        pub fn remove_stake(
            &mut self,
            staked_token: Bucket,
            ignored_coins: Vec<ResourceAddress>,
            max_airdrops: u64,
            mut no_token: bool,
        ) -> Vec<Bucket> {
            // Make sure staked_token is a staking receipt
            assert!(
                staked_token.resource_address() == self.staked_token_resource_manager.address(),
                "Wrong coin bro",
            );

            // Make sure token is not one of the ignored_coins
            // TODO - review!
            // assert!(
            //     ignored_coins
            //         .iter()
            //         .position(|&r| r == self.token_vault.resource_address())
            //         .is_none(),
            //     "You can't ignore!",
            // );

            // Read NonFungibleData from the bucket (it must contain exactly 1 staking receipt)
            let staked_token_data = staked_token
                .as_non_fungible()
                .non_fungible::<StakedData>()
                .data();

            // Make sure the minimum stakeing time has passed
            let now = Clock::current_time_rounded_to_seconds().seconds_since_unix_epoch;
            assert!(
                now >= staked_token_data
                    .minimum_unstake_date
                    .seconds_since_unix_epoch,
                "Can't unstake now bro",
            );

            // Prepare a vector for all of the buckets to return
            let mut coins: Vec<Bucket> = vec![];

            // Prepare a HashMap to store the total the user must receive per each non token coin
            let mut totals: HashMap<ResourceAddress, PreciseDecimal> =
                HashMap::with_capacity(MAX_BUCKETS);

            // New value to set in the stake NFT
            let mut new_last_airdrop_id = self.last_airdrop_id;

            let mut processed_airdrops: u64 = 0;

            // For each non token airdrop happened during the staking period
            for airdrop_id in staked_token_data.last_airdrop_id + 1..=self.last_airdrop_id {
                // If max_airdrops have been processed, update last_airdrop_id in the NFT and stop
                // processing airdrops.
                if processed_airdrops >= max_airdrops {
                    new_last_airdrop_id = airdrop_id - 1;
                    no_token = true;
                    break;
                }

                // Find the airdrop information
                let airdrop = self.airdrops.get(&airdrop_id).unwrap();

                // If this coin doesn't have to be ignored
                if ignored_coins
                    .iter()
                    .position(|&r| r == airdrop.coin)
                    .is_none()
                {
                    processed_airdrops += 1;

                    // Compute the amount this user must receive
                    let amount = staked_token_data.stake_share * airdrop.amount_per_share;

                    // Is this coin already in the totals HashMap?
                    if totals.get(&airdrop.coin).is_some() {
                        // If so, put the coins in this bucket
                        *totals.get_mut(&airdrop.coin).unwrap() += amount;
                    } else {
                        // If not, can we create another one without exceeding MAX_BUCKETS?
                        if totals.len() < MAX_BUCKETS {
                            // If so, add a new element to totals
                            totals.insert(airdrop.coin, amount);
                        } else {
                            // If MAX_BUCKETS have been created, update last_airdrop_id in the NFT and stop
                            // processing airdrops.
                            new_last_airdrop_id = airdrop_id - 1;
                            no_token = true;
                            break;
                        }
                    }
                }
            }

            // For each coin the user has to receive
            for (resource_address, amount) in totals.iter() {
                // Create a new bucket with the number of coins he has to receve and add it to the coins vector
                coins.push(
                    self.vaults
                        .get_mut(&resource_address)
                        .unwrap()
                        .take_advanced(
                            amount.checked_truncate(RoundingMode::ToZero).unwrap(),
                            WithdrawStrategy::Rounded(RoundingMode::ToZero),
                        ),
                );
            }

            if no_token {
                // Update last_airdrop_id in the stake NFT
                self.staked_token_resource_manager.update_non_fungible_data(
                    &NonFungibleLocalId::integer(staked_token_data.id),
                    "last_airdrop_id",
                    new_last_airdrop_id,
                );

                // Give back the NFT to the user
                coins.push(staked_token);
            } else {
                // Burn the NFT
                staked_token.burn();

                // Compute the % of total token to be unstaked and update total_stake_share accordingly
                let ratio = staked_token_data.stake_share / self.total_stake_share;
                self.total_stake_share -= staked_token_data.stake_share;

                // Create the token bucket and add it to the vector
                let amount = ratio * PreciseDecimal::from(self.token_vault.amount());
                coins.push(self.token_vault.take_advanced(
                    amount.checked_truncate(RoundingMode::ToZero).unwrap(),
                    WithdrawStrategy::Rounded(RoundingMode::ToZero),
                ));
            }

            // Give the user all of his coins
            coins
        }

        // Method to airdrop any fungible coin to current token stakers
        pub fn airdrop(&mut self, coins: Bucket) {
            // Get the resource_address of the coin to airdrop and make sure it is a fungible
            let resource_address = coins.resource_address();
            assert!(resource_address.is_fungible(), "Can't airdrop NFTs",);

            // Make sure there are actually coins in the bucket
            let amount = coins.amount();
            assert!(amount > Decimal::ZERO, "No coin bro",);

            // If no one is staking, the coins will be lost forever
            assert!(
                self.staked_token_resource_manager.total_supply().unwrap() > Decimal::ZERO,
                "No one to airdrop to",
            );

            // If the bucket contains some token, just put them in the vault of the staked token
            if resource_address == self.token_vault.resource_address() {
                self.token_vault.put(coins);
            } else {
                // If the bucket contains any fungible different from token, create a new Airdrop object and add it to
                // the KVS
                self.last_airdrop_id += 1;
                self.airdrops.insert(
                    self.last_airdrop_id,
                    Airdrop {
                        coin: resource_address,
                        amount_per_share: amount / self.total_stake_share,
                    },
                );

                // Does a vault for this coins already exist?
                if self.vaults.get(&resource_address).is_some() {
                    // If so, put the coins in it
                    self.vaults.get_mut(&resource_address).unwrap().put(coins);
                } else {
                    // Else create the vault with the coins in it
                    self.vaults
                        .insert(resource_address, Vault::with_bucket(coins));
                }
            }

            // Tell everyone the party is here
            Runtime::emit_event(AirdropEvent {
                coin: resource_address,
                amount: amount,
            });
        }

        // This method allows the owner to deposit future staking rewards in the component ahead of time
        pub fn deposit_rewards(&mut self, token: Bucket) {
            self.future_rewards.put(token);
        }

        // This method allows the owner to distribute the previously deposited rewards
        pub fn airdrop_deposited_amount(&mut self, amount: Decimal) {
            // If no one is staking, the coins will be lost forever
            assert!(
                self.staked_token_resource_manager.total_supply().unwrap() > Decimal::ZERO,
                "No one to airdrop to",
            );

            // Take the required amount from the future rewards and put it in the vault of the staked token
            self.token_vault.put(self.future_rewards.take(amount));

            // Tell everyone the party is here
            Runtime::emit_event(AirdropEvent {
                coin: self.token_vault.resource_address(),
                amount: amount,
            });
        }
    }
}
