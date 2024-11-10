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
  Escrow,
  EscrowInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/payment/escrow/Escrow";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weiAmount",
        type: "uint256",
      },
    ],
    name: "Deposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "payee",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weiAmount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payee",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "payee",
        type: "address",
      },
    ],
    name: "depositsOf",
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
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "payee",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060006100216100c460201b60201c565b9050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3506100cc565b600033905090565b610b7c806100db6000396000f3fe6080604052600436106100555760003560e01c806351cff8d91461005a578063715018a6146100ab5780638da5cb5b146100c2578063e3a9db1a14610103578063f2fde38b14610168578063f340fa01146101b9575b600080fd5b34801561006657600080fd5b506100a96004803603602081101561007d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101fd565b005b3480156100b757600080fd5b506100c06103b0565b005b3480156100ce57600080fd5b506100d761051d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561010f57600080fd5b506101526004803603602081101561012657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610546565b6040518082815260200191505060405180910390f35b34801561017457600080fd5b506101b76004803603602081101561018b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061058f565b005b6101fb600480360360208110156101cf57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610781565b005b61020561091c565b73ffffffffffffffffffffffffffffffffffffffff1661022361051d565b73ffffffffffffffffffffffffffffffffffffffff16146102ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061035e818373ffffffffffffffffffffffffffffffffffffffff1661092490919063ffffffff16565b8173ffffffffffffffffffffffffffffffffffffffff167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5826040518082815260200191505060405180910390a25050565b6103b861091c565b73ffffffffffffffffffffffffffffffffffffffff166103d661051d565b73ffffffffffffffffffffffffffffffffffffffff161461045f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61059761091c565b73ffffffffffffffffffffffffffffffffffffffff166105b561051d565b73ffffffffffffffffffffffffffffffffffffffff161461063e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156106c4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610ae76026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b61078961091c565b73ffffffffffffffffffffffffffffffffffffffff166107a761051d565b73ffffffffffffffffffffffffffffffffffffffff1614610830576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600034905061088781600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610a5e90919063ffffffff16565b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff167f2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4826040518082815260200191505060405180910390a25050565b600033905090565b8047101561099a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a20696e73756666696369656e742062616c616e636500000081525060200191505060405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff168260405180600001905060006040518083038185875af1925050503d80600081146109fa576040519150601f19603f3d011682016040523d82523d6000602084013e6109ff565b606091505b5050905080610a59576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a815260200180610b0d603a913960400191505060405180910390fd5b505050565b600080828401905083811015610adc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b809150509291505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373416464726573733a20756e61626c6520746f2073656e642076616c75652c20726563697069656e74206d61792068617665207265766572746564a26469706673582212200574ee4f20775984121c93183f0e4f9196c7792e463582e389a3bdd11820895264736f6c63430007060033";

type EscrowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EscrowConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Escrow__factory extends ContractFactory {
  constructor(...args: EscrowConstructorParams) {
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
      Escrow & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Escrow__factory {
    return super.connect(runner) as Escrow__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EscrowInterface {
    return new Interface(_abi) as EscrowInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Escrow {
    return new Contract(address, _abi, runner) as unknown as Escrow;
  }
}
