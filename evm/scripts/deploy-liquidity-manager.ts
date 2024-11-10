import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { UniswapV3LiquidityManager__factory } from "../typechain-types";
import { DEPLOYMENT_CONFIRMATIONS } from "./deployments";
import { asyncVerification, waitForVerifications } from "./verify";

export const deployPoolManager = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  //ETH Sepolia
  const [positionManager, uniswapFactory] = [
    "0x1238536071E1c677A632429e3655c799b22cDA52",
    "0x0227628f3F023bb0B980b67D528571c95c6DaC1c",
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
