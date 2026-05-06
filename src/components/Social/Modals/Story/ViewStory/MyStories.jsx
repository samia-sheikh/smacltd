import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ButtonComp from "../../../../globalComponents/ButtonComp";
import theme from "../../../../../theme";
import ImageComp from "../../../../globalComponents/ImageComp";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import ProgressBar from "../../../../globalComponents/ProgressBar/ProgressBar";
import Swiper from "./../../../../globalComponents/Swiper/Swiper";
import { useSelector } from "react-redux";
import useFetch from "../../../../../features/hooks/useFetch";

const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": { padding: "0 !important" },
  "& .MuiDialogActions-root": {},
  "& .css-fzk8t3-MuiPaper-root-MuiDialog-paper": {
    margin: "0px !important",
  },
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    backgroundColor: `${theme.palette.blackColor.main}`,
    padding: "0 !important",
    color: ` white`,
    backgroundColor: "pink",
  },
}));

const MyStories = ({ sx, open, setOpen, stories }) => {
  const [del, setDel] = useState(false);
  const [viewers, setViewers] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { user } = useSelector((state) => state.user);
  const { loading, deleteData } = useFetch();
  const [currentStories, setCurrentStories] = useState(stories);
  const modalContainerRef = React.useRef(null);
  const handleClose = () => {
    setOpen(!open);
    setSelectedImage(0);
  };
  const handleDelete = async (id) => {
    try {
      await deleteData(`/api/user/story/${id}`, (res) => {
        // use a state to refetch the stories after deleting one
        let filteredStories = currentStories.filter(
          (story) => story.storyId !== id
        );
        setCurrentStories(filteredStories);
        setDel(!del);
        setOpen(!open);
      });
    } catch (error) {
      //console.log("catch", error);
    }
  };
  const handleCancel = () => {
    setDel(!del);
  };

  const updateStory = () => {
    const isLastImage = selectedImage === currentStories?.length - 1;
    if (isLastImage) {
      setOpen(false);
    }
    const newIndex = isLastImage ? 0 : selectedImage + 1;
    setSelectedImage(newIndex);
  };

  const btnStyles = {
    width: "max-content",
    height: "45px",
  };

  const DeleteStory = () => {
    return (
      <Dialog
        open={del}
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "24px",
          }}
        >
          <Box>
            <Typography variant="bold20">Delete</Typography>
            <Typography>Are you sure you want to delete this story?</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <ButtonComp
              label={`Confirm`}
              click={() => handleDelete(currentStories[selectedImage].storyId)}
              customStyles={btnStyles}
              disabled={loading}
            />
            <ButtonComp
              label={`Cancel`}
              click={handleCancel}
              customStyles={{
                ...btnStyles,
                background: "transparent",
                border: "none",
                color: "#868686",
              }}
            />
          </Box>
        </Box>
      </Dialog>
    );
  };
  return (
    <div style={{ borderRadius: "16px", ...sx }}>
      {/* <StoryViewers viewers={viewers} setViewers={setViewers} /> */}
      <DeleteStory />
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
            backgroundColor: "#333",
            margin: 0,
          }}
          ref={modalContainerRef}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px",
              }}
            >
              {/* name to be changes to user name and also to the avtar*/}
              <Avatar src={user?.profilePic} />
              <Typography
                variant="editPicButton"
                sx={{ textTransform: "capitalize" }}
              >
                {user?.firstName.substring(0, 10) +
                  " " +
                  user?.lastName.substring(0, 10)}
              </Typography>
            </Box>
            <Button
              onClick={() => {
                setDel(!del);
              }}
              sx={{ "& :hover": { background: "transparent" } }}
            >
              <Tooltip title="Delete" arrow sx={{ backgroundColor: "white" }}>
                <DeleteIcon sx={{ color: "white" }} />
              </Tooltip>
            </Button>
          </Box>
          <Box onClick={updateStory}>
            <ImageComp
              src={currentStories[selectedImage]?.storyImage}
              sx={{
                height: "100%",
                maxHeight: "450px",
                minHeight: "360px",
                width: "280px",
              }}
            />
          </Box>

          <Box sx={{ padding: "16px", width: "100%" }}>
            {/* <Button
              sx={{ height: "50px" }}
              variant="contained"
              onClick={() => setViewers(!viewers)}
            >
              <Typography color={"white"}>Views</Typography>
              <VisibilityIcon sx={{ color: "white" }} />
            </Button> */}
            <Swiper modalContainerRef={modalContainerRef} />
          </Box>
        </DialogContent>
        <ProgressBar />
      </BootstrapDialog>
    </div>
  );
};

export default MyStories;
