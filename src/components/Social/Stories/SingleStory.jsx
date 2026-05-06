import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageComp from "../../globalComponents/ImageComp";
import theme from "../../../theme";
import { useSelector } from "react-redux";
import OtherStories from "../Modals/Story/ViewStory/othersStory";
const SingleStory = ({ data }) => {
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
      <OtherStories
        story={data.stories}
        open={storyOpen}
        setOpen={setStoryOpen}
      />
      <Box>
        <Box
          sx={{
            width: "102px",
            height: "102px",
          }}
          onClick={() => setStoryOpen(!storyOpen)}
        >
          <ImageComp
            src={data?.user?.profilePic}
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
          {data?.user?.firstName.substring(0,10) + " " + data.user.lastName.substring(0,10)}
        </Typography>
      </Box>
    </>
  );
};

export default SingleStory;
