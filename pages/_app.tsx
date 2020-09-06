import { AppProps } from "next/app";
import { SpotifyProvider } from "../components/SpotifyContext";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core";
import { darkTheme } from "../themes/darkTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spotify Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SpotifyProvider>
        <ThemeProvider theme={darkTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SpotifyProvider>
    </>
  );
}

export default MyApp;
