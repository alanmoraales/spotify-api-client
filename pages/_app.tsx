import { useEffect } from "react";
import { AppProps } from "next/app";
import { SpotifyProvider } from "../components/SpotifyContext";
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
    <ThemeProvider theme={darkTheme}>
      <SpotifyProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </SpotifyProvider>
    </ThemeProvider>
  );
}

export default MyApp;
