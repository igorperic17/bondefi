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
import type { NonPayableOverrides } from "../../../../../../../common";
import type {
  ERC1155BurnableMock,
  ERC1155BurnableMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/ERC1155BurnableMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri",
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
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
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
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "burnBatch",
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
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200209738038062002097833981810160405260208110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052508291506200010290506301ffc9a760e01b62000139565b6200010d81620001be565b6200011f636cdb3d1360e11b62000139565b620001316303a24d0760e21b62000139565b505062000283565b6001600160e01b0319808216141562000199576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b8051620001d3906003906020840190620001d7565b5050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200020f57600085556200025a565b82601f106200022a57805160ff19168380011785556200025a565b828001600101855582156200025a579182015b828111156200025a5782518255916020019190600101906200023d565b50620002689291506200026c565b5090565b5b808211156200026857600081556001016200026d565b611e0480620002936000396000f3fe608060405234801561001057600080fd5b50600436106100a85760003560e01c80636b20c454116100715780636b20c454146104ee578063731133e914610621578063a22cb465146106e1578063e985e9c51461070f578063f242432a1461073d578063f5298aca14610806576100a8565b8062fdd58e146100ad57806301ffc9a7146100eb5780630e89341c146101265780632eb2c2d6146101b85780634e1273f41461037b575b600080fd5b6100d9600480360360408110156100c357600080fd5b506001600160a01b038135169060200135610838565b60408051918252519081900360200190f35b6101126004803603602081101561010157600080fd5b50356001600160e01b0319166108a7565b604080519115158252519081900360200190f35b6101436004803603602081101561013c57600080fd5b50356108c6565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561017d578181015183820152602001610165565b50505050905090810190601f1680156101aa5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610379600480360360a08110156101ce57600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561020157600080fd5b82018360208201111561021357600080fd5b803590602001918460208302840111600160201b8311171561023457600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561028357600080fd5b82018360208201111561029557600080fd5b803590602001918460208302840111600160201b831117156102b657600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561030557600080fd5b82018360208201111561031757600080fd5b803590602001918460018302840111600160201b8311171561033857600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061095e945050505050565b005b61049e6004803603604081101561039157600080fd5b810190602081018135600160201b8111156103ab57600080fd5b8201836020820111156103bd57600080fd5b803590602001918460208302840111600160201b831117156103de57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561042d57600080fd5b82018360208201111561043f57600080fd5b803590602001918460208302840111600160201b8311171561046057600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610c5c945050505050565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156104da5781810151838201526020016104c2565b505050509050019250505060405180910390f35b6103796004803603606081101561050457600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561052e57600080fd5b82018360208201111561054057600080fd5b803590602001918460208302840111600160201b8311171561056157600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156105b057600080fd5b8201836020820111156105c257600080fd5b803590602001918460208302840111600160201b831117156105e357600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610d48945050505050565b6103796004803603608081101561063757600080fd5b6001600160a01b038235169160208101359160408201359190810190608081016060820135600160201b81111561066d57600080fd5b82018360208201111561067f57600080fd5b803590602001918460018302840111600160201b831117156106a057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610dc1945050505050565b610379600480360360408110156106f757600080fd5b506001600160a01b0381351690602001351515610dd3565b6101126004803603604081101561072557600080fd5b506001600160a01b0381358116916020013516610ec2565b610379600480360360a081101561075357600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b81111561079257600080fd5b8201836020820111156107a457600080fd5b803590602001918460018302840111600160201b831117156107c557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610ef0945050505050565b6103796004803603606081101561081c57600080fd5b506001600160a01b0381351690602081013590604001356110bb565b60006001600160a01b03831661087f5760405162461bcd60e51b815260040180806020018281038252602b815260200180611c18602b913960400191505060405180910390fd5b5060009081526001602090815260408083206001600160a01b03949094168352929052205490565b6001600160e01b03191660009081526020819052604090205460ff1690565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156109525780601f1061092757610100808354040283529160200191610952565b820191906000526020600020905b81548152906001019060200180831161093557829003601f168201915b50505050509050919050565b815183511461099e5760405162461bcd60e51b8152600401808060200182810382526028815260200180611d866028913960400191505060405180910390fd5b6001600160a01b0384166109e35760405162461bcd60e51b8152600401808060200182810382526025815260200180611c906025913960400191505060405180910390fd5b6109eb61112f565b6001600160a01b0316856001600160a01b03161480610a165750610a1685610a1161112f565b610ec2565b610a515760405162461bcd60e51b8152600401808060200182810382526032815260200180611cb56032913960400191505060405180910390fd5b6000610a5b61112f565b9050610a6b818787878787610c54565b60005b8451811015610b6c576000858281518110610a8557fe5b602002602001015190506000858381518110610a9d57fe5b60200260200101519050610b0a816040518060600160405280602a8152602001611d0a602a91396001600086815260200190815260200160002060008d6001600160a01b03166001600160a01b03168152602001908152602001600020546111349092919063ffffffff16565b60008381526001602090815260408083206001600160a01b038e811685529252808320939093558a1681522054610b4190826111cb565b60009283526001602081815260408086206001600160a01b038d168752909152909320555001610a6e565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015610bf2578181015183820152602001610bda565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015610c31578181015183820152602001610c19565b5050505090500194505050505060405180910390a4610c5481878787878761122c565b505050505050565b60608151835114610c9e5760405162461bcd60e51b8152600401808060200182810382526029815260200180611d5d6029913960400191505060405180910390fd5b6000835167ffffffffffffffff81118015610cb857600080fd5b50604051908082528060200260200182016040528015610ce2578160200160208202803683370190505b50905060005b8451811015610d4057610d21858281518110610d0057fe5b6020026020010151858381518110610d1457fe5b6020026020010151610838565b828281518110610d2d57fe5b6020908102919091010152600101610ce8565b509392505050565b610d5061112f565b6001600160a01b0316836001600160a01b03161480610d765750610d7683610a1161112f565b610db15760405162461bcd60e51b8152600401808060200182810382526029815260200180611c676029913960400191505060405180910390fd5b610dbc8383836114ab565b505050565b610dcd84848484611719565b50505050565b816001600160a01b0316610de561112f565b6001600160a01b03161415610e2b5760405162461bcd60e51b8152600401808060200182810382526029815260200180611d346029913960400191505060405180910390fd5b8060026000610e3861112f565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610e7c61112f565b6001600160a01b03167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205460ff1690565b6001600160a01b038416610f355760405162461bcd60e51b8152600401808060200182810382526025815260200180611c906025913960400191505060405180910390fd5b610f3d61112f565b6001600160a01b0316856001600160a01b03161480610f635750610f6385610a1161112f565b610f9e5760405162461bcd60e51b8152600401808060200182810382526029815260200180611c676029913960400191505060405180910390fd5b6000610fa861112f565b9050610fc8818787610fb988611821565b610fc288611821565b87610c54565b61100f836040518060600160405280602a8152602001611d0a602a913960008781526001602090815260408083206001600160a01b038d1684529091529020549190611134565b60008581526001602090815260408083206001600160a01b038b8116855292528083209390935587168152205461104690846111cb565b60008581526001602090815260408083206001600160a01b03808b168086529184529382902094909455805188815291820187905280518a8416938616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a4610c54818787878787611866565b6110c361112f565b6001600160a01b0316836001600160a01b031614806110e957506110e983610a1161112f565b6111245760405162461bcd60e51b8152600401808060200182810382526029815260200180611c676029913960400191505060405180910390fd5b610dbc8383836119d7565b335b90565b600081848411156111c35760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611188578181015183820152602001611170565b50505050905090810190601f1680156111b55780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015611225576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b61123e846001600160a01b0316611b0a565b15610c5457836001600160a01b031663bc197c8187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b03168152602001806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b838110156112cc5781810151838201526020016112b4565b50505050905001848103835286818151815260200191508051906020019060200280838360005b8381101561130b5781810151838201526020016112f3565b50505050905001848103825285818151815260200191508051906020019080838360005b8381101561134757818101518382015260200161132f565b50505050905090810190601f1680156113745780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b15801561139957600080fd5b505af19250505080156113be57506040513d60208110156113b957600080fd5b505160015b611453576113ca611b16565b806113d5575061141c565b60405162461bcd60e51b8152602060048201818152835160248401528351849391928392604401919085019080838360008315611188578181015183820152602001611170565b60405162461bcd60e51b8152600401808060200182810382526034815260200180611bbc6034913960400191505060405180910390fd5b6001600160e01b0319811663bc197c8160e01b146114a25760405162461bcd60e51b8152600401808060200182810382526028815260200180611bf06028913960400191505060405180910390fd5b50505050505050565b6001600160a01b0383166114f05760405162461bcd60e51b8152600401808060200182810382526023815260200180611ce76023913960400191505060405180910390fd5b80518251146115305760405162461bcd60e51b8152600401808060200182810382526028815260200180611d866028913960400191505060405180910390fd5b600061153a61112f565b905061155a81856000868660405180602001604052806000815250610c54565b60005b8351811015611638576115ef83828151811061157557fe5b6020026020010151604051806060016040528060248152602001611c4360249139600160008886815181106115a657fe5b602002602001015181526020019081526020016000206000896001600160a01b03166001600160a01b03168152602001908152602001600020546111349092919063ffffffff16565b600160008684815181106115ff57fe5b602090810291909101810151825281810192909252604090810160009081206001600160a01b038a16825290925290205560010161155d565b5060006001600160a01b0316846001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b838110156116bf5781810151838201526020016116a7565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156116fe5781810151838201526020016116e6565b5050505090500194505050505060405180910390a450505050565b6001600160a01b03841661175e5760405162461bcd60e51b8152600401808060200182810382526021815260200180611dae6021913960400191505060405180910390fd5b600061176861112f565b905061177a81600087610fb988611821565b60008481526001602090815260408083206001600160a01b03891684529091529020546117a790846111cb565b60008581526001602090815260408083206001600160a01b03808b16808652918452828520959095558151898152928301889052815190948616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a461181a81600087878787611866565b5050505050565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061185557fe5b602090810291909101015292915050565b611878846001600160a01b0316611b0a565b15610c5457836001600160a01b031663f23a6e6187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b0316815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156119075781810151838201526020016118ef565b50505050905090810190601f1680156119345780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b15801561195757600080fd5b505af192505050801561197c57506040513d602081101561197757600080fd5b505160015b611988576113ca611b16565b6001600160e01b0319811663f23a6e6160e01b146114a25760405162461bcd60e51b8152600401808060200182810382526028815260200180611bf06028913960400191505060405180910390fd5b6001600160a01b038316611a1c5760405162461bcd60e51b8152600401808060200182810382526023815260200180611ce76023913960400191505060405180910390fd5b6000611a2661112f565b9050611a5681856000611a3887611821565b611a4187611821565b60405180602001604052806000815250610c54565b611a9d82604051806060016040528060248152602001611c436024913960008681526001602090815260408083206001600160a01b038b1684529091529020549190611134565b60008481526001602090815260408083206001600160a01b03808a16808652918452828520959095558151888152928301879052815193949093908616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a450505050565b3b151590565b60e01c90565b600060443d1015611b2657611131565b600481823e6308c379a0611b3a8251611b10565b14611b4457611131565b6040513d600319016004823e80513d67ffffffffffffffff8160248401118184111715611b745750505050611131565b82840192508251915080821115611b8e5750505050611131565b503d83016020828401011115611ba657505050611131565b601f01601f191681016020016040529150509056fe455243313135353a207472616e7366657220746f206e6f6e2045524331313535526563656976657220696d706c656d656e746572455243313135353a204552433131353552656365697665722072656a656374656420746f6b656e73455243313135353a2062616c616e636520717565727920666f7220746865207a65726f2061646472657373455243313135353a206275726e20616d6f756e7420657863656564732062616c616e6365455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a207472616e7366657220746f20746865207a65726f2061646472657373455243313135353a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a206275726e2066726f6d20746865207a65726f2061646472657373455243313135353a20696e73756666696369656e742062616c616e636520666f72207472616e73666572455243313135353a2073657474696e6720617070726f76616c2073746174757320666f722073656c66455243313135353a206163636f756e747320616e6420696473206c656e677468206d69736d61746368455243313135353a2069647320616e6420616d6f756e7473206c656e677468206d69736d61746368455243313135353a206d696e7420746f20746865207a65726f2061646472657373a26469706673582212202271e66c1b55011b297755413127271496700921da7fc00ef1d15675f51b713264736f6c63430007060033";

type ERC1155BurnableMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155BurnableMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155BurnableMock__factory extends ContractFactory {
  constructor(...args: ERC1155BurnableMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    uri: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(uri, overrides || {});
  }
  override deploy(
    uri: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(uri, overrides || {}) as Promise<
      ERC1155BurnableMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ERC1155BurnableMock__factory {
    return super.connect(runner) as ERC1155BurnableMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155BurnableMockInterface {
    return new Interface(_abi) as ERC1155BurnableMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC1155BurnableMock {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ERC1155BurnableMock;
  }
}
