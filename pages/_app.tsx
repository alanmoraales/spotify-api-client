import { AppProps } from "next/app";
import { SpotifyProvider } from "../components/SpotifyContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SpotifyProvider>
        <Component {...pageProps} />
      </SpotifyProvider>
    </>
  );
}

export default MyApp;
