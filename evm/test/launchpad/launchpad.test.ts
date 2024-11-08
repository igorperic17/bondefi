import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  BancorFormula__factory,
  ERC20Token,
  ERC20Token__factory,
  IBancorFormula,
  Launchpad,
  Launchpad__factory,
  Purchase,
  Purchase__factory,
  PurchaseFactory,
  PurchaseFactory__factory,
  TestDAI,
  TestDAI__factory,
} from "../../typechain-types";
import { findLogs } from "../fixtures/blockchain-utils";
import type { LaunchCreatedEvent } from "../../typechain-types/contracts/launchpad/Launchpad";

describe("Launchpad", () => {
  let deployer: SignerWithAddress;
  let formula: IBancorFormula;
  let purchase: Purchase;
  let purchaseFactory: PurchaseFactory;
  let token: ERC20Token;
  let dai: TestDAI;
  let launchpad: Launchpad;
  let currentBlockTimestamp: number;

  before(async () => {
    [deployer] = await ethers.getSigners();
    formula = await new BancorFormula__factory(deployer).deploy();
    purchase = await new Purchase__factory(deployer).deploy();
    purchaseFactory = await new PurchaseFactory__factory(deployer).deploy(
      purchase,
    );
    dai = await new TestDAI__factory(deployer).deploy();
    token = await new ERC20Token__factory(deployer).deploy(
      "Test Token",
      "TEST",
    );
  });

  beforeEach(async () => {
    launchpad = await new Launchpad__factory(deployer).deploy();
    await launchpad.setPurchaseFactory(purchaseFactory);

    currentBlockTimestamp =
      (await ethers.provider.getBlock("latest"))?.timestamp ?? 0;
  });

  it("should set up correctly", async () => {
    expect(true);
  });

  describe("when setting up a project launch", () => {
    it("it should set up the launch correctly", async () => {
      const tx = launchpad.createLaunch(
        "nftName",
        "purchase",
        dai,
        ethers.parseUnits("1000", await dai.decimals()),
        0,
        currentBlockTimestamp + 1,
        currentBlockTimestamp + 2,
        formula,
      );

      await expect(tx).not.reverted;
      const logs = await findLogs(
        tx,
        launchpad,
        launchpad.getEvent("LaunchCreated"),
      );
      expect(logs[0].args.launchId).to.eq(1);
    });
  });
});
