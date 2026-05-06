import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refundTicket: null,
};

const refundTicketSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setRefundTicket: (state, action) => {
      state.refundTicket = action.payload.data;
    },
  },
});

export const { setRefundTicket } = refundTicketSlice.actions;
export default refundTicketSlice.reducer;
