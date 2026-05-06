import React from "react";
import {
  // IconButton,
  // Menu,
  // MenuItem,
  // Table,
  // TableBody,
  TableCell,
  // TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
// import { RiArrowDropDownLine } from "react-icons/ri";

import ImageComp from "../../../globalComponents/ImageComp";
import theme from "../../../../theme";
// import theme from "../../../../theme";
const SubscriptionTable = ({ subitems }) => {
  //console.log(subitems, "ppp");
  // Function to format date
  function convertCreatedAtTime(params) {
    const date = new Date(params);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  function formatCamelCase(key) {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before each capital letter
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }
  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "none",
          }}
        >
          <Typography variant="h6Grey"> {subitems.txnReference}</Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">{subitems?.userEmail}</Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {formatCamelCase(subitems?.type)}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "10%" }}>
          <Typography variant="h6Grey">
            {subitems?.orderAmount || "N/A"}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {convertCreatedAtTime(subitems?.createdAt)}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "10%" }}>
          <Typography
            variant="h6Grey"
            sx={{
              color:
                subitems?.status === "success"
                  ? theme.palette.primary.main
                  : subitems?.status === "pending"
                  ? "#FFDE66"
                  : "red",
            }}
          >
            {subitems?.status || "Active"}
          </Typography>
        </TableCell>
        {/* <TableCell sx={{ borderBottom: "none",width: "20%" }}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(e) => handleClick(e)}
                  sx={{
                    isolation: "isolate",
                    // mixBlendMode:"difference",
                    color: "white",
                    backgroundColor: "black",
                    filter: "invert(1)",
                  }}
                >
                  <RiArrowDropDownLine />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                >
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                      },
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell> */}
      </TableRow>
    </>
  );
};

export default SubscriptionTable;
