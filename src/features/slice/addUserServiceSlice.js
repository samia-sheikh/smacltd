import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userServiceDetails: null,
  userServiceImages: null,
};

const addUserServiceSlice = createSlice({
  name: "addUserServiceSlice",
  initialState,
  reducers: {
    setUserServiceDetails: (state, action) => {
      state.userServiceDetails = action.payload.userService;
    },
    setUserServiceImages: (state, action) => {
      state.userServiceImages = action.payload.userService;
    },
    clearAddUserService: (state) => {
      state.userServiceDetails = null;
      state.userServiceImages = null;
    },
  },
});

export const { setUserServiceDetails, setUserServiceImages,clearAddUserService } =
  addUserServiceSlice.actions;
export default addUserServiceSlice.reducer;
