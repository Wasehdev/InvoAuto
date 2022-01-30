import {
  Card,
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
  Grid,
  Chip,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();

  const paths = data.map((task) => {
    return {
      params: {
        id: task.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();

  return {
    props: {
      task: data,
    },
  };
};

const Table = ({ task }) => {
  const [labelVal, setLabelVal] = useState("");
  const { task_name, description, invoiceId } = task.task;
  const titles = task.label;
  const [labelsarr, setlabelsArr] = useState(titles);

  return (
    <Paper sx={{ m: 5 }} elevation={20}>
      <Grid container spacing={3} sx={{ m: 3 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {"Title " + task_name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ maxWidth: 1000 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Labels
              </Typography>
              {titles.map((label) => {
                return (
                  <Chip sx={{ m: 1 }} label={label.title} color="primary" />
                );
              })}
              <TextField
                sx={{ ml: 2 }}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={labelVal}
                onChange={(e) => setLabelVal(e.target.value)}
              />
              <Button
                color="secondary"
                variant="contained"
                sx={{ ml: 1, mt: 1 }}
                // onClick={setlabelsArr({ labelsarr: [...labelsarr, labelVal] })}
              >
                Add
              </Button>
            </CardContent>
          </Card>
          <Typography variant="h5"></Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Paper>
    // <div>
    //   <h1></h1>
    //   <p></p>
    //   <h1></h1>
    //   <ul>
    //
    //   </ul>
    // </div>
  );
};

export default Table;
