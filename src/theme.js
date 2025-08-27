import { createTheme } from "@mui/material";

const common = {
  typography: {
    fontFamily: "Cairo, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
};

export const lightTheme = (primaryColor = "#1976d2", secondaryColor = "#f57c00") =>
  createTheme({
    ...common,
    palette: {
      mode: "light",
      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
      background: {
        default: "#f9fafb",
        paper: "#ffffff",
      },
      text: {
        primary: "#1e293b",
        secondary: "#475569",
      },
    },
  });

export const darkTheme = (primaryColor = "#90caf9", secondaryColor = "#ffb74d") =>
  createTheme({
    ...common,
    palette: {
      mode: "dark",
      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
      background: {
        default: "#121212",
        paper: "#161414ff",
      },
      text: {
        primary: "#f5f5f5",
        secondary: "#cbd5e1",
      },
    },
  });

