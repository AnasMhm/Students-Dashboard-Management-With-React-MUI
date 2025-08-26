import { useState } from "react";
import { Box } from "@mui/material";
import { getStudents, getEnrollments } from "../lib/seed";
import { setItemInStorage } from "../lib/storage";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import ConfirmDialog from "../components/common/ConfirmDialog";
import MUISnackbar from "../components/common/MUISnackbar";
import StudentFormDialog from "../components/students/StudentFormDialog";
import StudentsTable from "../components/students/StudentsTable";
import AddIcon from "@mui/icons-material/Add";

const StudentsPage = () => {
  const [students, setStudents] = useState(getStudents());
  const [editingStudent, setEditingStudent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirm, setConfirm] = useState({ open: false, title: "", message: "", onConfirm: null });
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const showToast = (message, severity = "success") => setToast({ open: true, message, severity });

  const handleOpenDialog = (student = null) => {
    setEditingStudent(student);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingStudent(null);
  };

  const handleSave = (values, { resetForm }) => {
    if (editingStudent) {
      setConfirm({
        open: true,
        title: "Confirm Update",
        message: `Are you sure you want to update ${editingStudent.firstName} ${editingStudent.lastName}?`,
        onConfirm: () => {
          const updatedStudents = students.map((s) => s.id === editingStudent.id ? { ...s, ...values } : s);
          setStudents(updatedStudents);
          setItemInStorage("students", updatedStudents);
          handleCloseDialog();
          setConfirm({ ...confirm, open: false });
          showToast("Student updated successfully!");
        },
      });
    } else {
      const newStudent = { id: `stu_${String(students.length + 1).padStart(3, "0")}`, ...values, createdAt: new Date().toISOString() };
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      setItemInStorage("students", updatedStudents);
      handleCloseDialog();
      showToast("Student added successfully!");
    }
    resetForm();
  };

  const handleDelete = (student) => {
    const enrollments = getEnrollments();
    setConfirm({
      open: true,
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${student.firstName} ${student.lastName}?`,
      onConfirm: () => {
        const updatedStudents = students.filter((s) => s.id !== student.id);
        setStudents(updatedStudents);
        setItemInStorage("students", updatedStudents);
        setItemInStorage("enrollments", enrollments.filter((e) => e.studentId !== student.id));
        setConfirm({ ...confirm, open: false });
        showToast("Student deleted successfully!", "info");
      },
    });
  };

  return (
    <Box sx={{ mt: 4, p: { xs: 1, md: 3 }, width: "100%" }}>
      <PageHeader
        title="Students"
        buttonText="Add Student"
        buttonIcon={<AddIcon />}
        onButtonClick={() => handleOpenDialog()}
      />

      <StudentsTable
        students={students}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        onRowClick={(params) => navigate(`/students/${params.row.id}`)}
      />

      <StudentFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        initialValues={editingStudent || { firstName: "", lastName: "", email: "", phone: "" }}
        onSubmit={handleSave}
        title={editingStudent ? "Edit Student" : "Add Student"}
        saveText={editingStudent ? "Update" : "Create"}
      />

      <ConfirmDialog
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        onConfirm={confirm.onConfirm}
        onCancel={() => setConfirm({ ...confirm, open: false })}
      />

      <MUISnackbar toast={toast} setToast={setToast} />
    </Box>
  );
};

export default StudentsPage;
