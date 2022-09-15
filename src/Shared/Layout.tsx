import React from "react";
import Navbar from "./Navbar";
import { ThemeContextProvider } from "../contexts/useTheme";
import { Box } from "@mui/system";
import { ScopedCssBaseline } from "@mui/material"
import Head from "next/head";

interface LayoutProps {
  children?: React.ReactNode
  title?: string
}

const Layout = (props: LayoutProps) => {
  return (
    <ThemeContextProvider>
      <ScopedCssBaseline enableColorScheme>
        <Head>
          <title>{props.title ? `${props.title} - Open LIMS` : 'Open LIMS'}</title>
        </Head>
        <Navbar/>
        <Box height="100vh" sx={{paddingTop: "4rem", overflow: "auto"}}>
          {props.children}
        </Box>
      </ScopedCssBaseline>
    </ThemeContextProvider>
  )
}

export default Layout