// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");

const PROXY_CONTRACT_ADDRESS = "";

async function main() {
  const TokenV2 = await ethers.getContractFactory("TokenV2");
  const tokenv2 = await upgrades.upgradeProxy(PROXY_CONTRACT_ADDRESS, TokenV2);
  console.log("token contract upgraded");
}

main();
