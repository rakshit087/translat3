import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { SideDrawer } from "../layouts/SideDrawer";
import { Translate } from "../layouts/Translate";
import { Home } from "../layouts/Home";
import { Pool } from "../layouts/Pool";
import { useAccount } from "wagmi";

function Dashboard() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [currentLayout, setCurrentLayout] = useState("home");

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
      <SideDrawer currentLayout={currentLayout} setCurrentLayout={setCurrentLayout} />
      {currentLayout == "home" && <Home />}
      {currentLayout == "translate-projects" && <Translate />}
      {currentLayout == "pool" && <Pool />}
    </Flex>
  );
}

export default Dashboard;
