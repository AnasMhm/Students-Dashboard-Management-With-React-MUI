import { Button, Stack, Typography } from "@mui/material";

const ColorPicker = ({ title, colors, selectedColor, onChange }) => (
    <>
        <Typography variant="subtitle1" mt={3}>{title}</Typography>
        <Stack direction="row" mt={1} flexWrap="wrap">
            {colors.map((color) => (
                <Button
                    key={color}
                    onClick={() => onChange(color)}
                    sx={{
                        minWidth: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: color,
                        border: selectedColor === color ? "3px solid black" : "1px solid #ccc",
                        mr: 2,
                        mt: 1
                    }}
                />
            ))}
        </Stack>
    </>
);

export default ColorPicker;
