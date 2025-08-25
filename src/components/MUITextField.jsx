import React from "react";
import { TextField } from "@mui/material";

const MUITextField = ({ label, value, onChange, error, helperText, multiline = false, rows, type = "text" }) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      type={type}
      margin="normal"
    />
  );
}
export default MUITextField;
