import { createTheme } from "@mui/material";

export const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#003892",
        light: "#348892",
        dark: "#014A53",
      },
      secondary: {
        main: "#003892",
        light: "#FFCF33",
        dark: "#003892",
      },
    },
  });
