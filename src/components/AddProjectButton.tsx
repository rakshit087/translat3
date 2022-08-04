import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { ethers } from "ethers";
import { useWaitForTransaction, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";

export const AddProjectButton = ({ dataProp, setCurrentLayout, onClose }) => {
  const paragraphs = dataProp.fileContent.split("/\r?\n|\r/g");
  const args = [dataProp.name, dataProp.description, dataProp.languageFrom, dataProp.languageTo, paragraphs];
  const value = dataProp.amount;
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "postProject",
    args: args,
    overrides: {
      value: ethers.utils.parseEther(value),
    },
  });
  const { data, write } = useContractWrite(config);
  const {
    data: tx,
    isLoading,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
  });
  const toast = useToast();
  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast({
        title: "Success",
        description: "Project added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setCurrentLayout("");
      setTimeout(() => {
        setCurrentLayout("pool");
      }, 10);
    }
  }, [isSuccess, tx]);

  return (
    <Button
      colorScheme={"purple"}
      onClick={() => {
        try {
          write();
        } catch {
          toast({
            title: "Error",
            description: "Something went wrong, (are you filling the form right?)",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }}
    >
      Submit 🎉
    </Button>
  );
};
