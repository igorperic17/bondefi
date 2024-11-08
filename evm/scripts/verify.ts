import { AddressLike, Addressable, isAddressable } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const verifyContract = async (
  hre: HardhatRuntimeEnvironment,
  address: AddressLike,
  ...args: any
) => {
  const addressStr =
    address instanceof Promise
      ? await address
      : isAddressable(address)
        ? address.getAddress()
        : address;
  console.log(
    `Verifying contract ${addressStr} with args \"${args?.join('" "') || "[no args]"}\"`,
  );
  await hre.run("verify:verify", {
    address: address,
    constructorArguments: args,
  });
};
