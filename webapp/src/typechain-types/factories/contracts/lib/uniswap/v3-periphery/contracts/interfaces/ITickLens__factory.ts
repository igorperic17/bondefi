/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ITickLens,
  ITickLensInterface,
} from "../../../../../../../contracts/lib/uniswap/v3-periphery/contracts/interfaces/ITickLens";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "int16",
        name: "tickBitmapIndex",
        type: "int16",
      },
    ],
    name: "getPopulatedTicksInWord",
    outputs: [
      {
        components: [
          {
            internalType: "int24",
            name: "tick",
            type: "int24",
          },
          {
            internalType: "int128",
            name: "liquidityNet",
            type: "int128",
          },
          {
            internalType: "uint128",
            name: "liquidityGross",
            type: "uint128",
          },
        ],
        internalType: "struct ITickLens.PopulatedTick[]",
        name: "populatedTicks",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ITickLens__factory {
  static readonly abi = _abi;
  static createInterface(): ITickLensInterface {
    return new Interface(_abi) as ITickLensInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ITickLens {
    return new Contract(address, _abi, runner) as unknown as ITickLens;
  }
}
