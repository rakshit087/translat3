import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useEffect } from "react";

export const AddProjectButton = ({ dataProp, setCurrentLayout }) => {
  const paragraphs = dataProp.fileContent.split("/\r?\n|\r/g");
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "postProject",
    args: [dataProp.name, dataProp.description, dataProp.languageFrom, dataProp.languageTo, paragraphs],
    overrides: {
      value: ethers.utils.parseUnits(dataProp.amount.toString(), "ether"),
    },
  });

  const { data, isSuccess, write } = useContractWrite(config);
  const toast = useToast();
  // useEffect(() => {
  //   if (isSuccess) {
  //     toast({
  //       title: "Success",
  //       description: "Project added successfully",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     setCurrentLayout("pool");
  //   }
  // }, [isSuccess, data]);

  return (
    <Button
      colorScheme={"purple"}
      onClick={() => {
        write();
      }}
    >
      Submit 🎉
    </Button>
  );
};
