import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { ethers } from "ethers";
import { useWaitForTransaction, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useEffect, useState } from "react";

interface datatype {
  projectId: number;
  amount: string;
  setAmount: (amount: string) => void;
}

export const PoolProjectButton = ({ projectId, amount, setAmount }: datatype) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addAmount, setAddAmount] = useState("0");
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "fundProject",
    args: [projectId],
    overrides: {
      value: ethers.utils.parseEther(addAmount),
    },
  });
  const { data, write } = useContractWrite(config);
  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  const toast = useToast();
  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast({
        title: "Success",
        description: "Project funded successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAmount((parseFloat(amount) + parseFloat(addAmount)).toString());
    }
  }, [isSuccess]);
  const primaryColor = useColorModeValue<string, string>("purple.400", "purple.100");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent width={"xs"}>
          <ModalHeader textAlign={"center"}>Fund Project</ModalHeader>
          <ModalBody my={4}>
            <Text fontSize={"md"}>
              Thank you for your contribution to the project ✨. Please enter the amount you would like to contribute.
            </Text>
            <Input
              focusBorderColor={primaryColor}
              my={4}
              name="amount"
              onChange={(e) => {
                e.target.value === "" ? setAddAmount("0") : setAddAmount(e.target.value);
              }}
              placeholder="Amount in MATIC"
              variant="flushed"
              value={addAmount == "0" ? "" : addAmount}
              type={"number"}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              colorScheme={"purple"}
              w={"100%"}
              onClick={() => {
                write();
              }}
            >
              Contribute Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button colorScheme={"purple"} variant="solid" w="100%" rounded={"xl"} onClick={onOpen}>
        Contribute
      </Button>
    </>
  );
};
