import { Box, SimpleGrid } from "@chakra-ui/react";
import { PoolProject } from "../components/PoolProject";

export const Pool = () => {
  return (
    <SimpleGrid minChildWidth={{ base: "16rem", md: "20rem" }} w="100%" spacing={"2.5rem"}>
      <PoolProject
        name="The Alchemist"
        description="A book which tells a journey of a shipherd, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem."
        languageFrom="English"
        languageTo="Hindi"
        pooledAmount="100"
      />
      <PoolProject
        name="The Alchemist"
        description="A book which tells a journey of a shipherd, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem."
        languageFrom="English"
        languageTo="Hindi"
        pooledAmount="100"
      />
      <PoolProject
        name="The Alchemist"
        description="A book which tells a journey of a shipherd, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem."
        languageFrom="English"
        languageTo="Hindi"
        pooledAmount="100"
      />
      <PoolProject
        name="The Alchemist"
        description="A book which tells a journey of a shipherd, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem."
        languageFrom="English"
        languageTo="Hindi"
        pooledAmount="100"
      />
    </SimpleGrid>
  );
};
