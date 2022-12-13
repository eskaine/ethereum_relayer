import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import env from './scripts/configs/env.config';


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
       chainId: 1337
    },
    goerli: {
      url: env.GOERLI_URL,
      accounts: [env.ACCOUNT]
    }
 },
};

export default config;
