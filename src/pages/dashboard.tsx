import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Vault } from "../components/Vault";
import { UserPooled } from "../components/UserPooled";
import { UserTranslate } from "../components/UserTranslate";
import { UserFinished } from "../components/UserFinished";
import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { useContractRead } from "wagmi";

function Dashboard() {
  const { isConnected } = useAccount();
  const router = useRouter();

  const [pooledProjects, setPooledProjects] = useState([]);
  const [translationProjects, setTranslationProjects] = useState([]);
  const [finishedProjects, setFinishedProjects] = useState([]);

  useEffect(() => {
    const checkUser = () => (!isConnected ? router.push("/") : null);
    checkUser();
  }, [isConnected]);

  const { data, isLoading, isError } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "getAuthorProjects",
  });

  useEffect(() => {
    if (data) {
      data.map((project) => {
        if (parseInt(project.status) == 0) {
          setPooledProjects([...pooledProjects, project]);
        } else if (parseInt(project.status) == 1) {
          setTranslationProjects([...translationProjects, project]);
        } else if (parseInt(project.status) == 2) {
          setFinishedProjects([...finishedProjects, project]);
        }
      });
    }
  }, [data]);

  return (
    <Flex
      flexDirection={{
        base: "column",
        md: "row",
      }}
      grow={1}
      mt={"10vh"}
      ml={{ base: 0, md: "4rem" }}
      px={{ base: 12, md: 16 }}
      py={8}
      overflowX="hidden"
    >
      <Box mx={{ base: "auto", md: "4rem" }} w={"100%"} overflowX="auto">
        <Vault />
        <UserPooled data={pooledProjects} isLoading={isLoading} />
        <UserTranslate data={translationProjects} isLoading={isLoading} />
        <UserFinished data={finishedProjects} isLoading={isLoading} />
      </Box>
    </Flex>
  );
}

export default Dashboard;
