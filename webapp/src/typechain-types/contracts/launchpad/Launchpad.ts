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
} from "../../common";

export type ProjectDetailsStruct = {
  name: string;
  symbol: string;
  description: string;
  iconUrl: string;
};

export type ProjectDetailsStructOutput = [
  name: string,
  symbol: string,
  description: string,
  iconUrl: string
] & { name: string; symbol: string; description: string; iconUrl: string };

export type LaunchStruct = {
  id: BigNumberish;
  purchaseToken: AddressLike;
  purchaseNftAddress: AddressLike;
  targetRaise: BigNumberish;
  raised: BigNumberish;
  tokensToBeEmitted: BigNumberish;
  capPerUser: BigNumberish;
  saleStart: BigNumberish;
  saleEnd: BigNumberish;
  totalUsers: BigNumberish;
  purchaseFormula: AddressLike;
  reserveRatio: BigNumberish;
  claimEnabled: boolean;
  details: ProjectDetailsStruct;
};

export type LaunchStructOutput = [
  id: bigint,
  purchaseToken: string,
  purchaseNftAddress: string,
  targetRaise: bigint,
  raised: bigint,
  tokensToBeEmitted: bigint,
  capPerUser: bigint,
  saleStart: bigint,
  saleEnd: bigint,
  totalUsers: bigint,
  purchaseFormula: string,
  reserveRatio: bigint,
  claimEnabled: boolean,
  details: ProjectDetailsStructOutput
] & {
  id: bigint;
  purchaseToken: string;
  purchaseNftAddress: string;
  targetRaise: bigint;
  raised: bigint;
  tokensToBeEmitted: bigint;
  capPerUser: bigint;
  saleStart: bigint;
  saleEnd: bigint;
  totalUsers: bigint;
  purchaseFormula: string;
  reserveRatio: bigint;
  claimEnabled: boolean;
  details: ProjectDetailsStructOutput;
};

export declare namespace Launchpad {
  export type LaunchInfoStruct = {
    launch: LaunchStruct;
    tokenPurchaseDecimals: BigNumberish;
  };

  export type LaunchInfoStructOutput = [
    launch: LaunchStructOutput,
    tokenPurchaseDecimals: bigint
  ] & { launch: LaunchStructOutput; tokenPurchaseDecimals: bigint };

  export type UserStatsStruct = {
    nftBalance: BigNumberish;
    purchaseAmount: BigNumberish;
    purchaseSymbol: string;
    purchaseDecimals: BigNumberish;
    tokenAmount: BigNumberish;
    tokenDecimals: BigNumberish;
  };

  export type UserStatsStructOutput = [
    nftBalance: bigint,
    purchaseAmount: bigint,
    purchaseSymbol: string,
    purchaseDecimals: bigint,
    tokenAmount: bigint,
    tokenDecimals: bigint
  ] & {
    nftBalance: bigint;
    purchaseAmount: bigint;
    purchaseSymbol: string;
    purchaseDecimals: bigint;
    tokenAmount: bigint;
    tokenDecimals: bigint;
  };
}

export interface LaunchpadInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "buyTokens"
      | "claim"
      | "claimFees"
      | "createLaunch"
      | "getAllLaunchDetails"
      | "getLaunch"
      | "getLaunchDetails"
      | "getUserStats"
      | "isClaimEnabled"
      | "isRefundEnabled"
      | "owner"
      | "pause"
      | "paused"
      | "refund"
      | "renounceOwnership"
      | "setPurchaseFactory"
      | "tgeEvent"
      | "totalLaunches"
      | "transferOwnership"
      | "unpause"
      | "withdrawERC20"
      | "withdrawETH"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "LaunchCreated"
      | "OwnershipTransferred"
      | "Paused"
      | "TGE"
      | "TokensPurchased"
      | "Unpaused"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "buyTokens",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "claim", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "claimFees",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createLaunch",
    values: [
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      AddressLike,
      BigNumberish,
      ProjectDetailsStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllLaunchDetails",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLaunch",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getLaunchDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserStats",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isClaimEnabled",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isRefundEnabled",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "refund",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPurchaseFactory",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tgeEvent",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "totalLaunches",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawERC20",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawETH",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "buyTokens", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimFees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createLaunch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllLaunchDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getLaunch", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getLaunchDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserStats",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isClaimEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRefundEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "refund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPurchaseFactory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tgeEvent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalLaunches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawETH",
    data: BytesLike
  ): Result;
}

