import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import { getCourses, getEnrollments } from "../lib/seed";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
const ReportsBarChart = lazy(() => import("../components/reports/ReportsBarChart"));
const ReportsPieChart = lazy(() => import("../components/reports/ReportsPieChart"));
const Reports = () => {
    const { colors } = useThemeContext();
    const theme = useTheme();
    const enrollments = getEnrollments();
    const courses = getCourses();
    const studentData = courses.map((course) => {
        const count = enrollments.filter((e) => e.courseId === course.id).length;
        return { name: course.title, value: count };
    });

    const completionData = courses.map((course) => {
        const courseEnrollments = enrollments.filter((e) => e.courseId === course.id);
        const avgProgress =
            courseEnrollments.reduce((sum, e) => sum + e.progress, 0) /
            (courseEnrollments.length || 1);
        return { name: course.title, uv: avgProgress.toFixed(2) };
    });
    const chartColors = [colors.primary, colors.secondary, theme.palette.text.secondary, theme.palette.success.main, theme.palette.warning.main];

    return (
        <Box sx={{ width: "100%" }}>
            <Suspense fallback={<LoadingSpinner />}>
                <ReportsPieChart data={studentData} colors={chartColors} />
                <ReportsBarChart data={completionData} colors={colors} />
            </Suspense>
        </Box >
    );
};
export default Reports;