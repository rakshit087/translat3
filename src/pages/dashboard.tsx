import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { SideDrawer } from "../layouts/SideDrawer";
import { AddProject } from "../layouts/AddProject";
import { Translate } from "../layouts/Translate";
import { Home } from "../layouts/Home";

function Dashboard() {
  const { isInitialized, isAuthenticated } = useMoralis();
  const router = useRouter();

  const [currentLayout, setCurrentLayout] = useState("home");

  useEffect(() => {
    const checkUser = () => (!isAuthenticated ? router.push("/") : null);
    isInitialized && checkUser();
  }, [isInitialized, isAuthenticated]);

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
      {currentLayout == "add-project" && <AddProject />}
    </Flex>
  );
}

export default Dashboard;
