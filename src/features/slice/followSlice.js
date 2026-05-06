import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followers: null,
  following: null,
  pendingAndFollowers: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollowers: (state, action) => {
      state.followers = action.payload.data;
    },
    setFollowing: (state, action) => {
      state.following = action.payload.data;
    },
    setpendingAndFollowers: (state, action) => {
      state.pendingAndFollowers = action.payload.data;
    },
    // clearDashboardUser: (state) => {
    //   state.followers = null;
    // },
  },
});

export const { setFollowers, setFollowing, setpendingAndFollowers } =
  followSlice.actions;
export default followSlice.reducer;
