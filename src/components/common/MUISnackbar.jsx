import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
const MUISnackbar = ({ toast, setToast }) => {
    return (
        <Snackbar
            open={toast.open}
            autoHideDuration={3000}
            onClose={() => setToast({ ...toast, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: "100%" }}>
                {toast.message}
            </Alert>
        </Snackbar>
    )
}

export default MUISnackbar
