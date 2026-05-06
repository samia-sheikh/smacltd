import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscriptionToEdit: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionToEdit: (state, action) => {
      state.subscriptionToEdit = action.payload.data;
    },
  },
});

export const { setSubscriptionToEdit } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
