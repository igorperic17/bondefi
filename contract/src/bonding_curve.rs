use scrypto::prelude::*;
use scrypto_math::*;

#[derive(ScryptoSbor, Debug, Clone, ManifestSbor)]
pub enum BondingCurve {
    Bancor {
        reserve_ratio: Decimal,
        starting_price: Decimal,
    },
}

impl BondingCurve {
    pub fn buy_tokens(
        &self,
        collateral_reserves: Decimal,
        token_reserves: Decimal,
        amount_paid: Decimal,
    ) -> Decimal {
        match self {
            //buyAmt = tokenSupply * ((1 + amtPaid / collateral)^CW — 1)
            BondingCurve::Bancor {
                reserve_ratio,
                starting_price,
            } => {
                // let mut start: Decimal = Decimal::from(0);
                // if collateral_reserves == dec!(0) {
                //     start = *starting_price;
                // }
                // token_reserves
                //     * (((Decimal::ONE + (amount_paid / collateral_reserves)).pow(*reserve_ratio))
                //         .unwrap()
                //         - Decimal::ONE)
                let new_collateral: Decimal = collateral_reserves + amount_paid;
                let new_total_supply: Decimal = new_collateral / *reserve_ratio;
                token_reserves
                    * (((Decimal::ONE + (amount_paid / collateral_reserves)).pow(*reserve_ratio))
                        .unwrap()
                        - Decimal::ONE)
            }
        }
    }

    // pub fn sell_tokens(
    //     &self,
    //     collateral_reserves: Decimal,
    //     token_reserves: Decimal,
    //     amount_sold: Decimal,
    // ) -> Decimal {
    //     match self {
    //         BondingCurve::Bancor { reserve_ratio } => *reserve_ratio * tokens_out, // TODO
    //     }
    // }
}

impl std::fmt::Display for BondingCurve {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            BondingCurve::Bancor {
                reserve_ratio,
                starting_price,
            } => write!(
                f,
                "reserve_ratio:{}, starting_price:{}",
                reserve_ratio, starting_price
            ),
        }
    }
}
