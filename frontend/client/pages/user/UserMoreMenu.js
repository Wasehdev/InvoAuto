import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// ----------------------------------------------------------------------

const UserMoreMenu = ({ id }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon width={24} height={24} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Link href={"/table/" + id}>
          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemText
              primary="View Details"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
        <Link href={"/table/" + id}>
          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemText
              primary="Edit"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
        <Link href={"/table/" + id}>
          <MenuItem sx={{ color: "text.secondary" }}>
            <ListItemText
              primary="Delete"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};

export default UserMoreMenu;
