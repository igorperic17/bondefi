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
  AddressImpl,
  AddressImplInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/AddressImpl";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    name: "CallReturnValue",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "functionCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "functionCallWithValue",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "functionDelegateCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "functionStaticCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isContract",
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
  {
    inputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sendValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sharedAnswer",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610f13806100206000396000f3fe6080604052600436106100745760003560e01c8063a0b5ffb01161004e578063a0b5ffb014610180578063c21d36f31461020b578063ee33b7e214610296578063fc40cf73146103215761007b565b8063162790551461008057806324a084df146100c75780632a011594146101025761007b565b3661007b57005b600080fd5b34801561008c57600080fd5b506100b3600480360360208110156100a357600080fd5b50356001600160a01b03166103ab565b604080519115158252519081900360200190f35b3480156100d357600080fd5b50610100600480360360408110156100ea57600080fd5b506001600160a01b0381351690602001356103bc565b005b6101006004803603606081101561011857600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561014257600080fd5b82018360208201111561015457600080fd5b803590602001918460018302840111600160201b8311171561017557600080fd5b9193509150356103ca565b34801561018c57600080fd5b50610100600480360360408110156101a357600080fd5b6001600160a01b038235169190810190604081016020820135600160201b8111156101cd57600080fd5b8201836020820111156101df57600080fd5b803590602001918460018302840111600160201b8311171561020057600080fd5b50909250905061056d565b34801561021757600080fd5b506101006004803603604081101561022e57600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561025857600080fd5b82018360208201111561026a57600080fd5b803590602001918460018302840111600160201b8311171561028b57600080fd5b50909250905061070d565b3480156102a257600080fd5b50610100600480360360408110156102b957600080fd5b6001600160a01b038235169190810190604081016020820135600160201b8111156102e357600080fd5b8201836020820111156102f557600080fd5b803590602001918460018302840111600160201b8311171561031657600080fd5b50909250905061074f565b34801561032d57600080fd5b50610336610791565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610370578181015183820152602001610358565b50505050905090810190601f16801561039d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60006103b68261081f565b92915050565b6103c68282610825565b5050565b600061040e8585858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525087925061090f915050565b90507fe518073da644d0626295bee74d5d5c51447a33857c62913bb30f35e2fba3db7c81806020019051602081101561044657600080fd5b8101908080516040519392919084600160201b82111561046557600080fd5b90830190602082018581111561047a57600080fd5b8251600160201b81118282018810171561049357600080fd5b82525081516020918201929091019080838360005b838110156104c05781810151838201526020016104a8565b50505050905090810190601f1680156104ed5780820380516001836020036101000a031916815260200191505b50604081815260208083528651818401528651929550859450908401925085019080838360005b8381101561052c578181015183820152602001610514565b50505050905090810190601f1680156105595780820380516001836020036101000a031916815260200191505b509250505060405180910390a15050505050565b60006105af8484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061093f92505050565b90507fe518073da644d0626295bee74d5d5c51447a33857c62913bb30f35e2fba3db7c8180602001905160208110156105e757600080fd5b8101908080516040519392919084600160201b82111561060657600080fd5b90830190602082018581111561061b57600080fd5b8251600160201b81118282018810171561063457600080fd5b82525081516020918201929091019080838360005b83811015610661578181015183820152602001610649565b50505050905090810190601f16801561068e5780820380516001836020036101000a031916815260200191505b50604081815260208083528651818401528651929550859450908401925085019080838360005b838110156106cd5781810151838201526020016106b5565b50505050905090810190601f1680156106fa5780820380516001836020036101000a031916815260200191505b509250505060405180910390a150505050565b60006105af8484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061098192505050565b60006105af8484848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506109a692505050565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108175780601f106107ec57610100808354040283529160200191610817565b820191906000526020600020905b8154815290600101906020018083116107fa57829003601f168201915b505050505081565b3b151590565b8047101561087a576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e6365000000604482015290519081900360640190fd5b6040516000906001600160a01b0384169083908381818185875af1925050503d80600081146108c5576040519150601f19603f3d011682016040523d82523d6000602084013e6108ca565b606091505b505090508061090a5760405162461bcd60e51b815260040180806020018281038252603a815260200180610dbf603a913960400191505060405180910390fd5b505050565b6060610935848484604051806060016040528060298152602001610e1f602991396109cb565b90505b9392505050565b606061093883836040518060400160405280601e81526020017f416464726573733a206c6f772d6c6576656c2063616c6c206661696c65640000815250610b26565b60606109388383604051806060016040528060258152602001610e4860259139610b35565b60606109388383604051806060016040528060278152602001610e6d60279139610c37565b606082471015610a0c5760405162461bcd60e51b8152600401808060200182810382526026815260200180610df96026913960400191505060405180910390fd5b610a158561081f565b610a66576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600080866001600160a01b031685876040518082805190602001908083835b60208310610aa45780518252601f199092019160209182019101610a85565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114610b06576040519150601f19603f3d011682016040523d82523d6000602084013e610b0b565b606091505b5091509150610b1b828286610d1a565b979650505050505050565b606061093584846000856109cb565b6060610b408461081f565b610b7b5760405162461bcd60e51b8152600401808060200182810382526024815260200180610eba6024913960400191505060405180910390fd5b600080856001600160a01b0316856040518082805190602001908083835b60208310610bb85780518252601f199092019160209182019101610b99565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855afa9150503d8060008114610c18576040519150601f19603f3d011682016040523d82523d6000602084013e610c1d565b606091505b5091509150610c2d828286610d1a565b9695505050505050565b6060610c428461081f565b610c7d5760405162461bcd60e51b8152600401808060200182810382526026815260200180610e946026913960400191505060405180910390fd5b600080856001600160a01b0316856040518082805190602001908083835b60208310610cba5780518252601f199092019160209182019101610c9b565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d8060008114610c18576040519150601f19603f3d011682016040523d82523d6000602084013e610c1d565b60608315610d29575081610938565b825115610d395782518084602001fd5b8160405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610d83578181015183820152602001610d6b565b50505050905090810190601f168015610db05780820380516001836020036101000a031916815260200191505b509250505060405180910390fdfe416464726573733a20756e61626c6520746f2073656e642076616c75652c20726563697069656e74206d61792068617665207265766572746564416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c416464726573733a206c6f772d6c6576656c2063616c6c20776974682076616c7565206661696c6564416464726573733a206c6f772d6c6576656c207374617469632063616c6c206661696c6564416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6e7472616374416464726573733a207374617469632063616c6c20746f206e6f6e2d636f6e7472616374a2646970667358221220d07cc2ad21bf4abcfd85dce67bc17c9ad699a7fe8094c7dce362a01e664a1ef564736f6c63430007060033";

type AddressImplConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AddressImplConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AddressImpl__factory extends ContractFactory {
  constructor(...args: AddressImplConstructorParams) {
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
      AddressImpl & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): AddressImpl__factory {
    return super.connect(runner) as AddressImpl__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AddressImplInterface {
    return new Interface(_abi) as AddressImplInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): AddressImpl {
    return new Contract(address, _abi, runner) as unknown as AddressImpl;
  }
}