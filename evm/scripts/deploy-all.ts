import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployCollection } from "./deploy-collection";
import { deployCollectionRevealer } from "./deploy-collection-revealer";
import { deployOwnershipManagement } from "./deploy-ownership-management";
import { deployPermissions } from "./deploy-permissions";
import { deployShop } from "./deploy-shop";
import { givePermissions } from "./test-data/access";
import { fundCollectionRevealer } from "./test-data/fund-collection-revealer";
import { createProducts } from "./test-data/products";

export const deployAll = async (hre: HardhatRuntimeEnvironment) => {
  const vrfCoordinator = "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255"; //v1 VRF Polygon Mumbai
  const linkToken = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const keyHash =
    "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4"; //v1 VRF Keyhash Polygon Mumbai

  const collectionRevealer = await deployCollectionRevealer(
    hre,
    vrfCoordinator,
    linkToken,
    keyHash
  );

  const permissions = await deployPermissions(hre);

  const collection = await deployCollection(
    hre,
    "Test COCOS Collection",
    "COCONFT",
    collectionRevealer,
    permissions
  );

  const ownershipManagement = await deployOwnershipManagement(hre);

  const shop = await deployShop(hre, ownershipManagement);

  await fundCollectionRevealer(hre, collectionRevealer, linkToken);

  await givePermissions(hre, collection, shop, ownershipManagement);
  await createProducts(hre, collection);

  console.log("All contracts deployed and test data setup.");
  console.log({
    collection,
    shop,
    ownershipManagement,
    permissions,
    collectionRevealer,
  });
};
