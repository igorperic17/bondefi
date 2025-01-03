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
  ERC20ReturnFalseMock,
  ERC20ReturnFalseMockInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/SafeERC20Helper.sol/ERC20ReturnFalseMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610171806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063095ea7b31461005157806323b872dd14610091578063a9059cbb14610051578063dd62ed3e146100c7575b600080fd5b61007d6004803603604081101561006757600080fd5b506001600160a01b038135169060200135610107565b604080519115158252519081900360200190f35b61007d600480360360608110156100a757600080fd5b506001600160a01b03813581169160208101359091169060400135610113565b6100f5600480360360408110156100dd57600080fd5b506001600160a01b0381358116916020013516610121565b60408051918252519081900360200190f35b50506000600181905590565b600060018190559392505050565b600060015460001461013257600080fd5b5060009291505056fea2646970667358221220df7e1a7ac1decdae13338697febe0ba4d2b59d5a45ceaeaa1ff6e66a53315ba864736f6c63430007060033";

type ERC20ReturnFalseMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20ReturnFalseMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20ReturnFalseMock__factory extends ContractFactory {
  constructor(...args: ERC20ReturnFalseMockConstructorParams) {
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
      ERC20ReturnFalseMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ERC20ReturnFalseMock__factory {
    return super.connect(runner) as ERC20ReturnFalseMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20ReturnFalseMockInterface {
    return new Interface(_abi) as ERC20ReturnFalseMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC20ReturnFalseMock {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ERC20ReturnFalseMock;
  }
}
