import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { AddressLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  BancorFormula__factory,
  Launchpad__factory,
  Purchase__factory,
  PurchaseFactory__factory,
  TestDAI__factory,
} from "../typechain-types";
import { verifyContract } from "./verify";

const CONFIRMATIONS = 20;
let verifications: (() => Promise<unknown>)[] = [];

const asyncVerification = (
  hre: HardhatRuntimeEnvironment,
  contract: AddressLike,
  ...args: any
) => {
  verifications.push(async () => {
    try {
      await verifyContract(hre, contract, ...args);
    } catch (e) {
      console.warn(`Contract ${await contract} could not be verified`);
    }
  });
};

const deployBancorFormula = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new BancorFormula__factory(deployer).deploy();
  console.log(
    `Bancor Formula contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(CONFIRMATIONS);

  asyncVerification(hre, contract);

  return contract;
};

const deployDai = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new TestDAI__factory(deployer).deploy();
  console.log(
    `DAI contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(CONFIRMATIONS);

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
  await contract.deploymentTransaction()?.wait(CONFIRMATIONS);

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
  await contract.deploymentTransaction()?.wait(CONFIRMATIONS);

  asyncVerification(hre, contract, purchaseBaseNft);

  return contract;
};

const deployLaunchpad = async (
  hre: HardhatRuntimeEnvironment,
  deployer: SignerWithAddress,
) => {
  const contract = await new Launchpad__factory(deployer).deploy();
  console.log(
    `Launchpad contract deployed at address: ${await contract.getAddress()}`,
  );
  await contract.deploymentTransaction()?.wait(CONFIRMATIONS);

  asyncVerification(hre, contract);

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

  await new Promise((resolve) => setTimeout(resolve, 10000));

  for (const verification of verifications) {
    await verification();
  }
};
