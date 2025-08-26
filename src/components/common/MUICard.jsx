import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const MUICard = ({ icon, label, value, percentage }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <Box sx={{ mr: 2 }}>{icon}</Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {percentage ? `${value}%` : value}
        </Typography>
      </Box>
    </Card>
  )
}

export default MUICard;
