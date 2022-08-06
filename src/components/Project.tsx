import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonText,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";

export const Project = ({ projectId, isOpen, onOpen, onClose }) => {
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "getProjectParagraphs",
    args: [projectId],
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"full"}>
      <ModalContent>
        <ModalHeader textAlign={"center"}>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody my={4}>
          <Flex justifyContent={"space-between"} grow="1">
            <Box width={"49%"} height={"85vh"} overflowX={"scroll"}>
              {isLoading && <SkeletonText noOfLines={10} />}
              {!isLoading &&
                data &&
                data.map((paragraph) => (
                  <Box key={parseInt(paragraph.id)}>
                    <Text>{paragraph.text}</Text>
                  </Box>
                ))}
            </Box>
            <Box width={"49%"}></Box>
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
