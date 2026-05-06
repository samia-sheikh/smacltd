// reducers/socketReducer.js
import {
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  RECEIVE_MESSAGE,
  GET_ALL_NOTIFICATIONS,
  NEW_NOTIFICATION,
  RECEIVE_REFUND_CHAT_MESSAGE,
} from "./socketActions";

const initialState = {
  isConnected: false,
  messages: [],
  refundChatMessage: [],
  allNotifications: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CONNECTED:
      return { ...state, isConnected: true };
    case SOCKET_DISCONNECTED:
      return { ...state, isConnected: false };
    case RECEIVE_MESSAGE:
      return { ...state, messages: [action.payload.data] };
    case RECEIVE_REFUND_CHAT_MESSAGE:
      return { ...state, refundChatMessage: action.payload.data };
    case GET_ALL_NOTIFICATIONS:
      return { ...state, allNotifications: action.payload };
    case NEW_NOTIFICATION:
      return {
        ...state,
        allNotifications: [action.payload, ...state.allNotifications],
      };
    default:
      return state;
  }
};

export default socketReducer;
