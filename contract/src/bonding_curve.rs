use scrypto::prelude::*;

#[derive(ScryptoSbor, Debug, Clone, ManifestSbor)]
pub enum BondingCurve {
    Bancor { reserve_ratio: Decimal },
}

impl BondingCurve {
    pub fn buy_tokens(
        &self,
        _collateral_amount: Decimal,
        _token_supply: Decimal,
        collateral_in: Decimal,
    ) -> Decimal {
        match self {
            BondingCurve::Bancor { reserve_ratio } => *reserve_ratio * collateral_in, // TODO
        }
    }

    pub fn sell_tokens(
        &self,
        _collateral_amount: Decimal,
        _token_supply: Decimal,
        tokens_out: Decimal,
    ) -> Decimal {
        match self {
            BondingCurve::Bancor { reserve_ratio } => *reserve_ratio * tokens_out, // TODO
        }
    }
}

impl std::fmt::Display for BondingCurve {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            BondingCurve::Bancor { reserve_ratio } => write!(f, "reserve_ratio:{}", reserve_ratio),
        }
    }
}
