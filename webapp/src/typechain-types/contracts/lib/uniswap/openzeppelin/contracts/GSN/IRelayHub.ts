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

export interface IRelayHubInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "balanceOf"
      | "canRelay"
      | "depositFor"
      | "getNonce"
      | "getRelay"
      | "maxPossibleCharge"
      | "penalizeIllegalTransaction"
      | "penalizeRepeatedNonce"
      | "registerRelay"
      | "relayCall"
      | "removeRelayByOwner"
      | "requiredGas"
      | "stake"
      | "unstake"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "CanRelayFailed"
      | "Deposited"
      | "Penalized"
      | "RelayAdded"
      | "RelayRemoved"
      | "Staked"
      | "TransactionRelayed"
      | "Unstaked"
      | "Withdrawn"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "canRelay",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      BytesLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "depositFor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getNonce",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRelay",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "maxPossibleCharge",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "penalizeIllegalTransaction",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "penalizeRepeatedNonce",
    values: [BytesLike, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerRelay",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "relayCall",
    values: [
      AddressLike,
      AddressLike,
      BytesLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeRelayByOwner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requiredGas",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "canRelay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRelay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxPossibleCharge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "penalizeIllegalTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "penalizeRepeatedNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerRelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "relayCall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeRelayByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requiredGas",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace CanRelayFailedEvent {
  export type InputTuple = [
    relay: AddressLike,
    from: AddressLike,
    to: AddressLike,
    selector: BytesLike,
    reason: BigNumberish
  ];
  export type OutputTuple = [
    relay: string,
    from: string,
    to: string,
    selector: string,
    reason: bigint
  ];
  export interface OutputObject {
    relay: string;
    from: string;
    to: string;
    selector: string;
    reason: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DepositedEvent {
  export type InputTuple = [
    recipient: AddressLike,
    from: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [recipient: string, from: string, amount: bigint];
  export interface OutputObject {
    recipient: string;
    from: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PenalizedEvent {
  export type InputTuple = [
    relay: AddressLike,
    sender: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [relay: string, sender: string, amount: bigint];
  export interface OutputObject {
    relay: string;
    sender: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RelayAddedEvent {
  export type InputTuple = [
    relay: AddressLike,
    owner: AddressLike,
    transactionFee: BigNumberish,
    stake: BigNumberish,
    unstakeDelay: BigNumberish,
    url: string
  ];
  export type OutputTuple = [
    relay: string,
    owner: string,
    transactionFee: bigint,
    stake: bigint,
    unstakeDelay: bigint,
    url: string
  ];
  export interface OutputObject {
    relay: string;
    owner: string;
    transactionFee: bigint;
    stake: bigint;
    unstakeDelay: bigint;
    url: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RelayRemovedEvent {
  export type InputTuple = [relay: AddressLike, unstakeTime: BigNumberish];
  export type OutputTuple = [relay: string, unstakeTime: bigint];
  export interface OutputObject {
    relay: string;
    unstakeTime: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StakedEvent {
  export type InputTuple = [
    relay: AddressLike,
    stake: BigNumberish,
    unstakeDelay: BigNumberish
  ];
  export type OutputTuple = [
    relay: string,
    stake: bigint,
    unstakeDelay: bigint
  ];
  export interface OutputObject {
    relay: string;
    stake: bigint;
    unstakeDelay: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransactionRelayedEvent {
  export type InputTuple = [
    relay: AddressLike,
    from: AddressLike,
    to: AddressLike,
    selector: BytesLike,
    status: BigNumberish,
    charge: BigNumberish
  ];
  export type OutputTuple = [
    relay: string,
    from: string,
    to: string,
    selector: string,
    status: bigint,
    charge: bigint
  ];
  export interface OutputObject {
    relay: string;
    from: string;
    to: string;
    selector: string;
    status: bigint;
    charge: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnstakedEvent {
  export type InputTuple = [relay: AddressLike, stake: BigNumberish];
  export type OutputTuple = [relay: string, stake: bigint];
  export interface OutputObject {
    relay: string;
    stake: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrawnEvent {
  export type InputTuple = [
    account: AddressLike,
    dest: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [account: string, dest: string, amount: bigint];
  export interface OutputObject {
    account: string;
    dest: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IRelayHub extends BaseContract {
  connect(runner?: ContractRunner | null): IRelayHub;
  waitForDeployment(): Promise<this>;

  interface: IRelayHubInterface;

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

  balanceOf: TypedContractMethod<[target: AddressLike], [bigint], "view">;

  canRelay: TypedContractMethod<
    [
      relay: AddressLike,
      from: AddressLike,
      to: AddressLike,
      encodedFunction: BytesLike,
      transactionFee: BigNumberish,
      gasPrice: BigNumberish,
      gasLimit: BigNumberish,
      nonce: BigNumberish,
      signature: BytesLike,
      approvalData: BytesLike
    ],
    [[bigint, string] & { status: bigint; recipientContext: string }],
    "view"
  >;

  depositFor: TypedContractMethod<[target: AddressLike], [void], "payable">;

  getNonce: TypedContractMethod<[from: AddressLike], [bigint], "view">;

  getRelay: TypedContractMethod<
    [relay: AddressLike],
    [
      [bigint, bigint, bigint, string, bigint] & {
        totalStake: bigint;
        unstakeDelay: bigint;
        unstakeTime: bigint;
        owner: string;
        state: bigint;
      }
    ],
    "view"
  >;

  maxPossibleCharge: TypedContractMethod<
    [
      relayedCallStipend: BigNumberish,
      gasPrice: BigNumberish,
      transactionFee: BigNumberish
    ],
    [bigint],
    "view"
  >;

  penalizeIllegalTransaction: TypedContractMethod<
    [unsignedTx: BytesLike, signature: BytesLike],
    [void],
    "nonpayable"
  >;

  penalizeRepeatedNonce: TypedContractMethod<
    [
      unsignedTx1: BytesLike,
      signature1: BytesLike,
      unsignedTx2: BytesLike,
      signature2: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  registerRelay: TypedContractMethod<
    [transactionFee: BigNumberish, url: string],
    [void],
    "nonpayable"
  >;

  relayCall: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      encodedFunction: BytesLike,
      transactionFee: BigNumberish,
      gasPrice: BigNumberish,
      gasLimit: BigNumberish,
      nonce: BigNumberish,
      signature: BytesLike,
      approvalData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  removeRelayByOwner: TypedContractMethod<
    [relay: AddressLike],
    [void],
    "nonpayable"
  >;

  requiredGas: TypedContractMethod<
    [relayedCallStipend: BigNumberish],
    [bigint],
    "view"
  >;

  stake: TypedContractMethod<
    [relayaddr: AddressLike, unstakeDelay: BigNumberish],
    [void],
    "payable"
  >;

  unstake: TypedContractMethod<[relay: AddressLike], [void], "nonpayable">;

  withdraw: TypedContractMethod<
    [amount: BigNumberish, dest: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[target: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "canRelay"
  ): TypedContractMethod<
    [
      relay: AddressLike,
      from: AddressLike,
      to: AddressLike,
      encodedFunction: BytesLike,
      transactionFee: BigNumberish,
      gasPrice: BigNumberish,
      gasLimit: BigNumberish,
      nonce: BigNumberish,
      signature: BytesLike,
      approvalData: BytesLike
    ],
    [[bigint, string] & { status: bigint; recipientContext: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "depositFor"
  ): TypedContractMethod<[target: AddressLike], [void], "payable">;
  getFunction(
    nameOrSignature: "getNonce"
  ): TypedContractMethod<[from: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getRelay"
  ): TypedContractMethod<
    [relay: AddressLike],
    [
      [bigint, bigint, bigint, string, bigint] & {
        totalStake: bigint;
        unstakeDelay: bigint;
        unstakeTime: bigint;
        owner: string;
        state: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "maxPossibleCharge"
  ): TypedContractMethod<
    [
      relayedCallStipend: BigNumberish,
      gasPrice: BigNumberish,
      transactionFee: BigNumberish
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "penalizeIllegalTransaction"
  ): TypedContractMethod<
    [unsignedTx: BytesLike, signature: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "penalizeRepeatedNonce"
  ): TypedContractMethod<
    [
      unsignedTx1: BytesLike,
      signature1: BytesLike,
      unsignedTx2: BytesLike,
      signature2: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "registerRelay"
  ): TypedContractMethod<
    [transactionFee: BigNumberish, url: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "relayCall"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      encodedFunction: BytesLike,
      transactionFee: BigNumberish,
      gasPrice: BigNumberish,
      gasLimit: BigNumberish,
      nonce: BigNumberish,
      signature: BytesLike,
      approvalData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removeRelayByOwner"
  ): TypedContractMethod<[relay: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "requiredGas"
  ): TypedContractMethod<[relayedCallStipend: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "stake"
  ): TypedContractMethod<
    [relayaddr: AddressLike, unstakeDelay: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "unstake"
  ): TypedContractMethod<[relay: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [amount: BigNumberish, dest: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "CanRelayFailed"
  ): TypedContractEvent<
    CanRelayFailedEvent.InputTuple,
    CanRelayFailedEvent.OutputTuple,
    CanRelayFailedEvent.OutputObject
  >;
  getEvent(
    key: "Deposited"
  ): TypedContractEvent<
    DepositedEvent.InputTuple,
    DepositedEvent.OutputTuple,
    DepositedEvent.OutputObject
  >;
  getEvent(
    key: "Penalized"
  ): TypedContractEvent<
    PenalizedEvent.InputTuple,
    PenalizedEvent.OutputTuple,
    PenalizedEvent.OutputObject
  >;
  getEvent(
    key: "RelayAdded"
  ): TypedContractEvent<
    RelayAddedEvent.InputTuple,
    RelayAddedEvent.OutputTuple,
    RelayAddedEvent.OutputObject
  >;
  getEvent(
    key: "RelayRemoved"
  ): TypedContractEvent<
    RelayRemovedEvent.InputTuple,
    RelayRemovedEvent.OutputTuple,
    RelayRemovedEvent.OutputObject
  >;
  getEvent(
    key: "Staked"
  ): TypedContractEvent<
    StakedEvent.InputTuple,
    StakedEvent.OutputTuple,
    StakedEvent.OutputObject
  >;
  getEvent(
    key: "TransactionRelayed"
  ): TypedContractEvent<
    TransactionRelayedEvent.InputTuple,
    TransactionRelayedEvent.OutputTuple,
    TransactionRelayedEvent.OutputObject
  >;
  getEvent(
    key: "Unstaked"
  ): TypedContractEvent<
    UnstakedEvent.InputTuple,
    UnstakedEvent.OutputTuple,
    UnstakedEvent.OutputObject
  >;
  getEvent(
    key: "Withdrawn"
  ): TypedContractEvent<
    WithdrawnEvent.InputTuple,
    WithdrawnEvent.OutputTuple,
    WithdrawnEvent.OutputObject
  >;

  filters: {
    "CanRelayFailed(address,address,address,bytes4,uint256)": TypedContractEvent<
      CanRelayFailedEvent.InputTuple,
      CanRelayFailedEvent.OutputTuple,
      CanRelayFailedEvent.OutputObject
    >;
    CanRelayFailed: TypedContractEvent<
      CanRelayFailedEvent.InputTuple,
      CanRelayFailedEvent.OutputTuple,
      CanRelayFailedEvent.OutputObject
    >;

    "Deposited(address,address,uint256)": TypedContractEvent<
      DepositedEvent.InputTuple,
      DepositedEvent.OutputTuple,
      DepositedEvent.OutputObject
    >;
    Deposited: TypedContractEvent<
      DepositedEvent.InputTuple,
      DepositedEvent.OutputTuple,
      DepositedEvent.OutputObject
    >;

    "Penalized(address,address,uint256)": TypedContractEvent<
      PenalizedEvent.InputTuple,
      PenalizedEvent.OutputTuple,
      PenalizedEvent.OutputObject
    >;
    Penalized: TypedContractEvent<
      PenalizedEvent.InputTuple,
      PenalizedEvent.OutputTuple,
      PenalizedEvent.OutputObject
    >;

    "RelayAdded(address,address,uint256,uint256,uint256,string)": TypedContractEvent<
      RelayAddedEvent.InputTuple,
      RelayAddedEvent.OutputTuple,
      RelayAddedEvent.OutputObject
    >;
    RelayAdded: TypedContractEvent<
      RelayAddedEvent.InputTuple,
      RelayAddedEvent.OutputTuple,
      RelayAddedEvent.OutputObject
    >;

    "RelayRemoved(address,uint256)": TypedContractEvent<
      RelayRemovedEvent.InputTuple,
      RelayRemovedEvent.OutputTuple,
      RelayRemovedEvent.OutputObject
    >;
    RelayRemoved: TypedContractEvent<
      RelayRemovedEvent.InputTuple,
      RelayRemovedEvent.OutputTuple,
      RelayRemovedEvent.OutputObject
    >;

    "Staked(address,uint256,uint256)": TypedContractEvent<
      StakedEvent.InputTuple,
      StakedEvent.OutputTuple,
      StakedEvent.OutputObject
    >;
    Staked: TypedContractEvent<
      StakedEvent.InputTuple,
      StakedEvent.OutputTuple,
      StakedEvent.OutputObject
    >;

    "TransactionRelayed(address,address,address,bytes4,uint8,uint256)": TypedContractEvent<
      TransactionRelayedEvent.InputTuple,
      TransactionRelayedEvent.OutputTuple,
      TransactionRelayedEvent.OutputObject
    >;
    TransactionRelayed: TypedContractEvent<
      TransactionRelayedEvent.InputTuple,
      TransactionRelayedEvent.OutputTuple,
      TransactionRelayedEvent.OutputObject
    >;

    "Unstaked(address,uint256)": TypedContractEvent<
      UnstakedEvent.InputTuple,
      UnstakedEvent.OutputTuple,
      UnstakedEvent.OutputObject
    >;
    Unstaked: TypedContractEvent<
      UnstakedEvent.InputTuple,
      UnstakedEvent.OutputTuple,
      UnstakedEvent.OutputObject
    >;

    "Withdrawn(address,address,uint256)": TypedContractEvent<
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
