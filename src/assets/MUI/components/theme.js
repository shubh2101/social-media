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
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          section: {
            backgroundImage: `linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(to top left , rgba(0, 0, 0, 0.8) 0%, transparent 100%), url(${process.env.PUBLIC_URL}/images/hero-bg.jpg)`,
            backgroundSize: "cover",
            height: "100vh",
            display: "flex",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
        },
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
