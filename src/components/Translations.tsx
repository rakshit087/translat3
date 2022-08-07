import { Button, Box, SkeletonText, Flex, useColorModeValue, IconButton, Text } from "@chakra-ui/react";
import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { useContractRead, useAccount } from "wagmi";
import { AddTranslation } from "./AddTranslation";
import { VoteButton } from "./VoteButton";

export const Translations = ({ paragraphId }) => {
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "getParagraphTranslations",
    args: [paragraphId],
  });
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      {isLoading && <SkeletonText noOfLines={10} />}
      {!isLoading && !data && <p>No Translations Yet, add one now!</p>}
      {!isLoading &&
        data &&
        data.map((translation) => {
          return (
            <Flex alignItems={"center"} bgColor={bgColor} justifyContent={"space-between"} mb={8} p={8} rounded={"xl"}>
              <Text w={"85%"} lineHeight={2}>
                {translation.text}
              </Text>
              <VoteButton translation={translation} />
            </Flex>
          );
        })}
      <AddTranslation paragraphId={paragraphId} />
    </>
  );
};
