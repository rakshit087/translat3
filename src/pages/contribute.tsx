import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { Button, Flex, SimpleGrid, SkeletonText, useColorModeValue, Text } from "@chakra-ui/react";
import { PoolProject } from "../components/PoolProject";
import { useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function Contribute() {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const { isConnected } = useAccount();
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [filtered, setFiltered] = useState(null);
  const { data, isLoading, isError } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "getLatestProjects",
    args: [page, 0],
  });

  useEffect(() => {
    const checkUser = () => (!isConnected ? router.push("/") : null);
    checkUser();
  }, [isConnected]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((project) => project.title !== "");
      setFiltered(filtered);
    }
    //setPage(page + 1);
  }, [data]);

  return (
    <Flex grow={1} mt={"10vh"} ml={{ base: 0, md: "4rem" }} px={{ base: 12, md: 16 }} py={8}>
      {!isLoading && filtered && (
        <SimpleGrid minChildWidth={{ base: "16rem", md: "20rem" }} w="100%" spacing={"2.5rem"}>
          {filtered.map((project) => {
            return (
              <PoolProject
                key={parseInt(project.id)}
                id={parseInt(project.id)}
                name={project.title}
                description={project.description}
                languageFrom={project.primaryLanguage}
                languageTo={project.translateTo}
                pooledAmount={(parseFloat(project.vault) / 1000000000000000000).toString()}
              />
            );
          })}
        </SimpleGrid>
      )}
      {isLoading && (
        <Flex bgColor={bgColor} flexDirection={"column"} height={80} borderRadius="xl" px={8} py={4} width={64}>
          <Flex>
            <SkeletonText />
          </Flex>
          <Flex py={1} h={10} alignItems={"center"} justifyContent="space-between" roundedBottom={"xl"}>
            <Button disabled>
              {" "}
              <SkeletonText noOfLines={1} />{" "}
            </Button>
          </Flex>
        </Flex>
      )}
      {isError && (
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Text fontSize={"xl"}>No projects are available at the moment.</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default Contribute;
