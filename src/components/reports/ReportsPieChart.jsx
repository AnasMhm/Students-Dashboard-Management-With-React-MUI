import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
function ReportsPieChart({ data, colors }) {
    const theme = useTheme()
    return (
        <Grid sx={{ mb: 2 }} size={12}>
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    boxShadow: 3,
                    bgcolor: "background.paper",
                }}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "text.primary" }}
                >
                    Student Distribution by Course
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={110}
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.palette.text.secondary,
                                borderRadius: "8px",
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        </Grid>
    )
}

export default ReportsPieChart
