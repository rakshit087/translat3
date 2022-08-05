import { AddProject } from "../components/AddProject";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { MdOutlineHome, MdOutlineTranslate, MdPolymer } from "react-icons/md/";
import { useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const SideDrawer = () => {
  const primaryColor = useColorModeValue("gray.300", "gray.800");
  const router = useRouter();
  const currentUrl = router.pathname;

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
        aria-label="contribute"
        icon={<MdPolymer size={"1.5rem"} />}
        rounded="full"
        size="lg"
        onClick={() => {
          router.replace("/contribute");
        }}
        my={4}
        bgColor={currentUrl == "/contribute" ? primaryColor : "transparent"}
        color={"gray.500"}
      />
      <IconButton
        aria-label="home"
        icon={<MdOutlineHome size={"1.5rem"} />}
        rounded="full"
        size="lg"
        onClick={() => {
          router.replace("/dashboard");
        }}
        my={4}
        bgColor={currentUrl == "/dashboard" ? primaryColor : "transparent"}
        color={"gray.500"}
      />
      <IconButton
        aria-label="translate project"
        icon={<MdOutlineTranslate size={"1.5rem"} />}
        rounded="full"
        size="lg"
        onClick={() => {}}
        my={4}
        bgColor={currentUrl == "translate-projects" ? primaryColor : "transparent"}
        color={"gray.500"}
      />
      <Box textAlign="center">
        <AddProject />
      </Box>
    </Flex>
  );
};
