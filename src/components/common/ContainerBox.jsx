import Box from "@mui/material/Box"

function ContainerBox({ children }) {
    return (
        <Box sx={{ mt: 4, p: { xs: 1, md: 3 }, width: "100%" }}>
            {children}
        </Box>
    )
}

export default ContainerBox
