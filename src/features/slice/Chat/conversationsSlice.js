import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  selectedConversation: [],
};

const conversationsSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload.data;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload.data;
    },
  },
});

export const { setSelectedConversation, setConversations } =
  conversationsSlice.actions;
export default conversationsSlice.reducer;
