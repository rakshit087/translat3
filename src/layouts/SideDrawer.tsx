import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { MdPolymer, MdOutlineHome, MdOutlineTranslate } from "react-icons/md/";
import { AddProject } from "../components/AddProject";

export const SideDrawer = ({ currentLayout, setCurrentLayout }) => {
  const primaryColor = useColorModeValue("gray.300", "gray.800");
  return (
    <Flex
      alignItems="center"
      bgColor={useColorModeValue("gray.100", "gray.900")}
      borderRight="solid 1px"
      borderRightColor={primaryColor}
      bottom={0}
      flexDirection={{ md: "column" }}
      h={{ base: "5rem", md: "90vh" }}
      justifyContent="center"
      position="fixed"
      w={{ base: "100vw", md: "4rem" }}
      zIndex={1}
    >
      <IconButton
        aria-label="translate project"
        icon={<MdPolymer size={"1.5rem"} />}
        rounded="full"
        size="lg"
        onClick={() => setCurrentLayout("pool")}
        my={4}
        bgColor={currentLayout == "pool" ? primaryColor : "transparent"}
        color={"gray.500"}
      />
      <IconButton
        aria-label="home"
        icon={<MdOutlineHome size={"1.5rem"} />}
        rounded="full"
        size="lg"
        onClick={() => setCurrentLayout("home")}
        my={4}
        bgColor={currentLayout == "home" ? primaryColor : "transparent"}
        color={"gray.500"}
      />
      <IconButton
        aria-label="translate project"
        icon={<MdOutlineTranslate size={"1.5rem"} />}
        rounded="full"
        size="lg"
        onClick={() => setCurrentLayout("translate-projects")}
        my={4}
        bgColor={currentLayout == "translate-projects" ? primaryColor : "transparent"}
        color={"gray.500"}
      />
      <Box textAlign="center">
        <AddProject setCurrentLayout={setCurrentLayout} />
      </Box>
    </Flex>
  );
};
