import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

function Dashboard() {
  const { isInitialized, isAuthenticated } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => (!isAuthenticated ? router.push("/") : null);
    isInitialized && checkUser();
  }, [isInitialized, isAuthenticated]);

  return (
    <div>
      <p>The cool dashboard comes here</p>
    </div>
  );
}

export default Dashboard;
