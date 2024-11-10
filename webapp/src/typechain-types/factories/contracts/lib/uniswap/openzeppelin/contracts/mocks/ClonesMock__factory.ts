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
  ClonesMock,
  ClonesMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/ClonesMock";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "instance",
        type: "address",
      },
    ],
    name: "NewInstance",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "master",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initdata",
        type: "bytes",
      },
    ],
    name: "clone",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "master",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "initdata",
        type: "bytes",
      },
    ],
    name: "cloneDeterministic",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "master",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "predictDeterministicAddress",
    outputs: [
      {
        internalType: "address",
        name: "predicted",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610984806100206000396000f3fe6080604052600436106100345760003560e01c80630fbe133c14610039578063360d0fad146100d25780636e9ebc8114610157575b600080fd5b6100d06004803603604081101561004f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561008c57600080fd5b82018360208201111561009e57600080fd5b803590602001918460018302840111640100000000831117156100c057600080fd5b90919293919293905050506101fa565b005b3480156100de57600080fd5b5061012b600480360360408110156100f557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061026b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101f86004803603606081101561016d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001906401000000008111156101b457600080fd5b8201836020820111156101c657600080fd5b803590602001918460018302840111640100000000831117156101e857600080fd5b909192939192939050505061029e565b005b61026661021c8473ffffffffffffffffffffffffffffffffffffffff1661031a565b83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610422565b505050565b6000610296828473ffffffffffffffffffffffffffffffffffffffff166104aa90919063ffffffff16565b905092915050565b6103146102ca848673ffffffffffffffffffffffffffffffffffffffff166104bf90919063ffffffff16565b83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610422565b50505050565b60006040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528260601b60148201527f5af43d82803e903d91602b57fd5bf3000000000000000000000000000000000060288201526037816000f0915050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561041d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f455243313136373a20637265617465206661696c65640000000000000000000081525060200191505060405180910390fd5b919050565b6000815111156104595761045781348473ffffffffffffffffffffffffffffffffffffffff166105c99092919063ffffffff16565b505b7f39a773f10839d86923d91d5ce7d6642f2f63a95d850495abb1f162e38aa04ea582604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15050565b60006104b78383306105f8565b905092915050565b60006040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528360601b60148201527f5af43d82803e903d91602b57fd5bf300000000000000000000000000000000006028820152826037826000f5915050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156105c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f455243313136373a2063726561746532206661696c656400000000000000000081525060200191505060405180910390fd5b92915050565b60606105ef84848460405180606001604052806029815260200161092660299139610678565b90509392505050565b60006040517f3d602d80600a3d3981f3363d3d373d3d3d363d7300000000000000000000000081528460601b60148201527f5af43d82803e903d91602b57fd5bf3ff0000000000000000000000000000000060288201528260601b603882015283604c82015260378120606c820152605560378201209150509392505050565b6060824710156106d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806109006026913960400191505060405180910390fd5b6106dc85610820565b61074e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000081525060200191505060405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b6020831061079d578051825260208201915060208101905060208303925061077a565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146107ff576040519150601f19603f3d011682016040523d82523d6000602084013e610804565b606091505b5091509150610814828286610833565b92505050949350505050565b600080823b905060008111915050919050565b60608315610843578290506108f8565b6000835111156108565782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156108bd5780820151818401526020810190506108a2565b50505050905090810190601f1680156108ea5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b939250505056fe416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c416464726573733a206c6f772d6c6576656c2063616c6c20776974682076616c7565206661696c6564a264697066735822122087eccfa6309242dcb3a64e1065c76f63a894745279f28b5ee5f4e877b2438be764736f6c63430007060033";

type ClonesMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ClonesMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ClonesMock__factory extends ContractFactory {
  constructor(...args: ClonesMockConstructorParams) {
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
      ClonesMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ClonesMock__factory {
    return super.connect(runner) as ClonesMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ClonesMockInterface {
    return new Interface(_abi) as ClonesMockInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ClonesMock {
    return new Contract(address, _abi, runner) as unknown as ClonesMock;
  }
}
