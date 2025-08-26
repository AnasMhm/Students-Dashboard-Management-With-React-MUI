import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
const MUIStandardTable = ({ tableHeaders, tableBody, header, ...props }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>{header}</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table
          sx={{
            "& .MuiTableCell-head": { fontSize: "0.95rem", fontWeight: "bold" },
            "& .MuiTableCell-body": { fontSize: "0.85rem" },
          }}
        >
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody.map((stu) => (
              <TableRow key={stu.id} sx={{ cursor: "pointer" }} hover onClick={() => props.onRowClick(stu)}>
                <TableCell>{stu.id}</TableCell>
                <TableCell>{stu.firstName}</TableCell>
                <TableCell>{stu.lastName}</TableCell>
                <TableCell>{stu.email}</TableCell>
                <TableCell>{stu.phone}</TableCell>
                <TableCell>
                  {new Date(stu.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
export default MUIStandardTable;
