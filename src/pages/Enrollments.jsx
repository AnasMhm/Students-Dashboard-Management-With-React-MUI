import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useAuth } from "../contexts/AuthContext";
import { getStudents, getCourses, getEnrollments } from "../lib/seed.js";
import { setItemInStorage } from "../lib/storage";

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([...getEnrollments()]);
    const [editingId, setEditingId] = useState(null);
    const [tempProgress, setTempProgress] = useState("");
    const [selectedStudent, setSelectedStudent] = useState({});
    const { user: { role } } = useAuth();

    // Edit progress
    const startEdit = (enrollment) => {
        setEditingId(enrollment.id);
        setTempProgress(enrollment.progress);
    };

    const saveProgress = (enrollment) => {
        const num = Number(tempProgress);
        if (isNaN(num) || num < 0 || num > 100) return;
        const updated = enrollments.map(e =>
            e.id === enrollment.id ? { ...e, progress: num, updatedAt: new Date().toISOString() } : e
        );
        setEnrollments(updated);
        setItemInStorage("enrollments", updated);
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    // Unenroll student
    const unenrollStudent = (studentId, courseId) => {
        const updated = enrollments.filter(e => !(e.studentId === studentId && e.courseId === courseId));
        setEnrollments(updated);
        setItemInStorage("enrollments", updated);
    };

    // Enroll student
    const enrollStudent = (courseId) => {
        if (!selectedStudent[courseId]) return;
        const newEnrollment = {
            id: "enr_" + Date.now(),
            studentId: selectedStudent[courseId],
            courseId,
            progress: 0,
            updatedAt: new Date().toISOString(),
        };
        const updated = [...enrollments, newEnrollment];
        setEnrollments(updated);
        setItemInStorage("enrollments", updated);
        setSelectedStudent({ ...selectedStudent, [courseId]: "" });
    };

    return (
        <Box sx={{ mt: 4, p: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>Enrollments</Typography>

            {getCourses().map(course => {
                const courseEnrolls = enrollments.filter(e => e.courseId === course.id);
                const availableStudents = getStudents().filter(s => !courseEnrolls.find(e => e.studentId === s.id));

                return (
                    <Accordion key={course.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{course.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Instructor: {course.instructor}</Typography>
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Enrolled Students:</Typography>

                            {courseEnrolls.length === 0 ? (
                                <Typography>No students enrolled yet.</Typography>
                            ) : (
                                courseEnrolls.map(en => {
                                    const student = getStudents().find(s => s.id === en.studentId);
                                    const isEditing = editingId === en.id;
                                    return (
                                        <Box key={en.id} sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                                            <Typography sx={{ width: 150 }}>{student?.firstName} {student?.lastName}</Typography>

                                            {isEditing ? (
                                                <>
                                                    <TextField
                                                        type="number"
                                                        value={tempProgress}
                                                        onChange={(e) => setTempProgress(e.target.value)}
                                                        inputProps={{ min: 0, max: 100 }}
                                                        size="small"
                                                        sx={{ width: 80 }}
                                                    />
                                                    <Button variant="contained" color="primary" onClick={() => saveProgress(en)}>Save</Button>
                                                    <Button color="inherit" onClick={cancelEdit}>Cancel</Button>
                                                </>
                                            ) : (
                                                role === "Admin" && (
                                                    <>
                                                        <Typography sx={{ width: 50 }}>{en.progress}%</Typography>
                                                        <Button variant="outlined" size="small" onClick={() => startEdit(en)}>Edit</Button>
                                                    </>
                                                )
                                            )}

                                            {role === "Admin" && (
                                                <Button color="error" onClick={() => unenrollStudent(en.studentId, en.courseId)}>Unenroll</Button>
                                            )}
                                        </Box>
                                    );
                                })
                            )}

                            {/* Add student to course */}
                            {role === "Admin" && availableStudents.length > 0 && (
                                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                                    <FormControl size="small" sx={{ minWidth: 200 }}>
                                        <InputLabel>Select Student</InputLabel>
                                        <Select
                                            value={selectedStudent[course.id] || ""}
                                            onChange={(e) => setSelectedStudent({ ...selectedStudent, [course.id]: e.target.value })}
                                            label="Select Student"
                                        >
                                            {availableStudents.map(s => (
                                                <MenuItem key={s.id} value={s.id}>{s.firstName} {s.lastName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" onClick={() => enrollStudent(course.id)}>Enroll Student</Button>
                                </Box>
                            )}

                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
};

export default Enrollments;
