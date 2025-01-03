/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IERC777Sender,
  IERC777SenderInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/token/ERC777/IERC777Sender";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "operatorData",
        type: "bytes",
      },
    ],
    name: "tokensToSend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IERC777Sender__factory {
  static readonly abi = _abi;
  static createInterface(): IERC777SenderInterface {
    return new Interface(_abi) as IERC777SenderInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IERC777Sender {
    return new Contract(address, _abi, runner) as unknown as IERC777Sender;
  }
}
