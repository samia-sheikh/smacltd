// actions/socketActions.js
export const SOCKET_CONNECTED = "connect";
export const SOCKET_DISCONNECTED = "disconnect";
export const RECEIVE_MESSAGE = "notifyMessage";
export const RECEIVE_REFUND_CHAT_MESSAGE = "newRefundMessage";
export const SEND_MESSAGE = "sendMessage";
export const GET_ALL_NOTIFICATIONS = "unReadNotifications";
export const NEW_NOTIFICATION = "newNotification";

// Action creators
export const socketConnected = () => ({
  type: SOCKET_CONNECTED,
});

export const socketDisconnected = () => ({
  type: SOCKET_DISCONNECTED,
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
});
export const receiveRefundChatMessage = (message) => ({
  type: RECEIVE_REFUND_CHAT_MESSAGE,
  payload: message,
});
export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message,
});
export const getAllNotifications = (notifications) => ({
  type: GET_ALL_NOTIFICATIONS,
  payload: notifications,
});
export const newNotification = (notification) => ({
  type: NEW_NOTIFICATION,
  payload: notification,
});
