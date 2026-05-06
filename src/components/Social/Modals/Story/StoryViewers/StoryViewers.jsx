import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import theme from "../../../../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": { padding: "0 !important" },
  "& .MuiDialogActions-root": {},
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    backgroundColor: `${theme.palette.blackColor.main}`,
    padding: "0 !important",
    color: ` white`,
  },
}));

const StoryViewers = ({ viewers, setViewers }) => {
  const handleClose = () => {
    setViewers(!viewers);
  };
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={viewers}
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
            }}
          >
            <Box></Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px",
              }}
            >
              {/* name to be changes to user name and also to the avtar*/}
              <Avatar src={`user.image`} />
            </Box>
            <Button
              onClick={() => handleClose}
              sx={{ "& :hover": { background: "transparent" } }}
            >
              <Tooltip title="Delete" arrow sx={{ backgroundColor: "white" }}>
                <DeleteIcon sx={{ color: "white" }} />
              </Tooltip>
            </Button>
          </Box>

          <Box sx={{ backgroundColor: "white", width: "100%" }}>
            <List>
              {/* <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={10}
                overscanCount={5}
              > */}
              {[1, 2131, 4, 5, 6, 7, 8].map((v, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography color="black">RobertFin</Typography>}
                      secondary={
                        <Typography color="black">@RobertFin22</Typography>
                      }
                    />
                  </ListItem>
                );
              })}
              {/* </FixedSizeList> */}
            </List>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default StoryViewers;
