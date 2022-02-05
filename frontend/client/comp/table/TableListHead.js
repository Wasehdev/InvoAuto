import { TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";

// ----------------------------------------------------------------------

const TableListHead = ({ headLabel }) => {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id}>
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableListHead;
