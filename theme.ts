"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dc2f02",
    },
    secondary: {
      main: "#ed3a0c",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#dc2f02",
        },
      },
    },
  } as any,
});

export default theme;
