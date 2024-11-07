import { task } from "hardhat/config";

/**
 * We use dynamic imports in tasks because we have a dependency
 * on typechain to generate types for the solidity files.
 * Otherwise we wouldn't be able to run hardhat compile, because
 * the definition of these tasks are part of hardhat initialization
 * even if they're not called.
 */

task(
  "deploy-all",
  "Deploys everything and initialises with test data"
).setAction(async (_, hre) => {
  const { deployAll } = require("./scripts/deploy-all");
  await deployAll(hre);
});
