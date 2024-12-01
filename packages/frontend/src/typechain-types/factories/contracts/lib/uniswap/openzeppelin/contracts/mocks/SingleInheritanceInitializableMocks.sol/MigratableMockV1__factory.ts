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
  MigratableMockV1,
  MigratableMockV1Interface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/SingleInheritanceInitializableMocks.sol/MigratableMockV1";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "x",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061019d806100206000396000f3fe6080604052600436106100295760003560e01c80630c55699c1461002e578063fe4b84df14610055575b600080fd5b34801561003a57600080fd5b50610043610074565b60408051918252519081900360200190f35b6100726004803603602081101561006b57600080fd5b503561007a565b005b60015481565b600054610100900460ff16806100935750610093610122565b806100a1575060005460ff16155b6100dc5760405162461bcd60e51b815260040180806020018281038252602e81526020018061013a602e913960400191505060405180910390fd5b600054610100900460ff16158015610107576000805460ff1961ff0019909116610100171660011790555b6001829055801561011e576000805461ff00191690555b5050565b600061012d30610133565b15905090565b3b15159056fe496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564a2646970667358221220031b7eeef1ff93d5de425ab60745be1f27cc1919b78df3aad6aa6c8a59885f4e64736f6c63430007060033";

type MigratableMockV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MigratableMockV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MigratableMockV1__factory extends ContractFactory {
  constructor(...args: MigratableMockV1ConstructorParams) {
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
      MigratableMockV1 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MigratableMockV1__factory {
    return super.connect(runner) as MigratableMockV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MigratableMockV1Interface {
    return new Interface(_abi) as MigratableMockV1Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MigratableMockV1 {
    return new Contract(address, _abi, runner) as unknown as MigratableMockV1;
  }
}