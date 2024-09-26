use close_to::close_to;
use contract::bonding_curve::BondingCurve;
use scrypto::prelude::*;
use scrypto_math::PowerDecimal;

#[test]
fn test_linear_bancor_initial_purchase() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.buy_tokens(dec!(0), dec!(0), dec!(1));
    let (close, _, _) = close_to(
        result.to_string().parse::<f64>().unwrap(),
        0.732050807568877293,
        18,
    );
    assert!(close, "Expected 0.732050807568877293, got {}", result);
}

#[test]
fn test_linear_bancor_large_purchase() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.buy_tokens(dec!(0), dec!(0), Decimal::TEN.pow(dec!(8)).unwrap());
    let (close, _, _) = close_to(
        result.to_string().parse::<f64>().unwrap(),
        14141.13565908628949838,
        18,
    );
    assert!(close, "Expected 14141.13565908628949838, got {}", result);
}

#[test]
fn test_linear_bancor_large_sale() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.sell_tokens(
        Decimal::TEN.pow(dec!(8)).unwrap(),
        dec!(14141.13565908628949838),
        dec!(14141.13565908628949838),
    );

    assert!(
        result.to_string().parse::<f64>().unwrap().round() == (10f64).powi(8),
        "Expected to get 10^8 collateral, got {} and {}",
        result.to_string().parse::<f64>().unwrap().round(),
        (10f64).powi(8)
    );
}
