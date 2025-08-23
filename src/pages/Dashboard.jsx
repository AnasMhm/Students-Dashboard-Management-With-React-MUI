import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Dashboard() {
  const stats = [
    {
      label: "Students",
      value: 120,
      icon: <SchoolIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
    {
      label: "Courses",
      value: 10,
      icon: <BookIcon sx={{ fontSize: 40, color: "secondary.main" }} />,
    },
    {
      label: "Enrollments",
      value: 250,
      icon: <HowToRegIcon sx={{ fontSize: 40, color: "success.main" }} />,
    },
    {
      label: "Completion Rate",
      value: 85,
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: "info.main" }} />,
    },
  ];

  const newStudents = [
    {
      id: "stu_001",
      name: "Sara Khaled",
      email: "sara@example.com",
      phone: "05XXXXXXXX",
      createdAt: "2025-08-10T10:00:00Z",
    },
    {
      id: "stu_002",
      name: "Ali Hassan",
      email: "ali@example.com",
      phone: "05XXXXXXXX",
      createdAt: "2025-08-12T11:30:00Z",
    },
    {
      id: "stu_003",
      name: "Lina Omar",
      email: "lina@example.com",
      phone: "05XXXXXXXX",
      createdAt: "2025-08-14T09:45:00Z",
    },
    {
      id: "stu_004",
      name: "Khalid Yousef",
      email: "khalid@example.com",
      phone: "05XXXXXXXX",
      createdAt: "2025-08-15T14:20:00Z",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {stats.map((stat, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, xl: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Box sx={{ mr: 2 }}>{stat.icon}</Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.label === "Completion Rate"
                    ? `${stat.value}%`
                    : stat.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Students Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          New Students
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table
  sx={{
    "& .MuiTableCell-head": { fontSize: "0.95rem", fontWeight: "bold" },
    "& .MuiTableCell-body": { fontSize: "0.85rem" },
  }}
>
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Phone</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newStudents.map((stu) => (
                <TableRow key={stu.id} hover>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{stu.id}</TableCell>
                  <TableCell>{stu.name}</TableCell>
                  <TableCell>{stu.email}</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{stu.phone}</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {new Date(stu.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
