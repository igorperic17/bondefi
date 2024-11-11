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
import type { NonPayableOverrides } from "../../../../../../../common";
import type {
  ERC20BurnableMock,
  ERC20BurnableMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/ERC20BurnableMock";

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
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x60806040523480156200001157600080fd5b50604051620010bf380380620010bf833981810160405260808110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604090815260208281015192909101518651929450925085918591620001c59160039185019062000377565b508051620001db90600490602084019062000377565b50506005805460ff1916601217905550620001f7828262000201565b5050505062000423565b6001600160a01b0382166200025d576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6200026b6000838362000310565b62000287816002546200031560201b620006521790919060201c565b6002556001600160a01b03821660009081526020818152604090912054620002ba9183906200065262000315821b17901c565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b505050565b60008282018381101562000370576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620003af5760008555620003fa565b82601f10620003ca57805160ff1916838001178555620003fa565b82800160010185558215620003fa579182015b82811115620003fa578251825591602001919060010190620003dd565b50620004089291506200040c565b5090565b5b808211156200040857600081556001016200040d565b610c8c80620004336000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806342966c681161008c57806395d89b411161006657806395d89b411461029c578063a457c2d7146102a4578063a9059cbb146102d0578063dd62ed3e146102fc576100cf565b806342966c681461022b57806370a082311461024a57806379cc679014610270576100cf565b806306fdde03146100d4578063095ea7b31461015157806318160ddd1461019157806323b872dd146101ab578063313ce567146101e157806339509351146101ff575b600080fd5b6100dc61032a565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101165781810151838201526020016100fe565b50505050905090810190601f1680156101435780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017d6004803603604081101561016757600080fd5b506001600160a01b0381351690602001356103c0565b604080519115158252519081900360200190f35b6101996103dd565b60408051918252519081900360200190f35b61017d600480360360608110156101c157600080fd5b506001600160a01b038135811691602081013590911690604001356103e3565b6101e961046a565b6040805160ff9092168252519081900360200190f35b61017d6004803603604081101561021557600080fd5b506001600160a01b038135169060200135610473565b6102486004803603602081101561024157600080fd5b50356104c1565b005b6101996004803603602081101561026057600080fd5b50356001600160a01b03166104d5565b6102486004803603604081101561028657600080fd5b506001600160a01b0381351690602001356104f0565b6100dc61054a565b61017d600480360360408110156102ba57600080fd5b506001600160a01b0381351690602001356105ab565b61017d600480360360408110156102e657600080fd5b506001600160a01b038135169060200135610613565b6101996004803603604081101561031257600080fd5b506001600160a01b0381358116916020013516610627565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103b65780601f1061038b576101008083540402835291602001916103b6565b820191906000526020600020905b81548152906001019060200180831161039957829003601f168201915b5050505050905090565b60006103d46103cd6106b3565b84846106b7565b50600192915050565b60025490565b60006103f08484846107a3565b610460846103fc6106b3565b61045b85604051806060016040528060288152602001610b7c602891396001600160a01b038a1660009081526001602052604081209061043a6106b3565b6001600160a01b0316815260208101919091526040016000205491906108fe565b6106b7565b5060019392505050565b60055460ff1690565b60006103d46104806106b3565b8461045b85600160006104916106b3565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490610652565b6104d26104cc6106b3565b82610995565b50565b6001600160a01b031660009081526020819052604090205490565b600061052782604051806060016040528060248152602001610ba4602491396105208661051b6106b3565b610627565b91906108fe565b905061053b836105356106b3565b836106b7565b6105458383610995565b505050565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103b65780601f1061038b576101008083540402835291602001916103b6565b60006103d46105b86106b3565b8461045b85604051806060016040528060258152602001610c3260259139600160006105e26106b3565b6001600160a01b03908116825260208083019390935260409182016000908120918d168152925290205491906108fe565b60006103d46106206106b3565b84846107a3565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6000828201838110156106ac576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b3390565b6001600160a01b0383166106fc5760405162461bcd60e51b8152600401808060200182810382526024815260200180610c0e6024913960400191505060405180910390fd5b6001600160a01b0382166107415760405162461bcd60e51b8152600401808060200182810382526022815260200180610b346022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166107e85760405162461bcd60e51b8152600401808060200182810382526025815260200180610be96025913960400191505060405180910390fd5b6001600160a01b03821661082d5760405162461bcd60e51b8152600401808060200182810382526023815260200180610aef6023913960400191505060405180910390fd5b610838838383610545565b61087581604051806060016040528060268152602001610b56602691396001600160a01b03861660009081526020819052604090205491906108fe565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546108a49082610652565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000818484111561098d5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561095257818101518382015260200161093a565b50505050905090810190601f16801561097f5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b0382166109da5760405162461bcd60e51b8152600401808060200182810382526021815260200180610bc86021913960400191505060405180910390fd5b6109e682600083610545565b610a2381604051806060016040528060228152602001610b12602291396001600160a01b03851660009081526020819052604090205491906108fe565b6001600160a01b038316600090815260208190526040902055600254610a499082610a91565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b600082821115610ae8576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b5090039056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122029c1363cac061b85dfd87b4e50aa922eeffd81dfa86cb21a6390cd2d2319a48464736f6c63430007060033";

type ERC20BurnableMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20BurnableMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20BurnableMock__factory extends ContractFactory {
  constructor(...args: ERC20BurnableMockConstructorParams) {
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
    overrides?: NonPayableOverrides & { from?: string }
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
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      name,
      symbol,
      initialAccount,
      initialBalance,
      overrides || {}
    ) as Promise<
      ERC20BurnableMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC20BurnableMock__factory {
    return super.connect(runner) as ERC20BurnableMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20BurnableMockInterface {
    return new Interface(_abi) as ERC20BurnableMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC20BurnableMock {
    return new Contract(address, _abi, runner) as unknown as ERC20BurnableMock;
  }
}