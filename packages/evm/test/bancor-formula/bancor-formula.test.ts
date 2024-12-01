import { expect } from "chai";
import { ethers } from "hardhat";
import { BancorFormula, BancorFormula__factory } from "../../typechain-types";
import { percentageBigInt } from "../fixtures/launch-details";

const DECIMALS = 18n;
const PRECISION_DIGITS = 12;

const toBigIntWithPrecision = (
  val: number,
  decimals = DECIMALS,
  precision = PRECISION_DIGITS,
) => {
  let result: bigint = BigInt(Math.round(val * 10 ** Number(precision)));

  result = result * 10n ** (decimals - BigInt(precision));

  return result;
};

describe("BancorFormula", () => {
  let contract: BancorFormula;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    contract = await new BancorFormula__factory(deployer).deploy();
  });

  describe("when purchasing tokens", () => {
    it("then the amount of tokens received is correct if supply is 0", async () => {
      const purchasedTokens = await contract.calculatePurchaseReturn(
        10n ** (DECIMALS - 4n), //0.0001 collateral
        18,
        0,
        0,
        percentageBigInt(0.5),
        toBigIntWithPrecision(1),
      );

      expect(purchasedTokens).to.be.closeTo(
        ethers.parseUnits("140.424891727022368637", 18),
        100000n,
      );
    });

    it("then the amount of tokens received in a large purchase is correct if supply is 0", async () => {
      const purchasedTokens = await contract.calculatePurchaseReturn(
        10n ** (DECIMALS - 4n), //0.0001 collateral
        18,
        0,
        0,
        percentageBigInt(0.5),
        toBigIntWithPrecision(10 ** 6),
      );

      expect(purchasedTokens).to.be.closeTo(
        ethers.parseUnits("141420.356240845038790184", 18),
        100000n,
      );
    });

    it("then the amount of tokens received is correct if supply exists", async () => {
      const purchasedTokens = await contract.calculatePurchaseReturn(
        10n ** (DECIMALS - 4n), //0.0001 collateral
        18,
        ethers.parseUnits("141420.356240845038790184", 18),
        ethers.parseUnits("1000000", 18),
        percentageBigInt(0.5),
        ethers.parseUnits("14.142235624084503", 18),
      );

      expect(purchasedTokens).to.be.closeTo(
        ethers.parseUnits("1", 18),
        10 ** 14, //4 token decimals of tolerance
      );
    });
  });

  describe("when calculating token price", () => {
    it("should calculate the price correctly with no supply present", async () => {
      const result = await contract.calculateTokenPrice(
        10n ** 18n,
        18,
        0,
        0,
        1,
      );

      expect(result).to.eq(10n ** 18n);
    });

    it("should calculate the price correctly with no supply present, reserve ratio 0.3", async () => {
      const result = await contract.calculateTokenPrice(
        10n ** 18n,
        18,
        0,
        0,
        percentageBigInt(0.3),
      );

      expect(result).to.eq(10n ** 18n);
    });

    it("should calculate the price correctly with supply present", async () => {
      const tokensFor1Dollar = await contract.calculatePurchaseReturn(
        10n ** 14n,
        18n,
        ethers.parseUnits("1000000", 18),
        ethers.parseUnits("141420.356240845038790184", 18),
        percentageBigInt(0.5),
        10n ** 18n,
      );

      const result = await contract.calculateTokenPrice(
        10n ** 14n,
        18n,
        ethers.parseUnits("1000000", 18) + 10n ** 18n,
        ethers.parseUnits("141420.356240845038790184", 18) + tokensFor1Dollar,
        percentageBigInt(0.5),
      );

      expect(result).to.be.closeTo(
        ethers.parseUnits("14.142235624084503", 18),
        10n ** 16n,
      );
    });
  });
});
