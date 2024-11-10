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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../../../../common";

export interface AddressImplInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "functionCall"
      | "functionCallWithValue"
      | "functionDelegateCall"
      | "functionStaticCall"
      | "isContract"
      | "sendValue"
      | "sharedAnswer"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "CallReturnValue"): EventFragment;

  encodeFunctionData(
    functionFragment: "functionCall",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "functionCallWithValue",
    values: [AddressLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "functionDelegateCall",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "functionStaticCall",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "sendValue",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "sharedAnswer",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "functionCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "functionCallWithValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "functionDelegateCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "functionStaticCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isContract", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sendValue", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sharedAnswer",
    data: BytesLike
  ): Result;
}

export namespace CallReturnValueEvent {
  export type InputTuple = [data: string];
  export type OutputTuple = [data: string];
  export interface OutputObject {
    data: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface AddressImpl extends BaseContract {
  connect(runner?: ContractRunner | null): AddressImpl;
  waitForDeployment(): Promise<this>;

  interface: AddressImplInterface;

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

  functionCall: TypedContractMethod<
    [target: AddressLike, data: BytesLike],
    [void],
    "nonpayable"
  >;

  functionCallWithValue: TypedContractMethod<
    [target: AddressLike, data: BytesLike, value: BigNumberish],
    [void],
    "payable"
  >;

  functionDelegateCall: TypedContractMethod<
    [target: AddressLike, data: BytesLike],
    [void],
    "nonpayable"
  >;

  functionStaticCall: TypedContractMethod<
    [target: AddressLike, data: BytesLike],
    [void],
    "nonpayable"
  >;

  isContract: TypedContractMethod<[account: AddressLike], [boolean], "view">;

  sendValue: TypedContractMethod<
    [receiver: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  sharedAnswer: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "functionCall"
  ): TypedContractMethod<
    [target: AddressLike, data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "functionCallWithValue"
  ): TypedContractMethod<
    [target: AddressLike, data: BytesLike, value: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "functionDelegateCall"
  ): TypedContractMethod<
    [target: AddressLike, data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "functionStaticCall"
  ): TypedContractMethod<
    [target: AddressLike, data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isContract"
  ): TypedContractMethod<[account: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "sendValue"
  ): TypedContractMethod<
    [receiver: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "sharedAnswer"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "CallReturnValue"
  ): TypedContractEvent<
    CallReturnValueEvent.InputTuple,
    CallReturnValueEvent.OutputTuple,
    CallReturnValueEvent.OutputObject
  >;

  filters: {
    "CallReturnValue(string)": TypedContractEvent<
      CallReturnValueEvent.InputTuple,
      CallReturnValueEvent.OutputTuple,
      CallReturnValueEvent.OutputObject
    >;
    CallReturnValue: TypedContractEvent<
      CallReturnValueEvent.InputTuple,
      CallReturnValueEvent.OutputTuple,
      CallReturnValueEvent.OutputObject
    >;
  };
}
