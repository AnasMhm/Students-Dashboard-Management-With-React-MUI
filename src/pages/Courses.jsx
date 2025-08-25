import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import MUIDialog from "../components/MUIDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import MUITextField from "../components/MUITextField";
import { useAuth } from "../contexts/AuthContext";
import { HowToReg } from "@mui/icons-material";
import { getCourses } from "../lib/seed";
import { setItemInStorage } from "../lib/storage";

export default function CoursesPage() {
    const [courses, setCourses] = useState(getCourses());
    const { user: {role} } = useAuth();
    const [expandedId, setExpandedId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [form, setForm] = useState({ title: "", instructor: "", hours: "", description: "" });
    const [errors, setErrors] = useState({});
    const [confirm, setConfirm] = useState({ open: false, title: "", message: "", onConfirm: null });
    const handleAccordionChange = (id) => (event, isExpanded) => {
        setExpandedId(isExpanded ? id : null);
    };

    const handleOpenDialog = (course = null) => {
        setEditingCourse(course);
        setForm(course ? { ...course } : { title: "", instructor: "", hours: "", description: "" });
        setErrors({});
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingCourse(null);
    };

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.instructor.trim()) newErrors.instructor = "Instructor is required";
        if (!form.hours || isNaN(form.hours) || Number(form.hours) <= 0)
            newErrors.hours = "Hours must be a positive number";
        return newErrors;
    };

    const handleSave = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        if (editingCourse) {
            setCourses((prev) =>
                prev.map((c) => (c.id === editingCourse.id ? { ...c, ...form } : c))
        );
        setItemInStorage("courses", [...courses.map((c) => (c.id === editingCourse.id ? { ...c, ...form } : c))]);
        } else {
            const newCourse = { id: `crs_${Date.now()}`, ...form };
            setCourses((prev) => [...prev, newCourse]);
            setItemInStorage("courses", [...courses, newCourse]);
        }
        handleCloseDialog();
    };

    const handleDelete = (course) => {
        setConfirm({
            open: true,
            title: "Confirm Delete",
            message: `Are you sure you want to delete ${course.title}?`,
            onConfirm: () => {
                setCourses((prev) => prev.filter((c) => c.id !== course.id));
                setItemInStorage("courses", courses.filter((c) => c.id !== course.id));
                setConfirm({ ...confirm, open: false });
            },
        });
    };

    return (
        <Box sx={{ mt: 4, p: { xs: 1, md: 3 }, width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    mb: 2,
                    gap: 1,
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Courses Management
                </Typography>
                {role === "Admin" && 
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
                    Add Course
                </Button>
                }
            </Box>

            <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
                {courses.map((course) => (
                    <Accordion
                        key={course.id}
                        expanded={expandedId === course.id}
                        onChange={handleAccordionChange(course.id)}
                    >
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
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleOpenDialog(course)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(course)}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
                                {role === "Student" && 
                                <Button
                                variant="contained"
                                color="primary"
                                startIcon={<HowToReg />}                                
                                >
                                    Enroll
                                </Button>
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>

            <MUIDialog
                open={dialogOpen}
                title={editingCourse ? "Edit Course" : "Add Course"}
                onClose={handleCloseDialog}
                onSave={handleSave}
                saveText={editingCourse ? "Update" : "Create"}
            >
                <MUITextField
                    label="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    error={errors.title}
                    helperText={errors.title}
                />
                <MUITextField
                    label="Instructor"
                    value={form.instructor}
                    onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                    error={errors.instructor}
                    helperText={errors.instructor}
                />
                <MUITextField
                    label="Hours"
                    value={form.hours}
                    onChange={(e) => setForm({ ...form, hours: e.target.value })}
                    error={errors.hours}
                    helperText={errors.hours}
                    type="number"
                />
                <MUITextField
                    label="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    multiline
                    rows={3}
                />
            </MUIDialog>

            <ConfirmDialog
                open={confirm.open}
                title={confirm.title}
                message={confirm.message}
                onConfirm={confirm.onConfirm}
                onCancel={() => setConfirm({ ...confirm, open: false })}
            />
        </Box>
    );
}
