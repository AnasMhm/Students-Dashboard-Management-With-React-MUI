import Typography from "@mui/material/Typography";
import EnrollmentItem from "./EnrollmentItem";
import { useEffect, useState } from "react";
import { getItemFromStorage } from "../../lib/storage";
import { useParams } from "react-router-dom";
import { getCourses, getEnrollments } from "../../lib/seed";

const EnrollmentList = () => {
    const { id } = useParams();
    const [enrollments, setEnrollments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [tempProgress, setTempProgress] = useState(0);
    useEffect(() => {
        const coursesData = getCourses();
        const enrollmentsData = getEnrollments();
        const studentEnrollments = enrollmentsData.filter((e) => e.studentId === id);
        setCourses(coursesData);
        setEnrollments(studentEnrollments);
    }, [id])
    const handleEdit = (enr) => {
        setEditingId(enr.id);
        setTempProgress(enr.progress);
    };

    const handleSave = (enrId) => {
        const updatedEnrollments = enrollments.map((e) =>
            e.id === enrId ? { ...e, progress: tempProgress } : e
        );
        setEnrollments(updatedEnrollments);

        localStorage.setItem(
            "enrollments",
            JSON.stringify([
                ...getItemFromStorage("enrollments").filter((e) => e.studentId !== id),
                ...updatedEnrollments,
            ])
        );
        setEditingId(null);
    };

    return <>
        <Typography variant="h6" mb={1}>Enrolled Courses</Typography>
        {enrollments.map((enr) => {
            const course = courses.find((c) => c.id === enr.courseId);
            return (
                <EnrollmentItem
                    key={enr.id}
                    enrollment={enr}
                    course={course}
                    isEditing={editingId === enr.id}
                    tempProgress={tempProgress}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onProgressChange={setTempProgress}
                />
            );
        })}
    </>
}


export default EnrollmentList;
