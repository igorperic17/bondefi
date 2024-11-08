import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
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
    arbTestnet: {
      chainId: 42161,
      url: `https://arbitrum.blockpi.network/v1/rpc/public`,
      accounts: [secrets.accounts.deployer],
    },
    polygonMainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${secrets.alchemy.apiKey}`,
      accounts: [secrets.accounts.deployer],
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [secrets.accounts.deployer],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      gasPrice: 5,
      chainId: 97,
      accounts: [secrets.accounts.deployer],
    },
    polygonAmoy: {
      url: "https://rpc-amoy.polygon.technology/",
      chainId: 80002,
      accounts: [secrets.accounts.deployer],
    },
  },
  gasReporter: {
    currency: "USD",
    token: "MATIC",
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: secrets?.coinmarketcap?.apiKey,
  },
  etherscan: {
    apiKey: {
      bscTestnet: secrets?.verification?.bscScan,
      polygonAmoy: secrets?.verification?.polygonScan,
    },
    // customChains: [
    //   {
    //     network: "sepolia",
    //     chainId: 421614,
    //     urls: {
    //       apiURL: "https://api-sepolia.arbiscan.io/api",
    //       browserURL: "https://goerli.etherscan.io",
    //     },
    //   },
    //   {
    //     network: "arbitrum",
    //     chainId: 42161,
    //     urls: {
    //       apiURL: "https://api.arbiscan.io/api",
    //       browserURL: "https://goerli.etherscan.io",
    //     },
    //   },
    // ],
  },
};

export default config;
