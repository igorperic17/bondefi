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
import { advanceToFuture, findLogs } from "../fixtures/blockchain-utils";
import { createLaunchDetails } from "../fixtures/launch-details";

describe("Launchpad", () => {
  let deployer: SignerWithAddress;
  let formula: IBancorFormula;
  let purchaseBase: Purchase;
  let purchaseFactory: PurchaseFactory;
  let token: ERC20Token;
  let dai: TestDAI;
  let launchpad: Launchpad;
  let currentBlockTimestamp: number;

  let ONE_DAI: bigint;
  let maxReserveRatio: bigint;

  before(async () => {
    [deployer] = await ethers.getSigners();
    formula = await new BancorFormula__factory(deployer).deploy();
    maxReserveRatio = await formula.maxRatio();
    purchaseBase = await new Purchase__factory(deployer).deploy();
    purchaseFactory = await new PurchaseFactory__factory(deployer).deploy(
      purchaseBase,
    );
  });

  beforeEach(async () => {
    dai = await new TestDAI__factory(deployer).deploy();
    ONE_DAI = ethers.parseUnits("1", await dai.decimals());
    token = await new ERC20Token__factory(deployer).deploy(
      "Test Token",
      "TEST",
    );
    launchpad = await new Launchpad__factory(deployer).deploy();
    await launchpad.setPurchaseFactory(purchaseFactory);

    currentBlockTimestamp =
      (await ethers.provider.getBlock("latest"))?.timestamp ?? 0;
  });

  it("should set up correctly", async () => {
    expect(true);
  });

  const reserveRatio = (ratio: number): bigint => {
    if (ratio <= 0 || ratio > 1) {
      throw new Error("Invalid reserve ratio, value must be between 0 and 1");
    }
    return BigInt(Math.floor(ratio * Number(maxReserveRatio)));
  };

  /**
   * Creates a new launch on the launchpad.
   * @returns The launch id just created
   */
  const createLaunch = async () => {
    await launchpad.createLaunch(
      dai,
      ethers.parseUnits("1000", await dai.decimals()),
      0,
      currentBlockTimestamp + 60,
      currentBlockTimestamp + 120,
      formula,
      reserveRatio(0.5),
      createLaunchDetails(),
    );

    return await launchpad.launches(await launchpad.totalLaunches());
  };

  describe("when setting up a project launch", () => {
    const timeToStartSale = 60;
    const timeToFinishSale = 120;

    it("should set up the launch correctly", async () => {
      const tx = launchpad.createLaunch(
        dai,
        ethers.parseUnits("1000", await dai.decimals()),
        0,
        currentBlockTimestamp + timeToStartSale,
        currentBlockTimestamp + timeToFinishSale,
        formula,
        reserveRatio(0.5),
        createLaunchDetails(),
      );

      await expect(tx).not.reverted;
      const logs = await findLogs(
        tx,
        launchpad,
        launchpad.getEvent("LaunchCreated"),
      );
      expect(logs[0].args.launchId).to.eq(1);
    });

    it("should fail to buy tokens when the sale hasn't started yet", async () => {
      const launch = await createLaunch();

      const tx = launchpad.buyTokens(launch.id, ethers.parseUnits("1", 18));

      await expect(tx).revertedWith("Sale not started");
    });

    it("should fail when sale has finished", async () => {
      const launch = await createLaunch();
      await advanceToFuture(timeToFinishSale);

      const tx = launchpad.buyTokens(launch.id, ethers.parseUnits("1", 18));

      await expect(tx).revertedWith("Sale ended");
    });

    it("should throw an error when token spend has not been allowed", async () => {
      const launch = await createLaunch();
      await advanceToFuture(timeToStartSale);

      const tx = launchpad.buyTokens(launch.id, ethers.parseUnits("1", 18));

      await expect(tx).revertedWith("Not enough spend allowance for ERC20");
    });

    it("should allow purchases when the sale is ongoing", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, ONE_DAI);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, ONE_DAI),
      ]);

      const tx = launchpad.buyTokens(launch.id, ONE_DAI);

      await expect(tx).not.reverted;
      const logs = await findLogs(
        tx,
        launchpad,
        launchpad.getEvent("TokensPurchased"),
      );

      const event = logs[0].args;
      expect(event).to.deep.equal([launch.id, deployer.address, ONE_DAI, 140n]); //140 is what the bancor formula is supposed to return as per its tests
    });

    it("should create an NFT when a purchase has been made", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, ONE_DAI);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, ONE_DAI),
      ]);

      const tx = launchpad.buyTokens(launch.id, ONE_DAI);

      await expect(tx).not.reverted;
      const logs = await findLogs(
        tx,
        launchpad,
        launchpad.getEvent("TokensPurchased"),
      );
      const event = logs[0].args;

      const purchase = purchaseBase.attach(
        launch.purchaseNftAddress,
      ) as Purchase;
      const balance = await purchase.purchaseBalances(1);

      expect(await purchase.balanceOf(deployer)).to.eq(1);
      expect(await purchase.ownerOf(1)).to.eq(deployer.address);
      expect(balance.collateralAmount).to.eq(event.amount);
      expect(balance.tokenAmount).to.eq(event.tokenAmount);
    });

    it("should allow refunds when the target raise is not met", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, ONE_DAI);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, ONE_DAI),
      ]);

      await launchpad.buyTokens(launch.id, ONE_DAI / 2n);

      expect(await launchpad.isRefundEnabled(launch.id)).to.be.false;
      expect(await launchpad.isClaimEnabled(launch.id)).to.be.false;

      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      expect(await launchpad.isRefundEnabled(launch.id)).to.be.true;
      expect(await launchpad.isClaimEnabled(launch.id)).to.be.false;
    });

    it("should return the funds when a refund is requested", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, ONE_DAI);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, ONE_DAI),
      ]);

      const balanceBeforeBuy = await dai.balanceOf(deployer);
      await launchpad.buyTokens(launch.id, ONE_DAI / 2n);
      const balanceAfterBuy = await dai.balanceOf(deployer);

      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      const tx = launchpad.refund(launch.id);

      const balanceAfterRefund = await dai.balanceOf(deployer);

      await tx;
      await expect(tx).to.not.reverted;
      expect(balanceBeforeBuy).to.be.gt(balanceAfterBuy);
      expect(balanceAfterRefund).to.be.eq(balanceAfterRefund);
    });

    it("should not allow claiming before TGE event happens, even after successful raise", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      await launchpad.buyTokens(launch.id, launch.targetRaise);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      expect(await launchpad.isClaimEnabled(launch.id)).to.be.false;
    });

    it("should allow claiming after the TGE event happens", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      await launchpad.buyTokens(launch.id, launch.targetRaise);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      const tokensToBeEmitted = (await launchpad.launches(launch.id))
        .tokensToBeEmitted;
      await token.mint(deployer, tokensToBeEmitted);
      await token.transfer(launchpad, tokensToBeEmitted);

      await launchpad.tgeEvent(launch.id, token);

      expect(await launchpad.isClaimEnabled(launch.id)).to.be.true;
    });

    it("should distribute the tokens to the user after claiming", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      await launchpad.buyTokens(launch.id, launch.targetRaise);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      const tokensToBeEmitted = (await launchpad.launches(launch.id))
        .tokensToBeEmitted;
      await token.mint(deployer, tokensToBeEmitted);
      await token.transfer(launchpad, tokensToBeEmitted);

      expect(await token.balanceOf(deployer)).to.eq(0);

      await launchpad.tgeEvent(launch.id, token);

      const tx = launchpad.claim(launch.id);
      await expect(tx).not.reverted;
      expect(await token.balanceOf(deployer)).to.eq(tokensToBeEmitted);
    });
  });
});
