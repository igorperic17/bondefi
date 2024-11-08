import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { AddressLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  Purchase__factory,
  PurchaseFactory__factory,
  TestDAI__factory,
} from "../typechain-types";
import { deployBancorFormula } from "./deploy-bancor";
import { deployLaunchpad } from "./deploy-launchpad";
import { DEPLOYMENT_CONFIRMATIONS } from "./deployments";
import { asyncVerification, waitForVerifications } from "./verify";

const deployDai = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new TestDAI__factory(deployer).deploy();
  console.log(
    `DAI contract deployed at address: ${await contract.getAddress()}`,
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

export const deployAll = async (hre: HardhatRuntimeEnvironment) => {
  const [deployer] = await hre.ethers.getSigners();

  const bancorFormula = await deployBancorFormula(hre, deployer);
  const testDai = await deployDai(hre, deployer);
  const purchaseBaseNft = await deployPurchaseBaseNft(hre, deployer);
  const purchaseFactory = await deployPurchaseFactory(
    hre,
    deployer,
    purchaseBaseNft,
  );

  const launchpad = await deployLaunchpad(hre, deployer);

  await launchpad.setPurchaseFactory(purchaseFactory);

  console.log("All contracts deployed and test data setup.");
  console.log({
    bancorFormula,
    testDai,
    purchaseBaseNft,
    purchaseFactory,
    launchpad,
  });

  console.log("Performing contract verifications");
  await waitForVerifications();
};
