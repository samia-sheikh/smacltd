import { Box, Typography } from "@mui/material";
import React from "react";
// import ImageComp from "../ImageComp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import theme from "../../../theme";
import { SuccessfulSVG } from "../constants";

const Successful = ({ text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        marginBottom: "24px",
        alignItems: "center",
      }}
    >
      <SuccessfulSVG />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="black24">Successfully</Typography>
          <CheckCircleIcon
            sx={{ color: theme.palette.primary.main, padding: "5px" }}
          />
        </Box>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Successful;
