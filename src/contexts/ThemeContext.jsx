"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../theme";

const ThemeContext = createContext();

const ThemeProviderCustom = ({ children }) => {
    const [mode, setMode] = useState(getInitialMode);
    useEffect(() => {
        localStorage.setItem("themeMode", mode);
    }, [mode]);
    function getInitialMode() {
        const saved = localStorage.getItem("themeMode");
        if (saved) return saved;

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    };

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const theme = useMemo(
        () => (mode === "light" ? lightTheme : darkTheme),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeProviderCustom, useThemeContext };
