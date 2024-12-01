import { BaseContract, ContractTransactionResponse } from "ethers";
import { network } from "hardhat";
import {
  TypedContractEvent,
  TypedLogDescription,
} from "../../typechain-types/common";

export const advanceToFuture = async (seconds?: number) => {
  await network.provider.send("evm_increaseTime", [seconds ?? 3600]);
  await network.provider.send("evm_mine");
};

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
