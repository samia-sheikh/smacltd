import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: null,
  country: null,
  gender: null,
  interest: null,
  interestsArray: [],
};

const multiStateUserIntrestsSlice = createSlice({
  name: "multiStateUserIntrests",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload.data;
    },
    setCountry: (state, action) => {
      state.country = action.payload.data;
    },
    setGender: (state, action) => {
      state.gender = action.payload.data;
    },
    setInterests: (state, action) => {
      state.interest = action.payload.data;
    },
    setInterestsArray: (state, action) => {
      state.interestsArray = action.payload.data;
    },
  },
});

export const {
  setLanguage,
  setCountry,
  setGender,
  setInterests,
  setInterestsArray,
} = multiStateUserIntrestsSlice.actions;
export default multiStateUserIntrestsSlice.reducer;
