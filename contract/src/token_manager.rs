use scrypto::prelude::*;
use crate::token::{token::Token, TokenMeta};


#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
pub struct BonDeFiBadge {
    name: String,
    factory_component: ComponentAddress,
    resource_address: ResourceAddress,
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
            // curve: BondingCurve,

            name: String,
            symbol: String,
            description: String,
            tags: Vec<String>,
            icon_url: String,
            info_url: String,
        ) -> (Global<Token>, Bucket) {
            let (address_reservation, component_address) =
                Runtime::allocate_component_address(Token::blueprint_id());

            // REF: https://docs.radixdlt.com/docs/metadata-for-wallet-display
            let token_manager = ResourceBuilder::new_integer_non_fungible::<TokenMeta>(OwnerRole::None)
                .metadata(metadata! {
                    init {
                        "name" => name.clone(), locked;
                        "symbol" => symbol, locked;
                        "description" => description, updatable;
                        "tags" => tags, updatable;
                        "icon_url" => icon_url, updatable;
                        "info_url" => info_url, updatable;
                        "collateral" => collateral, locked;
                        "factory_component" => component_address, locked;
                        // "bonding_curve" => curve.to_string(), locked;
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

            let token = Token {
                // curve,
                token_manager,
                collateral: Vault::new(collateral),
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
