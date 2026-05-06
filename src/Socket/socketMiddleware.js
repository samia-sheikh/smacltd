// middleware/socketMiddleware.js
import {
  socketConnected,
  // socketDisconnected,
  receiveMessage,
  getAllNotifications,
  newNotification,
  receiveRefundChatMessage,
} from "./socketActions";
import getSocket from "./socket"; // Import the function
export const useSocket = () => {
  let socket = getSocket();
  if (!socket?.connected) {
    socket.connect();
  }

  const sendMessage = async (data) => {
    try {
      if (data && socket?.connected) {
        socket.emit("sendMessage", data);
      } else {
        socket.connect();
        // //console.log("check if socket is connected");

        await socket.emit("sendMessage", data);
      }
    } catch (e) {
      ////console.log(e);
    }
  };
  const sendMessageInRefundChat = async (data) => {
    try {
      if (data && socket?.connected) {
        socket.emit("sendRefundMessage", data);
      } else {
        socket.connect();
        // //console.log("check if socket is connected");

        await socket.emit("sendRefundMessage", data);
      }
    } catch (e) {
      ////console.log(e);
    }
  };
  const readNotification = async (data) => {
    try {
      if (data) {
        ////console.log("notification read event", data);
        await socket.emit("notificationRead", { notificationId: data });
      }
    } catch (e) {
      ////console.log(e);
    }
  };
  const clearNotifications = async (data) => {
    try {
      if (data) {
        ////console.log("clear notifications", data);
        await socket.emit("clearNotifications", { notificationIds: data });
      }
    } catch (e) {
      ////console.log(e);
    }
  };

  return {
    sendMessage,
    readNotification,
    clearNotifications,
    sendMessageInRefundChat,
  };
};
export const socketMiddleware = (store) => (next) => (action) => {
  ////console.log(action.type, "check type of action");

  if (action.type === "REHYDRATE") {
    return next(action); // Skip middleware logic on rehydration
  } else {
    if (action.type === "connect") {
      const socket = getSocket(); // Dynamically get the socket instance
      if (!socket?.connected) {
        socket.connect();
      }

      socket.on("connect", () => {
        store.dispatch(socketConnected());
      });
      if (socket?.connected) {
        socket.on("notifyMessage", (message) => {
          // ////console.log("test messages", message);

          try {
            store.dispatch(receiveMessage(message));
          } catch (error) {
            ////console.log(error);
          }
        });
        socket.on("newRefundMessage", (message) => {
          // console.log("response of new socket msg", message);

          try {
            store.dispatch(receiveRefundChatMessage(message));
          } catch (error) {
            ////console.log(error);
          }
        });
        //trigger on socket connect
        socket.on("unReadNotifications", (notifications) => {
          try {
            ////console.log("unReadNotifications", notifications);

            store.dispatch(getAllNotifications(notifications));
          } catch (error) {
            ////console.log(error);
          }
        });
        //trigger on socket single event
        socket.on("newNotification", (data) => {
          try {
            ////console.log("newNotification", data);
            store.dispatch(newNotification(data));
          } catch (error) {
            ////console.log(error);
          }
        });
      }
      // Add more listeners as needed
    }

    if (action.type === "user/logout") {
      const socket = getSocket(); // Dynamically get the socket instance
      // //console.log("disconnect socket");
      socket.disconnect();
    }

    return next(action);
  }
};
