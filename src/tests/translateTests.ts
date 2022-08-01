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
    primaryWallet = await ethers.getSigners()[0];
    secondaryWallet = await ethers.getSigners()[1];
  });
  describe("Deployment", () => {
    it("should deploy the contract", async () => {
      expect(contract.address).to.exist;
    });
  });
});
