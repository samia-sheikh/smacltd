import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetails: null,
  productImages: [],
};

const addProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = action.payload.product;
    },
    setProductImages: (state, action) => {
      state.productImages = action.payload.product;
    },
  },
});

export const { setProductDetails, setProductImages } = addProductSlice.actions;
export default addProductSlice.reducer;
