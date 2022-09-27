import { ThemeProvider } from "@emotion/react";
import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import React from "react";
import { ProviderProps } from "../Helpers/TypeHelpers";

declare module '@mui/material/styles' {
  interface Palette {
    sidebar: PaletteColor;
    table: PaletteColor;
    generalButton: PaletteColor;
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    sidebar: PaletteColorOptions;
    table: PaletteColorOptions;
    generalButton: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    generalButton: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldProps {
    sidebar: true;
  }
}


interface ContextProps {
  theme: "light"|"dark"
  handleTheme: () => void
}

export const ThemeContext = React.createContext<ContextProps>({} as ContextProps)

export const ThemeContextProvider = ({children}: ProviderProps) => {
  const [ theme, setTheme ] = React.useState<"light"|"dark">("light");

  React.useEffect(() => {
    if(typeof window !== 'undefined')
      setTheme(localStorage.getItem("preferredTheme") !== null && localStorage.getItem("preferredTheme") !== "light" ? "dark" : "light")
  }, [])

  React.useEffect(() => {
    if(typeof window !== 'undefined')
      localStorage.setItem("preferredTheme", theme)
  }, [theme])
  

  function handleTheme()
  {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <ThemeContext.Provider
      value={{handleTheme, theme}}
    >
      <ThemeProvider theme={Tema[theme]}>
        { children }
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const Tema = {
  light: createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: "#EFEFF1",
          dark: "#555",
          light: "#329D8E",
          contrastText: "#010101"
        },
        text: {
          primary: '#000',
        },
        secondary: {
          main: '#135FD4',
          contrastText: '#000'
        },
        sidebar: {
          main: "#A29CDE",
          contrastText: "#fff"
        },
        table: {
          main: "#EFEFF1"
        },
        generalButton: {
          main: "#7E4E8E",
          dark: "#59266C",
          light: "#C08BD3",
          contrastText: "#fafafa"
        }
      },
      typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(',')
      }
  }),
  dark: createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: "#444",
          dark: "#222",
          light: "#512321",
          contrastText: "#fafafa"
        },
        secondary: {
          main: '#E06D06',
        },
        background: {
          default: '#222'
        },
        sidebar: {
          main: "#689187"
        },
        table: {
          main: "#EFEFF1"
        },
        generalButton: {
          main: "#7E4E8E",
          dark: "#C08BD3",
          light: "#C08BD3"
        }
      },
      typography: {
        fontFamily: [
          '"Roboto Slab Light"',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(',')
      }
  }),
}

export function useTema() {
  const context = React.useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }

  return context
}