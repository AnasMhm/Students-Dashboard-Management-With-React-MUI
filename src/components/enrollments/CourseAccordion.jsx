import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EnrollmentList from "./EnrollmentList";
import EnrollmentForm from "./EnrollmentForm";
import { useAuth } from "../../contexts/AuthContext";
import { getCourses, getEnrollments, getStudents } from "../../lib/seed";
import { useEffect, useState } from "react";
import { setItemInStorage } from "../../lib/storage";
import ConfirmDialog from "../common/ConfirmDialog";
import MUISnackbar from "../common/MUISnackbar";
import { enrollmentSchema } from "../../lib/validators";

const CourseAccordion = () => {
    const { user: { id, role, firstName, lastName } } = useAuth()
    const courses = getCourses();
    const [enrollments, setEnrollments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [tempProgress, setTempProgress] = useState("");
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [confirm, setConfirm] = useState({ open: false, title: "", message: "", onConfirm: null });
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
    useEffect(() =>
        setEnrollments(getEnrollments()),
        [id, role]);
    const showToast = (message, severity = "success") => setToast({ open: true, message, severity });

    const handleUnenrollClick = (studentId, courseId, studentName) => {
        setConfirm({
            open: true,
            title: "Confirm Unenroll",
            message: `Are you sure you want to unenroll ${studentName}?`,
            onConfirm: () => {
                const updated = enrollments.filter(e => !(e.studentId === studentId && e.courseId === courseId));
                setEnrollments(updated);
                setItemInStorage("enrollments", updated);
                setConfirm({ ...confirm, open: false });
                showToast(`${studentName} has been unenrolled.`, "info");
            },
        });
    };

    const startEdit = (enrollment) => {
        setEditingId(enrollment.id);
        setTempProgress(enrollment.progress);
    };

    const cancelEdit = () => setEditingId(null);

    const saveProgress = (enrollment) => {
        const num = Number(tempProgress);
        const updated = enrollments.map((e) => e.id === enrollment.id ? { ...e, progress: num, updatedAt: new Date().toISOString() } : e);
        setEnrollments(updated);
        setItemInStorage("enrollments", updated);
        setEditingId(null);
        const student = getStudents().find((s) => s.id === enrollment.studentId);
        showToast(`Progress updated to ${num}% for ${student.firstName} ${student.lastName}.`, "success");
    };

    const handleEnroll = (courseId, values, resetForm) => {
        const student = getStudents().find((s) => s.id === values.studentId);
        const newEnrollment = { id: `enr_${Date.now()}`, studentId: values.studentId, courseId, progress: 0, updatedAt: new Date().toISOString() };
        const updated = [...enrollments, newEnrollment];
        setEnrollments(updated);
        setItemInStorage("enrollments", updated);
        showToast(`${student.firstName} ${student.lastName} has been enrolled.`, "success");
        resetForm();
        setExpandedCourse(courseId);
    };

    const coursesToShow =
        role === "Student"
            ? courses.filter((c) => enrollments.some((e) => e.courseId === c.id && e.studentId === id))
            : role === "Instructor"
                ? courses.filter(course => course.instructor.toLowerCase() === `${firstName} ${lastName}`.toLowerCase().trim())
                : courses;
    return (
        <>
            {coursesToShow.map((course) => {
                const courseEnrolls = enrollments.filter((e) => e.courseId === course.id);
                const availableStudents = getStudents().filter((s) => !courseEnrolls.find((e) => e.studentId === s.id));

                return (
                    <Accordion
                        key={course.id}
                        expanded={expandedCourse === course.id}
                        onChange={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{course.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Instructor: {course.instructor}</Typography>
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                Enrolled Students:
                            </Typography>

                            <EnrollmentList
                                enrollments={courseEnrolls}
                                editingId={editingId}
                                tempProgress={tempProgress}
                                setTempProgress={setTempProgress}
                                startEdit={startEdit}
                                saveProgress={saveProgress}
                                cancelEdit={cancelEdit}
                                handleUnenrollClick={handleUnenrollClick}
                                getStudent={(id) => getStudents().find((s) => s.id === id)}
                            />

                            {role === "Admin" && availableStudents.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <EnrollmentForm
                                        courseId={course.id}
                                        availableStudents={availableStudents}
                                        enrollmentSchema={enrollmentSchema}
                                        onEnroll={(values, resetForm) => handleEnroll(course.id, values, resetForm)}
                                    />
                                </Box>
                            )}
                        </AccordionDetails>
                    </Accordion>

                );
            })}
            <ConfirmDialog open={confirm.open} title={confirm.title} message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm({ ...confirm, open: false })} />
            <MUISnackbar toast={toast} setToast={setToast} />
        </>
    );
};

export default CourseAccordion;
