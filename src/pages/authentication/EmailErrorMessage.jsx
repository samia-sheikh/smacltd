import { Box, Typography } from "@mui/material";
import React from "react";
import ImageComp from "../../components/globalComponents/ImageComp";
const EmailErrorMessage = ({ ErrorMessage }) => {
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
        src={"assets/png/error.png"}
        sx={{
          width: "100%",
          maxWidth: "600.54px",
          height: "442.27px",
        }}
      />

      <Typography
        variant="h2"
        sx={{
          color: "#69CDB0",
        }}
      >
        We’re Sorry Your Email Can’t be Registered!
      </Typography>
      <Typography>{ErrorMessage}</Typography>
    </Box>
  );
};

export default EmailErrorMessage;
