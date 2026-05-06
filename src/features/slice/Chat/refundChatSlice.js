import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refundMessages: [],
  imageToPreview: null,
};

const refundChatSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setRefundMessages: (state, action) => {
      state.refundMessages = action.payload.data;
    },
    setImageToPreview: (state, action) => {
      state.imageToPreview = action.payload.data;
    },
  },
});

export const { setRefundMessages, setImageToPreview } = refundChatSlice.actions;
export default refundChatSlice.reducer;
