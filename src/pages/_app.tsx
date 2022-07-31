import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
