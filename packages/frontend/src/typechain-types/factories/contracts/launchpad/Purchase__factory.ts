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
import type { NonPayableOverrides } from "../../../common";
import type {
  Purchase,
  PurchaseInterface,
} from "../../../contracts/launchpad/Purchase";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ERC721EnumerableForbiddenBatchMint",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "ERC721OutOfBoundsIndex",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "owner",
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
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FeesCollected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimEnabled",
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
    name: "claimableToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collateralToken",
    outputs: [
      {
        internalType: "contract IERC20",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "collectFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enableClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "_collateralToken",
        type: "address",
      },
      {
        internalType: "string",
        name: "nftTokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "nftTokenSymbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "metadataURI",
        type: "string",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "lastPurchaseId",
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
    name: "launchId",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "launchpad",
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
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "collateralAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
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
    name: "owner",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "purchaseBalances",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "collateralAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
        ],
        internalType: "struct PurchaseBalance",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "refundEnabled",
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
    name: "renounceOwnership",
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
        name: "tokenId",
        type: "uint256",
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
        name: "tokenId",
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
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "setRefundState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_claimableToken",
        type: "address",
      },
    ],
    name: "setTokenAddress",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
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
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
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
    name: "tokenSymbol",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060408051602080820183526000808352835191820190935282815261dead926200003d83826200018c565b5060016200004c82826200018c565b5050506001600160a01b0381166200007e57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000898162000095565b506001600b5562000258565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200011257607f821691505b6020821081036200013357634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200018757600081815260208120601f850160051c81016020861015620001625750805b601f850160051c820191505b8181101562000183578281556001016200016e565b5050505b505050565b81516001600160401b03811115620001a857620001a8620000e7565b620001c081620001b98454620000fd565b8462000139565b602080601f831160018114620001f85760008415620001df5750858301515b600019600386901b1c1916600185901b17855562000183565b600085815260208120601f198616915b82811015620002295788860151825594840194600190910190840162000208565b5085821015620002485787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611eed80620002686000396000f3fe608060405234801561001057600080fd5b506004361061021c5760003560e01c80634f6ccce711610125578063a033fcd4116100ad578063c87b56dd1161007c578063c87b56dd146104cc578063d4e37433146104df578063e985e9c5146104f2578063f2fde38b14610505578063f6d6d5aa1461051857600080fd5b8063a033fcd414610480578063a22cb46514610493578063b2016bd4146104a6578063b88d4fde146104b957600080fd5b806370a08231116100f457806370a0823114610444578063715018a6146104575780637b61c3201461045f5780638da5cb5b1461046757806395d89b411461047857600080fd5b80634f6ccce7146103ae57806361fa86e6146103c15780636352211e146103ca57806369df72ad146103dd57600080fd5b806326a4e8d2116101a85780632f745c59116101775780632f745c591461033c57806335f6efa91461034f578063379607f51461037b57806342842e0e1461038e5780634c4a386f146103a157600080fd5b806326a4e8d2146102fc578063278ecde11461030f5780632866ed211461032257806328dae6e31461033457600080fd5b806308277dda116101ef57806308277dda1461029c578063095ea7b3146102b1578063156e29f6146102c457806318160ddd146102d757806323b872dd146102e957600080fd5b806301ffc9a71461022157806302669b521461024957806306fdde0314610274578063081812fc14610289575b600080fd5b61023461022f3660046118bd565b61052b565b60405190151581526020015b60405180910390f35b600f5461025c906001600160a01b031681565b6040516001600160a01b039091168152602001610240565b61027c610556565b604051610240919061192a565b61025c61029736600461193d565b6105e8565b6102af6102aa366004611a1e565b610611565b005b6102af6102bf366004611ac8565b610671565b6102af6102d2366004611af2565b610680565b6008545b604051908152602001610240565b6102af6102f7366004611b25565b6106cb565b6102af61030a366004611b61565b61075b565b6102af61031d36600461193d565b610785565b60145461023490610100900460ff1681565b6102af610856565b6102db61034a366004611ac8565b6108c7565b600f5461036690600160a01b900463ffffffff1681565b60405163ffffffff9091168152602001610240565b6102af61038936600461193d565b61092c565b6102af61039c366004611b25565b6109d5565b6014546102349060ff1681565b6102db6103bc36600461193d565b6109f5565b6102db60135481565b61025c6103d836600461193d565b610a4e565b6104296103eb36600461193d565b604080518082019091526000808252602082015250600090815260156020908152604091829020825180840190935280548352600101549082015290565b60408051825181526020928301519281019290925201610240565b6102db610452366004611b61565b610a59565b6102af610aa1565b61027c610ab5565b600a546001600160a01b031661025c565b61027c610b43565b6102af61048e366004611ac8565b610b52565b6102af6104a1366004611b8c565b610c50565b60105461025c906001600160a01b031681565b6102af6104c7366004611bbf565b610c5b565b61027c6104da36600461193d565b610c73565b6102af6104ed366004611c3b565b610cdb565b610234610500366004611c56565b610d3e565b6102af610513366004611b61565b610d6c565b60115461025c906001600160a01b031681565b60006001600160e01b0319821663780e9d6360e01b1480610550575061055082610da7565b92915050565b6060600c805461056590611c80565b80601f016020809104026020016040519081016040528092919081815260200182805461059190611c80565b80156105de5780601f106105b3576101008083540402835291602001916105de565b820191906000526020600020905b8154815290600101906020018083116105c157829003601f168201915b5050505050905090565b60006105f382610df7565b506000828152600460205260409020546001600160a01b0316610550565b600f8054336001600160a01b031991821617909155601080549091166001600160a01b038716179055600c6106468582611d00565b50600d6106538482611d00565b50600e6106608382611d00565b5061066a81610e30565b5050505050565b61067c828233610e82565b5050565b610688610e8f565b6106a58360136000815461069b90611dd6565b9182905550610ebc565b601380546000908152601560205260408082209490945590548152919091206001015550565b6001600160a01b0382166106fa57604051633250574960e11b8152600060048201526024015b60405180910390fd5b6000610707838333610f21565b9050836001600160a01b0316816001600160a01b031614610755576040516364283d7b60e01b81526001600160a01b03808616600483015260248201849052821660448201526064016106f1565b50505050565b610763610e8f565b601180546001600160a01b0319166001600160a01b0392909216919091179055565b61078d610ff6565b610795610e8f565b6010546001600160a01b03166107ed5760405162461bcd60e51b815260206004820152601a60248201527f436f6c6c61746572616c2061646472657373206e6f742073657400000000000060448201526064016106f1565b60008181526002602052604090205461082b906001600160a01b03166000838152601560205260409020546010546001600160a01b03169190611020565b60008181526015602052604081208181556001015561084981611072565b6108536001600b55565b50565b61085e610e8f565b601454610100900460ff16156108b65760405162461bcd60e51b815260206004820152601e60248201527f436c61696d2068617320616c7265616479206265656e20656e61626c6564000060448201526064016106f1565b6014805461ff001916610100179055565b60006108d283610a59565b82106109035760405163295f44f760e21b81526001600160a01b0384166004820152602481018390526044016106f1565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b610934610ff6565b61093c610e8f565b6011546001600160a01b03166109945760405162461bcd60e51b815260206004820152601f60248201527f436c61696d61626c6520746f6b656e2061646472657373206e6f74207365740060448201526064016106f1565b60008181526002602052604090205461082b906001600160a01b03166000838152601560205260409020600101546011546001600160a01b03169190611020565b6109f083838360405180602001604052806000815250610c5b565b505050565b6000610a0060085490565b8210610a295760405163295f44f760e21b815260006004820152602481018390526044016106f1565b60088281548110610a3c57610a3c611def565b90600052602060002001549050919050565b600061055082610df7565b60006001600160a01b038216610a85576040516322718ad960e21b8152600060048201526024016106f1565b506001600160a01b031660009081526003602052604090205490565b610aa9610e8f565b610ab36000610e30565b565b60128054610ac290611c80565b80601f0160208091040260200160405190810160405280929190818152602001828054610aee90611c80565b8015610b3b5780601f10610b1057610100808354040283529160200191610b3b565b820191906000526020600020905b815481529060010190602001808311610b1e57829003601f168201915b505050505081565b6060600d805461056590611c80565b610b5a610e8f565b6001600160a01b038216610ba25760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b60448201526064016106f1565b60008111610bf25760405162461bcd60e51b815260206004820152601d60248201527f416d6f756e74206d7573742062652067726561746572207468616e203000000060448201526064016106f1565b601054610c09906001600160a01b03168383611020565b816001600160a01b03167f9dc46f23cfb5ddcad0ae7ea2be38d47fec07bb9382ec7e564efc69e036dd66ce82604051610c4491815260200190565b60405180910390a25050565b61067c3383836110ad565b610c668484846106cb565b610755338585858561114c565b6060610c7e82610df7565b506000610c89611276565b90506000815111610ca95760405180602001604052806000815250610cd4565b80610cb384611285565b604051602001610cc4929190611e05565b6040516020818303038152906040525b9392505050565b610ce3610e8f565b60145481151560ff909116151503610d2b5760405162461bcd60e51b815260206004820152600b60248201526a105b1c9958591e481cd95d60aa1b60448201526064016106f1565b6014805460ff1916911515919091179055565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b610d74610e8f565b6001600160a01b038116610d9e57604051631e4fbdf760e01b8152600060048201526024016106f1565b61085381610e30565b60006001600160e01b031982166380ac58cd60e01b1480610dd857506001600160e01b03198216635b5e139f60e01b145b8061055057506301ffc9a760e01b6001600160e01b0319831614610550565b6000818152600260205260408120546001600160a01b03168061055057604051637e27328960e01b8152600481018490526024016106f1565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6109f08383836001611318565b600a546001600160a01b03163314610ab35760405163118cdaa760e01b81523360048201526024016106f1565b6001600160a01b038216610ee657604051633250574960e11b8152600060048201526024016106f1565b6000610ef483836000610f21565b90506001600160a01b038116156109f0576040516339e3563760e11b8152600060048201526024016106f1565b600080610f2f85858561141e565b90506001600160a01b038116610f8c57610f8784600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b610faf565b846001600160a01b0316816001600160a01b031614610faf57610faf8185611517565b6001600160a01b038516610fcb57610fc684611598565b610fee565b846001600160a01b0316816001600160a01b031614610fee57610fee8585611647565b949350505050565b6002600b540361101957604051633ee5aeb560e01b815260040160405180910390fd5b6002600b55565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526109f0908490611697565b60006110816000836000610f21565b90506001600160a01b03811661067c57604051637e27328960e01b8152600481018390526024016106f1565b6001600160a01b0382166110df57604051630b61174360e31b81526001600160a01b03831660048201526024016106f1565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b1561066a57604051630a85bd0160e11b81526001600160a01b0384169063150b7a029061118e908890889087908790600401611e34565b6020604051808303816000875af19250505080156111c9575060408051601f3d908101601f191682019092526111c691810190611e71565b60015b611232573d8080156111f7576040519150601f19603f3d011682016040523d82523d6000602084013e6111fc565b606091505b50805160000361122a57604051633250574960e11b81526001600160a01b03851660048201526024016106f1565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b1461126e57604051633250574960e11b81526001600160a01b03851660048201526024016106f1565b505050505050565b6060600e805461056590611c80565b6060600061129283611708565b600101905060008167ffffffffffffffff8111156112b2576112b2611972565b6040519080825280601f01601f1916602001820160405280156112dc576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846112e657509392505050565b808061132c57506001600160a01b03821615155b156113ee57600061133c84610df7565b90506001600160a01b038316158015906113685750826001600160a01b0316816001600160a01b031614155b801561137b57506113798184610d3e565b155b156113a45760405163a9fbf51f60e01b81526001600160a01b03841660048201526024016106f1565b81156113ec5783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b6000828152600260205260408120546001600160a01b039081169083161561144b5761144b8184866117e0565b6001600160a01b0381161561148957611468600085600080611318565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b038516156114b8576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b600061152283610a59565b6000838152600760209081526040808320546001600160a01b038816845260069092529091209192509081831461157957600083815260208281526040808320548584528184208190558352600790915290208290555b6000938452600760209081526040808620869055938552525081205550565b6008546000906115aa90600190611e8e565b600083815260096020526040812054600880549394509092849081106115d2576115d2611def565b9060005260206000200154905080600883815481106115f3576115f3611def565b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061162b5761162b611ea1565b6001900381819060005260206000200160009055905550505050565b6000600161165484610a59565b61165e9190611e8e565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b600080602060008451602086016000885af1806116ba576040513d6000823e3d81fd5b50506000513d915081156116d25780600114156116df565b6001600160a01b0384163b155b1561075557604051635274afe760e01b81526001600160a01b03851660048201526024016106f1565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106117475772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611773576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061179157662386f26fc10000830492506010015b6305f5e10083106117a9576305f5e100830492506008015b61271083106117bd57612710830492506004015b606483106117cf576064830492506002015b600a83106105505760010192915050565b6117eb838383611844565b6109f0576001600160a01b03831661181957604051637e27328960e01b8152600481018290526024016106f1565b60405163177e802f60e01b81526001600160a01b0383166004820152602481018290526044016106f1565b60006001600160a01b03831615801590610fee5750826001600160a01b0316846001600160a01b0316148061187e575061187e8484610d3e565b80610fee5750506000908152600460205260409020546001600160a01b03908116911614919050565b6001600160e01b03198116811461085357600080fd5b6000602082840312156118cf57600080fd5b8135610cd4816118a7565b60005b838110156118f55781810151838201526020016118dd565b50506000910152565b600081518084526119168160208601602086016118da565b601f01601f19169290920160200192915050565b602081526000610cd460208301846118fe565b60006020828403121561194f57600080fd5b5035919050565b80356001600160a01b038116811461196d57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156119a3576119a3611972565b604051601f8501601f19908116603f011681019082821181831017156119cb576119cb611972565b816040528093508581528686860111156119e457600080fd5b858560208301376000602087830101525050509392505050565b600082601f830112611a0f57600080fd5b610cd483833560208501611988565b600080600080600060a08688031215611a3657600080fd5b611a3f86611956565b9450602086013567ffffffffffffffff80821115611a5c57600080fd5b611a6889838a016119fe565b95506040880135915080821115611a7e57600080fd5b611a8a89838a016119fe565b94506060880135915080821115611aa057600080fd5b50611aad888289016119fe565b925050611abc60808701611956565b90509295509295909350565b60008060408385031215611adb57600080fd5b611ae483611956565b946020939093013593505050565b600080600060608486031215611b0757600080fd5b611b1084611956565b95602085013595506040909401359392505050565b600080600060608486031215611b3a57600080fd5b611b4384611956565b9250611b5160208501611956565b9150604084013590509250925092565b600060208284031215611b7357600080fd5b610cd482611956565b8035801515811461196d57600080fd5b60008060408385031215611b9f57600080fd5b611ba883611956565b9150611bb660208401611b7c565b90509250929050565b60008060008060808587031215611bd557600080fd5b611bde85611956565b9350611bec60208601611956565b925060408501359150606085013567ffffffffffffffff811115611c0f57600080fd5b8501601f81018713611c2057600080fd5b611c2f87823560208401611988565b91505092959194509250565b600060208284031215611c4d57600080fd5b610cd482611b7c565b60008060408385031215611c6957600080fd5b611c7283611956565b9150611bb660208401611956565b600181811c90821680611c9457607f821691505b602082108103611cb457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156109f057600081815260208120601f850160051c81016020861015611ce15750805b601f850160051c820191505b8181101561126e57828155600101611ced565b815167ffffffffffffffff811115611d1a57611d1a611972565b611d2e81611d288454611c80565b84611cba565b602080601f831160018114611d635760008415611d4b5750858301515b600019600386901b1c1916600185901b17855561126e565b600085815260208120601f198616915b82811015611d9257888601518255948401946001909101908401611d73565b5085821015611db05787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600060018201611de857611de8611dc0565b5060010190565b634e487b7160e01b600052603260045260246000fd5b60008351611e178184602088016118da565b835190830190611e2b8183602088016118da565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611e67908301846118fe565b9695505050505050565b600060208284031215611e8357600080fd5b8151610cd4816118a7565b8181038181111561055057610550611dc0565b634e487b7160e01b600052603160045260246000fdfea264697066735822122087de3949601413fe35af2592e2d0eae0ffe89e29310a99c0ee712b703a97237464736f6c63430008140033";

type PurchaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PurchaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Purchase__factory extends ContractFactory {
  constructor(...args: PurchaseConstructorParams) {
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
      Purchase & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Purchase__factory {
    return super.connect(runner) as Purchase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PurchaseInterface {
    return new Interface(_abi) as PurchaseInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Purchase {
    return new Contract(address, _abi, runner) as unknown as Purchase;
  }
}