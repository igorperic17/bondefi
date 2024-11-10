import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { BancorFormula__factory } from "../typechain-types";
import { DEPLOYMENT_CONFIRMATIONS } from "./deployments";
import { asyncVerification, waitForVerifications } from "./verify";

export const deployBancorFormula = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new BancorFormula__factory(deployer).deploy();
  console.log(
    `Bancor Formula contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(DEPLOYMENT_CONFIRMATIONS);

  asyncVerification(hre, contract);

  return contract;
};

export const deploy = async (hre: HardhatRuntimeEnvironment) => {
  const [deployer] = await hre.ethers.getSigners();

  const bancorFormula = await deployBancorFormula(hre, deployer);

  console.log("All contracts deployed and test data setup.");

  console.log("Performing contract verifications");
  await waitForVerifications();

  console.log({
    bancorFormula: await bancorFormula.getAddress(),
  });
};
