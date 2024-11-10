/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  INonfungibleTokenPositionDescriptor,
  INonfungibleTokenPositionDescriptorInterface,
} from "../../../../../../../contracts/lib/uniswap/v3-periphery/contracts/interfaces/INonfungibleTokenPositionDescriptor";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract INonfungiblePositionManager",
        name: "positionManager",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class INonfungibleTokenPositionDescriptor__factory {
  static readonly abi = _abi;
  static createInterface(): INonfungibleTokenPositionDescriptorInterface {
    return new Interface(_abi) as INonfungibleTokenPositionDescriptorInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): INonfungibleTokenPositionDescriptor {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as INonfungibleTokenPositionDescriptor;
  }
}
