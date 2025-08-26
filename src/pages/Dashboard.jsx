import Grid from "@mui/material/Grid";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MUIStandardTable from "../components/common/MUIStandardTable";
import MUICard from "../components/common/MUICard";
import { getStudents, getCourses, getEnrollments } from "../lib/seed";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContainerBox from "../components/common/ContainerBox";

const tableHeaders = ["ID", "FirstName", "LastName", "Email", "Phone", "Joined"];

const Dashboard = () => {
  const studentsCame = getStudents();
  const courses = getCourses();
  const enrollments = getEnrollments();

  const stats = [
    {
      label: "Students",
      value: studentsCame.length,
      icon: <SchoolIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    },
    {
      label: "Courses",
      value: courses.length,
      icon: <BookIcon sx={{ fontSize: 40, color: "secondary.main" }} />,
    },
    {
      label: "Enrollments",
      value: enrollments.length,
      icon: <HowToRegIcon sx={{ fontSize: 40, color: "success.main" }} />,
    },
    {
      label: "Completion Rate",
      value: Math.round(
        (enrollments.filter(e => (e.progress || 0) < 50).length / (enrollments.length || 1)) * 100
      ),
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: "info.main" }} />,
    },
  ];

  const [students, setStudents] = useState([]); // for reusable component (ask)
  const navigate = useNavigate();
  useEffect(() => {
    setStudents(getStudents());
  }, []);
  const newStudents = students.slice(-5);
  return (
    <ContainerBox>
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
      <MUIStandardTable header="Last 5 Students Joined" tableBody={newStudents} tableHeaders={tableHeaders} onRowClick={(row) => navigate(`/students/${row.id}`)} />
    </ContainerBox>
  );
}

export default Dashboard;
