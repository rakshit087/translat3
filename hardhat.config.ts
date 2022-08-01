import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";

dotenv.config();

const primaryWallet: string | null = process.env.WALLET_PRIMARY;
const secondaryWallet: string | null = process.env.WALLET_SECONDARY;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: primaryWallet,
          balance: "1000000000000000000000",
        },
        {
          privateKey: secondaryWallet,
          balance: "1000000000000000000000",
        },
      ],
    },
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/artifacts",
    tests: "./src/tests",
  },
};

export default config;
