import { SimpleGrid } from "@chakra-ui/react";
import { PoolProject } from "../components/PoolProject";
import { useContractRead } from "wagmi";
import abiJSON from "../hardhat/artifacts/src/hardhat/contracts/Translate.sol/Translat3.json";
import { useEffect, useState } from "react";

export const Pool = () => {
  const [page, setPage] = useState<number>(1);
  const [filtered, setFiltered] = useState(null);
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abiJSON.abi,
    functionName: "getLatestPoolProjects",
    args: page,
  });

  useEffect(() => {
    if (data) {
      const filtered = data.filter((project) => project.title !== "");
      setFiltered(filtered);
    }
    setPage(page + 1);
  }, [data]);

  return (
    <>
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
      {isLoading && <div>Loading...</div>}
    </>
  );
};
