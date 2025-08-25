import { Box, Typography, Switch, FormControlLabel, Button, Stack } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext"; 

const colorOptions = ["#1976d2", "#d32f2f", "#388e3c", "#f57c00", "#6a1b9a", "#f50057", "#009688"];

const SettingsPage = () => {
  const { mode, toggleTheme, colors, setColors } = useThemeContext();

  const handlePrimaryChange = (color) => {
    setColors((prev) => ({ ...prev, primary: color }));
  };

  const handleSecondaryChange = (color) => {
    setColors((prev) => ({ ...prev, secondary: color }));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <FormControlLabel
        control={<Switch checked={mode === "dark"} onChange={toggleTheme} />}
        label="Dark Mode"
      />

      <Typography variant="subtitle1" mt={3}>
        Choose Primary Color:
      </Typography>
      <Stack direction="row" mt={1} flexWrap="wrap">
        {colorOptions.map((color) => (
          <Button
            key={color}
            onClick={() => handlePrimaryChange(color)}
            sx={{
              minWidth: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: color,
              border: colors.primary === color ? "3px solid black" : "1px solid #ccc",
              mr: 2,
              mt: 1
            }}
          />
        ))}
      </Stack>

      <Typography variant="subtitle1" mt={3}>
        Choose Secondary Color:
      </Typography>
      <Stack direction="row" mt={1} flexWrap="wrap">
        {colorOptions.map((color) => (
          <Button
            key={color}
            onClick={() => handleSecondaryChange(color)}
            sx={{
              minWidth: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: color,
              border: colors.secondary === color ? "3px solid black" : "1px solid #ccc",
              mr: 2,
              mt: 1
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SettingsPage;
