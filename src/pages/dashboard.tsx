import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { Home } from "../layouts/Home";
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
        <Home />
      </Flex>
    </Flex>
  );
}

export default Dashboard;
