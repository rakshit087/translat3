import { ethers } from "hardhat";

async function main() {
  const Translat3 = await ethers.getContractFactory("Translat3");
  const tranlat3 = await Translat3.deploy();
  await tranlat3.deployed();
  console.log("Translate deployed to:", tranlat3.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
