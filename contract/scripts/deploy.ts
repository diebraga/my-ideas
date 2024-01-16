import { ethers } from "hardhat";

async function main() {
  const Ideas = await ethers.getContractFactory("Ideas");
  const ideas = await Ideas.deploy();

  await ideas.waitForDeployment();
  const receipt = await ideas.deploymentTransaction()?.wait();

  console.log(`Trasactions contract deployed to ` + (await ideas.getAddress()));

  console.log(`Gas used for deployment: ${receipt?.gasPrice.toString()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
