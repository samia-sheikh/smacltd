import React from "react";
import { Box, Typography } from "@mui/material";
import ButtonComp from "../../globalComponents/ButtonComp";

const AddStoryBtn = ({ click }) => {
  const buttonStyles = {
    borderRadius: "50%",
    padding: "30px",
    width: "80px",
    height: "80px",
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          minWidth: "102px",
          maxWidth: "102px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <ButtonComp
          image={"assets/photos/plusIcon.png"}
          customStyles={buttonStyles}
          click={click}
        />
        <Typography variant="addStoryTypo">Add Your Story</Typography>
      </Box>
    </React.Fragment>
  );
};

export default AddStoryBtn;
