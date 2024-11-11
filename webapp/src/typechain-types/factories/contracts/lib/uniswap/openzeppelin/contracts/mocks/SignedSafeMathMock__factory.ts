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
import type { NonPayableOverrides } from "../../../../../../../common";
import type {
  SignedSafeMathMock,
  SignedSafeMathMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/SignedSafeMathMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "b",
        type: "int256",
      },
    ],
    name: "add",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "b",
        type: "int256",
      },
    ],
    name: "div",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "b",
        type: "int256",
      },
    ],
    name: "mul",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "b",
        type: "int256",
      },
    ],
    name: "sub",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610416806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80634350913814610051578063a5f3c23b14610086578063adefc37b146100a9578063bbe93d91146100cc575b600080fd5b6100746004803603604081101561006757600080fd5b50803590602001356100ef565b60408051918252519081900360200190f35b6100746004803603604081101561009c57600080fd5b5080359060200135610104565b610074600480360360408110156100bf57600080fd5b5080359060200135610110565b610074600480360360408110156100e257600080fd5b508035906020013561011c565b60006100fb8383610128565b90505b92915050565b60006100fb83836101e0565b60006100fb8383610245565b60006100fb83836102aa565b60008161017c576040805162461bcd60e51b815260206004820181905260248201527f5369676e6564536166654d6174683a206469766973696f6e206279207a65726f604482015290519081900360640190fd5b816000191480156101905750600160ff1b83145b156101cc5760405162461bcd60e51b81526004018080602001828103825260218152602001806103756021913960400191505060405180910390fd5b60008284816101d757fe5b05949350505050565b60008282018183128015906101f55750838112155b8061020a575060008312801561020a57508381125b6100fb5760405162461bcd60e51b81526004018080602001828103825260218152602001806103546021913960400191505060405180910390fd5b600081830381831280159061025a5750838113155b8061026f575060008312801561026f57508381135b6100fb5760405162461bcd60e51b81526004018080602001828103825260248152602001806103bd6024913960400191505060405180910390fd5b6000826102b9575060006100fe565b826000191480156102cd5750600160ff1b82145b156103095760405162461bcd60e51b81526004018080602001828103825260278152602001806103966027913960400191505060405180910390fd5b8282028284828161031657fe5b05146100fb5760405162461bcd60e51b81526004018080602001828103825260278152602001806103966027913960400191505060405180910390fdfe5369676e6564536166654d6174683a206164646974696f6e206f766572666c6f775369676e6564536166654d6174683a206469766973696f6e206f766572666c6f775369676e6564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775369676e6564536166654d6174683a207375627472616374696f6e206f766572666c6f77a26469706673582212205c48f7ad5eb6b5e0784a2ff62a6177a45acae4907de6ada97ad1fb8aa29f357a64736f6c63430007060033";

type SignedSafeMathMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignedSafeMathMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignedSafeMathMock__factory extends ContractFactory {
  constructor(...args: SignedSafeMathMockConstructorParams) {
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
      SignedSafeMathMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SignedSafeMathMock__factory {
    return super.connect(runner) as SignedSafeMathMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignedSafeMathMockInterface {
    return new Interface(_abi) as SignedSafeMathMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SignedSafeMathMock {
    return new Contract(address, _abi, runner) as unknown as SignedSafeMathMock;
  }
}
