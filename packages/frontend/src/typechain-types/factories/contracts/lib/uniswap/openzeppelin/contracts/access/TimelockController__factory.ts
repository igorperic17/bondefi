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
  TimelockController,
  TimelockControllerInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/access/TimelockController";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minDelay",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "proposers",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "executors",
        type: "address[]",
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
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "CallExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "delay",
        type: "uint256",
      },
    ],
    name: "CallScheduled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "Cancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldDuration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newDuration",
        type: "uint256",
      },
    ],
    name: "MinDelayChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
    inputs: [],
    name: "EXECUTOR_ROLE",
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
    inputs: [],
    name: "PROPOSER_ROLE",
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
    inputs: [],
    name: "TIMELOCK_ADMIN_ROLE",
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
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
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
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "datas",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "executeBatch",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMinDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "getTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        name: "target",
        type: "address",
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
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "hashOperation",
    outputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "datas",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
    ],
    name: "hashOperationBatch",
    outputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "isOperation",
    outputs: [
      {
        internalType: "bool",
        name: "pending",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "isOperationDone",
    outputs: [
      {
        internalType: "bool",
        name: "done",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "isOperationPending",
    outputs: [
      {
        internalType: "bool",
        name: "pending",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "isOperationReady",
    outputs: [
      {
        internalType: "bool",
        name: "ready",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
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
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "delay",
        type: "uint256",
      },
    ],
    name: "schedule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "datas",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "predecessor",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "delay",
        type: "uint256",
      },
    ],
    name: "scheduleBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newDelay",
        type: "uint256",
      },
    ],
    name: "updateDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001f2038038062001f208339810160408190526200003491620003ce565b6200004f60008051602062001ec083398151915280620001b1565b6200007960008051602062001ee083398151915260008051602062001ec0833981519152620001b1565b620000a360008051602062001f0083398151915260008051602062001ec0833981519152620001b1565b620000c760008051602062001ec0833981519152620000c162000203565b62000207565b620000e260008051602062001ec08339815191523062000207565b60005b82518110156200012d576200012460008051602062001ee08339815191528483815181106200011057fe5b60200260200101516200020760201b60201c565b600101620000e5565b5060005b815181101562000165576200015c60008051602062001f008339815191528383815181106200011057fe5b60010162000131565b5060028390556040517f11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d590620001a09060009086906200043f565b60405180910390a15050506200044d565b600082815260208190526040808220600201549051839285917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a460009182526020829052604090912060020155565b3390565b62000213828262000217565b5050565b6000828152602081815260409091206200023c91839062000c4062000290821b17901c565b1562000213576200024c62000203565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620002a7836001600160a01b038416620002b0565b90505b92915050565b6000620002be8383620002ff565b620002f657508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620002aa565b506000620002aa565b60009081526001919091016020526040902054151590565b80516001600160a01b03811681146200032f57600080fd5b919050565b600082601f83011262000345578081fd5b815160206001600160401b03808311156200035c57fe5b818302604051838282010181811084821117156200037657fe5b6040528481528381019250868401828801850189101562000395578687fd5b8692505b85831015620003c257620003ad8162000317565b84529284019260019290920191840162000399565b50979650505050505050565b600080600060608486031215620003e3578283fd5b835160208501519093506001600160401b038082111562000402578384fd5b620004108783880162000334565b9350604086015191508082111562000426578283fd5b50620004358682870162000334565b9150509250925092565b918252602082015260400190565b611a63806200045d6000396000f3fe60806040526004361061016a5760003560e01c80638065657f116100d1578063b1c5f4271161008a578063d45c443511610064578063d45c44351461040f578063d547741f1461042f578063e38335e51461044f578063f27a0c921461046257610171565b8063b1c5f427146103af578063c4d252f5146103cf578063ca15c873146103ef57610171565b80638065657f146102f85780638f2a0bb0146103185780638f61f4f5146103385780639010d07c1461034d57806391d148541461037a578063a217fddf1461039a57610171565b80632ab0f529116101235780632ab0f529146102385780632f2ff15d1461025857806331d507501461027857806336568abe14610298578063584b153e146102b857806364d62353146102d857610171565b806301d5062a1461017657806307bd0265146101985780630d3cf6fc146101c3578063134008d3146101d857806313bc9f20146101eb578063248a9ca31461021857610171565b3661017157005b600080fd5b34801561018257600080fd5b5061019661019136600461123a565b610477565b005b3480156101a457600080fd5b506101ad610533565b6040516101ba919061165c565b60405180910390f35b3480156101cf57600080fd5b506101ad610557565b6101966101e63660046111d0565b61057b565b3480156101f757600080fd5b5061020b610206366004611400565b610613565b6040516101ba9190611651565b34801561022457600080fd5b506101ad610233366004611400565b61063a565b34801561024457600080fd5b5061020b610253366004611400565b61064f565b34801561026457600080fd5b50610196610273366004611418565b610663565b34801561028457600080fd5b5061020b610293366004611400565b6106ca565b3480156102a457600080fd5b506101966102b3366004611418565b6106dd565b3480156102c457600080fd5b5061020b6102d3366004611400565b61073e565b3480156102e457600080fd5b506101966102f3366004611400565b61074b565b34801561030457600080fd5b506101ad6103133660046111d0565b6107aa565b34801561032457600080fd5b50610196610333366004611352565b6107e9565b34801561034457600080fd5b506101ad61093f565b34801561035957600080fd5b5061036d610368366004611443565b610951565b6040516101ba9190611529565b34801561038657600080fd5b5061020b610395366004611418565b610972565b3480156103a657600080fd5b506101ad61098a565b3480156103bb57600080fd5b506101ad6103ca3660046112ad565b61098f565b3480156103db57600080fd5b506101966103ea366004611400565b6109d4565b3480156103fb57600080fd5b506101ad61040a366004611400565b610a7d565b34801561041b57600080fd5b506101ad61042a366004611400565b610a94565b34801561043b57600080fd5b5061019661044a366004611418565b610aa6565b61019661045d3660046112ad565b610aff565b34801561046e57600080fd5b506101ad610c3a565b6000805160206119df83398151915261049281610395610c55565b806104a357506104a3816000610972565b6104c85760405162461bcd60e51b81526004016104bf906116ee565b60405180910390fd5b60006104d88989898989896107aa565b90506104e48184610c59565b6000817f4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca8b8b8b8b8b8a6040516105209695949392919061156f565b60405180910390a3505050505050505050565b7fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e6381565b7f5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca581565b7fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e636105a881610395610c55565b806105b957506105b9816000610972565b6105d55760405162461bcd60e51b81526004016104bf906116ee565b60006105e58888888888886107aa565b90506105f18185610cc6565b6106008160008a8a8a8a610d18565b61060981610de0565b5050505050505050565b60008061061f83610a94565b90506001811180156106315750428111155b9150505b919050565b60009081526020819052604090206002015490565b6000600161065c83610a94565b1492915050565b60008281526020819052604090206002015461068190610395610c55565b6106bc5760405162461bcd60e51b815260040180806020018281038252602f815260200180611980602f913960400191505060405180910390fd5b6106c68282610e19565b5050565b6000806106d683610a94565b1192915050565b6106e5610c55565b6001600160a01b0316816001600160a01b0316146107345760405162461bcd60e51b815260040180806020018281038252602f8152602001806119ff602f913960400191505060405180910390fd5b6106c68282610e82565b600060016106d683610a94565b33301461076a5760405162461bcd60e51b81526004016104bf9061186c565b7f11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d56002548260405161079d92919061190a565b60405180910390a1600255565b60008686868686866040516020016107c79695949392919061156f565b6040516020818303038152906040528051906020012090509695505050505050565b6000805160206119df83398151915261080481610395610c55565b806108155750610815816000610972565b6108315760405162461bcd60e51b81526004016104bf906116ee565b8887146108505760405162461bcd60e51b81526004016104bf906116ab565b88851461086f5760405162461bcd60e51b81526004016104bf906116ab565b60006108818b8b8b8b8b8b8b8b61098f565b905061088d8184610c59565b60005b8a8110156109315780827f4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca8e8e858181106108c757fe5b90506020020160208101906108dc91906111b6565b8d8d868181106108e857fe5b905060200201358c8c878181106108fb57fe5b905060200281019061090d9190611918565b8c8b6040516109219695949392919061156f565b60405180910390a3600101610890565b505050505050505050505050565b6000805160206119df83398151915281565b60008281526020819052604081206109699083610eeb565b90505b92915050565b60008281526020819052604081206109699083610ef7565b600081565b600088888888888888886040516020016109b09897969594939291906115ac565b60405160208183030381529060405280519060200120905098975050505050505050565b6000805160206119df8339815191526109ef81610395610c55565b80610a005750610a00816000610972565b610a1c5760405162461bcd60e51b81526004016104bf906116ee565b610a258261073e565b610a415760405162461bcd60e51b81526004016104bf9061181b565b6000828152600160205260408082208290555183917fbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb7091a25050565b600081815260208190526040812061096c90610f0c565b60009081526001602052604090205490565b600082815260208190526040902060020154610ac490610395610c55565b6107345760405162461bcd60e51b81526004018080602001828103825260308152602001806119af6030913960400191505060405180910390fd5b7fd8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63610b2c81610395610c55565b80610b3d5750610b3d816000610972565b610b595760405162461bcd60e51b81526004016104bf906116ee565b878614610b785760405162461bcd60e51b81526004016104bf906116ab565b878414610b975760405162461bcd60e51b81526004016104bf906116ab565b6000610ba98a8a8a8a8a8a8a8a61098f565b9050610bb58185610cc6565b60005b89811015610c2457610c1c82828d8d85818110610bd157fe5b9050602002016020810190610be691906111b6565b8c8c86818110610bf257fe5b905060200201358b8b87818110610c0557fe5b9050602002810190610c179190611918565b610d18565b600101610bb8565b50610c2e81610de0565b50505050505050505050565b60025490565b6000610969836001600160a01b038416610f17565b3390565b610c62826106ca565b15610c7f5760405162461bcd60e51b81526004016104bf90611782565b610c87610c3a565b811015610ca65760405162461bcd60e51b81526004016104bf9061173c565b610cb04282610f61565b6000928352600160205260409092209190915550565b610ccf82610613565b610ceb5760405162461bcd60e51b81526004016104bf906117d1565b801580610cfc5750610cfc8161064f565b6106c65760405162461bcd60e51b81526004016104bf90611665565b6000846001600160a01b0316848484604051610d35929190611519565b60006040518083038185875af1925050503d8060008114610d72576040519150601f19603f3d011682016040523d82523d6000602084013e610d77565b606091505b5050905080610d985760405162461bcd60e51b81526004016104bf906118b7565b85877fc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b5887878787604051610dcf949392919061153d565b60405180910390a350505050505050565b610de981610613565b610e055760405162461bcd60e51b81526004016104bf906117d1565b600090815260016020819052604090912055565b6000828152602081905260409020610e319082610c40565b156106c657610e3e610c55565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081905260409020610e9a9082610fbb565b156106c657610ea7610c55565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006109698383610fd0565b6000610969836001600160a01b038416611034565b600061096c8261104c565b6000610f238383611034565b610f595750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561096c565b50600061096c565b600082820183811015610969576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6000610969836001600160a01b038416611050565b815460009082106110125760405162461bcd60e51b815260040180806020018281038252602281526020018061195e6022913960400191505060405180910390fd5b82600001828154811061102157fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b6000818152600183016020526040812054801561110c578354600019808301919081019060009087908390811061108357fe5b90600052602060002001549050808760000184815481106110a057fe5b6000918252602080832090910192909255828152600189810190925260409020908401905586548790806110d057fe5b6001900381819060005260206000200160009055905586600101600087815260200190815260200160002060009055600194505050505061096c565b600091505061096c565b80356001600160a01b038116811461063557600080fd5b60008083601f84011261113e578182fd5b50813567ffffffffffffffff811115611155578182fd5b602083019150836020808302850101111561116f57600080fd5b9250929050565b60008083601f840112611187578182fd5b50813567ffffffffffffffff81111561119e578182fd5b60208301915083602082850101111561116f57600080fd5b6000602082840312156111c7578081fd5b61096982611116565b60008060008060008060a087890312156111e8578182fd5b6111f187611116565b955060208701359450604087013567ffffffffffffffff811115611213578283fd5b61121f89828a01611176565b979a9699509760608101359660809091013595509350505050565b600080600080600080600060c0888a031215611254578081fd5b61125d88611116565b965060208801359550604088013567ffffffffffffffff81111561127f578182fd5b61128b8a828b01611176565b989b979a50986060810135976080820135975060a09091013595509350505050565b60008060008060008060008060a0898b0312156112c8578081fd5b883567ffffffffffffffff808211156112df578283fd5b6112eb8c838d0161112d565b909a50985060208b0135915080821115611303578283fd5b61130f8c838d0161112d565b909850965060408b0135915080821115611327578283fd5b506113348b828c0161112d565b999c989b509699959896976060870135966080013595509350505050565b600080600080600080600080600060c08a8c03121561136f578081fd5b893567ffffffffffffffff80821115611386578283fd5b6113928d838e0161112d565b909b50995060208c01359150808211156113aa578283fd5b6113b68d838e0161112d565b909950975060408c01359150808211156113ce578283fd5b506113db8c828d0161112d565b9a9d999c50979a969997986060880135976080810135975060a0013595509350505050565b600060208284031215611411578081fd5b5035919050565b6000806040838503121561142a578182fd5b8235915061143a60208401611116565b90509250929050565b60008060408385031215611455578182fd5b50508035926020909101359150565b818352602080840193600091908185020181018584845b878110156114e25782840389528135601e1988360301811261149b578687fd5b8701803567ffffffffffffffff8111156114b3578788fd5b8036038913156114c1578788fd5b6114ce86828985016114ef565b9a87019a955050509084019060010161147b565b5091979650505050505050565b60008284528282602086013780602084860101526020601f19601f85011685010190509392505050565b6000828483379101908152919050565b6001600160a01b0391909116815260200190565b600060018060a01b0386168252846020830152606060408301526115656060830184866114ef565b9695505050505050565b600060018060a01b038816825286602083015260a0604083015261159760a0830186886114ef565b60608301949094525060800152949350505050565b60a0808252810188905260008960c08301825b8b8110156115ed576001600160a01b036115d884611116565b168252602092830192909101906001016115bf565b5083810360208501528881526001600160fb1b0389111561160c578283fd5b602089029150818a6020830137016020818101838152848303909101604085015261163881888a611464565b6060850196909652505050608001529695505050505050565b901515815260200190565b90815260200190565b60208082526026908201527f54696d656c6f636b436f6e74726f6c6c65723a206d697373696e6720646570656040820152656e64656e637960d01b606082015260800190565b60208082526023908201527f54696d656c6f636b436f6e74726f6c6c65723a206c656e677468206d69736d616040820152620e8c6d60eb1b606082015260800190565b6020808252602e908201527f54696d656c6f636b436f6e74726f6c6c65723a2073656e64657220726571756960408201526d3932b9903832b936b4b9b9b4b7b760911b606082015260800190565b60208082526026908201527f54696d656c6f636b436f6e74726f6c6c65723a20696e73756666696369656e746040820152652064656c617960d01b606082015260800190565b6020808252602f908201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e20616c60408201526e1c9958591e481cd8da19591d5b1959608a1b606082015260800190565b6020808252602a908201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e206973604082015269206e6f7420726561647960b01b606082015260800190565b60208082526031908201527f54696d656c6f636b436f6e74726f6c6c65723a206f7065726174696f6e2063616040820152701b9b9bdd0818994818d85b98d95b1b1959607a1b606082015260800190565b6020808252602b908201527f54696d656c6f636b436f6e74726f6c6c65723a2063616c6c6572206d7573742060408201526a62652074696d656c6f636b60a81b606082015260800190565b60208082526033908201527f54696d656c6f636b436f6e74726f6c6c65723a20756e6465726c79696e6720746040820152721c985b9cd858dd1a5bdb881c995d995c9d1959606a1b606082015260800190565b918252602082015260400190565b6000808335601e1984360301811261192e578283fd5b83018035915067ffffffffffffffff821115611948578283fd5b60200191503681900382131561116f57600080fdfe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65b09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a264697066735822122088f9ef07687d5604f36273afd129a93ea2c8816e029582574420ce7da8b8375864736f6c634300070600335f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5b09aa5aeb3702cfd50b6b62bc4532604938f21248a27a1d5ca736082b6819cc1d8aa0f3194971a2a116679f7c2090f6939c8d4e01a2a8d7e41d55e5351469e63";

type TimelockControllerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TimelockControllerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TimelockController__factory extends ContractFactory {
  constructor(...args: TimelockControllerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    minDelay: BigNumberish,
    proposers: AddressLike[],
    executors: AddressLike[],
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      minDelay,
      proposers,
      executors,
      overrides || {}
    );
  }
  override deploy(
    minDelay: BigNumberish,
    proposers: AddressLike[],
    executors: AddressLike[],
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      minDelay,
      proposers,
      executors,
      overrides || {}
    ) as Promise<
      TimelockController & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): TimelockController__factory {
    return super.connect(runner) as TimelockController__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TimelockControllerInterface {
    return new Interface(_abi) as TimelockControllerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): TimelockController {
    return new Contract(address, _abi, runner) as unknown as TimelockController;
  }
}
