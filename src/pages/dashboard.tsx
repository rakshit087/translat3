import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Vault } from "../components/Vault";
import { UserPooled } from "../components/UserPooled";
import { UserTranslate } from "../components/UserTranslate";
import { UserFinished } from "../components/UserFinished";

function Dashboard() {
  const { isConnected } = useAccount();
  const router = useRouter();
  useEffect(() => {
    const checkUser = () => (!isConnected ? router.push("/") : null);
    checkUser();
  }, [isConnected]);

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
        <UserPooled />
        <UserTranslate />
        <UserFinished />
      </Box>
    </Flex>
  );
}

export default Dashboard;
