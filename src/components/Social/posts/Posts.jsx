import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Masonry } from "@mui/lab";
import SinglePost from "../posts/SinglePost";
import SkeletonLoader from "./../../globalComponents/SkeletonLoader";

const Posts = ({ myposts, delCb }) => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (myposts && myposts.length > 0) {
      setLoad(false);
    }
  }, [myposts]);
  const deletePost = (deletedPostId) => {
    delCb(deletedPostId);
  };

  return (
      <Box sx={{display:"flex",justifyContent:"center"}}>
        <Masonry
          sx={{ display: "flex", flexWrap: "wrap"}}
          columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
          spacing={6}
        >
          {load
            ? [1, 2, 3].map((post, index) => <SkeletonLoader key={index} />)
            : myposts?.map((post, index) => (
                <div
                  key={post.postId}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <SinglePost delCb={deletePost} post={post} />
                </div>
              ))}
        </Masonry>
      </Box>
  );
};

export default Posts;
