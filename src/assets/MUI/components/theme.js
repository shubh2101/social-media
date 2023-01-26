import { createTheme } from "@mui/material";

export const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#003892",
        light: "#4d61c3",
        dark: "#001463",
      },
      secondary: {
        main: "#003892",
        light: "#FFCF33",
        dark: "#003892",
      },
    },
    overrides: {
      MuiListItem: {
        root: {
          "&$selected": {
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "orange",
            },
          },
        },
        button: {
          "&:hover": {
            backgroundColor: "yellow",
          },
        },
      },
    },
  });
