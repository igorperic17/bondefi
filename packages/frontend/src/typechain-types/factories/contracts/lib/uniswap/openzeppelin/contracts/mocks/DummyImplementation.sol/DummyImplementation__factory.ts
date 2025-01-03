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
  DummyImplementation,
  DummyImplementationInterface,
} from "../../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/DummyImplementation.sol/DummyImplementation";

const _abi = [
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_text",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initializeNonPayable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "initializeNonPayableWithValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initializePayable",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "initializePayableWithValue",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "reverts",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "text",
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
    name: "value",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "values",
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
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506105e4806100206000396000f3fe60806040526004361061009c5760003560e01c80635e383d21116100645780635e383d21146101935780636d4ce63c146101bd578063763e2831146101e65780639fba1f9a14610210578063d31f8b6b14610218578063e79f5bee146103565761009c565b80631f1bd692146100a1578063227367d51461012b5780633bccbbc9146101425780633fa4f2451461015757806354fd4d501461017e575b600080fd5b3480156100ad57600080fd5b506100b661036c565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100f05781810151838201526020016100d8565b50505050905090810190601f16801561011d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561013757600080fd5b506101406103f9565b005b34801561014e57600080fd5b50610140610400565b34801561016357600080fd5b5061016c61044d565b60408051918252519081900360200190f35b34801561018a57600080fd5b506100b6610453565b34801561019f57600080fd5b5061016c600480360360208110156101b657600080fd5b503561046f565b3480156101c957600080fd5b506101d2610490565b604080519115158252519081900360200190f35b3480156101f257600080fd5b506101406004803603602081101561020957600080fd5b5035610495565b61014061049a565b34801561022457600080fd5b506101406004803603606081101561023b57600080fd5b8135919081019060408101602082013564010000000081111561025d57600080fd5b82018360208201111561026f57600080fd5b8035906020019184600183028401116401000000008311171561029157600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156102e457600080fd5b8201836020820111156102f657600080fd5b8035906020019184602083028401116401000000008311171561031857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506104a1945050505050565b6101406004803603602081101561020957600080fd5b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103f15780601f106103c6576101008083540402835291602001916103f1565b820191906000526020600020905b8154815290600101906020018083116103d457829003601f168201915b505050505081565b600a600055565b6040805162461bcd60e51b815260206004820152601c60248201527f44756d6d79496d706c656d656e746174696f6e20726576657274656400000000604482015290519081900360640190fd5b60005481565b604080518082019091526002815261563160f01b602082015290565b6002818154811061047f57600080fd5b600091825260209091200154905081565b600190565b600055565b6064600055565b600083905581516104b99060019060208501906104d3565b5080516104cd90600290602084019061055f565b50505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282610509576000855561054f565b82601f1061052257805160ff191683800117855561054f565b8280016001018555821561054f579182015b8281111561054f578251825591602001919060010190610534565b5061055b929150610599565b5090565b82805482825590600052602060002090810192821561054f579160200282018281111561054f578251825591602001919060010190610534565b5b8082111561055b576000815560010161059a56fea264697066735822122090346ffd04eec9729c7226ff46ff519eeb735d4dc7677a0084918c2e678d1aaf64736f6c63430007060033";

type DummyImplementationConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DummyImplementationConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DummyImplementation__factory extends ContractFactory {
  constructor(...args: DummyImplementationConstructorParams) {
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
      DummyImplementation & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): DummyImplementation__factory {
    return super.connect(runner) as DummyImplementation__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DummyImplementationInterface {
    return new Interface(_abi) as DummyImplementationInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): DummyImplementation {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as DummyImplementation;
  }
}
