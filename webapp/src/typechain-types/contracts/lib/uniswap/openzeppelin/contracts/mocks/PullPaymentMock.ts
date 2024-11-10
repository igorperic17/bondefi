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

export interface PullPaymentMockInterface extends Interface {
  getFunction(
    nameOrSignature: "callTransfer" | "payments" | "withdrawPayments"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "callTransfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "payments",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawPayments",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "callTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "payments", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawPayments",
    data: BytesLike
  ): Result;
}

export interface PullPaymentMock extends BaseContract {
  connect(runner?: ContractRunner | null): PullPaymentMock;
  waitForDeployment(): Promise<this>;

  interface: PullPaymentMockInterface;

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

  callTransfer: TypedContractMethod<
    [dest: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  payments: TypedContractMethod<[dest: AddressLike], [bigint], "view">;

  withdrawPayments: TypedContractMethod<
    [payee: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "callTransfer"
  ): TypedContractMethod<
    [dest: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "payments"
  ): TypedContractMethod<[dest: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdrawPayments"
  ): TypedContractMethod<[payee: AddressLike], [void], "nonpayable">;

  filters: {};
}
