import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    scrollSepolia: {
      url: process.env.PROVIDER_URL || 'https://sepolia-rpc.scroll.io',
      accounts: [process.env.PRIVATE_KEY || 'f62b8e0361beefe06b4e19e5af9639e232d68a6791f6d2b0cbcbbd5d0b5d3a89'],
    },
  },

  etherscan: {
    apiKey: {
      scrollSepolia: 'abc',
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
    ],
  },
};

export default config;
