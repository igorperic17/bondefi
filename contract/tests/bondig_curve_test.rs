use bondefi::bonding_curve::BondingCurve;
use scrypto::prelude::*;

#[test]
fn test_constant() {
    let curve = BondingCurve::Constant { slope: dec!(2) };

    let result = curve.buy_tokens(dec!(100), dec!(2), dec!(100));
    assert_eq!(result, dec!(200));

    let result = curve.sell_tokens(dec!(100), dec!(2), dec!(100));
    assert_eq!(result, dec!(50));
}

#[test]
fn test_linear() {
    let curve = BondingCurve::Linear {
        a: dec!(2),
        b: dec!(1),
    };

    let result = curve.buy_tokens(dec!(100), dec!(2), dec!(100));
    assert_eq!(result, dec!(201));

    let result = curve.sell_tokens(dec!(100), dec!(2), dec!(100));
    assert_eq!(result, dec!(49.5));
}
