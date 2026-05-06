import { Box, Button } from "@mui/material";
import React from "react";
import { VscEye } from "react-icons/vsc";
const ViewButton = ({ show, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
        height: "100%",
      }}
    >
      {show ? (
        <Button
          // show={show}
          className="MenuItem"
          variant="contained"
          sx={{ color: "white" }}
          onClick={onClick}
        >
          View Product<VscEye/>
        </Button>
        
      ) : null}
    </Box>
  );
};

export default ViewButton;
