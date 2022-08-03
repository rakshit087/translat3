import { ethers } from "ethers";
import { useContract, useSigner } from "wagmi";
import { Button } from "@chakra-ui/react";
import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";

export const AddProjectButton = ({ data }) => {
  const { data: signer } = useSigner();
  const { contract } = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    signerOrProvider: signer,
  });
  return (
    <Button
      colorScheme={"purple"}
      onClick={() => {
        const paragraphs = data.fileContent.split("/\r?\n|\r/g");
        contract.postProject(data.name, data.description, data.languageFrom, data.languageTo, paragraphs, {
          value: ethers.utils.parseUnits(data.amount, "ether"),
        });
      }}
    >
      Submit 🎉
    </Button>
  );
};
