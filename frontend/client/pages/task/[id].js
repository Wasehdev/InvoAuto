import { Typography, Paper, Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SimpleDialogDemo from "../../comp/dialogBox";

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
  const router = useRouter();
  const labels = task.label;
  let titles = labels.map((label) => label.title);
  const [labelsArr, setLabelsArr] = useState(titles);
  const [values, setValues] = useState(task.task);
  const [notEditable, setNotEditable] = useState(true);
  const [showSave, setShowSave] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const [memberList, setMembers] = useState([]);
  const colorsArr = ["primary", "secondary", "success", "error"];

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = () => {
    let newLabelsArr = [...labelsArr, labelVal];
    setLabelsArr(newLabelsArr);
    let newLabel = { title: labelVal, taskId: task.task.id };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLabel),
    };
    fetch(`http://localhost:5000/labels`, requestOptions)
      .then(() => console.log("successfully edited"))
      .catch(console.error("failed"));
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/tasks/${task.task.id}`, { method: "DELETE" })
      .then(async (response) => {
        router.push({
          pathname: "/task",
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleEdit = () => {
    setNotEditable(!notEditable);
    setShowEdit(!showEdit);
    setShowSave(!showSave);
  };

  const handleMemberClick = (member) => {
    let newMemberList = [...memberList, member];

    setMembers(newMemberList);
  };
  const handleSave = () => {
    setNotEditable(!notEditable);
    setShowEdit(!showEdit);
    setShowSave(!showSave);
    let labels = "";
    for (let i = 0; i < labelsArr.length; i++) {
      labels += labelsArr[i];
      if (i != labelsArr.length - 1) {
        labels += ",";
      }
    }
    let newTask = { ...values, labels };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    };

    fetch(`http://localhost:5000/tasks/${task.task.id}`, requestOptions)
      .then(() => console.log("successfully edited"))
      .catch(console.error("failed"));
  };

  return (
    <div>
      <Paper elevation={10} sx={{ maxWidth: 900, mx: "auto", mt: 10 }}>
        <div>
          <form autoComplete="off">
            <Card>
              <CardHeader subheader="" title="Task Details" />
              <Divider />
              <CardContent>
                <Grid container spacing={2} sx={{ mx: 10 }}>
                  <Grid item md={5} xs={12}>
                    <TextField
                      label="Title"
                      name="task_name"
                      onChange={handleChange}
                      required
                      value={values.task_name}
                      variant="outlined"
                      disabled={notEditable}
                    />
                  </Grid>

                  <Grid item md={5} xs={12}>
                    <TextField
                      label="Estimated Hours"
                      name="estimated_hours"
                      onChange={handleChange}
                      required
                      value={values.estimated_hours}
                      variant="outlined"
                      disabled={notEditable}
                    />
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField
                      label="Actual Hours"
                      name="actual_hours"
                      onChange={handleChange}
                      value={values.actual_hours}
                      variant="outlined"
                      disabled={notEditable}
                    />
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField
                      label="Invoice ID"
                      name="invoiceId"
                      onChange={handleChange}
                      required
                      value={values.invoiceId}
                      variant="outlined"
                      disabled={notEditable}
                    />
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField
                      name="description"
                      label="Description"
                      multiline
                      minRows={3}
                      maxRows={4}
                      value={values.description}
                      onChange={handleChange}
                      sx={{ width: "225px" }}
                      disabled={notEditable}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Stack direction="row" spacing={4}>
                      <Typography variant="h5" component="div" gutterBottom>
                        Members
                      </Typography>

                      <AvatarGroup max={4}>
                        {memberList.map((member) => {
                          return (
                            <Avatar
                              alt={member}
                              src="/static/images/avatar/1.jpg"
                              sx={{ bgcolor: "#1565C0" }}
                            />
                          );
                        })}
                      </AvatarGroup>

                      <SimpleDialogDemo handleMemberClick={handleMemberClick} />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <Typography variant="h5" component="div" gutterBottom>
                      Labels
                    </Typography>
                    <Stack direction="row">
                      <Box
                        maxRows={1}
                        sx={{
                          maxWidth: 400,
                          minWidth: 400,
                          maxHeight: 150,
                          overflow: "auto",
                        }}
                      >
                        {labelsArr.map((label) => {
                          return (
                            <Chip
                              sx={{ m: 1 }}
                              label={label}
                              color={colorsArr[Math.floor(Math.random() * 3)]}
                            />
                          );
                        })}
                      </Box>
                      <Stack direction="row" spacing={8}>
                        <TextField
                          sx={{ ml: 2 }}
                          name="newLabel"
                          label="Add new label"
                          variant="outlined"
                          value={labelVal}
                          onChange={(e) => setLabelVal(e.target.value)}
                        />
                      </Stack>
                      <Button
                        color="primary"
                        variant="contained"
                        sx={{ ml: 3, height: "55px" }}
                        onClick={handleAdd}
                      >
                        Add
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid item>
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      p: 2,
                    }}
                  >
                    {showEdit && (
                      <Button
                        color="success"
                        variant="contained"
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      color="error"
                      variant="contained"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                    {showSave && (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSave}
                      >
                        Save Details
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </CardContent>
              <Divider />
            </Card>
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default Table;
