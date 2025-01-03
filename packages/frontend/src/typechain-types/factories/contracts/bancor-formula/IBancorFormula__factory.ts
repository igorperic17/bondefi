/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IBancorFormula,
  IBancorFormulaInterface,
} from "../../../contracts/bancor-formula/IBancorFormula";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startingPrice",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "supply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveBalance",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "reserveRatio",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
    ],
    name: "calculatePurchaseReturn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startingPrice",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "tokenDecimals",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "collateralReserves",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenSupply",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "reserveRatio",
        type: "uint32",
      },
    ],
    name: "calculateTokenPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "maxRatio",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export class IBancorFormula__factory {
  static readonly abi = _abi;
  static createInterface(): IBancorFormulaInterface {
    return new Interface(_abi) as IBancorFormulaInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IBancorFormula {
    return new Contract(address, _abi, runner) as unknown as IBancorFormula;
  }
}
