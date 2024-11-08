import { ethers } from "hardhat";
import { BancorFormula__factory, IBancorFormula } from "../../typechain-types";
import { expect } from "chai";

const MAX_RATIO = 1000000;
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
  describe("when purchasing tokens", () => {
    let contract: IBancorFormula;

    before(async () => {
      const [deployer] = await ethers.getSigners();
      contract = await new BancorFormula__factory(deployer).deploy();
    });

    it("then the amount of tokens received is correct if supply is 0", async () => {
      const purchasedTokens = await contract.calculatePurchaseReturn(
        10n ** (DECIMALS - 4n), //0.0001 collateral
        0,
        0,
        0.5 * MAX_RATIO,
        toBigIntWithPrecision(1),
      );

      expect(purchasedTokens).to.eq(Math.floor(140.424891727022368637));
    });

    it("then the amount of tokens received in a large purchase is correct if supply is 0", async () => {
      const purchasedTokens = await contract.calculatePurchaseReturn(
        10n ** (DECIMALS - 4n), //0.0001 collateral
        0,
        0,
        BigInt(0.5 * MAX_RATIO),
        toBigIntWithPrecision(10 ** 8),
      );

      expect(purchasedTokens).to.eq(Math.floor(1414212.562373448601500283));
    });

    it("then the amount of tokens received is correct if supply exists", async () => {
      const purchasedTokens = await contract.calculatePurchaseReturn(
        10n ** (DECIMALS - 4n), //0.0001 collateral
        toBigIntWithPrecision(141420.356240845038790184),
        toBigIntWithPrecision(1000000),
        0.5 * MAX_RATIO,
        toBigIntWithPrecision(14.142235624084503),
      );

      expect(purchasedTokens).to.be.closeTo(
        10n ** DECIMALS,
        10n ** DECIMALS - 1n, // Accepted values for purchased tokens between 0.99 and 1.01
      );
    });
  });
});
