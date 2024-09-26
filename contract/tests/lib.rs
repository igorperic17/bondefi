use contract::bonding_curve::BondingCurve;
use scrypto::prelude::*;
use scrypto_test::prelude::*;

#[test]
fn test_token_manager() {
    // Setup the environment
    let mut ledger = LedgerSimulatorBuilder::new()
        .with_custom_genesis(CustomGenesis::default(
            Epoch::of(1),
            CustomGenesis::default_consensus_manager_config(),
        ))
        .build();

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

    let now = Instant::new(ledger.get_current_proposer_timestamp_ms() - 1);
    let end = Instant::new(ledger.get_current_proposer_timestamp_ms() + 6000000);
    let lp_lock_until = Instant::new(ledger.get_current_proposer_timestamp_ms() + 9000000);

    // Test the `create_token` method.
    // collateral: ResourceAddress,
    //         curve: BondingCurve,

    //         // Presale parameters
    //         presale_start: Instant,
    //         presale_end: Instant,
    //         presale_goal: Decimal,
    //         lp_lock_until: Instant,
    //         team_allocation: Decimal,

    //         name: String,
    //         symbol: String,
    //         description: String,
    //         tags: Vec<String>,
    //         icon_url: String,
    //         info_url: String,
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
                dec!(100),     // presale_goal
                lp_lock_until, // lp_lock_until
                dec!(0),       // team_allocation
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
    let sale_component_receipt = receipt.expect_commit(true);
    let sale_component = sale_component_receipt.new_component_addresses()[0];

    let presale_nft_resource = sale_component_receipt.new_resource_addresses()[0];
    let launched_token_resource = sale_component_receipt.new_resource_addresses()[1];

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

    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .withdraw_non_fungibles_from_account(
            account,
            presale_nft_resource,
            [NonFungibleLocalId::integer(0)],
        )
        .take_all_from_worktop(presale_nft_resource, "presale_nft_resource")
        .call_method_with_name_lookup(sale_component, "presale_nft_redeem", |lookup| {
            (lookup.bucket("presale_nft_resource"),)
        })
        .deposit_batch(account)
        .build();

    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    receipt.expect_commit_failure();

    let ended_timestamp = (end.seconds_since_unix_epoch * 1000) + 1000;
    ledger.advance_to_round_at_timestamp(Round::of(3), ended_timestamp);

    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .withdraw_non_fungibles_from_account(
            account,
            presale_nft_resource,
            [NonFungibleLocalId::integer(0)],
        )
        .take_all_from_worktop(presale_nft_resource, "presale_nft_resource")
        .call_method_with_name_lookup(sale_component, "presale_nft_redeem", |lookup| {
            (lookup.bucket("presale_nft_resource"),)
        })
        .deposit_batch(account)
        .build();

    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    receipt.expect_commit_success();

    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .call_function(
            package_address,
            "Registry",
            "instantiate",
            manifest_args!(presale_nft_resource, dec!(0), 10080 as u64, 20 as u64),
        )
        .deposit_batch(account)
        .build();
    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    let registry = receipt.expect_commit(true).new_component_addresses()[0];
    receipt.expect_commit_success();

    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .call_method(
            sale_component,
            "list_and_enable_staking",
            manifest_args!(registry, registry),
        )
        .deposit_batch(account)
        .build();
    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);

    let receipt_success = receipt.expect_commit(true);
    let dex = receipt_success.new_component_addresses()[0];
    let staking = receipt_success.new_component_addresses()[1];

    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .withdraw_from_account(account, launched_token_resource, dec!("10"))
        .take_all_from_worktop(launched_token_resource, "token")
        .call_method_with_name_lookup(staking, "add_stake", |lookup| (lookup.bucket("token"),))
        .deposit_batch(account)
        .build();
    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    receipt.expect_commit_success();

    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .withdraw_from_account(account, collateral, dec!("100"))
        .take_all_from_worktop(collateral, "collateral")
        .call_method_with_name_lookup(dex, "swap", |lookup| (lookup.bucket("collateral"),))
        .deposit_batch(account)
        .build();

    let receipt = ledger.execute_manifest(
        manifest,
        vec![NonFungibleGlobalId::from_public_key(&public_key)],
    );
    println!("{:?}\n", receipt);
    receipt.expect_commit_success();

    let manifest = ManifestBuilder::new()
        .lock_fee_from_faucet()
        .call_method(sale_component, "distribute_rewards", manifest_args!())
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
