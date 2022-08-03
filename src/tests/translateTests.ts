import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

//Check if contract is deployed
describe("Translate", () => {
  let contractFactory, contract, primaryWallet, secondaryWallet;
  beforeEach(async () => {
    contractFactory = await ethers.getContractFactory("Translat3");
    contract = await contractFactory.deploy();
    [primaryWallet, secondaryWallet] = await ethers.getSigners();
  });
  describe("Deployment", () => {
    it("should deploy the contract", async () => {
      expect(contract.address).to.exist;
    });
    it("Should be the right owner", async () => {
      expect(await contract.deployTransaction.from).to.equal(primaryWallet.address);
    });
  });
  beforeEach(async () => {
    await contract.postProject("Project 1", "Description 1", "English", "Hindi", ["para1p1", "para2p1", "para3p1"], {
      value: ethers.utils.parseUnits("5", "ether"),
    });
    await contract.postProject("Project 2", "Description 2", "English", "Spanish", ["para1p2", "para2p2", "para3p2"], {
      value: ethers.utils.parseUnits("1", "ether"),
    });
  });
  describe("Posting Project", () => {
    it("Project should be posted", async () => {
      const projectCount = await contract.projectId();
      expect(projectCount.toString()).to.equal("2");
    });
    it("Project should be posted with the right details", async () => {
      const project = await contract.getProject(0);
      expect(project.title).to.equal("Project 1");
      expect(project.paragraphs[0].text).to.equal("para1p1");
    });
    it("Project owner should be the primary wallet", async () => {
      const project = await contract.projects(0);
      expect(project.author).to.equal(primaryWallet.address);
    });
    it("Project vault should have value", async () => {
      const project = await contract.projects(0);
      expect(project.vault.toString()).to.equal("5000000000000000000");
    });
  });
  describe("Funding project", () => {
    it("Should fund the project", async () => {
      await contract.fundProject(0, {
        value: ethers.utils.parseUnits("1", "ether"),
      });
      const project = await contract.projects(0);
      expect(project.vault.toString()).to.equal("6000000000000000000");
    }).timeout(10000);
    it("Should not be able to fund if project in Translation phase", async () => {
      await contract.toTranslationPhase(0);
      await expect(
        contract.fundProject(0, {
          value: ethers.utils.parseUnits("1", "ether"),
        })
      ).to.be.reverted;
    });
  });
});
