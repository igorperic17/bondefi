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
} from "../../../../../../../common";

export interface SampleFatherInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "father"
      | "gramps"
      | "initialize()"
      | "initialize(string,uint256)"
      | "initialize(string)"
      | "isHuman"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "father", values?: undefined): string;
  encodeFunctionData(functionFragment: "gramps", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize(string,uint256)",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize(string)",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "isHuman", values?: undefined): string;

  decodeFunctionResult(functionFragment: "father", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gramps", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialize()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initialize(string,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initialize(string)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isHuman", data: BytesLike): Result;
}

export interface SampleFather extends BaseContract {
  connect(runner?: ContractRunner | null): SampleFather;
  waitForDeployment(): Promise<this>;

  interface: SampleFatherInterface;

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

  father: TypedContractMethod<[], [bigint], "view">;

  gramps: TypedContractMethod<[], [string], "view">;

  "initialize()": TypedContractMethod<[], [void], "nonpayable">;

  "initialize(string,uint256)": TypedContractMethod<
    [_gramps: string, _father: BigNumberish],
    [void],
    "nonpayable"
  >;

  "initialize(string)": TypedContractMethod<
    [value: string],
    [void],
    "nonpayable"
  >;

  isHuman: TypedContractMethod<[], [boolean], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "father"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "gramps"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "initialize()"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "initialize(string,uint256)"
  ): TypedContractMethod<
    [_gramps: string, _father: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "initialize(string)"
  ): TypedContractMethod<[value: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "isHuman"
  ): TypedContractMethod<[], [boolean], "view">;

  filters: {};
}
