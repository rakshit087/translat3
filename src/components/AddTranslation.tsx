import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const AddTranslation = ({ paragraphId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { pid } = router.query;
  const toast = useToast();
  const [translation, setTranslation] = useState("");
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "postTranslation",
    args: [pid, paragraphId, translation],
  });
  const { data, write } = useContractWrite(config);
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash });
  const primaryColor = useColorModeValue<string, string>("purple.400", "purple.100");

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast({
        title: "Success",
        description: "Translation added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <Button variant={"solid"} colorScheme={"purple"} position={"absolute"} bottom={16} right={16} onClick={onOpen}>
        Add Translation
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Translation</ModalHeader>
          <ModalCloseButton />
          <ModalBody my={8}>
            <Text textAlign={"center"}>
              Thank you for contributing to this translation 💜. Please try to keep the translation as accurate as
              possible.
            </Text>
            <Textarea
              placeholder="Start typing your translation here"
              focusBorderColor={primaryColor}
              mt={12}
              mb={4}
              name="description"
              onChange={(e) => setTranslation(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              w={"100%"}
              colorScheme={"purple"}
              onClick={() => {
                write?.();
              }}
            >
              Submit Translation
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
