use scrypto::prelude::*;
use scrypto_math::*;

#[derive(ScryptoSbor, Debug, Clone, ManifestSbor)]
pub enum BondingCurve {
    Bancor { reserve_ratio: Decimal },
}

impl BondingCurve {
    pub fn buy_tokens(
        &self,
        collateral_reserves: Decimal,
        token_reserves: Decimal,
        amount_paid: Decimal,
    ) -> Decimal {
        match self {
            //buyAmt = tokenSupply * ((1 + amtPaid / collateral)^CW — 1)s
            BondingCurve::Bancor { reserve_ratio } => {
                (token_reserves + Decimal::ONE)
                    * (Decimal::ONE + amount_paid / (collateral_reserves + *reserve_ratio))
                        .pow(*reserve_ratio)
                        .unwrap()
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
            BondingCurve::Bancor { reserve_ratio } => {
                write!(f, "reserve_ratio:{}", reserve_ratio)
            }
        }
    }
}
