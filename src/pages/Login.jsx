import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(true);
    if (user) {
      navigate("/");
    }
    else {
      setPageLoading(false);
    }
    const timer = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, [navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username, role);
      navigate("/");
    }
  };

  if (loading || pageLoading) {
    return <LoadingSpinner />;
  }
  if (user) {
    return null
  }
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default"
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            bgcolor: "background.paper"
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" },
              fontWeight: "bold",
              color: "text.primary"
            }}
            gutterBottom
          >
            Student Dashboard Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                color: "text.primary"
              }}
              gutterBottom
            >
              Role
            </Typography>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ mb: 3, justifyContent: "center" }}
            >
              <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="Instructor" control={<Radio />} label="Instructor" />
              <FormControlLabel value="Student" control={<Radio />} label="Student" />
            </RadioGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 2,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "secondary.main" },
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
export default Login;
