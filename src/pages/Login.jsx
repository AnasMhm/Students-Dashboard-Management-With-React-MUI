import { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography, Paper, FormControlLabel, RadioGroup, Radio, FormControl, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { loginSchema } from "../lib/validators";
import MUISnackbar from "../components/common/MUISnackbar";

const Login = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  // Toast state
  const [toast, setToast] = useState({ open: false, message: "", severity: "error" });
  const showToast = (message, severity = "error") => setToast({ open: true, message, severity });

  useEffect(() => {
    setPageLoading(true);
    if (user) {
      navigate("/");
    } else {
      setPageLoading(false);
    }
    const timer = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, [navigate, user]);

  if (loading || pageLoading) return <LoadingSpinner />;
  if (user) return null;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center", bgcolor: "background.paper" }}>
          <Typography
            sx={{ fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" }, fontWeight: "bold", color: "text.primary" }}
            gutterBottom
          >
            Student Dashboard Login
          </Typography>

          <Formik
            initialValues={{ username: "", role: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              const result = login(values.username, values.role);
              if (typeof result === "string") {
                showToast(result);
              } else {
                if (values.role === "Admin") navigate("/");
                else navigate("/courses");
              }
            }}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{
                    mb: 3,
                    "& .MuiInputLabel-root": { color: "text.secondary" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "primary.main" },
                      "&:hover fieldset": { borderColor: "secondary.main" },
                      "&.Mui-focused fieldset": { borderColor: "primary.main" },
                    },
                  }}
                />

                <FormControl component="fieldset" error={touched.role && Boolean(errors.role)} sx={{ mb: 3 }}>
                  <Typography sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }, color: "text.primary" }}>
                    Role
                  </Typography>
                  <RadioGroup
                    row
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ justifyContent: "center", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}
                  >
                    <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                    <FormControlLabel value="Instructor" control={<Radio />} label="Instructor" />
                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                  </RadioGroup>
                  <FormHelperText>{touched.role && errors.role}</FormHelperText>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.2, fontWeight: "bold", borderRadius: 2, bgcolor: "primary.main", "&:hover": { bgcolor: "secondary.main" } }}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
      <MUISnackbar toast={toast} setToast={setToast} />
    </Box>
  );
};

export default Login;
