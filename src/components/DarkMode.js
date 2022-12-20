import { ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { theme } from "../assets/MUI/components/theme";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
export const ColorContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme(mode)}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
