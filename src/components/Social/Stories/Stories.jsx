import React, { useEffect, useState } from "react";
import AddStoryBtn from "./AddStoryBtn";
import { Box } from "@mui/material";
import GlobalSlider from "../../globalComponents/GlobalSlider";
import AddStory from "../../globalComponents/Modals/Story/AddStory/AddStory";
import useFetch from "../../../features/hooks/useFetch";

const Stories = () => {
  const { loading, fetchData } = useFetch();
  const [stories, setStories] = useState([]);
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    fetchData("/api/user/story", undefined, undefined, (res) => {
      setStories(res?.stories);
      setUserDetails(res?.user);
      //console.log(res.stories, "res stories");
    });
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <AddStory />
        </Box>
        <Box sx={{ width: "90%" }}>
          <GlobalSlider
            stories={stories}
            userDetails={userDetails}
            dots={false}
            arrows={false}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Stories;
