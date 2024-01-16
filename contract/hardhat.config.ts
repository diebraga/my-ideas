import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const { ALCHEMY_API_URL_SEPOLIA, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL_SEPOLIA,
      accounts: PRIVATE_KEY ? [`${PRIVATE_KEY}`] : [],
    },
  },
};

export default config;
