import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "./../../theme";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../features/hooks/useFetch";
import ProfilePicture from "../globalComponents/ProfilePicture";
// import { useSocketContext } from "./../../features/hooks/useSocket";
import { setSelectedChat } from "../../features/slice/socketSlice";
import {
  setConversations,
  setSelectedConversation,
} from "../../features/slice/Chat/conversationsSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSocket } from "../../Socket/socketMiddleware";

const MessageArea = styled.div`
  height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Time = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "issender",
})`
  font-family: Open Sans;
  font-size: 10px;
  font-weight: 400;
  line-height: 13.62px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin: 2px;
  color: ${({ issender }) => (issender ? "#ffffff" : "#b7b7b7")};
`;

const HeaderWrapper = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Bubble = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "issender",
})`
  max-width: 60%;
  padding: 6px 16px;
  border-radius: 1rem;
  background-color: ${({ issender }) =>
    issender ? theme.palette.primary.main : "#F4F4F4"};
  color: ${({ issender }) => (issender ? "#ffffff" : "#000000")};
  margin: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;
const ChatInput = styled.input`
  background: #f5f5f5;
  width: 100%;
  padding: 8px 20px 8px 16px;
  border-radius: 28px;
  height: 48px;
  border: none;

  &:focus {
    outline: none; /* Removes default outline */
    border: 1px solid #14a898;
  }

  &:active {
    border: none; /* Ensures no border appears on active state */
  }
`;
// align-self: ${({ issender }) => (issender ? "flex-end" : "flex-start")};
function ChatBox({ windowSize, mblFlag, setMblFlag }) {
  const { selectedChat } = useSelector((state) => state.selectedChat);
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversations
  );
  const { messages } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  // const { socket } = useSocketContext();
  const { user } = useSelector((state) => state.user);
  const lastMessageRef = useRef();
  const selectedUserRef = useRef();
  const { fetchData } = useFetch();
  const { sendMessage } = useSocket();
  const [messageContent, setMessageContent] = useState("");
  const handleMessageSubmit = (e) => {
    // e.preventDefault();
    e.preventDefault(); // Prevent the default form submission behavior
    let messageData = {
      content: messageContent,
      chatId: selectedChat?.chatId,
    };

    sendMessage(messageData);
    setMessageContent("");
  };

  const getAllChatOfThisConversation = async () => {
    await fetchData(`/api/chat/${selectedChat?.chatId}`, undefined, (res) => {
      if (res) {
        dispatch(setSelectedConversation({ data: res?.data }));
      }
    });
  };
  function convertToHoursAndMinutes(dateString) {
    // Create a Date object from the ISO string
    const date = new Date(dateString);

    // Extract hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes as a string with leading zeros if necessary
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return formattedTime;
  }
  useEffect(() => {
    getAllChatOfThisConversation();
  }, [selectedChat]);

  useEffect(() => {
    if (messages[0]?.chatId === selectedChat?.chatId) {
      dispatch(
        setSelectedConversation({
          data: [...selectedConversation, ...messages],
        })
      );
      let updatedConversations = conversations?.map((conversation, i) => {
        return conversation?.chatId === messages[0]?.chatId
          ? {
              ...conversation,
              content: messages[0].content,
              index: 0,
              isSent: true,
            }
          : { ...conversation, index: i + 1 };
      });
      updatedConversations = updatedConversations.sort(
        ({ index: a }, { index: b }) => a - b
      );

      dispatch(setConversations({ data: updatedConversations }));
    } else {
      let updatedConversations = conversations?.map((conversation) => {
        return conversation?.chatId === messages[0]?.chatId
          ? {
              ...conversation,
              content: messages[0].content,
              isSent: false,
            }
          : conversation;
      });

      dispatch(setConversations({ data: updatedConversations }));
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (selectedUserRef.current) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
    setShowPicker(false);
    // setMessageContent("");
  }, [selectedConversation, selectedChat]);
  const handleClick = () => {
    setMblFlag(false);
    dispatch(setSelectedChat({ selectedChat: null }));
  };
  const [showPicker, setShowPicker] = useState(false);
  const onEmojiClick = (emojiObject) => {
    let emoji = emojiObject.emoji;

    // Append the emoji to the current content value
    // let updatedContent = messageContent + emoji;

    // Update Formik's state
    setMessageContent((pre) => pre + emoji);
    // updatedContent = "";
    // emoji = "";
  };
  const handleCommentChange = (e) => {
    e.preventDefault();
    let values = e.target.value;
    setMessageContent(values);
  };
  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: "100%",
          padding:
            " 0 clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem) clamp(1.75rem, 3.579vw - 0.545rem, 3.75rem) clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem)",
          display:
            mblFlag && selectedChat ? "block" : selectedChat ? "block" : "none",
          flexDirection: "column",
          height: "calc(100vh-145px)",
        }}
        onClick={() => {
          if (showPicker) {
            setShowPicker(false);
          }
        }}
      >
        {" "}
        <div ref={selectedUserRef} style={{ position: "relative" }}>
          <HeaderWrapper>
            {windowSize < 850 ? (
              <ArrowBackIosIcon
                onClick={handleClick}
                sx={{ cursor: "pointer" }}
              />
            ) : null}

            <Box sx={{ padding: "0px 0px 0px", display: "flex" }}>
              <ProfilePicture
                firstName={selectedChat?.user?.firstName}
                src={selectedChat?.user?.profilePic}
                sx={{ height: "42px", width: "42px" }}
                innerBox={{ height: "33.8px", width: "33.8px" }}
              />

              <ListItemText
                primaryTypographyProps={{
                  sx: { fontSize: "20px", fontWeight: "bold", ml: "8px" },
                }}
                primary={selectedChat?.user?.firstName}
              />
            </Box>

            <Tooltip title={"Delete conversation"}>
              <IconButton>
                <FaRegTrashAlt color="#Fa8072" size={"0.75em"} />
              </IconButton>
            </Tooltip>
          </HeaderWrapper>
          <Divider />

          <MessageArea onClick={() => setShowPicker(false)}>
            {selectedConversation?.map((selectedMessage, index) => {
              const currentMessageDate = new Date(
                selectedMessage?.createdAt
              ).toDateString();
              const previousMessageDate =
                index > 0
                  ? new Date(
                      selectedConversation[index - 1]?.createdAt
                    ).toDateString()
                  : null;

              const showDivider = currentMessageDate !== previousMessageDate;

              return (
                <div key={index}>
                  {/* Divider if the day changes between messages */}
                  {showDivider && (
                    <div
                      style={{
                        textAlign: "center",
                        margin: "16px 0",
                        fontSize: "0.85rem",
                        color: "#999",
                      }}
                    >
                      {currentMessageDate}
                    </div>
                  )}

                  {/* Message */}
                  <div
                    ref={lastMessageRef}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        user?.email === selectedMessage?.senderEmail
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    {user?.email === selectedMessage?.senderEmail ? null : (
                      <ProfilePicture
                        firstName={selectedChat?.user?.firstName}
                        src={selectedChat?.user?.profilePic}
                        sx={{ height: "32px", width: "32px" }}
                        innerBox={{ height: "25px", width: "25px" }}
                        font={{ fontSize: "0.75rem" }}
                      />
                    )}

                    <Bubble
                      issender={
                        user?.email === selectedMessage?.senderEmail
                          ? true
                          : false
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap:
                            user?.email === selectedMessage?.senderEmail
                              ? "8px"
                              : "0px",
                          flexDirection:
                            user?.email === selectedMessage?.senderEmail
                              ? "row"
                              : "column",
                          alignItems:
                            user?.email === selectedMessage?.senderEmail
                              ? "center"
                              : "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            wordBreak: "break-all",
                          }}
                        >
                          {selectedMessage?.content}
                        </Typography>
                        <Time
                          issender={
                            user?.email === selectedMessage?.senderEmail
                              ? true
                              : false
                          }
                        >
                          {convertToHoursAndMinutes(selectedMessage?.createdAt)}
                        </Time>
                      </Box>
                    </Bubble>
                  </div>
                </div>
              );
            })}
          </MessageArea>
          <div style={{ position: "absolute", bottom: 52 }}>
            {showPicker && (
              <Picker
                lazyLoadEmojis={true}
                // theme="dark"
                pickerStyle={{
                  width: "100%",
                }}
                onEmojiClick={onEmojiClick}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "sticky",
              bottom: 0,
              height: "36px",
            }}
          >
            <form
              style={{ width: "100%", display: "flex" }}
              onSubmit={handleMessageSubmit}
            >
              <Box
                sx={{
                  padding: "0",
                  width: "100%",
                  display: "flex",
                  position: "relative",
                  gap: "16px",
                }}
              >
                <Box
                  sx={{
                    padding: "0",
                    width: "100%",
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <ChatInput
                    placeholder="Write a message"
                    onChange={(e) => handleCommentChange(e)}
                    value={messageContent}
                  />
                  <img
                    alt="Emoji"
                    style={{
                      width: "16px",
                      height: "16px",
                      position: "absolute",
                      right: 12,
                      top: 16,
                    }}
                    className="emoji-icon"
                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                    onClick={() => setShowPicker((val) => !val)}
                  />
                </Box>
              </Box>{" "}
              <Button
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  display: "flex",
                  width: "max-content",

                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  },
                }}
                type="submit"
              >
                <SendRoundedIcon />
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ChatBox;
