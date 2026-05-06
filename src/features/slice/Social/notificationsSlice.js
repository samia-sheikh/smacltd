import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: null,
};

const notificationsSlice = createSlice({
  name: "socialModels",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
