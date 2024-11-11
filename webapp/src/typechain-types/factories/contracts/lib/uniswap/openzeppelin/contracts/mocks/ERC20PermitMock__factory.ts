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
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { PayableOverrides } from "../../../../../../../common";
import type {
  ERC20PermitMock,
  ERC20PermitMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/ERC20PermitMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "initialAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "initialBalance",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "chainId",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101406040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9610120908152506040516200157038038062001570833981810160405260808110156200005257600080fd5b81019080805160405193929190846401000000008211156200007357600080fd5b9083019060208201858111156200008957600080fd5b8251640100000000811182820188101715620000a457600080fd5b82525081516020918201929091019080838360005b83811015620000d3578181015183820152602001620000b9565b50505050905090810190601f168015620001015780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200012557600080fd5b9083019060208201858111156200013b57600080fd5b82516401000000008111828201881017156200015657600080fd5b82525081516020918201929091019080838360005b83811015620001855781810151838201526020016200016b565b50505050905090810190601f168015620001b35780820380516001836020036101000a031916815260200191505b5060408181526020838101519382015183830190925260018352603160f81b818401528751939550909350869283929183918891620001f8916003918501906200047a565b5080516200020e9060049060208401906200047a565b50506005805460ff1916601217905550815160208084019190912082519183019190912060c082905260e08190527f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f620002676200029c565b60a05262000277818484620002a0565b60805261010052506200029293508592508491505062000304565b5050505062000526565b4690565b6000838383620002af6200029c565b3060405160200180868152602001858152602001848152602001838152602001826001600160a01b03168152602001955050505050506040516020818303038152906040528051906020012090509392505050565b6001600160a01b03821662000360576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6200036e6000838362000413565b6200038a816002546200041860201b6200083a1790919060201c565b6002556001600160a01b03821660009081526020818152604090912054620003bd9183906200083a62000418821b17901c565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b505050565b60008282018381101562000473576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620004b25760008555620004fd565b82601f10620004cd57805160ff1916838001178555620004fd565b82800160010185558215620004fd579182015b82811115620004fd578251825591602001919060010190620004e0565b506200050b9291506200050f565b5090565b5b808211156200050b576000815560010162000510565b60805160a05160c05160e051610100516101205161100062000570600039806106c7525080610bda525080610c1c525080610bfb525080610b81525080610bb152506110006000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80633950935111610097578063a457c2d711610066578063a457c2d7146102b5578063a9059cbb146102e1578063d505accf1461030d578063dd62ed3e14610360576100f5565b8063395093511461023557806370a08231146102615780637ecebe001461028757806395d89b41146102ad576100f5565b806323b872dd116100d357806323b872dd146101d1578063313ce567146102075780633408e470146102255780633644e5151461022d576100f5565b806306fdde03146100fa578063095ea7b31461017757806318160ddd146101b7575b600080fd5b61010261038e565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561013c578181015183820152602001610124565b50505050905090810190601f1680156101695780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101a36004803603604081101561018d57600080fd5b506001600160a01b038135169060200135610425565b604080519115158252519081900360200190f35b6101bf610442565b60408051918252519081900360200190f35b6101a3600480360360608110156101e757600080fd5b506001600160a01b03813581169160208101359091169060400135610448565b61020f6104cf565b6040805160ff9092168252519081900360200190f35b6101bf6104d8565b6101bf6104dc565b6101a36004803603604081101561024b57600080fd5b506001600160a01b0381351690602001356104eb565b6101bf6004803603602081101561027757600080fd5b50356001600160a01b0316610539565b6101bf6004803603602081101561029d57600080fd5b50356001600160a01b0316610554565b61010261057b565b6101a3600480360360408110156102cb57600080fd5b506001600160a01b0381351690602001356105dc565b6101a3600480360360408110156102f757600080fd5b506001600160a01b038135169060200135610644565b61035e600480360360e081101561032357600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135610658565b005b6101bf6004803603604081101561037657600080fd5b506001600160a01b038135811691602001351661080f565b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561041a5780601f106103ef5761010080835404028352916020019161041a565b820191906000526020600020905b8154815290600101906020018083116103fd57829003601f168201915b505050505090505b90565b600061043961043261089b565b848461089f565b50600192915050565b60025490565b600061045584848461098b565b6104c58461046161089b565b6104c085604051806060016040528060288152602001610f35602891396001600160a01b038a1660009081526001602052604081209061049f61089b565b6001600160a01b031681526020810191909152604001600020549190610ae6565b61089f565b5060019392505050565b60055460ff1690565b4690565b60006104e6610b7d565b905090565b60006104396104f861089b565b846104c0856001600061050961089b565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549061083a565b6001600160a01b031660009081526020819052604090205490565b6001600160a01b038116600090815260066020526040812061057590610c47565b92915050565b60048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561041a5780601f106103ef5761010080835404028352916020019161041a565b60006104396105e961089b565b846104c085604051806060016040528060258152602001610fa6602591396001600061061361089b565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190610ae6565b600061043961065161089b565b848461098b565b834211156106ad576040805162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e65000000604482015290519081900360640190fd5b6001600160a01b03871660009081526006602052604081207f0000000000000000000000000000000000000000000000000000000000000000908990899089906106f690610c47565b8960405160200180878152602001866001600160a01b03168152602001856001600160a01b031681526020018481526020018381526020018281526020019650505050505050604051602081830303815290604052805190602001209050600061075f82610c4b565b9050600061076f82878787610c97565b9050896001600160a01b0316816001600160a01b0316146107d7576040805162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e61747572650000604482015290519081900360640190fd5b6001600160a01b038a1660009081526006602052604090206107f890610e15565b6108038a8a8a61089f565b50505050505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600082820183811015610894576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b3390565b6001600160a01b0383166108e45760405162461bcd60e51b8152600401808060200182810382526024815260200180610f826024913960400191505060405180910390fd5b6001600160a01b0382166109295760405162461bcd60e51b8152600401808060200182810382526022815260200180610ea96022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166109d05760405162461bcd60e51b8152600401808060200182810382526025815260200180610f5d6025913960400191505060405180910390fd5b6001600160a01b038216610a155760405162461bcd60e51b8152600401808060200182810382526023815260200180610e866023913960400191505060405180910390fd5b610a20838383610e1e565b610a5d81604051806060016040528060268152602001610ecb602691396001600160a01b0386166000908152602081905260409020549190610ae6565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610a8c908261083a565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610b755760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b3a578181015183820152602001610b22565b50505050905090810190601f168015610b675780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60007f0000000000000000000000000000000000000000000000000000000000000000610ba86104d8565b1415610bd557507f0000000000000000000000000000000000000000000000000000000000000000610422565b610c407f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000610e23565b9050610422565b5490565b6000610c55610b7d565b82604051602001808061190160f01b81525060020183815260200182815260200192505050604051602081830303815290604052805190602001209050919050565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0821115610cf85760405162461bcd60e51b8152600401808060200182810382526022815260200180610ef16022913960400191505060405180910390fd5b8360ff16601b1480610d0d57508360ff16601c145b610d485760405162461bcd60e51b8152600401808060200182810382526022815260200180610f136022913960400191505060405180910390fd5b600060018686868660405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610da4573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610e0c576040805162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015290519081900360640190fd5b95945050505050565b80546001019055565b505050565b6000838383610e306104d8565b3060405160200180868152602001858152602001848152602001838152602001826001600160a01b0316815260200195505050505050604051602081830303815290604052805190602001209050939250505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545434453413a20696e76616c6964207369676e6174757265202773272076616c756545434453413a20696e76616c6964207369676e6174757265202776272076616c756545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212206db6772995ee9374e324874ea00050f691f8b6e8835ef665a75732ac6ab3567d64736f6c63430007060033";

type ERC20PermitMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20PermitMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20PermitMock__factory extends ContractFactory {
  constructor(...args: ERC20PermitMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name: string,
    symbol: string,
    initialAccount: AddressLike,
    initialBalance: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      name,
      symbol,
      initialAccount,
      initialBalance,
      overrides || {}
    );
  }
  override deploy(
    name: string,
    symbol: string,
    initialAccount: AddressLike,
    initialBalance: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ) {
    return super.deploy(
      name,
      symbol,
      initialAccount,
      initialBalance,
      overrides || {}
    ) as Promise<
      ERC20PermitMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC20PermitMock__factory {
    return super.connect(runner) as ERC20PermitMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20PermitMockInterface {
    return new Interface(_abi) as ERC20PermitMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC20PermitMock {
    return new Contract(address, _abi, runner) as unknown as ERC20PermitMock;
  }
}