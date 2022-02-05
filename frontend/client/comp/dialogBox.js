import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, handleMemberClick } = props;
  const [membersList, setMembersList] = React.useState([]);

  useEffect(async () => {
    let res = await fetch("http://localhost:5000/members");
    let data = await res.json();
    let names = data.map((member) => member.name);
    setMembersList(names);
  }, []);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    handleMemberClick(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add new members</DialogTitle>
      <List sx={{ pt: 0 }}>
        {membersList.map((member) => (
          <ListItem
            button
            onClick={() => handleListItemClick(member)}
            key={member}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={member} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ handleMemberClick }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Add members
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        handleMemberClick={handleMemberClick}
      />
    </div>
  );
}
