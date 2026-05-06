import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  selectedChat: null,
  isNewChat: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload.socket;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload.selectedChat;
    },
    setIsNewChat: (state, action) => {
      state.isNewChat = action.payload.isNewChat;
    },
  },
});

export const { setSocket, setSelectedChat, setIsNewChat } = socketSlice.actions;
export default socketSlice.reducer;
