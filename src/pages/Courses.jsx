import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../contexts/AuthContext";
import { setItemInStorage } from "../lib/storage";
import PageHeader from "../components/common/PageHeader";
import ContainerBox from "../components/common/ContainerBox";
import CourseAccordion from "../components/courses/CourseAccordion";
import CourseForm from "../components/courses/CoursesForm";
import MUISnackbar from "../components/common/MUISnackbar";
import { getCourses } from "../lib/seed";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const { user: { role } } = useAuth();
    const [expandedId, setExpandedId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
    useEffect(() => {
        setCourses(getCourses());
    }, []);

    const showToast = (message, severity = "success") => setToast({ open: true, message, severity });

    const handleAccordionChange = (id) => (event, isExpanded) => setExpandedId(isExpanded ? id : null);

    const handleOpenDialog = (course = null) => {
        setEditingCourse(course);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingCourse(null);
    };

    const handleSave = (values, { resetForm }) => {
        if (editingCourse) {
            setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? { ...c, ...values } : c)));
            setItemInStorage("courses", [...courses.map((c) => (c.id === editingCourse.id ? { ...c, ...values } : c))]);
            showToast("Course updated successfully!", "success");
        } else {
            const newCourse = { id: `crs_${Date.now()}`, ...values };
            const newCourses = [...courses, newCourse];
            setCourses(newCourses);
            setItemInStorage("courses", newCourses);
            showToast("Course added successfully!", "success");
        }
        resetForm();
        handleCloseDialog();
    };

    return (
        <ContainerBox>
            <PageHeader
                title="Course Management"
                buttonText="Add Course"
                buttonIcon={<AddIcon />}
                onButtonClick={() => handleOpenDialog()}
                showButton={role === "Admin"}
            />
            <CourseAccordion
                courses={courses}
                expandedId={expandedId}
                handleAccordionChange={handleAccordionChange}
                showToast={showToast}
                setCourses={setCourses}
                handleOpenDialog={handleOpenDialog}
            />
            <CourseForm
                editingCourse={editingCourse}
                dialogOpen={dialogOpen}
                handleCloseDialog={handleCloseDialog}
                handleSave={handleSave}
            />
            <MUISnackbar
                toast={toast}
                setToast={setToast}
            />
        </ContainerBox>
    );
};

export default Courses;
