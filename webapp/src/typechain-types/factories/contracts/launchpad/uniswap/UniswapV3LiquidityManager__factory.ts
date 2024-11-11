/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  UniswapV3LiquidityManager,
  UniswapV3LiquidityManagerInterface,
} from "../../../../contracts/launchpad/uniswap/UniswapV3LiquidityManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "__positionManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "__uniswapFactory",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DEFAULT_FEE_TIER",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_FEE_TIER",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount0Desired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Desired",
        type: "uint256",
      },
      {
        internalType: "uint24",
        name: "feeTier",
        type: "uint24",
      },
    ],
    name: "createPoolAndAddLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "positionManager",
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
    inputs: [],
    name: "uniswapFactory",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516108c43803806108c483398101604081905261002f9161007c565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100af565b80516001600160a01b038116811461007757600080fd5b919050565b6000806040838503121561008f57600080fd5b61009883610060565b91506100a660208401610060565b90509250929050565b610806806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632495016a1461005c57806338c65e7c1461007e57806367c55d0f14610088578063791b98bc1461009d5780638bdb2afa146100c2575b600080fd5b610065610bb881565b60405162ffffff90911681526020015b60405180910390f35b610065620f424081565b61009b6100963660046105ca565b6100d3565b005b6000546001600160a01b03165b6040516001600160a01b039091168152602001610075565b6001546001600160a01b03166100aa565b620f424062ffffff8216106101235760405162461bcd60e51b815260206004820152601160248201527008ccaca40e8d2cae440e8dede40d0d2ced607b1b60448201526064015b60405180910390fd5b600154604051630b4c774160e11b81526001600160a01b038781166004830152868116602483015262ffffff841660448301526000921690631698ee8290606401602060405180830381865afa158015610181573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101a59190610631565b6001600160a01b0316146102065760405162461bcd60e51b815260206004820152602260248201527f506f6f6c20616c7265616479206578697374732c2063616e6e6f742063726561604482015261746560f01b606482015260840161011a565b60005460405163095ea7b360e01b81526001600160a01b039182166004820152602481018590529086169063095ea7b3906044016020604051808303816000875af1158015610259573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061027d9190610655565b5060005460405163095ea7b360e01b81526001600160a01b039182166004820152602481018490529085169063095ea7b3906044016020604051808303816000875af11580156102d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102f59190610655565b5060015460405163a167129560e01b81526001600160a01b038781166004830152868116602483015262ffffff841660448301529091169063a1671295906064016020604051808303816000875af1158015610355573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103799190610631565b506000604051806101600160405280876001600160a01b03168152602001866001600160a01b031681526020018362ffffff168152602001620d89e71960020b8152602001620d89e860020b81526020018581526020018481526020016000815260200160008152602001336001600160a01b0316815260200142610708610401919061068d565b905260008054604051634418b22b60e11b8152929350909182916001600160a01b0316906388316456906104399086906004016106a6565b6080604051808303816000875af1158015610458573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047c919061076a565b93509350505081861115610515576001600160a01b03881663a9059cbb336104a4858a6107bd565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af11580156104ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105139190610655565b505b808511156105a8576001600160a01b03871663a9059cbb3361053784896107bd565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015610582573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a69190610655565b505b5050505050505050565b6001600160a01b03811681146105c757600080fd5b50565b600080600080600060a086880312156105e257600080fd5b85356105ed816105b2565b945060208601356105fd816105b2565b93506040860135925060608601359150608086013562ffffff8116811461062357600080fd5b809150509295509295909350565b60006020828403121561064357600080fd5b815161064e816105b2565b9392505050565b60006020828403121561066757600080fd5b8151801515811461064e57600080fd5b634e487b7160e01b600052601160045260246000fd5b808201808211156106a0576106a0610677565b92915050565b81516001600160a01b03168152610160810160208301516106d260208401826001600160a01b03169052565b5060408301516106e9604084018262ffffff169052565b5060608301516106fe606084018260020b9052565b506080830151610713608084018260020b9052565b5060a083015160a083015260c083015160c083015260e083015160e083015261010080840151818401525061012080840151610759828501826001600160a01b03169052565b505061014092830151919092015290565b6000806000806080858703121561078057600080fd5b8451935060208501516fffffffffffffffffffffffffffffffff811681146107a757600080fd5b6040860151606090960151949790965092505050565b818103818111156106a0576106a061067756fea264697066735822122033a910526fc80e6dd9b86a088bca1494b743cec402d9786dbe0cab6b52c3919864736f6c63430008140033";

type UniswapV3LiquidityManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniswapV3LiquidityManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniswapV3LiquidityManager__factory extends ContractFactory {
  constructor(...args: UniswapV3LiquidityManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    __positionManager: AddressLike,
    __uniswapFactory: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      __positionManager,
      __uniswapFactory,
      overrides || {}
    );
  }
  override deploy(
    __positionManager: AddressLike,
    __uniswapFactory: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      __positionManager,
      __uniswapFactory,
      overrides || {}
    ) as Promise<
      UniswapV3LiquidityManager & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): UniswapV3LiquidityManager__factory {
    return super.connect(runner) as UniswapV3LiquidityManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapV3LiquidityManagerInterface {
    return new Interface(_abi) as UniswapV3LiquidityManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): UniswapV3LiquidityManager {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as UniswapV3LiquidityManager;
  }
}
