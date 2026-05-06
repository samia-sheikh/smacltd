import React from "react";
import { Box, Dialog, Typography } from "@mui/material";
import { useEffect } from "react";
import ButtonComp from "../../../globalComponents/ButtonComp";
import { useNavigate } from "react-router-dom";

const VerificationModal = ({ open, close }) => {
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dialogStyles = {
    "& .css-hz1bth-MuiDialog-container": {
      width: "100%",
      padding: "30px",
      margin: 0,
      "& .css-fzk8t3-MuiPaper-root-MuiDialog-paper": {
        // padding: "35px !important",
        width: "100%",
        padding: "30px",
        margin: 0,
        // maxWidth: activeStep === lastStep ? "540px" : "980px",
        borderRadius: "16px",
      },
    },
  };

  const handleCommentClose = () => {
    close(false);
  };

  return (
    <Dialog
      sx={{
        margin: "0 auto",
        ...dialogStyles,
      }}
      open={open}
      // un comment this if you want to close the comment section on click outside the dialog box
      onClose={handleCommentClose}
    >
      <Box
        sx={{
          padding: "50px",
          width: "100%",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center", marginY: "20px" }}>
          Please Verify Your Email
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          Verify your email first as it is compulsory for account activation
        </Typography>

        <ButtonComp
          label="Sign In"
          customStyles={{
            marginTop: "30px",
            width: "100%",
            color: " #FFF",
            minWidth: "max-content",
          }}
          click={() => {
            navigate("/signin");
          }}
        />
      </Box>
    </Dialog>
  );
};

export default VerificationModal;
