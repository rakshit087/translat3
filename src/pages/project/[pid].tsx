import { Box, Button, Flex, SkeletonText, Text, useColorModeValue } from "@chakra-ui/react";
import { useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import abiJSON from "../../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { useRouter } from "next/router";
import { Translations } from "../../components/Translations";

const Project = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { isConnected } = useAccount();
  useEffect(() => {
    const checkUser = () => (!isConnected ? router.push("/") : null);
    checkUser();
  }, [isConnected]);

  const { data, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "getProjectParagraphs",
    args: [pid],
  });
  const primaryColor = useColorModeValue<string, string>("purple.400", "purple.200");
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const [selectedParagraph, setSelectedParagraph] = useState<number>(null);
  useEffect(() => {
    if (data) setSelectedParagraph(parseInt(data[0].id));
  }, [data]);
  return (
    <Flex
      grow={1}
      mt={"10vh"}
      ml={{ base: 0, md: "4rem" }}
      px={{ base: 12, md: 16 }}
      py={8}
      maxH={"90vh"}
      justifyContent={"space-between"}
    >
      <Box width={"49%"} overflowY={"scroll"}>
        {isLoading && <SkeletonText noOfLines={10} />}
        {!isLoading &&
          data &&
          data.map((paragraph) => (
            <Box
              key={parseInt(paragraph.id)}
              p={3}
              mb={2}
              rounded={"xl"}
              bgColor={selectedParagraph === parseInt(paragraph.id) ? bgColor : "transparent"}
            >
              <Text
                cursor={"pointer"}
                _hover={{
                  textColor: selectedParagraph === parseInt(paragraph.id) ? "white" : primaryColor,
                }}
                onClick={() => {
                  setSelectedParagraph(parseInt(paragraph.id));
                }}
              >
                {paragraph.text}
              </Text>
            </Box>
          ))}
      </Box>
      <Box width={"49%"} height={"100%"}>
        <Translations paragraphId={selectedParagraph} />
      </Box>
    </Flex>
  );
};

export default Project;
