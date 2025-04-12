require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: process.env.GANACHE_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
