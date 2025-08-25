import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const MUIDialog = ({ open, title, onClose, onSave, saveText = "Save", children, maxWidth = "sm" }) => {
  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MUIDialog;
