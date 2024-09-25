use close_to::close_to;
use contract::bonding_curve::BondingCurve;
use scrypto::prelude::*;

#[test]
fn test_linear_bancor_initial_purchase() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.buy_tokens(dec!(0), dec!(0), dec!(1));
    let (close, _, _) = close_to(result.to_string().parse::<f64>().unwrap(), 1.73, 2);
    assert!(close, "Expected 1.73, got {}", result);
}
