import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default function PageHeader({ title, buttonText, buttonIcon, onButtonClick, showButton = true }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                mb: 2,
                gap: 1,
            }}
        >
            <Typography variant="h6" fontWeight="bold">
                {title}
            </Typography>
            {buttonText && showButton && (
                <Button variant="contained" startIcon={buttonIcon} onClick={onButtonClick}>
                    {buttonText}
                </Button>
            )}
        </Box>
    );
}
