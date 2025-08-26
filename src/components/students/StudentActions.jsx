import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentActions = ({ student, onEdit, onDelete }) => (
    <>
        <IconButton color="primary" onClick={(e) => { onEdit(student); e.stopPropagation(); }}>
            <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={(e) => { onDelete(student); e.stopPropagation(); }}>
            <DeleteIcon />
        </IconButton>
    </>
);

export default StudentActions;
