import { useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
// material
import { Menu, MenuItem, IconButton, ListItemText } from "@mui/material";

// ----------------------------------------------------------------------

const TableMoreMenu = ({ id, handleDelete }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
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
        <Link href={"/task/" + id}>
          <MenuItem>
            <ListItemText
              primary="View Details"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Link>

        <MenuItem onClick={() => handleDelete(id)}>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TableMoreMenu;
