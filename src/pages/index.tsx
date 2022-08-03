import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useAccount } from "wagmi";

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();
  useEffect(() => {
    const checkUser = () => (isConnected ? router.push("/dashboard") : null);
    checkUser();
  }, [isConnected]);

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
