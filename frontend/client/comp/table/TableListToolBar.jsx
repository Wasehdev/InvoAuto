import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, OutlinedInput, InputAdornment } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
}));

// ----------------------------------------------------------------------

const TableListToolBar = ({ handleSearch }) => {
  const [filterBy, setFilterBy] = useState("");
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setFilterBy(event.target.value);
  };
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <RootStyle>
      <SearchStyle
        placeholder="Search task..."
        value={search}
        onChange={handleInputChange}
      />
      <Button
        color="primary"
        variant="contained"
        sx={{ ml: 3 }}
        onClick={() => handleSearch(filterBy, search)}
      >
        Search
      </Button>
      <Box sx={{ minWidth: 120, ml: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterBy}
            label="filterby"
            onChange={handleChange}
          >
            <MenuItem value={"id"}>Id</MenuItem>
            <MenuItem value={"task_name"}>Task Name</MenuItem>
            <MenuItem value={"invoiceId"}>Invoice ID</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </RootStyle>
  );
};

export default TableListToolBar;
