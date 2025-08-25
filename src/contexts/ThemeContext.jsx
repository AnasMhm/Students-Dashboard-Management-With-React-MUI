import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../theme";
import { setItemInStorage } from "../lib/storage";

const ThemeContext = createContext();

const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "light");
  const [colors, setColors] = useState(() => ({
    primary: localStorage.getItem("primaryColor") || "#1976d2",
    secondary: localStorage.getItem("secondaryColor") || "#f57c00",
  }));

  useEffect(() => {
    setItemInStorage("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    setItemInStorage("primaryColor", colors.primary);
    setItemInStorage("secondaryColor", colors.secondary);
  }, [colors]);

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => {
    return mode === "light"
      ? lightTheme(colors.primary, colors.secondary)
      : darkTheme(colors.primary, colors.secondary);
  }, [mode, colors]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, colors, setColors }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeProviderCustom, useThemeContext };
