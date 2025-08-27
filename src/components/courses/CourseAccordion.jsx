import { Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HowToReg from "@mui/icons-material/HowToReg";
import { useAuth } from "../../contexts/AuthContext";
import { setItemInStorage } from "../../lib/storage";
import { useEffect, useState } from "react";
import { getEnrollments } from "../../lib/seed";
import ConfirmDialog from "../common/ConfirmDialog";
import LoadingSpinner from "../common/LoadingSpinner";
const CourseAccordion = ({ courses, setCourses, expandedId, handleAccordionChange, handleOpenDialog, showToast }) => {
    const [confirm, setConfirm] = useState({ open: false, title: "", message: "", onConfirm: null });
    const [enrollments, setEnrollments] = useState([]);
    const { user: { role, id, loading } } = useAuth();
    useEffect(() => {
        setEnrollments(getEnrollments());
    }, []);
    const handleEnroll = (courseId) => {
        const existing = enrollments.find((e) => e.studentId === id && e.courseId === courseId);
        if (!existing) {
            const newEnrollment = { id: `enr_${Date.now()}`, studentId: id, courseId, progress: 0 };
            const updated = [...enrollments, newEnrollment];
            setEnrollments(updated);
            setItemInStorage("enrollments", updated);
            showToast("Enrollment successful!", "success");
        }
    };
    const handleDelete = (course) => {
        setConfirm({
            open: true,
            title: "Confirm Delete",
            message: `Are you sure you want to delete ${course.title}?`,
            onConfirm: () => {
                const updatedEnrollments = enrollments.filter((e) => e.courseId !== course.id);
                const updatedCourses = courses.filter((c) => c.id !== course.id);
                setCourses(updatedCourses);
                setItemInStorage("courses", updatedCourses);
                setEnrollments(updatedEnrollments);
                setItemInStorage("enrollments", updatedEnrollments);
                setConfirm({ ...confirm, open: false });
                showToast("Course deleted successfully!", "info");
            },
        });
    };
    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <>
            <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
                {courses.map((course) => (
                    <Accordion key={course.id} expanded={expandedId === course.id} onChange={handleAccordionChange(course.id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{course.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">Instructor: {course.instructor}</Typography>
                            <Typography variant="body1">Hours: {course.hours}</Typography>
                            <Typography variant="body1">Description: {course.description}</Typography>

                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                {role === "Admin" && (
                                    <>
                                        <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => handleOpenDialog(course)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(course)}>
                                            Delete
                                        </Button>
                                    </>
                                )}

                                {role === "Student" &&
                                    (enrollments.find((e) => e.studentId === id && e.courseId === course.id) ? (
                                        <Button variant="outlined" disabled>Enrolled</Button>
                                    ) : (
                                        <Button variant="contained" color="primary" startIcon={<HowToReg />} onClick={() => handleEnroll(course.id)}>
                                            Enroll
                                        </Button>
                                    ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>
            <ConfirmDialog
                open={confirm.open}
                title={confirm.title}
                message={confirm.message}
                onConfirm={confirm.onConfirm}
                onCancel={() => setConfirm({ ...confirm, open: false })}
            />
        </>
    );
};

export default CourseAccordion;
