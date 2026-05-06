import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: null,
};

const allProductsSlice = createSlice({
  name: "allProductsSlice",
  initialState,
  reducers: {
    setaddAllProducts: (state, action) => {
      state.post = action.payload.post;
    },
  },
});

export const { setaddAllProducts } = allProductsSlice.actions;
export default allProductsSlice.reducer;
