use contract::bonding_curve::BondingCurve;
use scrypto::prelude::*;

#[test]
fn test_linear_bancor_initial_purchase() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
        starting_price: dec!(1),
    };

    let result = curve.buy_tokens(dec!(5000), dec!(10000), dec!(100000));
    assert_eq!(result, dec!(4));
}
