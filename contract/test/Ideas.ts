import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Ideas", function () {
  async function deployIdeasFixture() {
    const Ideas = await ethers.getContractFactory("Ideas");
    const ideas = await Ideas.deploy();
    return { ideas };
  }

  describe("Idea Management", function () {
    it("Should add an idea", async function () {
      const { ideas } = await loadFixture(deployIdeasFixture);
      const [owner] = await ethers.getSigners();

      const title = ethers.encodeBytes32String("Idea Title");
      const description = "Idea Description";

      await ideas.addIdea(title, description, Date.now());

      const retrievedIdeas = await ideas.getIdeas(0, 1, owner.address);
      expect(retrievedIdeas[0].title).to.equal(title);
      expect(retrievedIdeas[0].description).to.equal(description);
    });

    it("Should correctly retrieve ideas by address", async function () {
      const { ideas } = await loadFixture(deployIdeasFixture);
      const [owner] = await ethers.getSigners();

      // Add two ideas
      const title1 = ethers.encodeBytes32String("Idea 1");
      const description1 = "First Idea Description";

      await ideas.addIdea(title1, description1, Date.now());

      const title2 = ethers.encodeBytes32String("Idea 2");
      const description2 = "Second Idea Description";
      await ideas.addIdea(title2, description2, Date.now());

      // Retrieve ideas added by the owner address
      const retrievedIdeas = await ideas.getIdeas(0, 10, owner.address);
      expect(retrievedIdeas.length).to.equal(2);
      expect(retrievedIdeas[0].title).to.equal(title1);
      expect(retrievedIdeas[0].description).to.equal(description1);
      expect(retrievedIdeas[1].title).to.equal(title2);
      expect(retrievedIdeas[1].description).to.equal(description2);
    });

    it("Should handle pagination correctly", async function () {
      const { ideas } = await loadFixture(deployIdeasFixture);
      const [owner] = await ethers.getSigners();

      for (let i = 0; i < 10; i++) {
        const title = ethers.encodeBytes32String(`Idea ${i}`);
        const description = `Description ${i}`;
        await ideas.addIdea(title, description, Date.now());
      }

      const retrievedIdeas = await ideas.getIdeas(2, 5, owner.address);
      expect(retrievedIdeas.length).to.equal(3);
      for (let i = 2; i < 5; i++) {
        expect(retrievedIdeas[i - 2].title).to.equal(
          ethers.encodeBytes32String(`Idea ${i}`)
        );
      }
    });
  });
});
