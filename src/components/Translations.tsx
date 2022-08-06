import { Button, Box, SkeletonText, Flex } from "@chakra-ui/react";
import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { useContractRead } from "wagmi";
import { AddTranslation } from "./AddTranslation";

export const Translations = ({ paragraphId }) => {
  const { data, isLoading, isError } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "getParagraphTranslations",
    args: [paragraphId],
  });
  console.log(data);
  return (
    <>
      {isLoading && <SkeletonText noOfLines={10} />}
      {!isLoading && data.length == 0 && <p>No Translations Yet, add one now!</p>}
      {!isLoading &&
        data &&
        data.map((translation) => {
          return <Flex>{translation.text}</Flex>;
        })}
      <AddTranslation paragraphId={paragraphId} />
    </>
  );
};
