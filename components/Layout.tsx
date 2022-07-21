
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import theme from "../utils/theme";
import NavBar from "./NavBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <main>
          <Container sx={{ pb: 2, pt: 2 }}>{children}</Container>
        </main>
        <NavBar />
      </ThemeProvider>
    </Box>
  );
}
