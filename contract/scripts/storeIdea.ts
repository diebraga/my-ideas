import {
  contractAbi,
  contractAddress,
} from "../../client/utils/constants/constants";

import { ethers } from "hardhat";

async function main() {
  const provider = new ethers.JsonRpcProvider();

  const [signer] = await ethers.getSigners();

  // Connect to your deployed contract
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  try {
    const ideas = await contract.getIdeasByAddress(
      "0x58003b568dc2015Fb5B979112C5534e044dC71F6",
      1,
      2
    );

    const createdIdea = await contract.addIdea(
      `My ${ideas.length} Idea`,
      `This is my ${ideas.length} idea and I'm very happy to post it in the blockchain`,
      Date.now()
    );
    console.log("Idea created:", createdIdea);
  } catch (error) {
    console.error("Error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
