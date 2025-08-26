import TextField from "@mui/material/TextField";

const MUITextField = ({ label, value, onChange, name, error, helperText, multiline = false, rows, type = "text" }) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      name={name}
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
