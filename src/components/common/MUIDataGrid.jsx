import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export default function MUIDataGrid({ rows, columns, ...props }) {
    const [pageSize, setPageSize] = useState(5);

    return (
        <Paper sx={{ borderRadius: 3, overflowX: "auto", cursor: "pointer" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                onPaginationModelChange={(model) => setPageSize(model.pageSize)}
                disableRowSelectionOnClick
                {...props}
                sx={{
                    border: "none",
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "primary.main",
                        fontWeight: "bold",
                    },
                    overflowX: "auto",
                    height: pageSize > 10 ? 629 : null,
                    minWidth: columns.length * 150,
                }}
            />
        </Paper>
    )
}
