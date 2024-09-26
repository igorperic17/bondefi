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
        140.424891727022368637,
        18,
    );
    assert!(close, "Expected 140.424891727022368637, got {}", result);
}

#[test]
fn test_linear_bancor_large_purchase() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.buy_tokens(dec!(0), dec!(0), Decimal::TEN.pow(dec!(8)).unwrap());
    let (close, _, _) = close_to(
        result.to_string().parse::<f64>().unwrap(),
        1414212.562373448601500283,
        18,
    );
    assert!(close, "Expected 1414212.562373448601500283, got {}", result);
}

#[test]
fn test_linear_bancor_1_mill_purchase() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.buy_tokens(dec!(0), dec!(0), dec!(1000000));
    let (close, _, _) = close_to(
        result.to_string().parse::<f64>().unwrap(),
        141420.356240845038790184,
        18,
    );
    assert!(close, "Expected 141420.356240845038790184, got {}", result);
}

#[test]
fn test_token_price_bancor_after_1_mill_purchase() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.buy_tokens(
        dec!(1000000),
        dec!(141420.356240845038790184),
        dec!(14.142235624084503),
    );
    let (close, _, _) = close_to(result.to_string().parse::<f64>().unwrap(), 1, 1);
    assert!(close, "Expected 1 token to be bought, got {}", result);
}

#[test]
fn test_token_price_bancor_retrieve() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.token_price(dec!(1000000), dec!(141420.356240845038790184));
    let (close, _, _) = close_to(
        result.to_string().parse::<f64>().unwrap(),
        14.142235624084503,
        3,
    );
    assert!(
        close,
        "Expected token price to be 14.142235624084503, got {}",
        result
    );
}

#[test]
fn test_linear_bancor_large_sale() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.5),
    };

    let result: Decimal = curve.sell_tokens(
        Decimal::TEN.pow(dec!(8)).unwrap(),
        dec!(141410000),
        dec!(141410000),
    );

    assert!(
        result.to_string().parse::<f64>().unwrap().round() == (10f64).powi(8),
        "Expected to get 10^8 collateral, got {} and {}",
        result.to_string().parse::<f64>().unwrap().round(),
        (10f64).powi(8)
    );
}

#[test]
fn test_bancor_low_ratio() {
    let curve = BondingCurve::Bancor {
        reserve_ratio: dec!(0.2),
    };

    let result: Decimal = curve.buy_tokens(dec!(0), dec!(0), dec!(1000));
    let result2: Decimal = curve.buy_tokens(dec!(1000), result, dec!(1000));

    assert!(
        result == dec!(33.657242296386287166) && result2 == dec!(5.153474838584871683),
        "Expected to get ~33 tokens on first purchase and ~5 tokens on second, got {} and {}",
        result,
        result2
    );
}
