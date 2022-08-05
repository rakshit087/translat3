import "@rainbow-me/rainbowkit/styles.css";
import theme from "../utilities/theme";
import { ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";
import { Navbar } from "../layouts/Navbar";
import { SideDrawer } from "../layouts/SideDrawer";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
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

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
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
    </ChakraProvider>
  );
}

export default MyApp;
