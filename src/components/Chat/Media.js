import {
  Box,
  Button,
  Card,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PropTypes from "prop-types";
import PermMediaIcon from "@mui/icons-material/PermMedia";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Media({ selectedMessage, width, setUserFlag, userFlag, windowSize }) {
  const [value, setValue] = useState(0);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleClickOnHeader = () => {};
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        margin: 2,
        padding: 2,
        display: `${width <= 900 ? "none" : "block"}`,
      }}
    >
      {selectedMessage ? (
        <div>
          <Box sx={{ width: "100%" }}>
            <Stack direction="row">
              {windowSize.width < 1000 ? (
                <ArrowBackIosIcon
                  onClick={() => {
                    setUserFlag(!userFlag);
                  }}
                />
              ) : null}
              <Button
                sx={{
                  backgroundColor: "#14b8a6",
                  "&:hover": { backgroundColor: "#18a393" },
                  color: "white",
                }}
                onClick={() => handleChange(0)}
              >
                Media
              </Button>
              <Button
                sx={{
                  backgroundColor: "#14b8a6",
                  "&:hover": { backgroundColor: "#18a393" },
                  color: "white",
                }}
                onClick={() => handleChange(1)}
              >
                Document
              </Button>
              <Button
                sx={{
                  backgroundColor: "#14b8a6",
                  "&:hover": { backgroundColor: "#18a393" },
                  color: "white",
                }}
                onClick={() => handleChange(2)}
              >
                Links
              </Button>
            </Stack>
            <CustomTabPanel value={value} index={0}>
              <ImageList cols={3} rowHeight={100} gap={5}>
                <ImageListItem>
                  <img alt="IMG1" src={selectedMessage.media.img1} />
                </ImageListItem>
                <ImageListItem>
                  <img alt="IMG2" src={selectedMessage.media.img2} />
                </ImageListItem>
                <ImageListItem>
                  <img alt="IMG2" src={selectedMessage.media.img3} />
                </ImageListItem>
                <ImageListItem>
                  <img alt="IMG2" src={selectedMessage.media.img4} />
                </ImageListItem>
                <ImageListItem>
                  <img alt="IMG2" src={selectedMessage.media.img5} />
                </ImageListItem>
                <ImageListItem>
                  <img alt="IMG3" src={selectedMessage.media.img6} />
                </ImageListItem>
              </ImageList>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Typography component={"span"}>
                {selectedMessage.documents.doc1}
              </Typography>
              <Typography>{selectedMessage.documents.doc2}</Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Typography>{selectedMessage.links.link1}</Typography>
              <Typography>{selectedMessage.links.link2}</Typography>
            </CustomTabPanel>
          </Box>
        </div>
      ) : (
        <PermMediaIcon
          sx={{
            fontSize: 100,
            color: "lightgray",
            marginLeft: "125px",
            marginTop: "225px",
          }}
        />
      )}
    </Card>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Media;
