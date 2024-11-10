/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../../../../common";
import type {
  EnumerableAddressSetMock,
  EnumerableAddressSetMockInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/EnumerableSetMock.sol/EnumerableAddressSetMock";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    name: "OperationResult",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "at",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "contains",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "length",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506105cf806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630a3b0a4f1461005c5780631f7b6d32146100a057806329092d0e146100be5780635dbe47e814610102578063e0886f901461015c575b600080fd5b61009e6004803603602081101561007257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101b4565b005b6100a8610209565b6040518082815260200191505060405180910390f35b610100600480360360208110156100d457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061021a565b005b6101446004803603602081101561011857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061026f565b60405180821515815260200191505060405180910390f35b6101886004803603602081101561017257600080fd5b810190808035906020019092919050505061028c565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006101ca8260006102a990919063ffffffff16565b90507fed9840e0775590557ad736875d96c95cf1458b766335f74339951a32c82a9e338160405180821515815260200191505060405180910390a15050565b600061021560006102d9565b905090565b60006102308260006102ee90919063ffffffff16565b90507fed9840e0775590557ad736875d96c95cf1458b766335f74339951a32c82a9e338160405180821515815260200191505060405180910390a15050565b600061028582600061031e90919063ffffffff16565b9050919050565b60006102a282600061034e90919063ffffffff16565b9050919050565b60006102d1836000018373ffffffffffffffffffffffffffffffffffffffff1660001b610368565b905092915050565b60006102e7826000016103d8565b9050919050565b6000610316836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6103e9565b905092915050565b6000610346836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6104d1565b905092915050565b600061035d83600001836104f4565b60001c905092915050565b600061037483836104d1565b6103cd5782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190506103d2565b600090505b92915050565b600081600001805490509050919050565b600080836001016000848152602001908152602001600020549050600081146104c5576000600182039050600060018660000180549050039050600086600001828154811061043457fe5b906000526020600020015490508087600001848154811061045157fe5b906000526020600020018190555060018301876001016000838152602001908152602001600020819055508660000180548061048957fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506104cb565b60009150505b92915050565b600080836001016000848152602001908152602001600020541415905092915050565b600081836000018054905011610555576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806105786022913960400191505060405180910390fd5b82600001828154811061056457fe5b906000526020600020015490509291505056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473a2646970667358221220c89d89c1bd761803c761609e3185781e84797ec3f5380ef54ac821f3c4f5c46c64736f6c63430007060033";

type EnumerableAddressSetMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EnumerableAddressSetMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EnumerableAddressSetMock__factory extends ContractFactory {
  constructor(...args: EnumerableAddressSetMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      EnumerableAddressSetMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): EnumerableAddressSetMock__factory {
    return super.connect(runner) as EnumerableAddressSetMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EnumerableAddressSetMockInterface {
    return new Interface(_abi) as EnumerableAddressSetMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): EnumerableAddressSetMock {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as EnumerableAddressSetMock;
  }
}
