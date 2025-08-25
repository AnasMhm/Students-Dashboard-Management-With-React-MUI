import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingSpinner from "../components/LoadingSpinner";
import MUIStandardTable from "../components/MUIStandardTable";
import MUICard from "../components/MUICard";


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

const tableHeaders = ["ID", "Name", "Email", "Phone", "Joined"];

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {stats.map((stat, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, xl: 3 }}>
            <MUICard
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              percentage={stat.label === "Completion Rate" ? true : undefined}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          New Students
        </Typography>
        <MUIStandardTable tableBody={newStudents} tableHeaders={tableHeaders} />
      </Box>
    </Box>
  );
}
