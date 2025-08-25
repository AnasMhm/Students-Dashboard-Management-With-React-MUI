import { Box, CircularProgress, Typography } from '@mui/material'
const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
        <CircularProgress size={100} thickness={20} color="primary" />
      </Box>
  )
}
export default LoadingSpinner;
