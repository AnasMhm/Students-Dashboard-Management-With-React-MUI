import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
const MUIStandardTable = ({ tableHeaders, tableBody }) => {
  return (
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
                <TableRow key={stu.id} hover>
                  <TableCell>{stu.id}</TableCell>
                  <TableCell>{stu.name}</TableCell>
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
  )
}
export default MUIStandardTable;
