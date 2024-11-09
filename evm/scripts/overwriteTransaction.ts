import { HardhatRuntimeEnvironment } from "hardhat/types";

export const overwrite = async (hre: HardhatRuntimeEnvironment) => {
  const [deployer] = await hre.ethers.getSigners();

  const nonce = await hre.ethers.provider.getTransactionCount(
    deployer.address,
    "latest",
  );

  const tx = await deployer.sendTransaction({
    to: deployer.address, // Sending the transaction to your own address
    nonce: nonce,
    value: 0,
  });

  await tx.wait(1);
  console.log("nonce reset");
};
