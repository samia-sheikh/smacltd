import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCommentOpen: false,
  isShareOpen: false,
};

const socialModelsSlice = createSlice({
  name: "socialModels",
  initialState,
  reducers: {
    setIsCommentOpen: (state, action) => {
      state.isCommentOpen = action.payload.data;
    },
    setIsShareOpen: (state, action) => {
      state.isShareOpen = action.payload.data;
    },
  },
});

export const { setIsCommentOpen, setIsShareOpen } = socialModelsSlice.actions;
export default socialModelsSlice.reducer;
