import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { AddressLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Launchpad__factory } from "../typechain-types";
import { DEPLOYMENT_CONFIRMATIONS } from "./deployments";
import { asyncVerification, waitForVerifications } from "./verify";

export const deployLaunchpad = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new Launchpad__factory(deployer).deploy();
  console.log(
    `Launchpad contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(DEPLOYMENT_CONFIRMATIONS);

  asyncVerification(hre, contract);

  return contract;
};

export const deploy = async (
  hre: HardhatRuntimeEnvironment,
  erc20Factory: AddressLike,
  purchaseFactory: AddressLike,
) => {
  const [deployer] = await hre.ethers.getSigners();

  const launchpad = await deployLaunchpad(hre, deployer);
  await launchpad.setFactories(erc20Factory, purchaseFactory);

  console.log("All contracts deployed and test data setup.");

  console.log("Performing contract verifications");
  await waitForVerifications();

  console.log({
    launchpad: await launchpad.getAddress(),
  });
};
