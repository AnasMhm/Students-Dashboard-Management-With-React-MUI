import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const ReportsBarChart = ({ data, colors }) => {
    return (
        <Box sx={{ overflowX: "auto", overflowY: "hidden" }}>
            <Paper sx={{
                p: 1,
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: "background.paper",
            }}>

                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "text.primary" }}
                >
                    Students Average progress by course
                </Typography>
                <Box sx={{ minWidth: 600, height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 10 }}
                                angle={-30}
                                textAnchor="end"
                                interval={0}
                                height={60}
                            />
                            <YAxis domain={[0, 100]} />
                            <Tooltip formatter={(value) => [`${value}%`, "Progress"]}
                                itemStyle={{
                                    color: colors.secondary, // text color for the value
                                    fontWeight: 600,
                                }}
                                labelStyle={{
                                    color: colors.secondary, // text color for the label (name)
                                }} />
                            <Bar dataKey="uv" fill={colors.secondary} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>
        </Box >
    )
}

export default ReportsBarChart
