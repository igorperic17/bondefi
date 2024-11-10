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
  ERC1155,
  ERC1155Interface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/token/ERC1155/ERC1155";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
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
  "0x60806040523480156200001157600080fd5b506040516200232938038062002329833981810160405260208110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052505050620001106301ffc9a760e01b6200015860201b60201c565b62000121816200026160201b60201c565b6200013963d9b67a2660e01b6200015860201b60201c565b62000151630e89341c60e01b6200015860201b60201c565b5062000333565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415620001f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433136353a20696e76616c696420696e746572666163652069640000000081525060200191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b8060039080519060200190620002799291906200027d565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620002b5576000855562000301565b82601f10620002d057805160ff191683800117855562000301565b8280016001018555821562000301579182015b8281111562000300578251825591602001919060010190620002e3565b5b50905062000310919062000314565b5090565b5b808211156200032f57600081600090555060010162000315565b5090565b611fe680620003436000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f41461041b578063a22cb465146105bc578063e985e9c51461060c578063f242432a1461068657610087565b8062fdd58e1461008c57806301ffc9a7146100ee5780630e89341c146101515780632eb2c2d6146101f8575b600080fd5b6100d8600480360360408110156100a257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610795565b6040518082815260200191505060405180910390f35b6101396004803603602081101561010457600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610875565b60405180821515815260200191505060405180910390f35b61017d6004803603602081101561016757600080fd5b81019080803590602001909291905050506108dc565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101bd5780820151818401526020810190506101a2565b50505050905090810190601f1680156101ea5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610419600480360360a081101561020e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561026b57600080fd5b82018360208201111561027d57600080fd5b8035906020019184602083028401116401000000008311171561029f57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156102ff57600080fd5b82018360208201111561031157600080fd5b8035906020019184602083028401116401000000008311171561033357600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561039357600080fd5b8201836020820111156103a557600080fd5b803590602001918460018302840111640100000000831117156103c757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610980565b005b6105656004803603604081101561043157600080fd5b810190808035906020019064010000000081111561044e57600080fd5b82018360208201111561046057600080fd5b8035906020019184602083028401116401000000008311171561048257600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156104e257600080fd5b8201836020820111156104f457600080fd5b8035906020019184602083028401116401000000008311171561051657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290505050610e0b565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156105a857808201518184015260208101905061058d565b505050509050019250505060405180910390f35b61060a600480360360408110156105d257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050610f1d565b005b61066e6004803603604081101561062257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506110b6565b60405180821515815260200191505060405180910390f35b610793600480360360a081101561069c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001909291908035906020019064010000000081111561070d57600080fd5b82018360208201111561071f57600080fd5b8035906020019184600183028401116401000000008311171561074157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061114a565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561081c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180611e62602b913960400191505060405180910390fd5b6001600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b606060038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109745780601f1061094957610100808354040283529160200191610974565b820191906000526020600020905b81548152906001019060200180831161095757829003601f168201915b50505050509050919050565b81518351146109da576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180611f896028913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610a60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180611eb66025913960400191505060405180910390fd5b610a686114bf565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161480610aae5750610aad85610aa86114bf565b6110b6565b5b610b03576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180611edb6032913960400191505060405180910390fd5b6000610b0d6114bf565b9050610b1d8187878787876114c7565b60005b8451811015610cee576000858281518110610b3757fe5b602002602001015190506000858381518110610b4f57fe5b60200260200101519050610bd6816040518060600160405280602a8152602001611f0d602a91396001600086815260200190815260200160002060008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114cf9092919063ffffffff16565b6001600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610c8d816001600085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461158990919063ffffffff16565b6001600084815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050806001019050610b20565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015610d9e578082015181840152602081019050610d83565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015610de0578082015181840152602081019050610dc5565b5050505090500194505050505060405180910390a4610e03818787878787611611565b505050505050565b60608151835114610e67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180611f606029913960400191505060405180910390fd5b6000835167ffffffffffffffff81118015610e8157600080fd5b50604051908082528060200260200182016040528015610eb05781602001602082028036833780820191505090505b50905060005b8451811015610f1257610eef858281518110610ece57fe5b6020026020010151858381518110610ee257fe5b6020026020010151610795565b828281518110610efb57fe5b602002602001018181525050806001019050610eb6565b508091505092915050565b8173ffffffffffffffffffffffffffffffffffffffff16610f3c6114bf565b73ffffffffffffffffffffffffffffffffffffffff161415610fa9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180611f376029913960400191505060405180910390fd5b8060026000610fb66114bf565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff166110636114bf565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156111d0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180611eb66025913960400191505060405180910390fd5b6111d86114bf565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061121e575061121d856112186114bf565b6110b6565b5b611273576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180611e8d6029913960400191505060405180910390fd5b600061127d6114bf565b905061129d81878761128e886119a0565b611297886119a0565b876114c7565b61131a836040518060600160405280602a8152602001611f0d602a91396001600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114cf9092919063ffffffff16565b6001600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506113d1836001600087815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461158990919063ffffffff16565b6001600086815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628787604051808381526020018281526020019250505060405180910390a46114b7818787878787611a11565b505050505050565b600033905090565b505050505050565b600083831115829061157c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611541578082015181840152602081019050611526565b50505050905090810190601f16801561156e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5082840390509392505050565b600080828401905083811015611607576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b6116308473ffffffffffffffffffffffffffffffffffffffff16611d1e565b15611998578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401808673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b838110156116e85780820151818401526020810190506116cd565b50505050905001848103835286818151815260200191508051906020019060200280838360005b8381101561172a57808201518184015260208101905061170f565b50505050905001848103825285818151815260200191508051906020019080838360005b8381101561176957808201518184015260208101905061174e565b50505050905090810190601f1680156117965780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b1580156117bb57600080fd5b505af19250505080156117ef57506040513d60208110156117db57600080fd5b810190808051906020019092919050505060015b6118f9576117fb611d4f565b8061180657506118a8565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561186d578082015181840152602081019050611852565b50505050905090810190601f16801561189a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526034815260200180611e066034913960400191505060405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611996576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180611e3a6028913960400191505060405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff811180156119bc57600080fd5b506040519080825280602002602001820160405280156119eb5781602001602082028036833780820191505090505b50905082816000815181106119fc57fe5b60200260200101818152505080915050919050565b611a308473ffffffffffffffffffffffffffffffffffffffff16611d1e565b15611d16578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401808673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611ae9578082015181840152602081019050611ace565b50505050905090810190601f168015611b165780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b158015611b3957600080fd5b505af1925050508015611b6d57506040513d6020811015611b5957600080fd5b810190808051906020019092919050505060015b611c7757611b79611d4f565b80611b845750611c26565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611beb578082015181840152602081019050611bd0565b50505050905090810190601f168015611c185780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526034815260200180611e066034913960400191505060405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611d14576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180611e3a6028913960400191505060405180910390fd5b505b505050505050565b600080823b905060008111915050919050565b6000601f19601f8301169050919050565b60008160e01c9050919050565b600060443d1015611d5f57611e02565b60046000803e611d70600051611d42565b6308c379a08114611d815750611e02565b60405160043d036004823e80513d602482011167ffffffffffffffff82111715611dad57505050611e02565b808201805167ffffffffffffffff811115611dcc575050505050611e02565b8060208301013d8501811115611de757505050505050611e02565b611df082611d31565b60208401016040528296505050505050505b9056fe455243313135353a207472616e7366657220746f206e6f6e2045524331313535526563656976657220696d706c656d656e746572455243313135353a204552433131353552656365697665722072656a656374656420746f6b656e73455243313135353a2062616c616e636520717565727920666f7220746865207a65726f2061646472657373455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a207472616e7366657220746f20746865207a65726f2061646472657373455243313135353a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a20696e73756666696369656e742062616c616e636520666f72207472616e73666572455243313135353a2073657474696e6720617070726f76616c2073746174757320666f722073656c66455243313135353a206163636f756e747320616e6420696473206c656e677468206d69736d61746368455243313135353a2069647320616e6420616d6f756e7473206c656e677468206d69736d61746368a26469706673582212207f648c37a971c20e4c40bcee70b17f5e728eb2adc6905acccb42c577dedf098364736f6c63430007060033";

type ERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155__factory extends ContractFactory {
  constructor(...args: ERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    uri_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  override deploy(
    uri_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(uri_, overrides || {}) as Promise<
      ERC1155 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC1155__factory {
    return super.connect(runner) as ERC1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155Interface {
    return new Interface(_abi) as ERC1155Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC1155 {
    return new Contract(address, _abi, runner) as unknown as ERC1155;
  }
}
