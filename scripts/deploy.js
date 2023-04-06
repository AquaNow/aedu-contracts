const { upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const ADMIN_ADDRESS = "";
  const MAX_NUM_MINTERS = 6;
  const NAME = "AED Universal";
  const SYMBOL = "AEDU";
  const CURRENCY = "AED";

  const TokenV1 = await ethers.getContractFactory("TokenV1");
  const tokenv1 = await upgrades.deployProxy(
    TokenV1,
    [NAME, SYMBOL, CURRENCY, 6, ADMIN_ADDRESS, ADMIN_ADDRESS, ADMIN_ADDRESS],
    {
      unsafeAllowCustomTypes: true,
      initializer: `initializeToken(string memory tokenName, string memory tokenSymbol, string memory tokenCurrency, uint8 tokenDecimals, address newMasterMinter, address newPauser, address newBlacklister)`,
    }
  );

  console.log("Proxy Address address:", tokenv1.address);
  await tokenv1.setPermissionAdmin(ADMIN_ADDRESS);

  const MasterMinter = await ethers.getContractFactory("MasterMinter");
  const masterMinter = await MasterMinter.deploy();
  await masterMinter.initializeMintController(tokenv1.address, MAX_NUM_MINTERS);
  await tokenv1.updateMasterMinter(masterMinter.address);
  await masterMinter.setControllerAdmin(ADMIN_ADDRESS);
  console.log("Master minter address: ", masterMinter.address);
  console.log("Controller Admin address: ", ADMIN_ADDRESS);
  console.log("Permission Admin address: ", ADMIN_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
