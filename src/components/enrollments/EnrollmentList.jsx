import { Box, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
const EnrollmentList = ({
    enrollments,
    editingId,
    tempProgress,
    setTempProgress,
    startEdit,
    saveProgress,
    cancelEdit,
    handleUnenrollClick,
    getStudent
}) => {
    const { user: { role } } = useAuth();
    return (
        <>
            {enrollments.length === 0 ? (
                <Typography>No students enrolled yet.</Typography>
            ) : (
                enrollments.map((en) => {
                    const student = getStudent(en.studentId);
                    const isEditing = editingId === en.id;
                    return (
                        <Box key={en.id} sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                            <Typography sx={{ width: 150 }}>
                                {student?.firstName} {student?.lastName}
                            </Typography>

                            {isEditing ? (
                                <>
                                    <TextField
                                        type="number"
                                        value={tempProgress}
                                        onChange={(e) => setTempProgress(e.target.value)}
                                        inputProps={{ min: 0, max: 100 }}
                                        size="small"
                                        sx={{ width: 80 }}
                                    />
                                    <Button variant="contained" color="primary" onClick={() => saveProgress(en)}>
                                        Save
                                    </Button>
                                    <Button color="inherit" onClick={cancelEdit}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Typography sx={{ width: 50 }}>{en.progress}%</Typography>
                                    {role === "Instructor" && (
                                        <Button variant="outlined" size="small" onClick={() => startEdit(en)}>
                                            Edit
                                        </Button>
                                    )}
                                </>
                            )}

                            {role === "Admin" && (
                                <Button
                                    color="error"
                                    onClick={() =>
                                        handleUnenrollClick(en.studentId, en.courseId, `${student.firstName} ${student.lastName}`)
                                    }
                                >
                                    Unenroll
                                </Button>
                            )}
                        </Box>
                    );
                })
            )}
        </>
    );
};

export default EnrollmentList;
