/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
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
} from "../../common";

export interface PurchaseFactoryInterface extends Interface {
  getFunction(
    nameOrSignature: "baseContract" | "createPurchaseManager"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "PurchaseManagerCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "baseContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPurchaseManager",
    values: [AddressLike, string, string, string, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "baseContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createPurchaseManager",
    data: BytesLike
  ): Result;
}

export namespace PurchaseManagerCreatedEvent {
  export type InputTuple = [contractAddress: AddressLike];
  export type OutputTuple = [contractAddress: string];
  export interface OutputObject {
    contractAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PurchaseFactory extends BaseContract {
  connect(runner?: ContractRunner | null): PurchaseFactory;
  waitForDeployment(): Promise<this>;

  interface: PurchaseFactoryInterface;

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

  baseContract: TypedContractMethod<[], [string], "view">;

  createPurchaseManager: TypedContractMethod<
    [
      collateralTokenAddress: AddressLike,
      name: string,
      symbol: string,
      metadataURI: string,
      creator: AddressLike
    ],
    [string],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "baseContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "createPurchaseManager"
  ): TypedContractMethod<
    [
      collateralTokenAddress: AddressLike,
      name: string,
      symbol: string,
      metadataURI: string,
      creator: AddressLike
    ],
    [string],
    "nonpayable"
  >;

  getEvent(
    key: "PurchaseManagerCreated"
  ): TypedContractEvent<
    PurchaseManagerCreatedEvent.InputTuple,
    PurchaseManagerCreatedEvent.OutputTuple,
    PurchaseManagerCreatedEvent.OutputObject
  >;

  filters: {
    "PurchaseManagerCreated(address)": TypedContractEvent<
      PurchaseManagerCreatedEvent.InputTuple,
      PurchaseManagerCreatedEvent.OutputTuple,
      PurchaseManagerCreatedEvent.OutputObject
    >;
    PurchaseManagerCreated: TypedContractEvent<
      PurchaseManagerCreatedEvent.InputTuple,
      PurchaseManagerCreatedEvent.OutputTuple,
      PurchaseManagerCreatedEvent.OutputObject
    >;
  };
}
