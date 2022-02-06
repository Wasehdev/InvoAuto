import { TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";

// ----------------------------------------------------------------------

const TableListHead = ({ headLabel }) => {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} sx={{ fontWeight: 700 }}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableListHead;
