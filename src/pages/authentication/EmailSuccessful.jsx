import { Box, Typography } from "@mui/material";
import React from "react";
import ImageComp from "../../components/globalComponents/ImageComp";
const EmailSuccessful = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh !important",
      }}
      gap={8}
    >
      <ImageComp
        src={"assets/png/Successfull.png"}
        sx={{
          width: "100px",
          maxWidth: "469.06px",
          height: "409.8px",
        }}
      />

      <Typography
        variant="h2"
        sx={{
          color: "#69CDB0",
        }}
      >
        Email Registered Successfully!
      </Typography>
      <Typography>{message}</Typography>
    </Box>
  );
};

export default EmailSuccessful;
