use scrypto::prelude::*;
use scrypto_math::*;

#[derive(ScryptoSbor, Debug, Clone, ManifestSbor)]
pub enum BondingCurve {
    Bancor { reserve_ratio: Decimal },
}

impl BondingCurve {
    pub fn token_price(&self, collateral_reserves: Decimal, token_supply: Decimal) -> Decimal {
        match self {
            BondingCurve::Bancor { reserve_ratio } => {
                const STARTING_PRICE: Decimal = dec!(0.0001);
                (collateral_reserves + (STARTING_PRICE * *reserve_ratio))
                    / ((token_supply + Decimal::ONE) * *reserve_ratio)
            }
        }
    }

    pub fn buy_tokens(
        &self,
        collateral_reserves: Decimal,
        token_supply: Decimal,
        amount_paid: Decimal,
    ) -> Decimal {
        match self {
            //PurchaseReturn = ContinuousTokenSupply * ((1 + ReserveTokensReceived / ReserveTokenBalance) ^ (ReserveRatio) - 1)
            //Formula is slightly modified to allow the curve to start with no tokens or collateral
            //with a virtual supply of 1 token and its equivalent collateral
            BondingCurve::Bancor { reserve_ratio } => {
                //Starting price can be customized in the future when initializing the curve
                const STARTING_PRICE: Decimal = dec!(0.0001);
                (token_supply + Decimal::ONE)
                    * ((Decimal::ONE
                        + amount_paid / (collateral_reserves + (STARTING_PRICE * *reserve_ratio)))
                        .pow(*reserve_ratio)
                        .unwrap()
                        - Decimal::ONE)
            }
        }
    }

    pub fn sell_tokens(
        &self,
        collateral_reserves: Decimal,
        token_supply: Decimal,
        tokens_sold: Decimal,
    ) -> Decimal {
        match self {
            //SaleReturn = ReserveTokenBalance * (1 - (1 - ContinuousTokensReceived / ContinuousTokenSupply) ^ (1 / (ReserveRatio)))
            BondingCurve::Bancor { reserve_ratio } => {
                const STARTING_PRICE: Decimal = dec!(0.0001);
                (collateral_reserves + STARTING_PRICE * *reserve_ratio)
                    * (Decimal::ONE
                        - (Decimal::ONE - tokens_sold / (token_supply + Decimal::ONE))
                            .pow(Decimal::ONE / *reserve_ratio)
                            .unwrap())
            }
        }
    }
}

impl std::fmt::Display for BondingCurve {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            BondingCurve::Bancor { reserve_ratio } => {
                write!(f, "0:{}", reserve_ratio)
            }
        }
    }
}
