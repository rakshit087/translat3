import "@rainbow-me/rainbowkit/styles.css";
import "./global.css";
import theme from "../utilities/theme";
import { ChakraProvider, ColorModeScript, Flex, useColorMode } from "@chakra-ui/react";
import { Navbar } from "../layouts/Navbar";
import { SideDrawer } from "../layouts/SideDrawer";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains([chain.polygonMumbai, chain.hardhat], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Translat3",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  persister: null,
});

function App({ Component, pageProps }) {
  const { colorMode } = useColorMode();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={
          colorMode == "light"
            ? lightTheme({
                accentColor: "#805AD5",
              })
            : darkTheme({
                accentColor: "#D6BCFA",
                accentColorForeground: "#1A202C",
              })
        }
      >
        <Navbar />
        <Flex
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <SideDrawer />
          <Component {...pageProps} />
        </Flex>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App Component={Component} pageProps={pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
