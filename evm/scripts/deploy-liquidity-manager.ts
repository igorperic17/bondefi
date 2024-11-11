import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { UniswapV3LiquidityManager__factory } from "../typechain-types";
import { DEPLOYMENT_CONFIRMATIONS } from "./deployments";
import { asyncVerification, waitForVerifications } from "./verify";
import { ethers } from "hardhat";

export const deployPoolManager = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const [positionManager, uniswapFactory] = [
    ethers.ZeroAddress,
    ethers.ZeroAddress,
  ];
  const contract = await new UniswapV3LiquidityManager__factory(
    deployer,
  ).deploy(positionManager, uniswapFactory);

  console.log(
    `Uniswap Pool Manager contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(DEPLOYMENT_CONFIRMATIONS);

  asyncVerification(hre, contract);

  return contract;
};

export const deploy = async (hre: HardhatRuntimeEnvironment) => {
  const [deployer] = await hre.ethers.getSigners();

  const uniswapPoolManager = await deployPoolManager(hre, deployer);

  console.log("All contracts deployed and test data setup.");

  console.log("Performing contract verifications");
  await waitForVerifications();

  console.log({
    uniswapPoolManager: await uniswapPoolManager.getAddress(),
  });
};
