/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IUniswapV3PoolImmutables,
  IUniswapV3PoolImmutablesInterface,
} from "../../../../../../../../contracts/lib/uniswap/v3-core/contracts/interfaces/pool/IUniswapV3PoolImmutables";

const _abi = [
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxLiquidityPerTick",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tickSpacing",
    outputs: [
      {
        internalType: "int24",
        name: "",
        type: "int24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token0",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IUniswapV3PoolImmutables__factory {
  static readonly abi = _abi;
  static createInterface(): IUniswapV3PoolImmutablesInterface {
    return new Interface(_abi) as IUniswapV3PoolImmutablesInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IUniswapV3PoolImmutables {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IUniswapV3PoolImmutables;
  }
}