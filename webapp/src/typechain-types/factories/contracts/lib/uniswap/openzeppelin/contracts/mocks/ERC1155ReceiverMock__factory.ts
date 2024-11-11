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
  BytesLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../../../../common";
import type {
  ERC1155ReceiverMock,
  ERC1155ReceiverMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/ERC1155ReceiverMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "recRetval",
        type: "bytes4",
      },
      {
        internalType: "bool",
        name: "recReverts",
        type: "bool",
      },
      {
        internalType: "bytes4",
        name: "batRetval",
        type: "bytes4",
      },
      {
        internalType: "bool",
        name: "batReverts",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
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
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gas",
        type: "uint256",
      },
    ],
    name: "BatchReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
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
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gas",
        type: "uint256",
      },
    ],
    name: "Received",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
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
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
        internalType: "address",
        name: "from",
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
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
    name: "registerInterface",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161076e38038061076e8339818101604052608081101561003357600080fd5b508051602082015160408301516060909301519192909161005a6301ffc9a760e01b6100c4565b6001805463ffffffff191660e095861c1760ff60201b1916640100000000941515949094029390931763ffffffff60281b1916650100000000009290941c919091029290921760ff60481b1916690100000000000000000092151592909202919091179055610148565b6001600160e01b03198082161415610123576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b610617806101576000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806301ffc9a714610051578063214cdb801461008c578063bc197c81146100b5578063f23a6e61146101f9575b600080fd5b6100786004803603602081101561006757600080fd5b50356001600160e01b03191661028c565b604080519115158252519081900360200190f35b6100b3600480360360208110156100a257600080fd5b50356001600160e01b0319166102ab565b005b6101dc600480360360a08110156100cb57600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b8111156100fe57600080fd5b82018360208201111561011057600080fd5b803590602001918460208302840111600160201b8311171561013157600080fd5b919390929091602081019035600160201b81111561014e57600080fd5b82018360208201111561016057600080fd5b803590602001918460208302840111600160201b8311171561018157600080fd5b919390929091602081019035600160201b81111561019e57600080fd5b8201836020820111156101b057600080fd5b803590602001918460018302840111600160201b831117156101d157600080fd5b5090925090506102b7565b604080516001600160e01b03199092168252519081900360200190f35b6101dc600480360360a081101561020f57600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b81111561024e57600080fd5b82018360208201111561026057600080fd5b803590602001918460018302840111600160201b8311171561028157600080fd5b50909250905061040e565b6001600160e01b03191660009081526020819052604090205460ff1690565b6102b481610505565b50565b6001546000906901000000000000000000900460ff16156103095760405162461bcd60e51b815260040180806020018281038252602f8152602001806105b3602f913960400191505060405180910390fd5b7f0bcad9224ba33b574e9c85298de2f44b4c80015a21aa5df474896444909863d889898989898989895a604051808a6001600160a01b03168152602001896001600160a01b0316815260200180602001806020018060200185815260200184810384528b8b82818152602001925060200280828437600083820152601f01601f19169091018581038452898152602090810191508a908a0280828437600083820152601f01601f191690910185810383528781526020019050878780828437600083820152604051601f909101601f19169092018290039e50909c50505050505050505050505050a15060015465010000000000900460e01b98975050505050505050565b600154600090600160201b900460ff161561045a5760405162461bcd60e51b815260040180806020018281038252602981526020018061058a6029913960400191505060405180910390fd5b7f20dfa9f79060c8c4d7fe892c97c71bcf6e3b63d1dcf66fea7aefc0211628cf298787878787875a60405180886001600160a01b03168152602001876001600160a01b03168152602001868152602001858152602001806020018381526020018281038252858582818152602001925080828437600083820152604051601f909101601f19169092018290039a509098505050505050505050a15060015460e01b9695505050505050565b6001600160e01b03198082161415610564576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff1916600117905556fe4552433131353552656365697665724d6f636b3a20726576657274696e67206f6e20726563656976654552433131353552656365697665724d6f636b3a20726576657274696e67206f6e2062617463682072656365697665a264697066735822122047c48a7e7e1d1644c087e17e8a9da99b6edd986906119867e750e81804b7540764736f6c63430007060033";

type ERC1155ReceiverMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ReceiverMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155ReceiverMock__factory extends ContractFactory {
  constructor(...args: ERC1155ReceiverMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    recRetval: BytesLike,
    recReverts: boolean,
    batRetval: BytesLike,
    batReverts: boolean,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      recRetval,
      recReverts,
      batRetval,
      batReverts,
      overrides || {}
    );
  }
  override deploy(
    recRetval: BytesLike,
    recReverts: boolean,
    batRetval: BytesLike,
    batReverts: boolean,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      recRetval,
      recReverts,
      batRetval,
      batReverts,
      overrides || {}
    ) as Promise<
      ERC1155ReceiverMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ERC1155ReceiverMock__factory {
    return super.connect(runner) as ERC1155ReceiverMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155ReceiverMockInterface {
    return new Interface(_abi) as ERC1155ReceiverMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC1155ReceiverMock {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ERC1155ReceiverMock;
  }
}