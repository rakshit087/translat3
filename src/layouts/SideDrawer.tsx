import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { MdPolymer, MdOutlineHome, MdOutlineTranslate } from "react-icons/md/";
import { AddProject } from "../components/AddProject";

export const SideDrawer = ({ currentLayout, setCurrentLayout }) => {
  const primaryColor = useColorModeValue("gray.300", "gray.800");
  return (
    <Flex
      bgColor={useColorModeValue("gray.100", "gray.900")}
      w={{ base: "100vw", md: "4rem" }}
      h={{ base: "5rem", md: "90vh" }}
      borderRight="solid 1px"
      borderRightColor={primaryColor}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      bottom={0}
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
        <AddProject />
      </Box>
    </Flex>
  );
};
