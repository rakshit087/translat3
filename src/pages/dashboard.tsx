import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";

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
    >
      <Flex grow={1} mt={"10vh"} ml={{ base: 0, md: "4rem" }} px={{ base: 12, md: 16 }} py={8}>
        <Box mx={{ base: "auto", md: "4rem" }}>
          <p>The user stats will come here</p>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
