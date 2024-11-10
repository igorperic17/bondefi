import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { AddressLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  ERC20Factory__factory,
  ERC20Token__factory,
  Purchase__factory,
  PurchaseFactory__factory,
  TestToken__factory,
} from "../typechain-types";
import { deployBancorFormula } from "./deploy-bancor";
import { deployLaunchpad } from "./deploy-launchpad";
import { DEPLOYMENT_CONFIRMATIONS } from "./deployments";
import { asyncVerification, waitForVerifications } from "./verify";
import { deployPoolManager } from "./deploy-liquidity-manager";
import { erc20 } from "../typechain-types/@openzeppelin/contracts/token";

const deployTestUSDT = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new TestToken__factory(deployer).deploy(
    "Test USDT",
    "USDT",
  );
  console.log(
    `Test USDT contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(DEPLOYMENT_CONFIRMATIONS);

  asyncVerification(hre, contract);

  return contract;
};

const deployPurchaseBaseNft = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new Purchase__factory(deployer).deploy();
  console.log(
    `Purchase Base NFT contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(DEPLOYMENT_CONFIRMATIONS);

  asyncVerification(hre, contract);

  return contract;
};

const deployPurchaseFactory = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
  purchaseBaseNft: AddressLike,
) => {
  const contract = await new PurchaseFactory__factory(deployer).deploy(
    purchaseBaseNft,
  );
  console.log(
    `Purchase NFT Factory contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(DEPLOYMENT_CONFIRMATIONS);

  asyncVerification(hre, contract, purchaseBaseNft);

  return contract;
};

const deployBaseERC20 = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new ERC20Token__factory(deployer).deploy();
  console.log(
    `ERC20 base contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(DEPLOYMENT_CONFIRMATIONS);

  asyncVerification(hre, contract);

  return contract;
};

const deployERC20Factory = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
  erc20Base: AddressLike,
) => {
  const contract = await new ERC20Factory__factory(deployer).deploy(erc20Base);
  console.log(
    `ERC20 token factory contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(DEPLOYMENT_CONFIRMATIONS);

  asyncVerification(hre, contract, erc20Base);

  return contract;
};

export const deployAll = async (hre: HardhatRuntimeEnvironment) => {
  const [deployer] = await hre.ethers.getSigners();

  const bancorFormula = await deployBancorFormula(hre, deployer);
  const testDai = await deployTestUSDT(hre, deployer);
  const purchaseBaseNft = await deployPurchaseBaseNft(hre, deployer);
  const purchaseFactory = await deployPurchaseFactory(
    hre,
    deployer,
    purchaseBaseNft,
  );
  const erc20Base = await deployBaseERC20(hre, deployer);
  const erc20Factory = await deployERC20Factory(hre, deployer, erc20Base);
  const uniswapPoolManager = await deployPoolManager(hre, deployer);

  const launchpad = await deployLaunchpad(hre, deployer);
  await launchpad.setFactories(erc20Factory, purchaseFactory);

  console.log("All contracts deployed and test data setup.");

  console.log("Performing contract verifications");
  await waitForVerifications();

  console.log({
    bancorFormula: await bancorFormula.getAddress(),
    testDai: await testDai.getAddress(),
    purchaseBaseNft: await purchaseBaseNft.getAddress(),
    purchaseFactory: await purchaseFactory.getAddress(),
    erc20Base: await erc20Base.getAddress(),
    erc20Factory: await erc20Factory.getAddress(),
    launchpad: await launchpad.getAddress(),
  });
};
