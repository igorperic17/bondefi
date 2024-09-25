use contract::bonding_curve::BondingCurve;
use scrypto::prelude::*;

#[test]
fn test_linear_bancor_initial_purchase() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result = curve.buy_tokens(dec!(0), dec!(0), dec!(1));
    assert_eq!(result, dec!(1.73));
}
