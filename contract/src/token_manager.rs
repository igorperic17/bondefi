use crate::{
    bonding_curve::BondingCurve,
    token_sale_manager::{token::TokenSaleManager, TokenMeta},
};
use scrypto::prelude::*;

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
pub struct BonDeFiBadge {
    name: String,
    factory_component: ComponentAddress,
    resource_address: ResourceAddress,
    // TODO - add success status and update accordingly
}

#[blueprint]
mod token_manager {

    struct TokenManager {
        index: u64,
        badge_manager: ResourceManager,
    }

    impl TokenManager {
        pub fn create() {
            let (address_reservation, component_address) =
                Runtime::allocate_component_address(TokenManager::blueprint_id());

            // TODO: Metadata
            let badge_manager =
                ResourceBuilder::new_integer_non_fungible::<BonDeFiBadge>(OwnerRole::None)
                    .metadata(metadata! {
                        init {
                            "name" => "BonDeFi Manager NFT", locked;
                            "description" => "Authority token for managing BonDeFi assets", locked;
                            "icon_url" => "https://bondefi.xyz/manager-badge.png", locked;
                            "token_manager_address" => component_address, locked;
                        }
                    })
                    .mint_roles(mint_roles! {
                        minter => rule!(require(global_caller(component_address)));
                        minter_updater => rule!(deny_all);
                    })
                    .create_with_no_initial_supply();

            Self {
                index: 1,
                badge_manager,
            }
            .instantiate()
            .prepare_to_globalize(OwnerRole::None)
            .with_address(address_reservation)
            .globalize();
        }

        pub fn create_token(
            &mut self,
            collateral: ResourceAddress,
            curve: BondingCurve,

            // Presale parameters
            presale_start: Instant,
            presale_end: Instant,
            presale_goal: Decimal,
            lp_lock_until: Instant,
            team_allocation: Decimal,

            name: String,
            symbol: String,
            description: String,
            tags: Vec<String>,
            icon_url: String,
            info_url: String,
        ) -> (Global<TokenSaleManager>, Bucket) {
            let (address_reservation, component_address) =
                Runtime::allocate_component_address(TokenSaleManager::blueprint_id());

            // REF: https://docs.radixdlt.com/docs/metadata-for-wallet-display
            let token_manager = ResourceBuilder::new_fungible(OwnerRole::None)
                .metadata(metadata! {
                    roles {
                        metadata_setter => rule!(require(global_caller(component_address)));
                        metadata_setter_updater => rule!(deny_all);
                        metadata_locker => rule!(deny_all);
                        metadata_locker_updater => rule!(deny_all);
                    },
                    init {
                        "name" => name.clone(), locked;
                        "symbol" => symbol, locked;
                        "description" => description.clone(), updatable;
                        "tags" => tags, updatable;
                        "icon_url" => icon_url.clone(), updatable;
                        "info_url" => info_url.clone(), updatable;
                        "collateral" => collateral, locked;
                        "presale_start" => presale_start, locked;
                        "presale_end" => presale_end, locked;
                        "presale_goal" => presale_goal, locked;
                        "presale_success" => false, updatable;
                        "factory_component" => component_address, locked;
                        "bonding_curve" => curve.to_string(), locked;
                        "created_by" => "BonDeFi", locked;
                    }
                })
                .mint_roles(mint_roles! {
                    minter => rule!(require(global_caller(component_address)));
                    minter_updater => rule!(deny_all);
                })
                .burn_roles(burn_roles!(
                    burner => rule!(require(global_caller(component_address)));
                    burner_updater => rule!(deny_all);
                ))
                .create_with_no_initial_supply();

            let presale_nft_manager =
                ResourceBuilder::new_integer_non_fungible::<TokenMeta>(OwnerRole::None)
                    .metadata(metadata! {
                        init {
                            "name" => format!("{} Presale", name), locked;
                            "description" => description, updatable;
                            "icon_url" => icon_url, updatable;
                            "factory_component" => component_address, locked;
                            "bonding_curve" => curve.to_string(), locked;
                        }
                    })
                    .mint_roles(mint_roles! {
                        minter => rule!(require(global_caller(component_address)));
                        minter_updater => rule!(deny_all);
                    })
                    .burn_roles(burn_roles!(
                        burner => rule!(require(global_caller(component_address)));
                        burner_updater => rule!(deny_all);
                    ))
                    .create_with_no_initial_supply();

            let token = TokenSaleManager {
                curve,
                token_manager,
                presale_nft_manager,
                token_presale_vault: Vault::new(token_manager.address()),
                token_lp_vault: None,
                collateral: Vault::new(collateral),
                presale_start,
                presale_end,
                lp_lock_until,
                team_allocation,
                badge_address: self.badge_manager.address(),
                badge_id: IntegerNonFungibleLocalId::new(self.index).into(),
                presale_goal,
                presale_success: false,
                lp_pool: None,
                staking: None,
            }
            .instantiate()
            .prepare_to_globalize(OwnerRole::None)
            .with_address(address_reservation)
            .metadata(metadata! {
                init {
                    "name" => format!("{} Factory Component", name), locked;
                }
            })
            .globalize();

            let badge = self.badge_manager.mint_non_fungible(
                &NonFungibleLocalId::const_integer(self.index),
                BonDeFiBadge {
                    name,
                    factory_component: component_address,
                    resource_address: token_manager.address(),
                },
            );

            self.index += 1;

            (token, badge)
        }
    }
}
