import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  BancorFormula__factory,
  ERC20Factory,
  ERC20Factory__factory,
  ERC20Token,
  ERC20Token__factory,
  IBancorFormula,
  IERC20__factory,
  Launchpad,
  Launchpad__factory,
  Purchase,
  Purchase__factory,
  PurchaseFactory,
  PurchaseFactory__factory,
  TestToken,
  TestToken__factory,
} from "../../typechain-types";
import { advanceToFuture, findLogs } from "../fixtures/blockchain-utils";
import { createLaunchDetails } from "../fixtures/launch-details";

describe("Launchpad", () => {
  const timeToStartSale = 60;
  const timeToFinishSale = 120;

  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  let formula: IBancorFormula;
  let purchaseBase: Purchase;
  let purchaseFactory: PurchaseFactory;
  let erc20Base: ERC20Token;
  let erc20Factory: ERC20Factory;
  let token: TestToken;
  let dai: TestToken;
  let launchpad: Launchpad;
  let currentBlockTimestamp: number;

  let ONE_DAI: bigint;
  let maxPercentageValue: bigint;

  before(async () => {
    [deployer, user1, user2] = await ethers.getSigners();
    formula = await new BancorFormula__factory(deployer).deploy();
    maxPercentageValue = await formula.maxRatio();
    purchaseBase = await new Purchase__factory(deployer).deploy();
    purchaseFactory = await new PurchaseFactory__factory(deployer).deploy(
      purchaseBase,
    );
    erc20Base = await new ERC20Token__factory(deployer).deploy();
    erc20Factory = await new ERC20Factory__factory(deployer).deploy(erc20Base);
  });

  beforeEach(async () => {
    dai = await new TestToken__factory(deployer).deploy("DAI", "DAI");
    ONE_DAI = ethers.parseUnits("1", await dai.decimals());
    token = await new TestToken__factory(deployer).deploy("Test Token", "TST");
    launchpad = await new Launchpad__factory(deployer).deploy();
    await launchpad.setFactories(erc20Factory, purchaseFactory);

    currentBlockTimestamp =
      (await ethers.provider.getBlock("latest"))?.timestamp ?? 0;
  });

  it("should set up correctly", async () => {
    expect(true);
  });

  const percentageBigInt = (ratio: number): bigint => {
    if (ratio <= 0 || ratio > 1) {
      throw new Error("Invalid reserve ratio, value must be between 0 and 1");
    }
    return BigInt(Math.floor(ratio * Number(maxPercentageValue)));
  };

  interface LaunchSettings {
    deployERC20: boolean;
    launchpadFee: bigint;
    launchpadTokenFee: bigint;
    targetRaise: number;
  }

  /**
   * Creates a new launch on the launchpad.
   * @returns The launch id just created
   */
  const createLaunch = async ({
    deployERC20,
    launchpadFee,
    launchpadTokenFee,
    targetRaise,
  }: Partial<LaunchSettings> = {}) => {
    await launchpad.createLaunch(
      dai,
      ethers.parseUnits(
        targetRaise?.toString() ?? "1000",
        await dai.decimals(),
      ),
      0,
      currentBlockTimestamp + 60,
      currentBlockTimestamp + 120,
      formula,
      percentageBigInt(0.5),
      deployERC20 ?? false,
      launchpadFee ?? 0,
      launchpadTokenFee ?? 0,
      createLaunchDetails(),
    );

    return await launchpad.getLaunch(await launchpad.totalLaunches());
  };

  describe("when setting up a project launch", () => {
    it("should set up the launch correctly", async () => {
      const tx = launchpad.createLaunch(
        dai,
        ethers.parseUnits("1000", await dai.decimals()),
        0,
        currentBlockTimestamp + timeToStartSale,
        currentBlockTimestamp + timeToFinishSale,
        formula,
        percentageBigInt(0.5),
        true,
        0,
        0,
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

    it("should create an ERC20 token when asked at launch", async () => {
      const tx = launchpad.createLaunch(
        dai,
        ethers.parseUnits("1000", await dai.decimals()),
        0,
        currentBlockTimestamp + timeToStartSale,
        currentBlockTimestamp + timeToFinishSale,
        formula,
        percentageBigInt(0.5),
        true,
        0,
        0,
        createLaunchDetails(),
      );

      await expect(tx).not.reverted;

      const logs = await findLogs(
        tx,
        erc20Factory,
        erc20Factory.getEvent("ERC20Created"),
      );
      expect(logs.length).to.eq(1);
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

    it("should return the funds when a refund ALL is requested", async () => {
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

      const tx = launchpad.refundAll(launch.id);
      await expect(tx).to.not.reverted;

      const balanceAfterRefund = await dai.balanceOf(deployer);

      expect(balanceBeforeBuy).to.be.gt(balanceAfterBuy);
      expect(balanceBeforeBuy).to.be.eq(balanceAfterRefund);
    });

    it("should return the funds when a single refund is requested", async () => {
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

      const tx = launchpad.refund(launch.id, 1);

      const balanceAfterRefund = await dai.balanceOf(deployer);

      await expect(tx).to.not.reverted;
      expect(balanceBeforeBuy).to.be.gt(balanceAfterBuy);
      expect(balanceAfterRefund).to.be.eq(balanceBeforeBuy / 2n);
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

    it("should allow claiming after the TGE event happens, using custom token", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      await launchpad.buyTokens(launch.id, launch.targetRaise);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      const tokensToBeEmitted = (await launchpad.getLaunch(launch.id))
        .tokensToBeEmitted;
      await token.mint(deployer, tokensToBeEmitted);
      await token.transfer(launchpad, tokensToBeEmitted);

      await launchpad.tgeEvent(launch.id, 0, ethers.ZeroAddress, token);

      expect(await launchpad.isClaimEnabled(launch.id)).to.be.true;
    });

    it("should distribute the tokens to the user after claiming, using custom token", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      await launchpad.buyTokens(launch.id, launch.targetRaise);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      const tokensToBeEmitted = (await launchpad.getLaunch(launch.id))
        .tokensToBeEmitted;
      await token.mint(deployer, tokensToBeEmitted);
      await token.transfer(launchpad, tokensToBeEmitted);

      expect(await token.balanceOf(deployer)).to.eq(0);

      await launchpad.tgeEvent(launch.id, 0, ethers.ZeroAddress, token);

      const tx = launchpad.claimAll(launch.id);
      await expect(tx).not.reverted;
      expect(await token.balanceOf(deployer)).to.eq(tokensToBeEmitted);
    });

    it("should allow claiming after the TGE event happens, using launchpad-created token", async () => {
      const launch = await createLaunch({ deployERC20: true });
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      await launchpad.buyTokens(launch.id, launch.targetRaise);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      await launchpad.tgeEventLaunchpadToken(launch.id, 0, ethers.ZeroAddress);

      expect(await launchpad.isClaimEnabled(launch.id)).to.be.true;
    });

    it("should distribute the tokens to the user after claiming ALL, using launchpad-created token", async () => {
      const launch = await createLaunch({ deployERC20: true });
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      await launchpad.buyTokens(launch.id, launch.targetRaise);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      const erc20 = IERC20__factory.connect(
        (await launchpad.getLaunch(launch.id)).tokenAddress,
        ethers.provider,
      );
      expect(await erc20.balanceOf(deployer)).to.eq(0);
      const tokensToBeEmitted = (await launchpad.getLaunch(launch.id))
        .tokensToBeEmitted;

      await launchpad.tgeEventLaunchpadToken(launch.id, 0, ethers.ZeroAddress);

      const tx = launchpad.claimAll(launch.id);
      await expect(tx).not.reverted;
      expect(await erc20.balanceOf(deployer)).to.eq(tokensToBeEmitted);
    });

    it("should distribute the tokens to the user after claiming a single one, using launchpad-created token", async () => {
      const launch = await createLaunch({ deployERC20: true });
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      const buyTokensTx = launchpad.buyTokens(
        launch.id,
        launch.targetRaise / 2n,
      );
      await buyTokensTx;
      const tokenAmountBought = (
        await findLogs(
          buyTokensTx,
          launchpad,
          launchpad.getEvent("TokensPurchased"),
        )
      )[0].args.tokenAmount;
      await launchpad.buyTokens(launch.id, launch.targetRaise / 2n);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      const erc20 = IERC20__factory.connect(
        (await launchpad.getLaunch(launch.id)).tokenAddress,
        ethers.provider,
      );
      expect(await erc20.balanceOf(deployer)).to.eq(0);

      await launchpad.tgeEventLaunchpadToken(launch.id, 0, ethers.ZeroAddress);

      const tx = launchpad.claim(launch.id, 1);
      await expect(tx).not.reverted;
      expect(await erc20.balanceOf(deployer)).to.eq(tokenAmountBought);
    });

    it("should distribute launchpad and project tokens correctly", async () => {
      const launchpadFee = 0.2;
      const launchpadFeeTokens = 0.02;
      const teamTokens = ethers.parseUnits("1000000");

      const launch = await createLaunch({
        deployERC20: true,
        launchpadFee: percentageBigInt(launchpadFee),
        launchpadTokenFee: percentageBigInt(launchpadFeeTokens),
        targetRaise: 0.001,
      });
      await dai.mint(deployer, launch.targetRaise);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, launch.targetRaise),
      ]);
      await launchpad.buyTokens(launch.id, launch.targetRaise);
      const timeAfterSale = timeToFinishSale - timeToStartSale + 1;
      await advanceToFuture(timeAfterSale);

      const erc20 = IERC20__factory.connect(
        (await launchpad.getLaunch(launch.id)).tokenAddress,
        ethers.provider,
      );
      expect(await erc20.balanceOf(deployer)).to.eq(0);
      expect(await erc20.balanceOf(user1)).to.eq(0);
      const tokensToBeEmitted = (await launchpad.getLaunch(launch.id))
        .tokensToBeEmitted;

      await launchpad.tgeEventLaunchpadToken(launch.id, teamTokens, user1);

      expect(await dai.balanceOf(deployer)).to.eq(
        (launch.targetRaise * percentageBigInt(launchpadFee)) /
          maxPercentageValue,
      );
      expect(await erc20.balanceOf(deployer)).to.eq(
        ((tokensToBeEmitted + teamTokens) *
          percentageBigInt(launchpadFeeTokens)) /
          maxPercentageValue,
      );
      expect(await erc20.balanceOf(user1)).to.eq(teamTokens);
    });
  });

  describe("when retrieving project and user info from the contract", () => {
    it("should return the correct basic project info", async () => {
      const launch = await createLaunch();

      const launchDetails = await launchpad.getLaunchDetails(1);

      expect(launchDetails.tokenPurchaseDecimals).to.eq(await dai.decimals());
      expect(launchDetails.launch.targetRaise).to.eq(launch.targetRaise);
    });

    it("should return investment details", async () => {
      const launch = await createLaunch();
      await dai.mint(deployer, ONE_DAI);
      await Promise.all([
        advanceToFuture(timeToStartSale),
        dai.approve(launchpad, ONE_DAI),
      ]);
      await launchpad.buyTokens(launch.id, ONE_DAI / 2n);
      await launchpad.buyTokens(launch.id, ONE_DAI / 2n);
      const launchDetails = await launchpad.getLaunchDetails(1);

      const userDetails = await launchpad.getUserStats(deployer, launch.id);

      expect(userDetails.tokenAmount).to.eq(
        launchDetails.launch.tokensToBeEmitted,
      );
      expect(userDetails.tokenDecimals).to.eq(await token.decimals());
      expect(userDetails.nftBalance).to.eq(2);
      expect(userDetails.purchaseAmount).to.eq(ONE_DAI);
      expect(userDetails.purchaseDecimals).to.eq(await dai.decimals());
      expect(userDetails.purchaseSymbol).to.eq(await dai.symbol());
    });
  });
});
