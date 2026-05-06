import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentResponse: null,
};

const paymentResponseSlice = createSlice({
  name: "paymentResponse",
  initialState,
  reducers: {
    setPaymentResponse: (state, action) => {
      state.paymentResponse = action.payload.paymentResponse;
    },
  },
});

export const { setPaymentResponse } =
  paymentResponseSlice.actions;
export default paymentResponseSlice.reducer;
