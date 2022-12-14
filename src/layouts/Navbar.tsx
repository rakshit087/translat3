import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { User } from "../components/User";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      borderBottom="solid 1px"
      borderBottomColor={useColorModeValue("gray.300", "gray.700")}
      position="fixed"
      px={16}
      top={0}
      width="100%"
      zIndex={1}
    >
      <Flex h="9.8vh" alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize="3xl">Translat3</Text>
        <Flex>
          <IconButton
            aria-label="theme switcher"
            icon={colorMode == "dark" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            rounded="full"
            marginRight={2}
          />
          <User />
        </Flex>
      </Flex>
    </Box>
  );
};
