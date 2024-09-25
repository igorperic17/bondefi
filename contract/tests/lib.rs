use scrypto_test::prelude::*;

use contract::{bonding_curve::BondingCurve, token_manager::*};

#[test]
fn test_token_manager() {
    // Setup the environment
    let mut ledger = LedgerSimulatorBuilder::new().build();

    // Create an account
    let (public_key, _private_key, account) = ledger.new_allocated_account();

    // Publish package
    let package_address = ledger.compile_and_publish(this_package!());

    // Test the `instantiate_hello` function.
    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .call_function(package_address, "TokenManager", "create", manifest_args!())
        .deposit_batch(account)
        .build();
    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    let component = receipt.expect_commit(true).new_component_addresses()[0];

    let collateral = ledger.create_fungible_resource(dec!("1000"), 18, account);

    let now = Instant::new(ledger.get_current_proposer_timestamp_ms());
    let end = Instant::new(ledger.get_current_proposer_timestamp_ms() + 6000000);

    // Test the `create_token` method.
    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .call_method(
            component,
            "create_token",
            manifest_args!(
                collateral,
                BondingCurve::Bancor {
                    reserve_ratio: dec!(0.5)
                },
                now,
                end,
                dec!(100),
                "Test Token".to_string(),
                "TEST".to_string(),
                "This is a test token".to_string(),
                vec!["test".to_string()],
                "https://test.com".to_string(),
                "https://test.com".to_string(),
            ),
        )
        .deposit_batch(account)
        .build();
    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    let sale_component = receipt.expect_commit(true).new_component_addresses()[0];

    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .withdraw_from_account(account, collateral, dec!("100"))
        .take_all_from_worktop(collateral, "collateral")
        .call_method_with_name_lookup(sale_component, "presale_nft_mint", |lookup| {
            (lookup.bucket("collateral"),)
        })
        .deposit_batch(account)
        .build();
    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    receipt.expect_commit_success();
}

// #[test]
// fn test_hello_with_test_environment() -> Result<(), RuntimeError> {
//     // Arrange
//     let mut env = TestEnvironment::new();
//     let package_address =
//         PackageFactory::compile_and_publish(this_package!(), &mut env, CompileProfile::Fast)?;

//     let mut hello = Hello::instantiate_hello(package_address, &mut env)?;

//     // Act
//     let bucket = hello.free_token(&mut env)?;

//     // Assert
//     let amount = bucket.amount(&mut env)?;
//     assert_eq!(amount, dec!("1"));

//     Ok(())
// }
