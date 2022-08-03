import { useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { MdOutlineAdd } from "react-icons/md";
import { ReactDOM, useState } from "react";
import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Progress,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { AddFile } from "./AddFile";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const AddProject = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [progress, setProgress] = useState(20);
  const primaryColor = useColorModeValue("purple.400", "purple.100");
  const [data, setData] = useState<{
    name: string;
    description: string;
    languageFrom: string;
    languageTo: string;
  }>({
    name: "",
    description: "",
    languageFrom: "",
    languageTo: "",
  });
  const [fileContent, setFileContent] = useState("");

  return (
    <>
      <IconButton
        aria-label="add project"
        icon={<MdOutlineAdd size={"1.5rem"} />}
        colorScheme="purple"
        onClick={onOpen}
        position={{ base: "static", md: "fixed" }}
        bottom={{ md: 0 }}
        left={{ md: 0 }}
        width={{ base: "2.5rem", md: "4rem" }}
        height={{ base: "2.5rem", md: "4rem" }}
        borderRadius={{ base: "full", md: "none" }}
        mx={{ base: 5, md: "auto" }}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height="22rem">
          <ModalHeader>Add Your Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {progress == 20 && (
              <>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  What's your project called?
                </Text>
                <Input
                  variant="flushed"
                  placeholder="Project Name"
                  focusBorderColor={primaryColor}
                  my={4}
                  name="name"
                />
                <Text fontSize="sm">💡 Tips</Text>
                <Text fontSize="xs" as="i">
                  Keep it short and simple
                </Text>
                <Text fontSize="xs">Avoid using Special Characters</Text>
              </>
            )}
            {progress == 40 && (
              <>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Give your project a description
                </Text>
                <Textarea
                  variant="flushed"
                  placeholder="Project Name"
                  focusBorderColor={primaryColor}
                  my={4}
                  resize="none"
                  name="description"
                />
              </>
            )}
            {progress == 60 && (
              <>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Let's talk about the languages! 🤓
                </Text>
                <Input
                  variant="flushed"
                  placeholder="Language of your Project"
                  focusBorderColor={primaryColor}
                  my={4}
                />
                <Input
                  variant="flushed"
                  placeholder="Language you want to get it translated to"
                  focusBorderColor={primaryColor}
                  my={4}
                />
              </>
            )}
            {progress == 80 && (
              <>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Add your project file
                </Text>
                <Text fontSize="xs">*We only support .txt files for now</Text>
                <AddFile />
              </>
            )}
            {progress == 100 && (
              <>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Let's fund your project
                </Text>
                <Input
                  variant="flushed"
                  placeholder="Amount in MATIC"
                  focusBorderColor={primaryColor}
                  my={4}
                  name="amount"
                />
                <Text fontSize="sm">💡 Tips</Text>
                <Text fontSize="xs" as="i">
                  A very small amount can slow down your progress
                </Text>
                <br />
                <Text fontSize="xs" as="i">
                  Keep the amount propotional to lines you want to translate
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent="space-between" flexDirection={"row-reverse"}>
            {progress == 100 && (
              <Button colorScheme={"purple"} onClick={() => {}} type="submit">
                Submit 🎉
              </Button>
            )}
            {progress != 100 && (
              <Button
                colorScheme={"purple"}
                onClick={() => {
                  setProgress(progress + 20);
                }}
              >
                Next
              </Button>
            )}
            {progress != 20 && (
              <Button
                onClick={() => {
                  setProgress(progress - 20);
                }}
              >
                Back
              </Button>
            )}
          </ModalFooter>
          <Progress isAnimated value={progress} size={"sm"} colorScheme="purple" />
        </ModalContent>
      </Modal>
    </>
  );
};
