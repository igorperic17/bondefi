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
  MigratableMockV3,
  MigratableMockV3Interface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/SingleInheritanceInitializableMocks.sol/MigratableMockV3";

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
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "anotherValue",
        type: "uint256",
      },
    ],
    name: "migrate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "migrate",
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
  {
    inputs: [],
    name: "y",
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
  "0x608060405234801561001057600080fd5b50610345806100206000396000f3fe60806040526004361061004a5760003560e01c80630c55699c1461004f5780633e54bacb1461007a5780638fd3ab80146100b2578063a56dfe4a146100bc578063fe4b84df146100e7575b600080fd5b34801561005b57600080fd5b50610064610115565b6040518082815260200191505060405180910390f35b6100b06004803603604081101561009057600080fd5b81019080803590602001909291908035906020019092919050505061011b565b005b6100ba610162565b005b3480156100c857600080fd5b506100d16101b1565b6040518082815260200191505060405180910390f35b610113600480360360208110156100fd57600080fd5b81019080803590602001909291905050506101b7565b005b60015481565b600260009054906101000a900460ff161561013557600080fd5b81600181905550806003819055506001600260006101000a81548160ff0219169083151502179055505050565b600460009054906101000a900460ff161561017c57600080fd5b60006001549050600354600181905550806003819055506001600460006101000a81548160ff02191690831515021790555050565b60035481565b600060019054906101000a900460ff16806101d657506101d56102bd565b5b806101ec575060008054906101000a900460ff16155b610241576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806102e2602e913960400191505060405180910390fd5b60008060019054906101000a900460ff161590508015610291576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8160018190555080156102b95760008060016101000a81548160ff0219169083151502179055505b5050565b60006102c8306102ce565b15905090565b600080823b90506000811191505091905056fe496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564a2646970667358221220a335ebc52bfb91732c4293f23db0e1401b097eea3ede2d9f7163e83d732eb82c64736f6c63430007060033";

type MigratableMockV3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MigratableMockV3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MigratableMockV3__factory extends ContractFactory {
  constructor(...args: MigratableMockV3ConstructorParams) {
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
      MigratableMockV3 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MigratableMockV3__factory {
    return super.connect(runner) as MigratableMockV3__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MigratableMockV3Interface {
    return new Interface(_abi) as MigratableMockV3Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MigratableMockV3 {
    return new Contract(address, _abi, runner) as unknown as MigratableMockV3;
  }
}
