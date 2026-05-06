import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import ChatBox from "./ChatBox";
import { Box, Typography } from "@mui/material";
import useFetch from "../../features/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "./../../features/hooks/useInnerWidth";
import { setSelectedChat } from "../../features/slice/socketSlice";
import {
  setConversations,
  setSelectedConversation,
} from "../../features/slice/Chat/conversationsSlice";
// import { MessagingIcon } from "./globalComponents/constants";
import Chat from "./Chat";
import { MessagingIcon } from "../globalComponents/constants";

function Main() {
  const [mblFlag, setMblFlag] = useState(false);
  const { selectedChat, isNewChat } = useSelector(
    (state) => state.selectedChat
  );
  const { selectedConversation } = useSelector((state) => state.conversations);
  // Handler to call on window resize
  const dispatch = useDispatch();
  const { fetchData } = useFetch();

  const getAllChatConversations = async () => {
    await fetchData("/api/chat", undefined, (res) => {
      if (res) {
        dispatch(setConversations({ data: res?.data }));
      }
    });
  };
  const { width } = useWindowSize();

  useEffect(() => {
    getAllChatConversations();
  }, [isNewChat]); // Empty array ensures that effect is only run on mount
  useEffect(() => {
    if (width < 850) {
      setMblFlag(true);
    } else {
      setMblFlag(false);
    }
  }, [width]);
  useEffect(() => {
    return () => {
      dispatch(setSelectedChat({ selectedChat: null }));
      dispatch(setSelectedConversation({ data: null }));
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          mt: "30px",
        }}
      >
        <Messages
          mblFlag={mblFlag}
          setMblFlag={setMblFlag}
          windowSize={width}
          selectedChat={selectedChat}
        />
        {selectedConversation && selectedChat ? (
          <ChatBox
            windowSize={width}
            mblFlag={mblFlag}
            setMblFlag={setMblFlag}
          />
        ) : (
          <>
            {" "}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
              }}
            >
              <MessagingIcon size={"3em"} />
              <Typography variant="h5">Your messages</Typography>
              <Typography variant="paragraph">
                Send a message to start a conversation
              </Typography>
              <Chat />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default Main;
