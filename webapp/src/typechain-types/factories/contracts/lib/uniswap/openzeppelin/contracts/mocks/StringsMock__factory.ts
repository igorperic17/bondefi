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
  StringsMock,
  StringsMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/StringsMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "fromUint256",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610266806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a2bd364414610030575b600080fd5b61005c6004803603602081101561004657600080fd5b81019080803590602001909291905050506100d7565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009c578082015181840152602081019050610081565b50505050905090810190601f1680156100c95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606100e2826100e9565b9050919050565b60606000821415610131576040518060400160405280600181526020017f3000000000000000000000000000000000000000000000000000000000000000815250905061022b565b600082905060005b6000821461015b578080600101915050600a828161015357fe5b049150610139565b60008167ffffffffffffffff8111801561017457600080fd5b506040519080825280601f01601f1916602001820160405280156101a75781602001600182028036833780820191505090505b50905060006001830390508593505b6000841461022357600a84816101c857fe5b0660300160f81b828280600190039350815181106101e257fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a848161021b57fe5b0493506101b6565b819450505050505b91905056fea26469706673582212207e94dbee6b3a045317bb5eebef852a074ab987acff9babd953a43f8b7d5b48f564736f6c63430007060033";

type StringsMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StringsMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StringsMock__factory extends ContractFactory {
  constructor(...args: StringsMockConstructorParams) {
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
      StringsMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): StringsMock__factory {
    return super.connect(runner) as StringsMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StringsMockInterface {
    return new Interface(_abi) as StringsMockInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): StringsMock {
    return new Contract(address, _abi, runner) as unknown as StringsMock;
  }
}
