/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
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

export interface InitializableMockInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "fail"
      | "initialize"
      | "initializeNested"
      | "initializeWithX"
      | "initializerRan"
      | "nonInitializable"
      | "x"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "fail", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initializeNested",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initializeWithX",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initializerRan",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nonInitializable",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "x", values?: undefined): string;

  decodeFunctionResult(functionFragment: "fail", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initializeNested",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeWithX",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializerRan",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nonInitializable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "x", data: BytesLike): Result;
}

export interface InitializableMock extends BaseContract {
  connect(runner?: ContractRunner | null): InitializableMock;
  waitForDeployment(): Promise<this>;

  interface: InitializableMockInterface;

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

  fail: TypedContractMethod<[], [void], "view">;

  initialize: TypedContractMethod<[], [void], "nonpayable">;

  initializeNested: TypedContractMethod<[], [void], "nonpayable">;

  initializeWithX: TypedContractMethod<[_x: BigNumberish], [void], "payable">;

  initializerRan: TypedContractMethod<[], [boolean], "view">;

  nonInitializable: TypedContractMethod<[_x: BigNumberish], [void], "payable">;

  x: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(nameOrSignature: "fail"): TypedContractMethod<[], [void], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "initializeNested"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "initializeWithX"
  ): TypedContractMethod<[_x: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "initializerRan"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "nonInitializable"
  ): TypedContractMethod<[_x: BigNumberish], [void], "payable">;
  getFunction(nameOrSignature: "x"): TypedContractMethod<[], [bigint], "view">;

  filters: {};
}
