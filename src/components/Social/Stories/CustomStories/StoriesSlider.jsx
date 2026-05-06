import React, { useState } from "react";
import SingleStory from "../SingleStory.jsx";
import "./StoriesSlider.css";
import MyStory from "../MyStory.jsx";
const StoriesSlider = ({ stories, myStories }) => {
  const [storyOpen, setStoryOpen] = useState(false);
  return (
    <div
      className="storiesSlider"
      style={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        gap: "26px",
        overflowX: "scroll",
      }}
    >
      {myStories.length > 0 ? (
        <MyStory data={myStories} open={storyOpen} setOpen={setStoryOpen} />
      ) : null}
      {stories.map((story, i) => {
        return <SingleStory data={story} key={i} />;
      })}
    </div>
  );
};

export default StoriesSlider;
