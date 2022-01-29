import { Icon } from "@iconify/react";
import { useState } from "react";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { UserMoreMenu, UserListHead } from "../user";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

const USERLIST = [...Array(24)].map((_, index) => ({
  id: 27,
  avatarUrl: index + 1,
  name: "Mudassar",
  company: "Invoxone",
  isVerified: index % 2 == 0 ? true : false,
  status: index % 2 == 0 ? "active" : "banned",
  role: "Leader",
}));

const MainTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = [];

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Card>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <UserListHead headLabel={TABLE_HEAD} />
          <TableBody>
            {USERLIST.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row) => {
              const { id, name, role, status, company, avatarUrl, isVerified } =
                row;
              return (
                <TableRow hover key={id} tabIndex={-1}>
                  <TableCell component="th" scope="row" padding="none">
                    <Typography variant="subtitle2" noWrap>
                      {name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{company}</TableCell>
                  <TableCell align="left">{role}</TableCell>
                  <TableCell align="left">
                    {isVerified ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="left">{status}</TableCell>

                  <TableCell align="right">
                    <UserMoreMenu id={row.id} />
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={USERLIST.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default MainTable;
