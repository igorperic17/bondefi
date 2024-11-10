/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IPoolInitializer,
  IPoolInitializerInterface,
} from "../../../../../../../contracts/lib/uniswap/v3-periphery/contracts/interfaces/IPoolInitializer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160",
      },
    ],
    name: "createAndInitializePoolIfNecessary",
    outputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IPoolInitializer__factory {
  static readonly abi = _abi;
  static createInterface(): IPoolInitializerInterface {
    return new Interface(_abi) as IPoolInitializerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IPoolInitializer {
    return new Contract(address, _abi, runner) as unknown as IPoolInitializer;
  }
}
