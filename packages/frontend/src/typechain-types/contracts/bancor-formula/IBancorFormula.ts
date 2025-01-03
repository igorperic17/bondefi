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
} from "../../common";

export interface IBancorFormulaInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "calculatePurchaseReturn"
      | "calculateTokenPrice"
      | "maxRatio"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "calculatePurchaseReturn",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateTokenPrice",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "maxRatio", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "calculatePurchaseReturn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "maxRatio", data: BytesLike): Result;
}

export interface IBancorFormula extends BaseContract {
  connect(runner?: ContractRunner | null): IBancorFormula;
  waitForDeployment(): Promise<this>;

  interface: IBancorFormulaInterface;

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

  calculatePurchaseReturn: TypedContractMethod<
    [
      startingPrice: BigNumberish,
      decimals: BigNumberish,
      supply: BigNumberish,
      reserveBalance: BigNumberish,
      reserveRatio: BigNumberish,
      depositAmount: BigNumberish
    ],
    [bigint],
    "view"
  >;

  calculateTokenPrice: TypedContractMethod<
    [
      startingPrice: BigNumberish,
      tokenDecimals: BigNumberish,
      collateralReserves: BigNumberish,
      tokenSupply: BigNumberish,
      reserveRatio: BigNumberish
    ],
    [bigint],
    "view"
  >;

  maxRatio: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "calculatePurchaseReturn"
  ): TypedContractMethod<
    [
      startingPrice: BigNumberish,
      decimals: BigNumberish,
      supply: BigNumberish,
      reserveBalance: BigNumberish,
      reserveRatio: BigNumberish,
      depositAmount: BigNumberish
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "calculateTokenPrice"
  ): TypedContractMethod<
    [
      startingPrice: BigNumberish,
      tokenDecimals: BigNumberish,
      collateralReserves: BigNumberish,
      tokenSupply: BigNumberish,
      reserveRatio: BigNumberish
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "maxRatio"
  ): TypedContractMethod<[], [bigint], "view">;

  filters: {};
}
