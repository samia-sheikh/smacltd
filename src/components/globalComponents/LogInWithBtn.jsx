import { Box, Button, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme";

const LogInWithBtn = ({ login ,click}) => {
  const buttonStyles = {
    border: "1px solid #F1F1F1",
    backgroundColor: "white",
    padding: theme.spacing(10, 0),
    "&:hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: "white",
    },
  };
  return (
    <React.Fragment>
      <Box display={"flex"} gap={theme.spacing(4)} mt={12} width={"100%"}>
        <Button
          variant="outlined"
          sx={buttonStyles}
          color="blackColor"
          fullWidth
          onClick={()=>{click()}}
        >
          <img src="assets/photos/google.png" alt="google" />
          <Typography variant="h5ButtonTypo">{login}</Typography>
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default LogInWithBtn;
