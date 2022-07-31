import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { Navbar } from "../layouts/Navbar";
import theme from "../utilities/theme";

function MyApp({ Component, pageProps }) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  );
}

export default MyApp;
