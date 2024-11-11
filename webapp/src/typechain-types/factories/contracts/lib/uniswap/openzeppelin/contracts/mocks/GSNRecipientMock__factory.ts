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
  GSNRecipientMock,
  GSNRecipientMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/GSNRecipientMock";

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
        indexed: true,
        internalType: "address",
        name: "oldRelayHub",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newRelayHub",
        type: "address",
      },
    ],
    name: "RelayHubChanged",
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
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "acceptRelayedCall",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getHubAddr",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
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
  {
    inputs: [
      {
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "actualCharge",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "preRetVal",
        type: "bytes32",
      },
    ],
    name: "postRelayedCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
    ],
    name: "preRelayedCall",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "relayHubVersion",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "newRelayHub",
        type: "address",
      },
    ],
    name: "upgradeRelayHub",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "payee",
        type: "address",
      },
    ],
    name: "withdrawDeposits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600080546001600160a01b03191673d216153c06e857cd7f72665e0af1d7d82172f49417905534801561003657600080fd5b50610b81806100466000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80639e30a590116100665780639e30a5901461038c578063ad61ccd5146103b2578063c2db1abe1461042f578063d737d0c71461045b578063e06e0e221461046357610093565b8063376bf2621461009857806374e861d61461014557806380274db71461016957806383947ea01461021f575b600080fd5b610143600480360360408110156100ae57600080fd5b81359190810190604081016020820135600160201b8111156100cf57600080fd5b8201836020820111156100e157600080fd5b803590602001918460018302840111600160201b8311171561010257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610514945050505050565b005b61014d610627565b604080516001600160a01b039092168252519081900360200190f35b61020d6004803603602081101561017f57600080fd5b810190602081018135600160201b81111561019957600080fd5b8201836020820111156101ab57600080fd5b803590602001918460018302840111600160201b831117156101cc57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610637945050505050565b60408051918252519081900360200190f35b61030d600480360361012081101561023657600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561026957600080fd5b82018360208201111561027b57600080fd5b803590602001918460018302840111600160201b8311171561029c57600080fd5b9193909282359260208101359260408201359260608301359260a081019060800135600160201b8111156102cf57600080fd5b8201836020820111156102e157600080fd5b803590602001918460018302840111600160201b8311171561030257600080fd5b91935091503561069f565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610350578181015183820152602001610338565b50505050905090810190601f16801561037d5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b610143600480360360208110156103a257600080fd5b50356001600160a01b03166106c0565b6103ba6106cc565b6040805160208082528351818301528351919283929083019185019080838360005b838110156103f45781810151838201526020016103dc565b50505050905090810190601f1680156104215780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101436004803603604081101561044557600080fd5b50803590602001356001600160a01b03166106eb565b6101436106f9565b6101436004803603608081101561047957600080fd5b810190602081018135600160201b81111561049357600080fd5b8201836020820111156104a557600080fd5b803590602001918460018302840111600160201b831117156104c657600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050508035151591506020810135906040013561073f565b7faf235354a0a47c91ee171961326335cb2d1a8e55b8a89859b0e61eb049e50ea061053d6107a4565b8383604051808060200184815260200180602001838103835286818151815260200191508051906020019080838360005b8381101561058657818101518382015260200161056e565b50505050905090810190601f1680156105b35780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b838110156105e65781810151838201526020016105ce565b50505050905090810190601f1680156106135780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15050565b6000546001600160a01b03165b90565b6000610641610627565b6001600160a01b0316336001600160a01b0316146106905760405162461bcd60e51b8152600401808060200182810382526024815260200180610b286024913960400191505060405180910390fd5b610699826107b3565b92915050565b60408051602081019091526000808252909b509b9950505050505050505050565b6106c9816107b9565b50565b6040805180820190915260058152640312e302e360dc1b602082015290565b6106f582826108b9565b5050565b7fd6558c3ed910d959271054471fd1c326679d9fece99c5091b00ed89627cf2bfc610722610932565b604080516001600160a01b039092168252519081900360200190a1565b610747610627565b6001600160a01b0316336001600160a01b0316146107965760405162461bcd60e51b8152600401808060200182810382526024815260200180610b286024913960400191505060405180910390fd5b61079e848484845b50505050565b60606107ae61093c565b905090565b50600090565b6000546001600160a01b039081169082166108055760405162461bcd60e51b815260040180806020018281038252602e815260200180610acd602e913960400191505060405180910390fd5b806001600160a01b0316826001600160a01b031614156108565760405162461bcd60e51b815260040180806020018281038252602d815260200180610afb602d913960400191505060405180910390fd5b816001600160a01b0316816001600160a01b03167fb9f84b8e65164b14439ae3620df0a4d8786d896996c0282b683f9d8c08f046e860405160405180910390a350600080546001600160a01b0319166001600160a01b0392909216919091179055565b6108c1610627565b6001600160a01b031662f714ce83836040518363ffffffff1660e01b815260040180838152602001826001600160a01b0316815260200192505050600060405180830381600087803b15801561091657600080fd5b505af115801561092a573d6000803e3d6000fd5b505050505050565b60006107ae6109ad565b6060610946610627565b6001600160a01b0316336001600160a01b03161461099e576000368080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092935061063492505050565b6109a66109de565b9050610634565b60006109b7610627565b6001600160a01b0316336001600160a01b0316146109d6575033610634565b6109a6610a80565b6060601319360160008167ffffffffffffffff811180156109fe57600080fd5b506040519080825280601f01601f191660200182016040528015610a29576020820181803683370190505b50905060005b82811015610a795760003682818110610a4457fe5b9050013560f81c60f81b828281518110610a5a57fe5b60200101906001600160f81b031916908160001a905350600101610a2f565b5091505090565b6000806000368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050503601516001600160a01b03169291505056fe47534e526563697069656e743a206e65772052656c617948756220697320746865207a65726f206164647265737347534e526563697069656e743a206e65772052656c6179487562206973207468652063757272656e74206f6e6547534e526563697069656e743a2063616c6c6572206973206e6f742052656c6179487562a2646970667358221220634f581bcdfc500188378c22decce442b0057c5354e71ee4463300706c9c2fab64736f6c63430007060033";

type GSNRecipientMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GSNRecipientMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GSNRecipientMock__factory extends ContractFactory {
  constructor(...args: GSNRecipientMockConstructorParams) {
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
      GSNRecipientMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): GSNRecipientMock__factory {
    return super.connect(runner) as GSNRecipientMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GSNRecipientMockInterface {
    return new Interface(_abi) as GSNRecipientMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): GSNRecipientMock {
    return new Contract(address, _abi, runner) as unknown as GSNRecipientMock;
  }
}
