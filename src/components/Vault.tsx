import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { useContractRead } from "wagmi";
import { Button, Flex, Text, useColorModeValue, SkeletonText } from "@chakra-ui/react";
import { WithdrawButton } from "./WithdrawButton";

export const Vault = () => {
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "getTranslatorVault",
  });

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
      {data && (
        <>
          <Text textAlign={"center"} fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            {(parseFloat(data.toString()) / 1e18).toString().slice(0, 4)} MATIC
          </Text>
          <WithdrawButton amount={(parseFloat(data.toString()) / 1e18).toString().slice(0, 4)} />
        </>
      )}
      {isLoading && (
        <>
          <SkeletonText />
          <Button w={"100%"} colorScheme="purple" variant="solid" size={"sm"} rounded="2xl" isDisabled>
            Claim Tokens
          </Button>
        </>
      )}
    </Flex>
  );
};
