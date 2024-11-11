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
  SampleHuman,
  SampleHumanInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/MultipleInheritanceInitializableMocks.sol/SampleHuman";

const _abi = [
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isHuman",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061019e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80634a6c9db61461003b5780638129fc1c14610057575b600080fd5b610043610061565b604080519115158252519081900360200190f35b61005f610070565b005b60005462010000900460ff1681565b600054610100900460ff16806100895750610089610123565b80610097575060005460ff16155b6100d25760405162461bcd60e51b815260040180806020018281038252602e81526020018061013b602e913960400191505060405180910390fd5b600054610100900460ff161580156100fd576000805460ff1961ff0019909116610100171660011790555b6000805462ff00001916620100001790558015610120576000805461ff00191690555b50565b600061012e30610134565b15905090565b3b15159056fe496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564a2646970667358221220a4b4e44a84f0730d0658909ef5c3a60def68aabbbb840f5ddb01e8af9c6e5fce64736f6c63430007060033";

type SampleHumanConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SampleHumanConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SampleHuman__factory extends ContractFactory {
  constructor(...args: SampleHumanConstructorParams) {
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
      SampleHuman & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SampleHuman__factory {
    return super.connect(runner) as SampleHuman__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SampleHumanInterface {
    return new Interface(_abi) as SampleHumanInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): SampleHuman {
    return new Contract(address, _abi, runner) as unknown as SampleHuman;
  }
}
