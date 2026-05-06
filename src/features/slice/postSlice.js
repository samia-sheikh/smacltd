import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  multiplePosts: null,
  otherUserPosts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload.post;
    },
    setMultiplePost: (state, action) => {
      state.multiplePosts = action.payload.data;
    },
    setOtherUserPost: (state, action) => {
      state.otherUserPosts = action.payload.data;
    },
  },
});

export const { setPost, setMultiplePost, setOtherUserPost } = postSlice.actions;
export default postSlice.reducer;
