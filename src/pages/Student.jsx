import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const Student = () => {
  const student = {
    id: "stu_001",
    firstName: "Sara",
    lastName: "Khaled",
    email: "sara@example.com",
    phone: "+970-5X-XXXXXXX",
    createdAt: "2025-08-10T10:00:00Z",
  };

  const mockCourses = [
    { id: "crs_001", title: "React Advanced", instructor: "Mohammad" },
    { id: "crs_002", title: "JavaScript Basics", instructor: "Sara" },
  ];

  const [enrollments, setEnrollments] = useState([
    { id: "enr_001", courseId: "crs_001", progress: 70 },
    { id: "enr_002", courseId: "crs_002", progress: 50 },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [tempProgress, setTempProgress] = useState(0);

  const handleEdit = (enr) => {
    setEditingId(enr.id);
    setTempProgress(enr.progress);
  };

  const handleSave = (enrId) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === enrId ? { ...e, progress: tempProgress } : e))
    );
    setEditingId(null);
  };

  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Student Profile
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">{student.firstName} {student.lastName}</Typography>
        <Typography>Email: {student.email}</Typography>
        <Typography>Phone: {student.phone}</Typography>
        <Typography>Joined: {new Date(student.createdAt).toLocaleDateString()}</Typography>
      </Paper>

      <Typography variant="h6" mb={1}>Enrolled Courses</Typography>
      {enrollments.map((enr) => {
        const course = mockCourses.find(c => c.id === enr.courseId);
        return (
          <Paper key={enr.id} sx={{ p: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight="bold">{course.title}</Typography>
              <Typography variant="body2">Instructor: {course.instructor}</Typography>
            </Box>
            {editingId === enr.id ? (
              <>
                <TextField
                  type="number"
                  value={tempProgress}
                  onChange={(e) => setTempProgress(Number(e.target.value))}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{ width: 80 }}
                />
                <Button variant="contained" onClick={() => handleSave(enr.id)}>Save</Button>
              </>
            ) : (
              <>
                <Typography>{enr.progress}%</Typography>
                <Button variant="outlined" onClick={() => handleEdit(enr)}>Edit</Button>
              </>
            )}
          </Paper>
        );
      })}
    </Box>
  );
}

export default Student;
