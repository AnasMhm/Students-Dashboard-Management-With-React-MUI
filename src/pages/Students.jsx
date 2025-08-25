import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import MUIDataGrid from "../components/MUIDataGrid";
import MUIDialog from "../components/MUIDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import MUITextField from "../components/MUITextField";
import { getStudents } from "../lib/seed";
import { setItemInStorage } from "../lib/storage";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState(getStudents());

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const [confirm, setConfirm] = useState({ open: false, title: "", message: "", onConfirm: null });
  const navigate = useNavigate();
; const handleOpenDialog = (student = null) => {
    setEditingStudent(student);
    setForm(student ? { ...student } : { firstName: "", lastName: "", email: "", phone: "" });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingStudent(null);
  };

  const handleSave = () => {
    if (editingStudent) {
      setConfirm({
        open: true,
        title: "Confirm Update",
        message: `Are you sure you want to update ${editingStudent.firstName} ${editingStudent.lastName} ?`,
        onConfirm: () => {
          const updatedStudents = students.map((s) => (s.id === editingStudent.id ? { ...s, ...form } : s));
          setStudents(updatedStudents);
          setItemInStorage("students", updatedStudents);
          handleCloseDialog();
          setConfirm({ ...confirm, open: false });
        },
      });
    } else {
      const newStudent = { id: `stu_${String(students.length + 1).padStart(3, "0")}`, ...form };
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      setItemInStorage("students", updatedStudents);
      handleCloseDialog();
    }
  };

  const handleDelete = (student) => {
    setConfirm({
      open: true,
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${student.FirstName} ${student.LastName} ?`,
      onConfirm: () => {
        const updatedStudents = students.filter((s) => s.id !== student.id);
        setStudents(updatedStudents);
        setItemInStorage("students", updatedStudents);
        setConfirm({ ...confirm, open: false });
      },
    });
  };
  const columns = [
    { field: "firstName", headerName: "First Name", flex: 0.8 },
    { field: "lastName", headerName: "Last Name", flex: 0.7 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      flexGrow: 0,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={(e) => {handleOpenDialog(params.row); e.stopPropagation();}}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={(e) => {handleDelete(params.row); e.stopPropagation();}}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

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
        <Typography variant="h6" fontWeight="bold">
          Students
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Student
        </Button>
      </Box>

      <Paper sx={{ borderRadius: 3, overflowX: "auto" }}>
        <MUIDataGrid rows={students} columns={columns} onRowClick={(params) => navigate(`/students/${params.row.id}`)} />
      </Paper>

      <MUIDialog
        open={dialogOpen}
        title={editingStudent ? "Edit Student" : "Add Student"}
        onClose={handleCloseDialog}
        onSave={handleSave}
        saveText={editingStudent ? "Update" : "Create"}
      >
        <MUITextField
          label="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <MUITextField
          label="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <MUITextField
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <MUITextField
          label="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
};
export default Students;
