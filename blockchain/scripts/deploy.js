const hre = require("hardhat");

async function main() {
  const TrustVault = await hre.ethers.getContractFactory("TrustVault");
  const vault = await TrustVault.deploy();
  await vault.deployed();
  console.log("TrustVault deployed to:", vault.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
