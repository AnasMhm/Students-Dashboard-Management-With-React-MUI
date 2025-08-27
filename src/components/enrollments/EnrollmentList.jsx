// EnrollmentList.jsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
    getStudent,
    studentsPerPage,
    currentPage,
    onPageChange
}) => {
    const { user: { role, id } } = useAuth();
    const totalPages = Math.ceil(enrollments.length / studentsPerPage);
    const startIdx = (currentPage - 1) * studentsPerPage;
    const currentEnrollments = enrollments.slice(startIdx, startIdx + studentsPerPage);

    return (
        <>
            {currentEnrollments.length === 0 ? (
                <Typography>No students enrolled yet.</Typography>
            ) : currentEnrollments.map(en => {
                const student = getStudent(en.studentId);
                const isEditing = editingId === en.id;

                return (
                    <Box key={en.id} sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                        <Typography sx={{ width: 150 }}>{student?.firstName} {student?.lastName}</Typography>
                        {isEditing ? (
                            <>
                                <TextField type="number" value={tempProgress} onChange={e => setTempProgress(e.target.value)} inputProps={{ min: 0, max: 100 }} size="small" sx={{ width: 80 }} />
                                <Button variant="contained" color="primary" onClick={() => saveProgress(en)}>Save</Button>
                                <Button color="inherit" onClick={cancelEdit}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                {role === "Student" && en.studentId !== id ? null : <Typography sx={{ width: 50 }}>{en.progress}%</Typography>}
                                {role === "Admin" && <Button variant="outlined" size="small" onClick={() => startEdit(en)}>Edit</Button>}
                                {role === "Admin" && <Button color="error" size="small" onClick={() => handleUnenrollClick(en.studentId, en.courseId)}>Unenroll</Button>}
                            </>
                        )}
                    </Box>
                );
            })}

            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</Button>
                    <Typography>Page {currentPage} of {totalPages}</Typography>
                    <Button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</Button>
                </Box>
            )}
        </>
    );
};

export default EnrollmentList;
