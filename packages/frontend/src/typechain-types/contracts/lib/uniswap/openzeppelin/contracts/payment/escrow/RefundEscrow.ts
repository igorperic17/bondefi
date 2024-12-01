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
} from "../../../../../../../common";

export interface RefundEscrowInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "beneficiary"
      | "beneficiaryWithdraw"
      | "close"
      | "deposit"
      | "depositsOf"
      | "enableRefunds"
      | "owner"
      | "renounceOwnership"
      | "state"
      | "transferOwnership"
      | "withdraw"
      | "withdrawalAllowed"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Deposited"
      | "OwnershipTransferred"
      | "RefundsClosed"
      | "RefundsEnabled"
      | "Withdrawn"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "beneficiary",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "beneficiaryWithdraw",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "close", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "depositsOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "enableRefunds",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "state", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawalAllowed",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "beneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "beneficiaryWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "close", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositsOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enableRefunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "state", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawalAllowed",
    data: BytesLike
  ): Result;
}

export namespace DepositedEvent {
  export type InputTuple = [payee: AddressLike, weiAmount: BigNumberish];
  export type OutputTuple = [payee: string, weiAmount: bigint];
  export interface OutputObject {
    payee: string;
    weiAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RefundsClosedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RefundsEnabledEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrawnEvent {
  export type InputTuple = [payee: AddressLike, weiAmount: BigNumberish];
  export type OutputTuple = [payee: string, weiAmount: bigint];
  export interface OutputObject {
    payee: string;
    weiAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface RefundEscrow extends BaseContract {
  connect(runner?: ContractRunner | null): RefundEscrow;
  waitForDeployment(): Promise<this>;

  interface: RefundEscrowInterface;

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

  beneficiary: TypedContractMethod<[], [string], "view">;

  beneficiaryWithdraw: TypedContractMethod<[], [void], "nonpayable">;

  close: TypedContractMethod<[], [void], "nonpayable">;

  deposit: TypedContractMethod<[refundee: AddressLike], [void], "payable">;

  depositsOf: TypedContractMethod<[payee: AddressLike], [bigint], "view">;

  enableRefunds: TypedContractMethod<[], [void], "nonpayable">;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  state: TypedContractMethod<[], [bigint], "view">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<[payee: AddressLike], [void], "nonpayable">;

  withdrawalAllowed: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "beneficiary"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "beneficiaryWithdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "close"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<[refundee: AddressLike], [void], "payable">;
  getFunction(
    nameOrSignature: "depositsOf"
  ): TypedContractMethod<[payee: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "enableRefunds"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "state"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[payee: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawalAllowed"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  getEvent(
    key: "Deposited"
  ): TypedContractEvent<
    DepositedEvent.InputTuple,
    DepositedEvent.OutputTuple,
    DepositedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "RefundsClosed"
  ): TypedContractEvent<
    RefundsClosedEvent.InputTuple,
    RefundsClosedEvent.OutputTuple,
    RefundsClosedEvent.OutputObject
  >;
  getEvent(
    key: "RefundsEnabled"
  ): TypedContractEvent<
    RefundsEnabledEvent.InputTuple,
    RefundsEnabledEvent.OutputTuple,
    RefundsEnabledEvent.OutputObject
  >;
  getEvent(
    key: "Withdrawn"
  ): TypedContractEvent<
    WithdrawnEvent.InputTuple,
    WithdrawnEvent.OutputTuple,
    WithdrawnEvent.OutputObject
  >;

  filters: {
    "Deposited(address,uint256)": TypedContractEvent<
      DepositedEvent.InputTuple,
      DepositedEvent.OutputTuple,
      DepositedEvent.OutputObject
    >;
    Deposited: TypedContractEvent<
      DepositedEvent.InputTuple,
      DepositedEvent.OutputTuple,
      DepositedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "RefundsClosed()": TypedContractEvent<
      RefundsClosedEvent.InputTuple,
      RefundsClosedEvent.OutputTuple,
      RefundsClosedEvent.OutputObject
    >;
    RefundsClosed: TypedContractEvent<
      RefundsClosedEvent.InputTuple,
      RefundsClosedEvent.OutputTuple,
      RefundsClosedEvent.OutputObject
    >;

    "RefundsEnabled()": TypedContractEvent<
      RefundsEnabledEvent.InputTuple,
      RefundsEnabledEvent.OutputTuple,
      RefundsEnabledEvent.OutputObject
    >;
    RefundsEnabled: TypedContractEvent<
      RefundsEnabledEvent.InputTuple,
      RefundsEnabledEvent.OutputTuple,
      RefundsEnabledEvent.OutputObject
    >;

    "Withdrawn(address,uint256)": TypedContractEvent<
      WithdrawnEvent.InputTuple,
      WithdrawnEvent.OutputTuple,
      WithdrawnEvent.OutputObject
    >;
    Withdrawn: TypedContractEvent<
      WithdrawnEvent.InputTuple,
      WithdrawnEvent.OutputTuple,
      WithdrawnEvent.OutputObject
    >;
  };
}