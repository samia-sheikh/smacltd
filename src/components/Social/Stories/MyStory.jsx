import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageComp from "../../globalComponents/ImageComp";
import theme from "../../../theme";
import MyStories from "../Modals/Story/ViewStory/MyStories";
const MyStory = ({ data }) => {
  const [storyOpen, setStoryOpen] = useState(false);

  const storyProfileStyles = {
    backgroundSize: "cover",
    objectFit: "cover",
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "50%",
    padding: "5px",
    width: "100%",
    height: "100%",
    verticalAlign: "middle",
    zIndex: 999,
  };

  return (
    <>
      <MyStories stories={data} open={storyOpen} setOpen={setStoryOpen} />
      <Box>
        <Box
          sx={{
            width: "102px",
            height: "102px",
          }}
          onClick={() => setStoryOpen(!storyOpen)}
        >
          <ImageComp
            src={data[0]?.user?.profilePic}
            alt={"story_image"}
            sx={storyProfileStyles}
          />
        </Box>
        <Typography
          variant="storiesTitle"
          sx={{
            maxWidth: "102px",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {data[0]?.user?.firstName.substring(0,10) + " " + data[0]?.user?.lastName.substring(0,10)}
        </Typography>
      </Box>
    </>
  );
};

export default MyStory;
