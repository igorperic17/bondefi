/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../../../../common";
import type {
  Implementation4,
  Implementation4Interface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/RegressionImplementation.sol/Implementation4";

const _abi = [
  {
    stateMutability: "nonpayable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "getValue",
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
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_number",
        type: "uint256",
      },
    ],
    name: "setValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506101b0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063209652551461004757806355241077146100615780638129fc1c14610080575b60018055005b61004f610088565b60408051918252519081900360200190f35b61007e6004803603602081101561007757600080fd5b503561008e565b005b61007e610093565b60015490565b600155565b600054610100900460ff16806100ac57506100ac610135565b806100ba575060005460ff16155b6100f55760405162461bcd60e51b815260040180806020018281038252602e81526020018061014d602e913960400191505060405180910390fd5b600054610100900460ff16158015610120576000805460ff1961ff0019909116610100171660011790555b8015610132576000805461ff00191690555b50565b600061014030610146565b15905090565b3b15159056fe496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564a2646970667358221220c1f25b301d23c3ce3f1ae72c3ac761b59b8338731b0fcb122f2c48ae6a8126c364736f6c63430007060033";

type Implementation4ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Implementation4ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Implementation4__factory extends ContractFactory {
  constructor(...args: Implementation4ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Implementation4 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Implementation4__factory {
    return super.connect(runner) as Implementation4__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Implementation4Interface {
    return new Interface(_abi) as Implementation4Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): Implementation4 {
    return new Contract(address, _abi, runner) as unknown as Implementation4;
  }
}