export namespace LaunchCreatedEvent {
  export type InputTuple = [launchId: BigNumberish];
  export type OutputTuple = [launchId: bigint];
  export interface OutputObject {
    launchId: bigint;
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

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TGEEvent {
  export type InputTuple = [launchId: BigNumberish, tokenAddress: AddressLike];
  export type OutputTuple = [launchId: bigint, tokenAddress: string];
  export interface OutputObject {
    launchId: bigint;
    tokenAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokensPurchasedEvent {
  export type InputTuple = [
    launchId: BigNumberish,
    user: AddressLike,
    amount: BigNumberish,
    tokenAmount: BigNumberish
  ];
  export type OutputTuple = [
    launchId: bigint,
    user: string,
    amount: bigint,
    tokenAmount: bigint
  ];
  export interface OutputObject {
    launchId: bigint;
    user: string;
    amount: bigint;
    tokenAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Launchpad extends BaseContract {
  connect(runner?: ContractRunner | null): Launchpad;
  waitForDeployment(): Promise<this>;

  interface: LaunchpadInterface;

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

  buyTokens: TypedContractMethod<
    [launchId: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  claim: TypedContractMethod<[launchId: BigNumberish], [void], "nonpayable">;

  claimFees: TypedContractMethod<
    [launchId: BigNumberish],
    [void],
    "nonpayable"
  >;

  createLaunch: TypedContractMethod<
    [
      purchaseToken: AddressLike,
      targetRaise: BigNumberish,
      capPerUser: BigNumberish,
      saleStart: BigNumberish,
      saleEnd: BigNumberish,
      purchaseFormula: AddressLike,
      reserveRatio: BigNumberish,
      details: ProjectDetailsStruct
    ],
    [void],
    "nonpayable"
  >;

  getAllLaunchDetails: TypedContractMethod<
    [],
    [Launchpad.LaunchInfoStructOutput[]],
    "view"
  >;

  getLaunch: TypedContractMethod<
    [launchId: BigNumberish],
    [LaunchStructOutput],
    "view"
  >;

  getLaunchDetails: TypedContractMethod<
    [launchId: BigNumberish],
    [Launchpad.LaunchInfoStructOutput],
    "view"
  >;

  getUserStats: TypedContractMethod<
    [user: AddressLike, launchId: BigNumberish],
    [Launchpad.UserStatsStructOutput],
    "view"
  >;

  isClaimEnabled: TypedContractMethod<
    [launchId: BigNumberish],
    [boolean],
    "view"
  >;

  isRefundEnabled: TypedContractMethod<
    [launchId: BigNumberish],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  refund: TypedContractMethod<[launchId: BigNumberish], [void], "nonpayable">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setPurchaseFactory: TypedContractMethod<
    [factoryAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  tgeEvent: TypedContractMethod<
    [launchId: BigNumberish, tokenAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  totalLaunches: TypedContractMethod<[], [bigint], "view">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  withdrawERC20: TypedContractMethod<
    [tokenAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  withdrawETH: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "buyTokens"
  ): TypedContractMethod<
    [launchId: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<[launchId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "claimFees"
  ): TypedContractMethod<[launchId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createLaunch"
  ): TypedContractMethod<
    [
      purchaseToken: AddressLike,
      targetRaise: BigNumberish,
      capPerUser: BigNumberish,
      saleStart: BigNumberish,
      saleEnd: BigNumberish,
      purchaseFormula: AddressLike,
      reserveRatio: BigNumberish,
      details: ProjectDetailsStruct
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getAllLaunchDetails"
  ): TypedContractMethod<[], [Launchpad.LaunchInfoStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getLaunch"
  ): TypedContractMethod<
    [launchId: BigNumberish],
    [LaunchStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getLaunchDetails"
  ): TypedContractMethod<
    [launchId: BigNumberish],
    [Launchpad.LaunchInfoStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserStats"
  ): TypedContractMethod<
    [user: AddressLike, launchId: BigNumberish],
    [Launchpad.UserStatsStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "isClaimEnabled"
  ): TypedContractMethod<[launchId: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "isRefundEnabled"
  ): TypedContractMethod<[launchId: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "refund"
  ): TypedContractMethod<[launchId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setPurchaseFactory"
  ): TypedContractMethod<[factoryAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "tgeEvent"
  ): TypedContractMethod<
    [launchId: BigNumberish, tokenAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "totalLaunches"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawERC20"
  ): TypedContractMethod<[tokenAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawETH"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "LaunchCreated"
  ): TypedContractEvent<
    LaunchCreatedEvent.InputTuple,
    LaunchCreatedEvent.OutputTuple,
    LaunchCreatedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "TGE"
  ): TypedContractEvent<
    TGEEvent.InputTuple,
    TGEEvent.OutputTuple,
    TGEEvent.OutputObject
  >;
  getEvent(
    key: "TokensPurchased"
  ): TypedContractEvent<
    TokensPurchasedEvent.InputTuple,
    TokensPurchasedEvent.OutputTuple,
    TokensPurchasedEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "LaunchCreated(uint256)": TypedContractEvent<
      LaunchCreatedEvent.InputTuple,
      LaunchCreatedEvent.OutputTuple,
      LaunchCreatedEvent.OutputObject
    >;
    LaunchCreated: TypedContractEvent<
      LaunchCreatedEvent.InputTuple,
      LaunchCreatedEvent.OutputTuple,
      LaunchCreatedEvent.OutputObject
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

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "TGE(uint256,address)": TypedContractEvent<
      TGEEvent.InputTuple,
      TGEEvent.OutputTuple,
      TGEEvent.OutputObject
    >;
    TGE: TypedContractEvent<
      TGEEvent.InputTuple,
      TGEEvent.OutputTuple,
      TGEEvent.OutputObject
    >;

    "TokensPurchased(uint256,address,uint256,uint256)": TypedContractEvent<
      TokensPurchasedEvent.InputTuple,
      TokensPurchasedEvent.OutputTuple,
      TokensPurchasedEvent.OutputObject
    >;
    TokensPurchased: TypedContractEvent<
      TokensPurchasedEvent.InputTuple,
      TokensPurchasedEvent.OutputTuple,
      TokensPurchasedEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}
