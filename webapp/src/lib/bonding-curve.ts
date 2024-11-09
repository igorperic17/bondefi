import { BANCOR_FORMULA_ADDRESS } from "./evm/token-addresses";

export interface BondingCurve {
  id: number;
  name: string;
  address: string;
  parameters: string[];
  exampleValues: number[];
  compute: (x: number, accY: number, params: number[]) => [number, number];
}

/**
 * Simulate a token purchase
 * @param amountPaid
 * @param collateral_reserves
 * @param tokenSupply
 * @param reserveRatio
 * @returns amount of tokens bought using the collateral
 */
const simulateTokenPurchase = (
  amountPaid: number,
  collateral_reserves: number,
  tokenSupply: number,
  reserveRatio: number,
) => {
  //TODO: starting price should be configurable
  const STARTING_PRICE = 0.0001;
  return (
    (tokenSupply + 1) *
    ((1 + amountPaid / (collateral_reserves + STARTING_PRICE * reserveRatio)) **
      reserveRatio -
      1)
  );
};

const bancorCurve: BondingCurve = {
  id: 0,
  name: "Bancor",
  address: BANCOR_FORMULA_ADDRESS,
  parameters: ["Reserve Ratio"],
  exampleValues: [0.5],
  //x: 1000s of tokens in circulation
  //y: token price
  //accY: accumulated token supply
  compute: (x: number, accY: number, params: number[]) => {
    const [reserveRatio] = params;

    const tokensBought = simulateTokenPurchase(
      1000,
      x * 1000,
      accY,
      reserveRatio,
    );

    return [tokensBought, x / ((accY + tokensBought) * reserveRatio)];
  },
};

export const BONDING_CURVES = [bancorCurve];

export const getFormulaByAddress = (address: string) =>
  BONDING_CURVES.find((token) => token.address === address);
