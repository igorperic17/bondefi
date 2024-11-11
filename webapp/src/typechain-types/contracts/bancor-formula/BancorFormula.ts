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

export interface BancorFormulaInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "calculatePurchaseReturn"
      | "calculateTokenPrice"
      | "maxRatio"
      | "power"
      | "version"
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
  encodeFunctionData(
    functionFragment: "power",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "calculatePurchaseReturn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "maxRatio", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "power", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
}

export interface BancorFormula extends BaseContract {
  connect(runner?: ContractRunner | null): BancorFormula;
  waitForDeployment(): Promise<this>;

  interface: BancorFormulaInterface;

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
      _startingPrice: BigNumberish,
      _decimals: BigNumberish,
      _supply: BigNumberish,
      _reserveBalance: BigNumberish,
      _reserveRatio: BigNumberish,
      _depositAmount: BigNumberish
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

  power: TypedContractMethod<
    [
      _baseN: BigNumberish,
      _baseD: BigNumberish,
      _expN: BigNumberish,
      _expD: BigNumberish
    ],
    [[bigint, bigint]],
    "view"
  >;

  version: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "calculatePurchaseReturn"
  ): TypedContractMethod<
    [
      _startingPrice: BigNumberish,
      _decimals: BigNumberish,
      _supply: BigNumberish,
      _reserveBalance: BigNumberish,
      _reserveRatio: BigNumberish,
      _depositAmount: BigNumberish
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
  getFunction(
    nameOrSignature: "power"
  ): TypedContractMethod<
    [
      _baseN: BigNumberish,
      _baseD: BigNumberish,
      _expN: BigNumberish,
      _expD: BigNumberish
    ],
    [[bigint, bigint]],
    "view"
  >;
  getFunction(
    nameOrSignature: "version"
  ): TypedContractMethod<[], [bigint], "view">;

  filters: {};
}
