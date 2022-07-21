import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/auth.context";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import lightThemeOptions from "../styles/theme/lightThemeOptions";

const lightTheme = createTheme(lightThemeOptions);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
