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
  SafeCastMock,
  SafeCastMockInterface,
} from "../../../../../../../contracts/lib/uniswap/openzeppelin/contracts/mocks/SafeCastMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
    ],
    name: "toInt128",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
    ],
    name: "toInt16",
    outputs: [
      {
        internalType: "int16",
        name: "",
        type: "int16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    name: "toInt256",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
    ],
    name: "toInt32",
    outputs: [
      {
        internalType: "int32",
        name: "",
        type: "int32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
    ],
    name: "toInt64",
    outputs: [
      {
        internalType: "int64",
        name: "",
        type: "int64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
    ],
    name: "toInt8",
    outputs: [
      {
        internalType: "int8",
        name: "",
        type: "int8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    name: "toUint128",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    name: "toUint16",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
    ],
    name: "toUint256",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    name: "toUint32",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    name: "toUint64",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    name: "toUint8",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610bf2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063cf65b4d311610071578063cf65b4d314610271578063d6bd32aa146102b6578063dd2a0316146102fb578063dfbe873b14610340578063f136dc0214610382578063fdcf791b146103c7576100b4565b80630cc4681e146100b95780632665fad0146100fe578063809fdd331461014a5780639374068f1461019e5780639c6f59be146101e4578063c819325514610229575b600080fd5b6100e5600480360360208110156100cf57600080fd5b8101908080359060200190929190505050610409565b604051808260ff16815260200191505060405180910390f35b61012a6004803603602081101561011457600080fd5b810190808035906020019092919050505061041b565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6101766004803603602081101561016057600080fd5b810190808035906020019092919050505061042d565b60405180826fffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ca600480360360208110156101b457600080fd5b810190808035906020019092919050505061043f565b604051808261ffff16815260200191505060405180910390f35b610210600480360360208110156101fa57600080fd5b8101908080359060200190929190505050610451565b604051808260030b815260200191505060405180910390f35b6102556004803603602081101561023f57600080fd5b8101908080359060200190929190505050610463565b604051808263ffffffff16815260200191505060405180910390f35b61029d6004803603602081101561028757600080fd5b8101908080359060200190929190505050610475565b604051808260010b815260200191505060405180910390f35b6102e2600480360360208110156102cc57600080fd5b8101908080359060200190929190505050610487565b604051808260070b815260200191505060405180910390f35b6103276004803603602081101561031157600080fd5b8101908080359060200190929190505050610499565b6040518082600f0b815260200191505060405180910390f35b61036c6004803603602081101561035657600080fd5b81019080803590602001909291905050506104ab565b6040518082815260200191505060405180910390f35b6103ae6004803603602081101561039857600080fd5b81019080803590602001909291905050506104bd565b604051808260000b815260200191505060405180910390f35b6103f3600480360360208110156103dd57600080fd5b81019080803590602001909291905050506104cf565b6040518082815260200191505060405180910390f35b6000610414826104e1565b9050919050565b600061042682610545565b9050919050565b6000610438826105b0565b9050919050565b600061044a82610623565b9050919050565b600061045c82610688565b9050919050565b600061046e8261071a565b9050919050565b600061048082610781565b9050919050565b600061049282610811565b9050919050565b60006104a4826108a7565b9050919050565b60006104b682610945565b9050919050565b60006104c8826109c7565b9050919050565b60006104da82610a56565b9050919050565b6000610100821061053d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180610afd6025913960400191505060405180910390fd5b819050919050565b60006801000000000000000082106105a8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610b496026913960400191505060405180910390fd5b819050919050565b6000700100000000000000000000000000000000821061061b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526027815260200180610b226027913960400191505060405180910390fd5b819050919050565b6000620100008210610680576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610ad76026913960400191505060405180910390fd5b819050919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000000082121580156106bd5750638000000082125b610712576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610b6f6026913960400191505060405180910390fd5b819050919050565b60006401000000008210610779576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610b6f6026913960400191505060405180910390fd5b819050919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff800082121580156107b4575061800082125b610809576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610ad76026913960400191505060405180910390fd5b819050919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffff8000000000000000821215801561084a575067800000000000000082125b61089f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610b496026913960400191505060405180910390fd5b819050919050565b60007fffffffffffffffffffffffffffffffff8000000000000000000000000000000082121580156108e857506f8000000000000000000000000000000082125b61093d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526027815260200180610b226027913960400191505060405180910390fd5b819050919050565b60007f800000000000000000000000000000000000000000000000000000000000000082106109bf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180610b956028913960400191505060405180910390fd5b819050919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8082121580156109f95750608082125b610a4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180610afd6025913960400191505060405180910390fd5b819050919050565b600080821215610ace576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f53616665436173743a2076616c7565206d75737420626520706f73697469766581525060200191505060405180910390fd5b81905091905056fe53616665436173743a2076616c756520646f65736e27742066697420696e203136206269747353616665436173743a2076616c756520646f65736e27742066697420696e2038206269747353616665436173743a2076616c756520646f65736e27742066697420696e20313238206269747353616665436173743a2076616c756520646f65736e27742066697420696e203634206269747353616665436173743a2076616c756520646f65736e27742066697420696e203332206269747353616665436173743a2076616c756520646f65736e27742066697420696e20616e20696e74323536a2646970667358221220ed70bde40e90f015307c34cf0a7d4c15c321288d4611c0af23611af73ff6ef1e64736f6c63430007060033";

type SafeCastMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SafeCastMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SafeCastMock__factory extends ContractFactory {
  constructor(...args: SafeCastMockConstructorParams) {
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
      SafeCastMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SafeCastMock__factory {
    return super.connect(runner) as SafeCastMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SafeCastMockInterface {
    return new Interface(_abi) as SafeCastMockInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SafeCastMock {
    return new Contract(address, _abi, runner) as unknown as SafeCastMock;
  }
}
