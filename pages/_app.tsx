import { AppProps } from "next/app";
import { SpotifyProvider } from "../components/SpotifyContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SpotifyProvider>
      <Component {...pageProps} />
    </SpotifyProvider>
  );
}

export default MyApp;
