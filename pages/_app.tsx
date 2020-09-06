import { useEffect } from "react";
import { AppProps } from "next/app";
import { SpotifyProvider } from "../components/SpotifyContext";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { darkTheme } from "../themes/darkTheme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Spotify Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SpotifyProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SpotifyProvider>
    </>
  );
}

export default MyApp;
