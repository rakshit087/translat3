import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
export const Vault = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex
      bgColor={bgColor}
      flexDirection={"column"}
      height={{ base: 52, md: 64 }}
      justifyContent={"space-between"}
      width={{ base: "100%", md: "24rem" }}
      px={8}
      py={4}
      rounded={"xl"}
    >
      <Text fontSize={"xl"}>Your Vault</Text>
      <Text textAlign={"center"} fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
        0.00 MATIC
      </Text>
      <Button w={"100%"} colorScheme="purple" variant="solid" size={"sm"} rounded="2xl" margin={0}>
        Claim Tokens
      </Button>
    </Flex>
  );
};
