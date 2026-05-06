import React from "react";
import SinglePost from "../../../components/Social/posts/SinglePost";
import { Masonry } from "@mui/lab";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import UserComments from "../../../components/Social/Modals/comment/UserComments";

const SearchedPosts = () => {
  const { posts, searchValue } = useSelector((state) => state.globalSearch);
  const handleCommentUpdate = () => {
    //to be completed with correct logic
  };
  return (
    <Masonry
      sx={{ display: "flex", flexWrap: "wrap" }}
      columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
      spacing={11}
    >
      {posts?.length === 0 ? (
        <Typography variant="h4Black">
          There are no posts for query {searchValue}
        </Typography>
      ) : (
        posts?.map((item, index) => {
          return <SinglePost post={item} key={index} />;
        })
      )}
      <UserComments updComments={handleCommentUpdate} />
    </Masonry>
  );
};

export default SearchedPosts;
