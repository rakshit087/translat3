import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { MdOutlineHome } from "react-icons/md/";
import { MdOutlineAdd, MdOutlineTranslate } from "react-icons/md/";

export const SideDrawer = ({ currentLayout, setCurrentLayout }) => {
  return (
    <Flex
      bgColor={useColorModeValue("gray.100", "gray.900")}
      w={{ base: "100vw", md: "4rem" }}
      h={{ base: "5rem", md: "90vh" }}
      borderRight="solid 1px"
      borderRightColor={useColorModeValue("gray.300", "gray.700")}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      bottom={0}
    >
      <Box textAlign="center">
        <IconButton
          aria-label="home"
          icon={<MdOutlineHome size={"1.5rem"} />}
          rounded="full"
          size="lg"
          onClick={() => setCurrentLayout("home")}
          my={4}
          bgColor={currentLayout == "home" ? useColorModeValue("gray.300", "gray.800") : "transparent"}
          color={useColorModeValue("gray.500", "gray.500")}
        />

        <IconButton
          aria-label="translate project"
          icon={<MdOutlineTranslate size={"1.5rem"} />}
          rounded="full"
          size="lg"
          onClick={() => setCurrentLayout("translate-project")}
          my={4}
          bgColor={currentLayout == "translate-project" ? useColorModeValue("gray.300", "gray.800") : "transparent"}
          color={useColorModeValue("gray.500", "gray.500")}
        />
        <IconButton
          aria-label="add project"
          icon={<MdOutlineAdd size={"1.5rem"} />}
          rounded="full"
          size="lg"
          onClick={() => setCurrentLayout("add-project")}
          my={4}
          bgColor={currentLayout == "add-project" ? useColorModeValue("gray.300", "gray.800") : "transparent"}
          color={useColorModeValue("gray.500", "gray.500")}
        />
      </Box>
    </Flex>
  );
};
