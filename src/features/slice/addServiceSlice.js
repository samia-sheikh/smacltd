import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceDetails: null,
  serviceImages: null,
};

const addServiceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceDetails: (state, action) => {
      state.serviceDetails = action.payload.service;
    },
    setServiceImages: (state, action) => {
      state.serviceImages = action.payload.service;
    },
    setImageService:()=>{
      return initialState
    }
  },
});

export const { setServiceDetails, setServiceImages,setImageService } = addServiceSlice.actions;
export default addServiceSlice.reducer;
