import { HardhatRuntimeEnvironment } from "hardhat/types";

export const verifyContract = async (
  hre: HardhatRuntimeEnvironment,
  address: string,
  ...args: any
) => {
  await hre.run("verify:verify", {
    address: address,
    constructorArguments: args,
  });
};
