import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: null,
  subscritptionToEdit: null,
};

const subscriptionPriceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload.price;
    },
    setSubscritptionToEdit: (state, action) => {
      state.subscritptionToEdit = action.payload.data;
    },
  },
});

export const { setPrice, setSubscritptionToEdit } =
  subscriptionPriceSlice.actions;
export default subscriptionPriceSlice.reducer;
