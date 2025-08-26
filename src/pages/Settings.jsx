import { Box, Typography } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import ThemeToggle from "../components/settings/ThemeToggle";
import ColorPicker from "../components/settings/ColorPicker";

const colorOptions = ["#1976d2", "#d32f2f", "#388e3c", "#f57c00", "#6a1b9a", "#f50057", "#009688"];

const Settings = () => {
  const { colors, setColors } = useThemeContext();

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <ThemeToggle />
      <ColorPicker
        title="Choose Primary Color:"
        colors={colorOptions}
        selectedColor={colors.primary}
        onChange={(color) => setColors(prev => ({ ...prev, primary: color }))}
      />

      <ColorPicker
        title="Choose Secondary Color:"
        colors={colorOptions}
        selectedColor={colors.secondary}
        onChange={(color) => setColors(prev => ({ ...prev, secondary: color }))}
      />
    </Box>
  );
};

export default Settings;
