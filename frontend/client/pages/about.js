import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
const Home = () => {
  const [l, setL] = useState("");
  const [label, setLabel] = useState(["Ab", "cd"]);

  const handleChangeL = (event) => {
    setL(event.target.value);
  };
  const handleChange = () => {
    setLabel([...label, l]);
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Name"
          value={l}
          onChange={handleChangeL}
        />
        <Button onClick={handleChange} variant="contained">
          Add Label
        </Button>
        {label.map((e) => (
          <Chip label={e} color="secondary" />
        ))}
      </Box>
    </div>
  );
};
export default Home;
