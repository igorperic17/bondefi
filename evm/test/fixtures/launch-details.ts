import { ProjectDetailsStruct } from "../../typechain-types/contracts/launchpad/Launchpad";

export const createLaunchDetails = (): ProjectDetailsStruct => {
  return {
    name: "Test Project",
    symbol: "TEST",
    description: "A project description",
    iconUrl: "https://a-url.com",
  };
};

export const percentageBigInt = (
  ratio: number,
  maxRatio: bigint = 1000000n,
): bigint => {
  if (ratio <= 0 || ratio > 1) {
    throw new Error("Invalid reserve ratio, value must be between 0 and 1");
  }
  return BigInt(Math.floor(ratio * Number(maxRatio)));
};
