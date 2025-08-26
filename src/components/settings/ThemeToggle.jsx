import { FormControlLabel, Switch } from "@mui/material";
import { useThemeContext } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
    const { mode, toggleTheme } = useThemeContext();
    return <FormControlLabel
        control={<Switch checked={mode === "dark"} onChange={toggleTheme} />}
        label="Dark Mode"
    />
}

export default ThemeToggle;
