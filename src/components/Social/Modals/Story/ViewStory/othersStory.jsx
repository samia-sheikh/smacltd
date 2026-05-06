import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Avatar, Box, Button, InputBase, Typography } from "@mui/material";
import theme from "./../../../../../theme";
import ProgressBar from "./../../../../globalComponents/ProgressBar/ProgressBar";
import useFetch from "../../../../../features/hooks/useFetch";

const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": { padding: "0 !important" },
  "& .MuiDialogActions-root": {},
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    backgroundColor: `white`,
    padding: "24px !important",
    color: ` white`,

    borderRadius: "16px",
  },
}));
const Search = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
//temporary stories added change
const OtherStories = ({ sx, open, setOpen, story }) => {
  const { loading } = useFetch();
  const [selectedImage, setSelectedImage] = useState(0);
  const handleClose = () => {
    setOpen(!open);
  };

  const updateStory = () => {
    const isLastImage = selectedImage === story?.length - 1;
    if (isLastImage) {
      setOpen(false);
    }
    const newIndex = isLastImage ? 0 : selectedImage + 1;
    setSelectedImage(newIndex);
  };

  return (
    <>
      {/* {stories?.map((story)=>{ */}

      <div style={{ borderRadius: "16px", ...sx }} key={story?.storyId}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          style={{
            borderRadius: "16px",
            width: "100%",
            maxWidth: "540px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <DialogContent
            dividers
            sx={{
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                flexDirection: "column",
                //   when live change it to array of userStories
                //   backgroundImage:`url(${userStory})`
                backgroundImage: `url(${story[selectedImage]?.storyImage})`,
                backgroundSize: "cover", // Ensure the image covers the entire box
                backgroundPosition: "center", // Center the background image
                backgroundRepeat: "no-repeat",
                minHeight: "600px",
                padding: "16px",
              }}
              onClick={updateStory}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                }}
              >
                {/* name to be changes to user name and also to the avtar*/}
                <Avatar src={story[selectedImage]?.user?.profilePic} />
                <Typography variant="editPicButton">
                  {story[selectedImage]?.user?.firstName +
                    " " +
                    story[selectedImage]?.user?.lastName}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "50px",
                  padding: "8px",
                }}
              >
                <Search
                  sx={{
                    color: "white",
                  }}
                >
                  <InputBase
                    placeholder="Write your comment here.."
                    sx={{
                      background: "transparent",
                      color: "white",
                      border: "none",
                    }}
                  />
                </Search>
                <Button
                  disabled={loading}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    display: " flex",
                    width: "97px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "55px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </DialogContent>
          <ProgressBar />
        </BootstrapDialog>
      </div>

      {/* )
       })} */}
    </>
  );
};

export default OtherStories;
