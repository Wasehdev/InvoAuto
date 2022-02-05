// import { Icon } from "@iconify/react";
import { getTasks } from "../api";
import { useState, useEffect } from "react";
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
  Box,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";

import TableListHead from "../../comp/table/TableListHead";
import TableListToolBar from "../../comp/table/TableListToolBar";
import TableMoreMenu from "../../comp/table/TableMoreMenu";

const TABLE_HEAD = [
  { id: "task_name", label: "Task Name", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "invoiceId", label: "Invoice Id", alignRight: false },
  { id: "estimated_hours", label: "Estimated Hours", alignRight: false },
  { id: "actual_hours", label: "Actual Hours", alignRight: false },
];

const MainTable = () => {
  const [taskList, setTaskList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleDelete(id) {
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
      .then(async (response) => {
        let newTaskList = [...taskList];
        newTaskList = newTaskList.filter((task) => task.id != id);
        setTaskList(newTaskList);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  async function handleSearch(value, search) {
    if (search) {
      let result = await fetch(
        `http://localhost:5000/tasks/${value}/${search}`
      );
      let data = await result.json();
      setTaskList(data);
    } else {
      getTasks()
        .then((result) => {
          let tasks = result.data;
          setTaskList(tasks);
        })
        .catch((error) => console.log(error));
    }
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - taskList.length) : 0;

  useEffect(() => {
    let mounted = true;
    getTasks()
      .then((result) => {
        if (mounted) {
          let tasks = result.data;
          setTaskList(tasks);
        }
      })
      .catch((error) => console.log(error));
    return () => (mounted = false);
  }, []);

  return (
    <Paper elevation={10} sx={{ m: 5 }}>
      <Card>
        <TableListToolBar handleSearch={handleSearch} />

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableListHead headLabel={TABLE_HEAD} rowCount={taskList.length} />
            <TableBody>
              {taskList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    id,
                    task_name,
                    description,
                    invoiceId,
                    actual_hours,
                    estimated_hours,
                  } = row;

                  return (
                    <TableRow hover key={id} tabIndex={-1} role="checkbox">
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        <Typography variant="subtitle2" noWrap>
                          {task_name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{description}</TableCell>
                      <TableCell align="left">{invoiceId}</TableCell>

                      <TableCell align="left">{estimated_hours}</TableCell>
                      <TableCell align="left">{actual_hours}</TableCell>
                      <TableCell align="right">
                        <TableMoreMenu id={id} handleDelete={handleDelete} />
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
          count={taskList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Paper>
  );
};

export default MainTable;
