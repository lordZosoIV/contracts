import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const BSC_RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const PRIVATE_KEY = "b7e64053fca6e837a39ba932539d4f1474096e5b72e0b5dd022e75bbc2bf6568";
const BSC_SCAN_KEY = "F5KH7Q3X7NU3P8K51XSQNDHWEII72B9TH7";

const config: HardhatUserConfig = {
  networks: {
    bsc: {
      url: BSC_RPC_URL,
      chainId: 97, // BSC Testnet
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: BSC_SCAN_KEY,
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
