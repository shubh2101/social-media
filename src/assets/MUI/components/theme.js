import { createTheme } from "@mui/material";

export const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#026b77",
        light: "#348892",
        dark: "#014A53",
      },
      secondary: {
        main: "#E6B801",
        light: "#FFCF33",
        dark: "#B28900",
      },
    },
  });