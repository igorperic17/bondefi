use scrypto::prelude::*;

#[derive(ScryptoSbor, NonFungibleData, ManifestSbor)]
pub struct TokenMeta {
    pub collateral_invested: Decimal,
    pub tokens_reserved: Decimal,
}

#[blueprint]
mod token {

    struct Token {
        pub collateral: Vault,
        pub token_manager: ResourceManager,
        // pub curve: BondingCurve,
    }

    impl Token {
        
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
