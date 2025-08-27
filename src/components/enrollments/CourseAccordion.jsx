// CourseAccordion.jsx
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EnrollmentList from "./EnrollmentList";
import EnrollmentForm from "./EnrollmentForm";
import { useAuth } from "../../contexts/AuthContext";
import { getCourses, getEnrollments, getStudents } from "../../lib/seed";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { setItemInStorage } from "../../lib/storage";
const ConfirmDialog = lazy(() => import("../common/ConfirmDialog"));
const MUISnackbar = lazy(() => import("../common/MUISnackbar"));
import { enrollmentSchema } from "../../lib/validators";
import LoadingSpinner from "../common/LoadingSpinner";

const COURSES_PER_PAGE = 5;
const STUDENTS_PER_PAGE = 10;

const CourseAccordion = () => {
    const { user: { id, role, firstName, lastName } } = useAuth();

    const courses = useMemo(() => getCourses(), []);
    const students = useMemo(() => getStudents(), []);
    const studentsMap = useMemo(() => Object.fromEntries(students.map(s => [s.id, s])), [students]);

    const [enrollments, setEnrollments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [tempProgress, setTempProgress] = useState("");
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [confirm, setConfirm] = useState({ open: false, title: "", message: "", onConfirm: null });
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    const [coursePage, setCoursePage] = useState(1);
    const [studentPages, setStudentPages] = useState({});

    useEffect(() => setEnrollments(getEnrollments()), [id, role]);

    const showToast = useCallback((message, severity = "success") => {
        setToast({ open: true, message, severity });
    }, []);
    const setUpdated = (enrollments, nameInStorage) => {
        setEnrollments(enrollments);
        setItemInStorage(nameInStorage, enrollments);
    }
    const handleUnenrollClick = useCallback((studentId, courseId) => {
        const student = studentsMap[studentId];
        setConfirm({
            open: true,
            title: "Confirm Unenroll",
            message: `Are you sure you want to unenroll ${student.firstName} ${student.lastName}?`,
            onConfirm: () => {
                const updated = enrollments.filter(e => !(e.studentId === studentId && e.courseId === courseId));
                setUpdated(updated, "enrollments");
                setConfirm({ ...confirm, open: false });
                showToast(`${student.firstName} ${student.lastName} has been unenrolled.`, "info");
            },
        });
    }, [enrollments, studentsMap, showToast, confirm]);

    const startEdit = useCallback(enrollment => {
        setEditingId(enrollment.id);
        setTempProgress(enrollment.progress);
    }, []);

    const cancelEdit = useCallback(() => setEditingId(null), []);

    const saveProgress = useCallback((enrollment) => {
        const num = Number(tempProgress);
        const updated = enrollments.map(e => e.id === enrollment.id ? { ...e, progress: num, updatedAt: new Date().toISOString() } : e);
        setUpdated(updated, "enrollments");
        setEditingId(null);
        const student = studentsMap[enrollment.studentId];
        showToast(`Progress updated to ${num}% for ${student.firstName} ${student.lastName}.`, "success");
    }, [enrollments, tempProgress, studentsMap, showToast]);

    const handleEnroll = useCallback((courseId, values, resetForm) => {
        const student = studentsMap[values.studentId];
        const newEnrollment = { id: `enr_${Date.now()}`, studentId: values.studentId, courseId, progress: 0, updatedAt: new Date().toISOString() };
        const updated = [...enrollments, newEnrollment];
        setUpdated(updated, "enrollments");
        showToast(`${student.firstName} ${student.lastName} has been enrolled.`, "success");
        resetForm();
        setExpandedCourse(courseId);
    }, [enrollments, studentsMap, showToast]);

    const coursesFiltered = useMemo(() => {
        if (role === "Student") return courses.filter(c => enrollments.some(e => e.courseId === c.id && e.studentId === id));
        if (role === "Instructor") return courses.filter(c => c.instructor.toLowerCase() === `${firstName} ${lastName}`.toLowerCase().trim());
        return courses;
    }, [courses, enrollments, role, firstName, lastName, id]);

    const totalCoursePages = Math.ceil(coursesFiltered.length / COURSES_PER_PAGE);
    const coursesToShow = coursesFiltered.slice((coursePage - 1) * COURSES_PER_PAGE, coursePage * COURSES_PER_PAGE);

    const courseEnrollsMap = useMemo(() => {
        const map = {};
        enrollments.forEach(e => { if (!map[e.courseId]) map[e.courseId] = []; map[e.courseId].push(e); });
        return map;
    }, [enrollments]);

    const availableStudentsMap = useMemo(() => {
        const map = {};
        courses.forEach(course => {
            map[course.id] = students.filter(s => !courseEnrollsMap[course.id]?.find(e => e.studentId === s.id));
        });
        return map;
    }, [courses, students, courseEnrollsMap]);

    const handleStudentPageChange = (courseId, newPage) => {
        setStudentPages(prev => ({ ...prev, [courseId]: newPage }));
    };

    return (
        <>
            {coursesToShow.map(course => {
                const courseEnrolls = courseEnrollsMap[course.id] || [];
                const availableStudents = availableStudentsMap[course.id] || [];
                const currentStudentPage = studentPages[course.id] || 1;

                return (
                    <Accordion key={course.id} expanded={expandedCourse === course.id}
                        onChange={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{course.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Instructor: {course.instructor}</Typography>
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Enrolled Students:</Typography>

                            <EnrollmentList
                                enrollments={courseEnrolls}
                                editingId={editingId}
                                tempProgress={tempProgress}
                                setTempProgress={setTempProgress}
                                startEdit={startEdit}
                                saveProgress={saveProgress}
                                cancelEdit={cancelEdit}
                                handleUnenrollClick={handleUnenrollClick}
                                getStudent={id => studentsMap[id]}
                                studentsPerPage={STUDENTS_PER_PAGE}
                                currentPage={currentStudentPage}
                                onPageChange={newPage => handleStudentPageChange(course.id, newPage)}
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

            {totalCoursePages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button disabled={coursePage === 1} onClick={() => setCoursePage(coursePage - 1)}>Previous</Button>
                    <Typography>Page {coursePage} of {totalCoursePages}</Typography>
                    <Button disabled={coursePage === totalCoursePages} onClick={() => setCoursePage(coursePage + 1)}>Next</Button>
                </Box>
            )}
            <Suspense fallback={<LoadingSpinner />}>
                <ConfirmDialog
                    open={confirm.open}
                    title={confirm.title}
                    message={confirm.message}
                    onConfirm={confirm.onConfirm}
                    onCancel={() => setConfirm({ ...confirm, open: false })}
                />
                <MUISnackbar toast={toast} setToast={setToast} />
            </Suspense>
        </>
    );
};

export default CourseAccordion;
