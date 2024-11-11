/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../../../../common";

export interface EIP712ExternalInterface extends Interface {
  getFunction(
    nameOrSignature: "domainSeparator" | "getChainId" | "verify"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "domainSeparator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getChainId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [BytesLike, AddressLike, AddressLike, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "domainSeparator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getChainId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
}

export interface EIP712External extends BaseContract {
  connect(runner?: ContractRunner | null): EIP712External;
  waitForDeployment(): Promise<this>;

  interface: EIP712ExternalInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  domainSeparator: TypedContractMethod<[], [string], "view">;

  getChainId: TypedContractMethod<[], [bigint], "view">;

  verify: TypedContractMethod<
    [
      signature: BytesLike,
      signer: AddressLike,
      mailTo: AddressLike,
      mailContents: string
    ],
    [void],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "domainSeparator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getChainId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "verify"
  ): TypedContractMethod<
    [
      signature: BytesLike,
      signer: AddressLike,
      mailTo: AddressLike,
      mailContents: string
    ],
    [void],
    "view"
  >;

  filters: {};
}