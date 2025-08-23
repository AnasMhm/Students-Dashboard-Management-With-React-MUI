import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
      const isLoggedIn = false;
      if (isLoggedIn) {
        navigate("/");
      }
      else {
        setLoading(false);
      }
    }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      console.log("Logging in with:", username);
      // TODO: handle login logic
    }
  };
  if(loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default", // uses theme background
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            bgcolor: "background.paper", // paper background from theme
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "1.25rem",
                sm: "1.75rem",
                md: "2rem",
              },
              fontWeight: "bold",
              color: "text.primary", // theme text color
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
                "&:hover": {
                  bgcolor: "secondary.main", // hover = orange
                },
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
