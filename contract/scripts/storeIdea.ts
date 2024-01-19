import {
  contractAbi,
  contractAddress,
} from "../../client/utils/constants/constants";
import { ethers } from "hardhat";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

async function main() {
  const provider = new ethers.JsonRpcProvider();
  const [signer] = await ethers.getSigners();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  try {
    const title = `My first idea`;
    const content = lorem.generateParagraphs(1);
    const createdIdea = await contract.addIdea(title, content, Date.now());
    console.log(`Idea created:`, createdIdea);
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
