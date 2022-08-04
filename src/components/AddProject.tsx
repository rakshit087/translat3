import { useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { MdOutlineAdd } from "react-icons/md";
import { useState } from "react";
import { AddFile } from "./AddFile";
import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { AddProjectButton } from "./AddProjectButton";

export const AddProject = ({ setCurrentLayout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const primaryColor = useColorModeValue<string, string>("purple.400", "purple.100");
  const [progress, setProgress] = useState<number>(20);
  const [data, setData] = useState<{
    amount: string;
    description: string;
    fileContent: string;
    languageFrom: string;
    languageTo: string;
    name: string;
  }>({
    amount: "0",
    description: "",
    fileContent: "",
    languageFrom: "",
    languageTo: "",
    name: "",
  });

  return (
    <>
      <IconButton
        aria-label="add project"
        borderRadius={"none"}
        bottom={0}
        colorScheme="purple"
        height={{ base: "2.5rem", md: "4rem" }}
        icon={<MdOutlineAdd size={"1.5rem"} />}
        left={{ md: 0 }}
        mx={{ base: 5, md: "auto" }}
        onClick={onOpen}
        position={"fixed"}
        width={"4rem"}
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
                  focusBorderColor={primaryColor}
                  my={4}
                  name="name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Project Name"
                  value={data.name}
                  variant="flushed"
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
                  focusBorderColor={primaryColor}
                  my={4}
                  name="description"
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="Write a short description of your project"
                  resize="none"
                  value={data.description}
                  variant="flushed"
                />
              </>
            )}
            {progress == 60 && (
              <>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Let's talk about the languages! 🤓
                </Text>
                <Input
                  focusBorderColor={primaryColor}
                  my={4}
                  onChange={(e) => setData({ ...data, languageFrom: e.target.value })}
                  placeholder="Language of your Project"
                  value={data.languageFrom}
                  variant="flushed"
                />
                <Input
                  focusBorderColor={primaryColor}
                  my={4}
                  onChange={(e) => setData({ ...data, languageTo: e.target.value })}
                  placeholder="Language you want to get it translated to"
                  value={data.languageTo}
                  variant="flushed"
                />
              </>
            )}
            {progress == 80 && (
              <>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Add your project file
                </Text>
                <Text fontSize="xs">*We only support .txt files for now</Text>
                <AddFile data={data} setData={setData} />
              </>
            )}
            {progress == 100 && (
              <>
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Let's fund your project
                </Text>
                <Input
                  focusBorderColor={primaryColor}
                  my={4}
                  name="amount"
                  onChange={(e) => setData({ ...data, amount: e.target.value.length == 0 ? "0" : e.target.value })}
                  placeholder="Amount in MATIC"
                  variant="flushed"
                  value={data.amount == "0" ? "" : data.amount}
                  type={"number"}
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
          <ModalFooter display={"flex"} flexDirection={"row-reverse"} justifyContent="space-between">
            {progress == 100 && (
              <AddProjectButton dataProp={data} setCurrentLayout={setCurrentLayout} onClose={onClose} />
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
          <Progress colorScheme="purple" isAnimated size={"sm"} value={progress} />
        </ModalContent>
      </Modal>
    </>
  );
};
