import { Paper } from "@mui/material";
import MUIDataGrid from "../common/MUIDataGrid";
import StudentActions from "../students/StudentActions";

const StudentsTable = ({ students, onEdit, onDelete, onRowClick }) => {
    const columns = [
        { field: "firstName", headerName: "First Name", flex: 0.8 },
        { field: "lastName", headerName: "Last Name", flex: 0.7 },
        { field: "email", headerName: "Email", flex: 1.5 },
        { field: "phone", headerName: "Phone", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => <StudentActions student={params.row} onEdit={onEdit} onDelete={onDelete} />,
        },
    ];

    return (
        <Paper sx={{ borderRadius: 3, overflowX: "auto" }}>
            <MUIDataGrid rows={students} columns={columns} onRowClick={onRowClick} />
        </Paper>
    );
};

export default StudentsTable;
