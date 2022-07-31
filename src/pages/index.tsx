import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const { isInitialized, isAuthenticated } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => (isAuthenticated ? router.push("/dashboard") : null);
    isInitialized && checkUser();
  }, [isInitialized, isAuthenticated]);

  return (
    <div>
      <Head>
        <title>Translat3</title>
        <meta name="description" content="The fastest way to localize your projects powered by Polygon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box p={8}>
          <p>Welcome to Translat3</p>
          <p>I will replace this with an awesome landing page</p>
        </Box>
      </main>
    </div>
  );
}
