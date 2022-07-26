import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  networks: {
    goerli:{
      url:"",
      accounts:[""]
    }
  },
  etherscan: {
    apiKey: {
      goerli: ""
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.5.0",
      },
      {
        version: "0.7.5",
      },
      {
        version: "0.8.10",
        settings: {},
      },
    ],
  }
};

export default config;
