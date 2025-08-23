import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialog from "../components/ConfirmDialog";

// Generate mock students
const generateStudents = (count) => {
  const students = [];
  for (let i = 1; i <= count; i++) {
    students.push({
      id: `stu_${String(i).padStart(3, "0")}`,
      name: `Student ${i}`,
      email: `student${i}@example.com`,
      phone: `05${Math.floor(10000000 + Math.random() * 89999999)}`,
    });
  }
  return students;
};

const Students = () => {
  const [pageSize, setPageSize] = React.useState(5);
  const [students, setStudents] = React.useState(() => generateStudents(100));

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState(null);
  const [form, setForm] = React.useState({ name: "", email: "", phone: "" });

  const [confirm, setConfirm] = React.useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const handleOpenDialog = (student = null) => {
    setEditingStudent(student);
    setForm(
      student
        ? { name: student.name, email: student.email, phone: student.phone }
        : { name: "", email: "", phone: "" }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStudent(null);
  };

  const handleSave = () => {
    if (editingStudent) {
      setConfirm({
        open: true,
        title: "Confirm Update",
        message: `Are you sure you want to update ${editingStudent.name}?`,
        onConfirm: () => {
          setStudents((prev) =>
            prev.map((s) =>
              s.id === editingStudent.id ? { ...s, ...form } : s
            )
          );
          handleCloseDialog();
          setConfirm({ ...confirm, open: false });
        },
      });
    } else {
      const newStudent = {
        id: `stu_${String(students.length + 1).padStart(3, "0")}`,
        ...form,
        createdAt: new Date().toISOString(),
      };
      setStudents((prev) => [...prev, newStudent]);
      handleCloseDialog();
    }
  };

  const handleDelete = (student) => {
    setConfirm({
      open: true,
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${student.name}?`,
      onConfirm: () => {
        setStudents((prev) => prev.filter((s) => s.id !== student.id));
        setConfirm({ ...confirm, open: false });
      },
    });
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex:1.5 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ mt: 4, p: { xs: 1, md: 3 }, width: "100%" }}>
      {/* Header + Add Button */}
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
          New Students
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Student
        </Button>
      </Box>

      {/* Scrollable DataGrid */}
      <Paper sx={{ borderRadius: 3, overflowX: "auto" }}>
        <Box>
          <DataGrid
            rows={students}
            columns={columns}
            pagination
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            onPaginationModelChange={(model) => setPageSize(model.pageSize)}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "primary.main",
                fontWeight: "bold",
              },
              overflowX: "auto",
              height: pageSize > 10 ? 400 : null,
              minWidth: 510
            }}
          />
        </Box>
      </Paper>

      {/* Dialog for Create / Update */}
      <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingStudent ? "Edit Student" : "Add Student"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingStudent ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Dialog */}
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
