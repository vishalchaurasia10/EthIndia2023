import { ethers } from "hardhat";
const hre=require("hardhat");

// scripts/deploy.js


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with deployer address:', deployer.address);

  // Deploy your contracts here
  const YourContract = await hre.ethers.getContractFactory('Dakter');
  const yourContract = await YourContract.deploy();

  console.log('YourContract deployed to:', yourContract.address);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
