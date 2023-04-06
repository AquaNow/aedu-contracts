require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
require("@fireblocks/hardhat-fireblocks");

const ALCHEMY_API_KEY = "";
const GOERLI_PRIVATE_KEY = "";

const fireblocksApiKey = "";
const VAULT_ID = "";
const etherscanApiKey = "";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      fireblocks: {
        privateKey: "./fireblocks_secret.key",
        apiKey: fireblocksApiKey,
        vaultAccountIds: VAULT_ID,
      },
    },
  },

  etherscan: {
    apiKey: etherscanApiKey,
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000, // Expect to run 10000 times
      },
    },
  },
};
