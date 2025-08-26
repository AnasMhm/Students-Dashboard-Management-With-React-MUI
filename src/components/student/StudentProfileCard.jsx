import { Paper, Typography } from "@mui/material";

const StudentProfileCard = ({ student }) => (
    <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">
            {student.firstName} {student.lastName}
        </Typography>
        <Typography>Email: {student.email}</Typography>
        <Typography>Phone: {student.phone}</Typography>
        <Typography>
            Joined: {new Date(student.createdAt).toLocaleDateString()}
        </Typography>
    </Paper>
);

export default StudentProfileCard;
