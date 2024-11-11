/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../../../../../common";
import type {
  SafeERC20Wrapper,
  SafeERC20WrapperInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/SafeERC20Helper.sol/SafeERC20Wrapper";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
    ],
    name: "decreaseAllowance",
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
    ],
    name: "increaseAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "allowance_",
        type: "uint256",
      },
    ],
    name: "setAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610ab8380380610ab88339818101604052602081101561003357600080fd5b5051600080546001600160a01b039092166001600160a01b0319909216919091179055610a53806100656000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063811c34d31161005b578063811c34d3146100db5780638a4068dd146100e3578063b759f954146100eb578063de242ff4146101085761007d565b806310bad4cf1461008257806311e330b2146100a15780633ba93f26146100be575b600080fd5b61009f6004803603602081101561009857600080fd5b5035610122565b005b61009f600480360360208110156100b757600080fd5b503561013f565b61009f600480360360208110156100d457600080fd5b5035610159565b61009f6101bc565b61009f6101d9565b61009f6004803603602081101561010157600080fd5b50356101f3565b61011061020d565b60408051918252519081900360200190f35b6000805461013c916001600160a01b039091169083610292565b50565b6000805461013c916001600160a01b03909116908361038f565b6000805460408051631dd49f9360e11b81526004810185905290516001600160a01b0390921692633ba93f269260248084019382900301818387803b1580156101a157600080fd5b505af11580156101b5573d6000803e3d6000fd5b5050505050565b600080546101d7916001600160a01b03909116908080610425565b565b600080546101d7916001600160a01b03909116908061047f565b6000805461013c916001600160a01b0390911690836104d6565b6000805460408051636eb1769f60e11b8152600481018490526024810184905290516001600160a01b039092169163dd62ed3e91604480820192602092909190829003018186803b15801561026157600080fd5b505afa158015610275573d6000803e3d6000fd5b505050506040513d602081101561028b57600080fd5b5051905090565b60006103348260405180606001604052806029815260200161096f6029913960408051636eb1769f60e11b81523060048201526001600160a01b03888116602483015291519189169163dd62ed3e91604480820192602092909190829003018186803b15801561030157600080fd5b505afa158015610315573d6000803e3d6000fd5b505050506040513d602081101561032b57600080fd5b505191906105e9565b604080516001600160a01b038616602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663095ea7b360e01b179052909150610389908590610685565b50505050565b600061033482856001600160a01b031663dd62ed3e30876040518363ffffffff1660e01b815260040180836001600160a01b03168152602001826001600160a01b031681526020019250505060206040518083038186803b1580156103f357600080fd5b505afa158015610407573d6000803e3d6000fd5b505050506040513d602081101561041d57600080fd5b505190610736565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052610389908590610685565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526104d1908490610685565b505050565b80158061055c575060408051636eb1769f60e11b81523060048201526001600160a01b03848116602483015291519185169163dd62ed3e91604480820192602092909190829003018186803b15801561052e57600080fd5b505afa158015610542573d6000803e3d6000fd5b505050506040513d602081101561055857600080fd5b5051155b6105975760405162461bcd60e51b81526004018080602001828103825260368152602001806109e86036913960400191505060405180910390fd5b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663095ea7b360e01b1790526104d1908490610685565b600081848411156106785760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561063d578181015183820152602001610625565b50505050905090810190601f16801561066a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50508183035b9392505050565b60006106da826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166107909092919063ffffffff16565b8051909150156104d1578080602001905160208110156106f957600080fd5b50516104d15760405162461bcd60e51b815260040180806020018281038252602a8152602001806109be602a913960400191505060405180910390fd5b60008282018381101561067e576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b606061079f84846000856107a7565b949350505050565b6060824710156107e85760405162461bcd60e51b81526004018080602001828103825260268152602001806109986026913960400191505060405180910390fd5b6107f185610902565b610842576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600080866001600160a01b031685876040518082805190602001908083835b602083106108805780518252601f199092019160209182019101610861565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146108e2576040519150601f19603f3d011682016040523d82523d6000602084013e6108e7565b606091505b50915091506108f7828286610908565b979650505050505050565b3b151590565b6060831561091757508161067e565b8251156109275782518084602001fd5b60405162461bcd60e51b815260206004820181815284516024840152845185939192839260440191908501908083836000831561063d57818101518382015260200161062556fe5361666545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c5361666545524332303a204552433230206f7065726174696f6e20646964206e6f7420737563636565645361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f20746f206e6f6e2d7a65726f20616c6c6f77616e6365a2646970667358221220bee3fd08efdf0a60ffbcb40d220da40f05aceb0acfab5851d7c4bd7c4d57618264736f6c63430007060033";

type SafeERC20WrapperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SafeERC20WrapperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SafeERC20Wrapper__factory extends ContractFactory {
  constructor(...args: SafeERC20WrapperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    token: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(token, overrides || {});
  }
  override deploy(
    token: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(token, overrides || {}) as Promise<
      SafeERC20Wrapper & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SafeERC20Wrapper__factory {
    return super.connect(runner) as SafeERC20Wrapper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SafeERC20WrapperInterface {
    return new Interface(_abi) as SafeERC20WrapperInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SafeERC20Wrapper {
    return new Contract(address, _abi, runner) as unknown as SafeERC20Wrapper;
  }
}
