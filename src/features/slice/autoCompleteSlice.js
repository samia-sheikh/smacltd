import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autoCompleteArray: null,
  userInterests: null,
  postInterests: null,
  currentUserInterests: [],
};

const autoColpleteSlice = createSlice({
  name: "autoComplete",
  initialState,
  reducers: {
    setAutoCompleteArray: (state, action) => {
      state.autoCompleteArray = action.payload.autoCompleteArray;
    },
    setUserInterests: (state, action) => {
      state.userInterests = action.payload.userInterests;
    },
    setCurrentUserInterests: (state, action) => {
      state.currentUserInterests = action.payload.currentUserInterests;
    },
    setPostInterests: (state, action) => {
      state.postInterests = action.payload.postInterests;
    },
  },
});

export const {
  setAutoCompleteArray,
  setUserInterests,
  setPostInterests,
  setCurrentUserInterests,
} = autoColpleteSlice.actions;
export default autoColpleteSlice.reducer;
