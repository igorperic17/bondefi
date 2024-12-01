use contract::staking::staking_test::Staking;
use scrypto_test::prelude::*;
// Forked from https://github.com/nemster/fomo_staking/tree/main/src
#[test]
fn test_staking() -> Result<(), RuntimeError> {
    let mut env = TestEnvironment::new();
    env.disable_auth_module();
    let package_address =
        PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

    // Create token owner badge
    let badge_bucket = ResourceBuilder::new_fungible(OwnerRole::None)
        .divisibility(0)
        .mint_initial_supply(1, &mut env)?;
    let badge_address = badge_bucket.resource_address(&mut env)?;

    // Create token coin
    let token_bucket = ResourceBuilder::new_fungible(OwnerRole::None)
        .divisibility(18)
        .mint_initial_supply(17000000, &mut env)?;
    let token_address = token_bucket.resource_address(&mut env)?;

    // Instantiate a Staking component
    let mut token_staking =
        Staking::new(badge_address, token_address, 0, package_address, &mut env)?;

    // Stake 100 token
    let staked_token_bucket1 =
        token_staking.add_stake(token_bucket.take(dec!(100), &mut env)?, &mut env)?;

    // Stake 50 token
    let staked_token_bucket2 =
        token_staking.add_stake(token_bucket.take(dec!(50), &mut env)?, &mut env)?;

    // Deposit 1000 token as future staking rewards and distribute 30 of them
    token_staking.deposit_rewards(token_bucket.take(dec!(1000), &mut env)?, &mut env)?;
    token_staking.airdrop_deposited_amount(dec!(30), &mut env)?;

    // Stake 100 token
    let staked_token_bucket3 =
        token_staking.add_stake(token_bucket.take(dec!(100), &mut env)?, &mut env)?;

    // Create TEST coin
    let test_bucket = ResourceBuilder::new_fungible(OwnerRole::None)
        .divisibility(18)
        .mint_initial_supply(17000000, &mut env)?;

    // Make two airdrops of total 280 TEST coins
    token_staking.airdrop(test_bucket.take(dec!(130), &mut env)?, &mut env)?;
    token_staking.airdrop(test_bucket.take(dec!(150), &mut env)?, &mut env)?;

    // Stake 50 token
    let staked_token_bucket4 =
        token_staking.add_stake(token_bucket.take(dec!(50), &mut env)?, &mut env)?;

    // Unstake staked token and check the amounts (a small rounding error is acceptable)
    let vec_of_buckets1 =
        token_staking.remove_stake(staked_token_bucket1, vec![], 350, false, &mut env)?;
    let token_received1 = vec_of_buckets1[0].amount(&mut env)?;
    assert!(
        token_received1 > dec!("119.99") && token_received1 < dec!("120.01"),
        "Wrong token received 1: {}",
        token_received1
    );
    let test_received1 = vec_of_buckets1[1].amount(&mut env)?;
    assert!(
        test_received1 > dec!("119.99") && test_received1 < dec!("120.01"),
        "Wrong TEST received 1: {}",
        test_received1
    );

    // Unstake staked token and check the amounts (a small rounding error is acceptable)
    let vec_of_buckets2 =
        token_staking.remove_stake(staked_token_bucket2, vec![], 350, false, &mut env)?;
    let token_received2 = vec_of_buckets2[0].amount(&mut env)?;
    assert!(
        token_received2 > dec!("59.99") && token_received2 < dec!("60.01"),
        "Wrong token received 2: {}",
        token_received2
    );
    let test_received2 = vec_of_buckets2[1].amount(&mut env)?;
    assert!(
        test_received2 > dec!("59.99") && test_received2 < dec!("60.01"),
        "Wrong TEST received 2: {}",
        test_received2
    );

    // Unstake staked token and check the amounts (a small rounding error is acceptable)
    let vec_of_buckets3 =
        token_staking.remove_stake(staked_token_bucket3, vec![], 350, false, &mut env)?;
    let token_received3 = vec_of_buckets3[0].amount(&mut env)?;
    assert!(
        token_received3 > dec!("99.99") && token_received3 < dec!("100.01"),
        "Wrong token received 3: {}",
        token_received3
    );
    let test_received3 = vec_of_buckets3[1].amount(&mut env)?;
    assert!(
        test_received3 > dec!("99.99") && test_received3 < dec!("100.01"),
        "Wrong TEST received 3: {}",
        test_received3
    );

    // Unstake staked token and check the amounts (a small rounding error is acceptable)
    let vec_of_buckets4 =
        token_staking.remove_stake(staked_token_bucket4, vec![], 350, false, &mut env)?;
    let token_received4 = vec_of_buckets4[0].amount(&mut env)?;
    assert!(
        token_received4 > dec!("49.99") && token_received4 < dec!("50.01"),
        "Wrong token received 4: {}",
        token_received4
    );
    assert!(vec_of_buckets4.len() == 1, "Received an undue bucket");

    Ok(())
}
