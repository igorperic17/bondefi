import "hardhat-gas-reporter";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/types";
import "./hardhat.tasks";
import * as secrets from "./secrets.json";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    testnet: {
      chainId: 42161,
      url: `https://arbitrum.blockpi.network/v1/rpc/public`,
      accounts: [secrets.accounts.deployer],
    },
    mainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${secrets.alchemy.apiKey}`,
      accounts: [secrets.accounts.deployer],
    },
  },
  gasReporter: {
    currency: "USD",
    token: "MATIC",
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: secrets?.coinmarketcap?.apiKey,
  },
  // etherscan: {
  //   customChains: [
  //     {
  //       network: "sepolia",
  //       chainId: 421614,
  //       urls: {
  //         apiURL: "https://api-sepolia.arbiscan.io/api",
  //         browserURL: "https://goerli.etherscan.io",
  //       },
  //     },
  //     {
  //       network: "arbitrum",
  //       chainId: 42161,
  //       urls: {
  //         apiURL: "https://api.arbiscan.io/api",
  //         browserURL: "https://goerli.etherscan.io",
  //       },
  //     },
  //   ],
  //   // apiKey: {
  //   // polygon: secrets?.verification?.apiKey,
  //   // polygonMumbai: secrets?.verification?.apiKey,
  //   apiKey: "GB78ZGH21X9FCJEYM67EXNAY8M5YFEPPW6",
  //   // },
  // },
};

export default config;
