import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },

    setUserAuth: (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
    },

    setUser: (state, action) => {
      state.user = action.payload.data?.user
        ? action.payload.data.user
        : action.payload.data;
    },
  },

  // extraReducers: (builder) => {

  // },
});

export const { logout, setUser, setUserAuth } = userSlice.actions;
export default userSlice.reducer;
