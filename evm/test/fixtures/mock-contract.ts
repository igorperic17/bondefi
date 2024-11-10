import { BaseContract, ContractTransactionResponse } from "ethers";
import { MockContract } from "../../typechain-types";
import { findLogs } from "./blockchain-utils";
import { TypedContractMethod } from "../../typechain-types/common";

export const mockFunctionCalled = async (
  tx: Promise<ContractTransactionResponse>,
  contract: BaseContract,
  method: string,
) => {
  const logs = await findLogs(
    tx,
    contract,
    (contract as MockContract).getEvent("FunctionSelector"),
  );

  return (
    logs.filter(
      (log) =>
        log.args.selector === contract.interface.getFunction(method)!.selector,
    ).length > 0
  );
};

export const getMockEthReceived = async (
  tx: Promise<ContractTransactionResponse>,
  contract: BaseContract,
) => {
  const logs = await findLogs(
    tx,
    contract,
    (contract as MockContract).getEvent("EthReceived"),
  );

  return logs[0]?.args.amount;
};
