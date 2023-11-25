// require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config();
// require("@nomiclabs/hardhat-etherscan");
// require("@nomicfoundation/hardhat-ethers");


module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}