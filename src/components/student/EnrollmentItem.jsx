import { Paper, Typography, Button, TextField, Box } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const EnrollmentItem = ({
    enrollment,
    course,
    isEditing,
    tempProgress,
    onEdit,
    onSave,
    onProgressChange
}) => {
    const { user: { role } } = useAuth();
    return (
        <Paper sx={{ p: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
                <Typography fontWeight="bold">{course?.title}</Typography>
                <Typography variant="body2">Instructor: {course?.instructor}</Typography>
            </Box>
            {isEditing ? (
                <>
                    <TextField
                        type="number"
                        value={tempProgress}
                        onChange={(e) => onProgressChange(Number(e.target.value))}
                        inputProps={{ min: 0, max: 100 }}
                        sx={{ width: 80 }}
                    />
                    <Button variant="contained" onClick={() => onSave(enrollment.id)}>
                        Save
                    </Button>
                </>
            ) : (
                <>
                    <Typography>{enrollment.progress}%</Typography>
                    {role === "Admin" &&
                        <Button variant="outlined" onClick={() => onEdit(enrollment)}>
                            Edit
                        </Button>
                    }
                </>
            )}
        </Paper>
    );
};

export default EnrollmentItem;
