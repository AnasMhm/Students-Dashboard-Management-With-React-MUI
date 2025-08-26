import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StudentProfileCard from "../components/student/StudentProfileCard";
import EnrollmentList from "../components/student/EnrollmentList";
import { getStudents } from "../lib/seed";

const Student = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const students = getStudents();
    const currentStudent = students.find((s) => s.id === id);
    if (user.role !== "Admin" && user.id != id) {
      navigate("/Courses");
    }

    setStudent(currentStudent);
  }, [id, navigate, user]);
  if (!student) return <Typography>Student not found.</Typography>;

  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Student Profile
      </Typography>

      <StudentProfileCard student={student} />

      <EnrollmentList />
    </Box>
  );
};

export default Student;
