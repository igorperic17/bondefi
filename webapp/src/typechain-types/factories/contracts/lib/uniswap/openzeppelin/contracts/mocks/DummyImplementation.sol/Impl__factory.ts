/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  Impl,
  ImplInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/DummyImplementation.sol/Impl";

const _abi = [
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export class Impl__factory {
  static readonly abi = _abi;
  static createInterface(): ImplInterface {
    return new Interface(_abi) as ImplInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Impl {
    return new Contract(address, _abi, runner) as unknown as Impl;
  }
}