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
  GSNRecipientERC20Fee,
  GSNRecipientERC20FeeInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/GSN/GSNRecipientERC20Fee.sol/GSNRecipientERC20Fee";

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
        name: "oldRelayHub",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newRelayHub",
        type: "address",
      },
    ],
    name: "RelayHubChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "transactionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gasPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "maxPossibleCharge",
        type: "uint256",
      },
    ],
    name: "acceptRelayedCall",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHubAddr",
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
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "actualCharge",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "preRetVal",
        type: "bytes32",
      },
    ],
    name: "postRelayedCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
    ],
    name: "preRelayedCall",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "relayHubVersion",
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
    name: "token",
    outputs: [
      {
        internalType: "contract __unstable__ERC20Owned",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600080546001600160a01b03191673d216153c06e857cd7f72665e0af1d7d82172f4941790553480156200003757600080fd5b506040516200210638038062002106833981810160405260408110156200005d57600080fd5b81019080805160405193929190846401000000008211156200007e57600080fd5b9083019060208201858111156200009457600080fd5b8251640100000000811182820188101715620000af57600080fd5b82525081516020918201929091019080838360005b83811015620000de578181015183820152602001620000c4565b50505050905090810190601f1680156200010c5780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200013057600080fd5b9083019060208201858111156200014657600080fd5b82516401000000008111828201881017156200016157600080fd5b82525081516020918201929091019080838360005b838110156200019057818101518382015260200162000176565b50505050905090810190601f168015620001be5780820380516001836020036101000a031916815260200191505b506040525050508181604051620001d590620002f1565b604080825283519082015282518190602080830191606084019187019080838360005b8381101562000212578181015183820152602001620001f8565b50505050905090810190601f168015620002405780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b83811015620002755781810151838201526020016200025b565b50505050905090810190601f168015620002a35780820380516001836020036101000a031916815260200191505b50945050505050604051809103906000f080158015620002c7573d6000803e3d6000fd5b50600180546001600160a01b0319166001600160a01b039290921691909117905550620002ff9050565b6112098062000efd83390190565b610bee806200030f6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806374e861d61461006757806380274db71461008b57806383947ea014610141578063ad61ccd51461031d578063e06e0e221461039a578063fc0c546a1461044d575b600080fd5b61006f610455565b604080516001600160a01b039092168252519081900360200190f35b61012f600480360360208110156100a157600080fd5b810190602081018135600160201b8111156100bb57600080fd5b8201836020820111156100cd57600080fd5b803590602001918460018302840111600160201b831117156100ee57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610464945050505050565b60408051918252519081900360200190f35b61029e600480360361012081101561015857600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561018b57600080fd5b82018360208201111561019d57600080fd5b803590602001918460018302840111600160201b831117156101be57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929584359560208601359560408101359550606081013594509192509060a081019060800135600160201b81111561022857600080fd5b82018360208201111561023a57600080fd5b803590602001918460018302840111600160201b8311171561025b57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050913592506104cc915050565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b838110156102e15781810151838201526020016102c9565b50505050905090810190601f16801561030e5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b6103256105c0565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561035f578181015183820152602001610347565b50505050905090810190601f16801561038c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61044b600480360360808110156103b057600080fd5b810190602081018135600160201b8111156103ca57600080fd5b8201836020820111156103dc57600080fd5b803590602001918460018302840111600160201b831117156103fd57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550505050803515159150602081013590604001356105df565b005b61006f610648565b6000546001600160a01b031690565b600061046e610455565b6001600160a01b0316336001600160a01b0316146104bd5760405162461bcd60e51b8152600401808060200182810382526024815260200180610b6b6024913960400191505060405180910390fd5b6104c682610657565b92915050565b60006060826104d9610648565b6001600160a01b03166370a082318c6040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561052557600080fd5b505afa158015610539573d6000803e3d6000fd5b505050506040513d602081101561054f57600080fd5b5051101561056a5761056160006106a8565b915091506105b2565b604080516001600160a01b038c166020820152808201859052606081018a905260808082018a90528251808303909101815260a09091019091526105ad906106c0565b915091505b995099975050505050505050565b6040805180820190915260058152640312e302e360dc1b602082015290565b6105e7610455565b6001600160a01b0316336001600160a01b0316146106365760405162461bcd60e51b8152600401808060200182810382526024815260200180610b6b6024913960400191505060405180910390fd5b610642848484846106c5565b50505050565b6001546001600160a01b031690565b600080600083806020019051604081101561067157600080fd5b508051602090910151909250905061069e82308361068d610648565b6001600160a01b0316929190610757565b5060009392505050565b604080516020810190915260008152600b9190910191565b600091565b6000806000808780602001905160808110156106e057600080fd5b50805160208201516040830151606090930151919650945090925090506000610718610711620186a06127106107b1565b838561080e565b905061072487826107b1565b965061074c85610734868a6107b1565b61073c610648565b6001600160a01b03169190610820565b505050505050505050565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052610642908590610877565b600082821115610808576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b606481810183850202045b9392505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b179052610872908490610877565b505050565b60006108cc826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166109289092919063ffffffff16565b805190915015610872578080602001905160208110156108eb57600080fd5b50516108725760405162461bcd60e51b815260040180806020018281038252602a815260200180610b8f602a913960400191505060405180910390fd5b6060610937848460008561093f565b949350505050565b6060824710156109805760405162461bcd60e51b8152600401808060200182810382526026815260200180610b456026913960400191505060405180910390fd5b61098985610a9a565b6109da576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600080866001600160a01b031685876040518082805190602001908083835b60208310610a185780518252601f1990920191602091820191016109f9565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114610a7a576040519150601f19603f3d011682016040523d82523d6000602084013e610a7f565b606091505b5091509150610a8f828286610aa0565b979650505050505050565b3b151590565b60608315610aaf575081610819565b825115610abf5782518084602001fd5b8160405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b09578181015183820152602001610af1565b50505050905090810190601f168015610b365780820380516001836020036101000a031916815260200191505b509250505060405180910390fdfe416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c47534e526563697069656e743a2063616c6c6572206973206e6f742052656c61794875625361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a26469706673582212208981d803c149a244132abf07594921d0e199b1909c372ad45900f824277839ac64736f6c6343000706003360806040523480156200001157600080fd5b506040516200120938038062001209833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604052505082518391508290620001b89060039060208501906200024c565b508051620001ce9060049060208401906200024c565b50506005805460ff19166012179055506000620001ea62000248565b60058054610100600160a81b0319166101006001600160a01b03841690810291909117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3505050620002f8565b3390565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620002845760008555620002cf565b82601f106200029f57805160ff1916838001178555620002cf565b82800160010185558215620002cf579182015b82811115620002cf578251825591602001919060010190620002b2565b50620002dd929150620002e1565b5090565b5b80821115620002dd5760008155600101620002e2565b610f0180620003086000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a457c2d711610066578063a457c2d7146102d9578063a9059cbb14610305578063dd62ed3e14610331578063f2fde38b1461035f576100f5565b806370a082311461027f578063715018a6146102a55780638da5cb5b146102ad57806395d89b41146102d1576100f5565b806323b872dd116100d357806323b872dd146101d1578063313ce56714610207578063395093511461022557806340c10f1914610251576100f5565b806306fdde03146100fa578063095ea7b31461017757806318160ddd146101b7575b600080fd5b610102610385565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561013c578181015183820152602001610124565b50505050905090810190601f1680156101695780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101a36004803603604081101561018d57600080fd5b506001600160a01b03813516906020013561041b565b604080519115158252519081900360200190f35b6101bf610439565b60408051918252519081900360200190f35b6101a3600480360360608110156101e757600080fd5b506001600160a01b0381358116916020810135909116906040013561043f565b61020f61048a565b6040805160ff9092168252519081900360200190f35b6101a36004803603604081101561023b57600080fd5b506001600160a01b038135169060200135610493565b61027d6004803603604081101561026757600080fd5b506001600160a01b0381351690602001356104e6565b005b6101bf6004803603602081101561029557600080fd5b50356001600160a01b0316610568565b61027d610583565b6102b5610647565b604080516001600160a01b039092168252519081900360200190f35b61010261065b565b6101a3600480360360408110156102ef57600080fd5b506001600160a01b0381351690602001356106bc565b6101a36004803603604081101561031b57600080fd5b506001600160a01b038135169060200135610724565b6101bf6004803603604081101561034757600080fd5b506001600160a01b0381358116916020013516610738565b61027d6004803603602081101561037557600080fd5b50356001600160a01b0316610775565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104115780601f106103e657610100808354040283529160200191610411565b820191906000526020600020905b8154815290600101906020018083116103f457829003601f168201915b5050505050905090565b600061042f610428610895565b8484610899565b5060015b92915050565b60025490565b6000610449610647565b6001600160a01b0316836001600160a01b031614156104755761046d8484846108cf565b506001610483565b610480848484610a2a565b90505b9392505050565b60055460ff1690565b600061042f6104a0610895565b846104e185600160006104b1610895565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490610aac565b610899565b6104ee610895565b6001600160a01b03166104ff610647565b6001600160a01b03161461055a576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6105648282610b06565b5050565b6001600160a01b031660009081526020819052604090205490565b61058b610895565b6001600160a01b031661059c610647565b6001600160a01b0316146105f7576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60055460405160009161010090046001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a360058054610100600160a81b0319169055565b60055461010090046001600160a01b031690565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104115780601f106103e657610100808354040283529160200191610411565b600061042f6106c9610895565b846104e185604051806060016040528060258152602001610ea760259139600160006106f3610895565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190610bf6565b600061042f610731610895565b84846108cf565b6000610742610647565b6001600160a01b0316826001600160a01b031614156107645750600019610433565b61076e8383610c8d565b9050610433565b61077d610895565b6001600160a01b031661078e610647565b6001600160a01b0316146107e9576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03811661082e5760405162461bcd60e51b8152600401808060200182810382526026815260200180610dc86026913960400191505060405180910390fd5b6005546040516001600160a01b0380841692610100900416907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600580546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b3390565b6108a1610647565b6001600160a01b0316826001600160a01b031614156108bf576108ca565b6108ca838383610cb8565b505050565b6001600160a01b0383166109145760405162461bcd60e51b8152600401808060200182810382526025815260200180610e5e6025913960400191505060405180910390fd5b6001600160a01b0382166109595760405162461bcd60e51b8152600401808060200182810382526023815260200180610da56023913960400191505060405180910390fd5b6109648383836108ca565b6109a181604051806060016040528060268152602001610e10602691396001600160a01b0386166000908152602081905260409020549190610bf6565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546109d09082610aac565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000610a378484846108cf565b610aa284610a43610895565b6104e185604051806060016040528060288152602001610e36602891396001600160a01b038a16600090815260016020526040812090610a81610895565b6001600160a01b031681526020810191909152604001600020549190610bf6565b5060019392505050565b600082820183811015610483576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6001600160a01b038216610b61576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b610b6d600083836108ca565b600254610b7a9082610aac565b6002556001600160a01b038216600090815260208190526040902054610ba09082610aac565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b60008184841115610c855760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610c4a578181015183820152602001610c32565b50505050905090810190601f168015610c775780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b038316610cfd5760405162461bcd60e51b8152600401808060200182810382526024815260200180610e836024913960400191505060405180910390fd5b6001600160a01b038216610d425760405162461bcd60e51b8152600401808060200182810382526022815260200180610dee6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a350505056fe45524332303a207472616e7366657220746f20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212200f9e1099482f5b585d58e832ce3a75cc2b5c476820fa18c19aaf5026897e607064736f6c63430007060033";

type GSNRecipientERC20FeeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GSNRecipientERC20FeeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GSNRecipientERC20Fee__factory extends ContractFactory {
  constructor(...args: GSNRecipientERC20FeeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override deploy(
    name: string,
    symbol: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name, symbol, overrides || {}) as Promise<
      GSNRecipientERC20Fee & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): GSNRecipientERC20Fee__factory {
    return super.connect(runner) as GSNRecipientERC20Fee__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GSNRecipientERC20FeeInterface {
    return new Interface(_abi) as GSNRecipientERC20FeeInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): GSNRecipientERC20Fee {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as GSNRecipientERC20Fee;
  }
}
