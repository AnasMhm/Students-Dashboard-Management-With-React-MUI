import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function StatCard({ icon, label, value, percentage }) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>{icon}</Box>
                <Box>
                    <Typography variant="h6">{label}</Typography>
                    <Typography variant="body1">
                        {value}
                        {percentage && "%"}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
