import { Box, Button, Flex, useColorMode, useColorModeValue, Text } from "@chakra-ui/react";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={8}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Text size={"lg"}>Translat3</Text>
        </Box>
        <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
      </Flex>
    </Box>
  );
};
