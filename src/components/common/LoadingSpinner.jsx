import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 250px)",
      }}
    >
      <CircularProgress size={100} thickness={20} color="primary" />
    </Box>
  )
}
export default LoadingSpinner;
