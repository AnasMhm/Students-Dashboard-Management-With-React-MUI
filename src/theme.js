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

export const lightTheme = createTheme({
  ...common,
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },    // Academic Blue
    secondary: { main: "#f57c00" },  // Orange for highlights
    background: {
      default: "#f9fafb",            // Page background
      paper: "#ffffff",              // Cards, tables, charts
    },
    text: {
      primary: "#1e293b",            // Dark slate (headings)
      secondary: "#475569",          // Cool gray (subtext)
    },
  },
});

export const darkTheme = createTheme({
  ...common,
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#ffb74d" },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#cbd5e1",
    },
  },
});
