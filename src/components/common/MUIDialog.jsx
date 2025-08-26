import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const MUIDialog = ({ open, title, onClose, onSave, saveText = "Save", children, maxWidth = "sm" }) => {
  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave} type="submit">
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MUIDialog;
