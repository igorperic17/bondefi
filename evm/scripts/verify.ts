import { AddressLike, BaseContract, isAddressable } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { VERIFICATION_WAIT_TIME } from "./deployments";

const addressLikeToStr = async (address: AddressLike) => {
  return address instanceof Promise
    ? await address
    : isAddressable(address)
      ? address.getAddress()
      : address;
};

export const verifyContract = async (
  hre: HardhatRuntimeEnvironment,
  address: AddressLike,
  ...args: any
) => {
  console.log(
    `Verifying contract ${await addressLikeToStr(address)} with args \"${args?.join('" "') || "[no args]"}\"`,
  );
  await hre.run("verify:verify", {
    address: address,
    constructorArguments: args,
  });
};

let verifications: (() => Promise<unknown>)[] = [];

export const asyncVerification = (
  hre: HardhatRuntimeEnvironment,
  contract: BaseContract,
  ...args: any
) => {
  verifications.push(async () => {
    try {
      await verifyContract(hre, contract, ...args);
    } catch (e) {
      console.warn(
        `Contract ${await addressLikeToStr(contract)} could not be verified`,
      );
    }
  });
};

export const waitForVerifications = async () => {
  await new Promise((resolve) => setTimeout(resolve, VERIFICATION_WAIT_TIME));
  for (const verification of verifications) {
    await verification();
  }
};
