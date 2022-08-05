import { ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";
import { Navbar } from "../layouts/Navbar";
import theme from "../utilities/theme";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SideDrawer } from "../layouts/SideDrawer";

const { chains, provider } = configureChains([chain.polygonMumbai, chain.hardhat], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Translat3",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Navbar />
          <Flex>
            <SideDrawer />
            <Component {...pageProps} />
          </Flex>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
