import {
  TypedContractEvent,
  TypedLogDescription,
} from "@/typechain-types/common";
import { BaseContract, ContractTransactionResponse } from "ethers";

export const findLogs = async <
  T extends BaseContract,
  S extends TypedContractEvent,
>(
  tx: Promise<ContractTransactionResponse>,
  contract: T,
  event: S,
): Promise<TypedLogDescription<S>[]> => {
  const events: TypedLogDescription<S>[] = [];

  const receipt = await (await tx).wait();

  if (receipt?.logs) {
    for (const log of receipt.logs) {
      if (log.address === contract.target) {
        try {
          const parsedLog = contract.interface.parseLog(log);

          if (parsedLog?.name === event.name) {
            events.push(parsedLog as TypedLogDescription<S>);
          }
        } catch (e) {
          // If parsing fails, it's not an event from the contract
          continue;
        }
      }
    }
  }

  return events;
};
