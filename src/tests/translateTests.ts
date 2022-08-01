import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { ContractFactory } from "ethers";

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
});
