import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  isViewProductOpen: false,
};

const viewProductSlice = createSlice({
  name: "viewProduct",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload.product;
    },
    setIsViewProductOpen: (state, action) => {
      state.isViewProductOpen = action.payload.open;
    },
  },
});

export const { setProduct, setIsViewProductOpen } = viewProductSlice.actions;
export default viewProductSlice.reducer;
