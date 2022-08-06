import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

interface datatype {
  id: number;
  name: string;
  description: string;
  languageFrom: string;
  languageTo: string;
  pooledAmount: string;
}

export const TranslateCard = (data: datatype) => {
  const [amount, setAmount] = useState<string>(data.pooledAmount);
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex bgColor={bgColor} flexDirection={"column"} height={80} borderRadius="xl" px={8} py={4}>
      <Flex grow={1} flexDir={"column"}>
        <Flex flexDirection={"row-reverse"} position="relative" left={5}>
          <Button disabled colorScheme="purple" variant="solid" size={"sm"} rounded="2xl" marginLeft={2}>
            {amount} MATIC
          </Button>
          <Button disabled colorScheme="purple" variant="solid" size={"sm"} rounded="2xl" margin={0}>
            {data.languageFrom.slice(0, 3)} to {data.languageTo.slice(0, 3)}
          </Button>
        </Flex>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {data.name}
          </Text>
          <Text as={"i"}>
            <span
              style={{
                fontSize: "35px",
              }}
            >
              {data.description[0]}
            </span>{" "}
            {data.description.slice(1)}
          </Text>
        </Box>
      </Flex>
      <Flex py={1} h={10} alignItems={"center"} justifyContent="space-between" roundedBottom={"xl"}>
        <Button colorScheme="purple" variant="solid" size={"sm"} rounded="xl" width={"100%"}>
          {" "}
          Translate{" "}
        </Button>
      </Flex>
    </Flex>
  );
};
