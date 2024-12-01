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
  ContextMock,
  ContextMockInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/ContextMock.sol/ContextMock";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "integerValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "stringValue",
        type: "string",
      },
    ],
    name: "Data",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "Sender",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "integerValue",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "stringValue",
        type: "string",
      },
    ],
    name: "msgData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "msgSender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506102c4806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063376bf2621461003b578063d737d0c7146100ea575b600080fd5b6100e86004803603604081101561005157600080fd5b8135919081019060408101602082013564010000000081111561007357600080fd5b82018360208201111561008557600080fd5b803590602001918460018302840111640100000000831117156100a757600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506100f2945050505050565b005b6100e8610205565b7faf235354a0a47c91ee171961326335cb2d1a8e55b8a89859b0e61eb049e50ea061011b61024b565b8383604051808060200184815260200180602001838103835286818151815260200191508051906020019080838360005b8381101561016457818101518382015260200161014c565b50505050905090810190601f1680156101915780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b838110156101c45781810151838201526020016101ac565b50505050905090810190601f1680156101f15780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15050565b7fd6558c3ed910d959271054471fd1c326679d9fece99c5091b00ed89627cf2bfc61022e61028a565b604080516001600160a01b039092168252519081900360200190a1565b60606000368080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092935050505090565b339056fea2646970667358221220157f95b3e8a1b6c7a6bca3603af330c37e7dd21a6de377b262eb9a14a68f8cee64736f6c63430007060033";

type ContextMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ContextMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ContextMock__factory extends ContractFactory {
  constructor(...args: ContextMockConstructorParams) {
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
      ContextMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ContextMock__factory {
    return super.connect(runner) as ContextMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ContextMockInterface {
    return new Interface(_abi) as ContextMockInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ContextMock {
    return new Contract(address, _abi, runner) as unknown as ContextMock;
  }
}