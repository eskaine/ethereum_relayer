import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import env from './scripts/configs/env.config';


const config: HardhatUserConfig = {
  solidity: "0.8.17",
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
