import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import theme from "./../../theme";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useSocket } from "../../Socket/socketMiddleware";
import {
  setImageToPreview,
  setRefundMessages,
} from "../../features/slice/Chat/refundChatSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useImagePreview } from "../../features/hooks/useImagePreview";
import useFetch from "../../features/hooks/useFetch";
import ImageComp from "../globalComponents/ImageComp";
import ViewImageModel from "../globalComponents/Modals/ViewImageModel";

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
function RefundChatSection() {
  const dispatch = useDispatch();
  const { sendMessageInRefundChat } = useSocket();
  const { loading, postData } = useFetch();
  const { refundTicket } = useSelector((state) => state.refundTicket);
  const { refundMessages } = useSelector((state) => state.refundChat);
  const { user } = useSelector((state) => state.user);
  const { refundChatMessage } = useSelector((state) => state.socket);
  const inputRef = React.useRef(null);
  const lastMessageRef = useRef();
  const selectedUserRef = useRef();
  const [open, setOpen] = React.useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [postPic, setPostPic] = useState(null);
  const postPicPreview = useImagePreview(postPic);

  const handleFileChange = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage) {
      setPostPic(selectedImage);
      // //console.log("post text: ", text);
    } else {
      console.log("Please select the image again");
    }
  };
  const handleMessageSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (postPic) {
        let imageContent = {
          "images[]": postPic,
        };
        postData(
          "/api/refundchat/upload",
          imageContent,
          undefined,
          undefined,
          true,
          (res) => {
            setPostPic(null);
            let images = res?.data;
            // let msgContent = "[";
            // for (let i = 0; i < images.length; i++) {
            //   if (i === images.length - 1) {
            //     msgContent += `"${images[i]}"`;
            //   } else {
            //     msgContent += `"${images[i]}"` + ",";
            //   }
            // }
            // msgContent += "]";
            const messageData = {
              msgContent: JSON.stringify(images),
              room: refundTicket?.chatId,
              msgType: "image_url",
            };

            sendMessageInRefundChat(messageData);
            setMessageContent("");
            setPostPic(null);
          },
          false //notification closed
        );
      } else {
        const messageData = {
          msgContent: messageContent,
          room: refundTicket?.chatId,
          msgType: "text",
        };
        sendMessageInRefundChat(messageData);
        setMessageContent("");
      }
    },
    [messageContent, refundTicket, sendMessageInRefundChat]
  );
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
  const handleMessageChange = useCallback(
    (e) => {
      e.preventDefault();
      setMessageContent(e.target.value);
    },
    [messageContent]
  );
  useEffect(() => {
    if (refundChatMessage?.messageId) {
      dispatch(
        setRefundMessages({
          data: [...refundMessages, refundChatMessage],
        })
      );
    }
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (selectedUserRef.current) {
        window.scrollTo({ bottom: 0, behavior: "smooth" });
      }
    }, 100);
  }, [refundChatMessage]);
  useEffect(() => {
    return () => {
      setPostPic(null);
      dispatch(setImageToPreview({ data: null }));
    };
  }, []);

  const HeaderWrapperComponent = () => {
    return (
      <HeaderWrapper>
        <Box sx={{ padding: "0px 0px 0px", display: "flex" }}>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "20px",
                fontWeight: "bold",
                ml: "8px",
              },
            }}
            primary={"Chat Support"}
          />
        </Box>
      </HeaderWrapper>
    );
  };
  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: "100%",
          padding:
            " 0 clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem) clamp(1.75rem, 3.579vw - 0.545rem, 3.75rem) clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem)",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh-145px)",
        }}
      >
        {" "}
        <div ref={selectedUserRef} style={{ position: "relative" }}>
          <HeaderWrapperComponent />
          <Divider />

          <MessageArea>
            {refundMessages?.map((selectedMessage, index) => {
              const currentMessageDate = new Date(
                selectedMessage?.createdAt
              ).toDateString();
              const previousMessageDate =
                index > 0
                  ? new Date(
                      refundMessages[index - 1]?.createdAt
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
                      alignItems:
                        user?.email === selectedMessage?.sender?.email
                          ? "flex-end"
                          : "flex-start",
                      justifyContent:
                        user?.email === selectedMessage?.sender?.email
                          ? "flex-end"
                          : "flex-start",
                      flexDirection:
                        user?.email === selectedMessage?.sender?.email
                          ? "row"
                          : "column",
                    }}
                  >
                    <Bubble
                      issender={
                        user?.email === selectedMessage?.sender?.email
                          ? true
                          : false
                      }
                    >
                      {user?.email === selectedMessage?.sender?.email ? null : (
                        <Typography
                          variant="h6"
                          sx={{
                            textTransform: "capitalize",
                          }}
                        >
                          {selectedMessage?.sender?.firstName +
                            " " +
                            selectedMessage?.sender?.lastName}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          gap:
                            user?.email === selectedMessage?.sender?.email
                              ? "8px"
                              : "0px",
                          flexDirection:
                            user?.email === selectedMessage?.sender?.email
                              ? "row"
                              : "column",
                          alignItems:
                            user?.email === selectedMessage?.sender?.email
                              ? "center"
                              : "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        {selectedMessage.contentType === "image_url" ? (
                          <>
                            {JSON.parse(selectedMessage.content).map(
                              (image, index) => {
                                return (
                                  <ImageComp
                                    onClick={() => {
                                      dispatch(
                                        setImageToPreview({ data: image })
                                      );
                                      setOpen(true);
                                    }}
                                    key={index}
                                    src={image}
                                    sx={{
                                      borderRadius: "8px",
                                      height: "200px",
                                      width: "160px",
                                      margin: "8px 0",
                                    }}
                                  />
                                );
                              }
                            )}
                          </>
                        ) : (
                          <Typography
                            sx={{
                              wordBreak: "break-all",
                            }}
                          >
                            {selectedMessage?.content}
                          </Typography>
                        )}
                        <Time
                          issender={
                            user?.email === selectedMessage?.sender?.email
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
          {postPicPreview && (
            <div style={{ position: "absolute", bottom: 52 }}>
              <Box sx={{ position: "relative", paddingTop: "24px" }}>
                <IconButton
                  onClick={() => setPostPic(null)}
                  sx={{
                    color: "black",
                    marginBottom: "20px",
                    width: "1.25rem",
                    height: "1.25rem",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  <CloseIcon sx={{ width: "1.25rem" }} />
                </IconButton>
                <ImageComp
                  onClick={() => {
                    setOpen(true);
                  }}
                  src={postPicPreview}
                  sx={{
                    height: "200px",
                    width: "160px",
                    mt: "12px",
                  }}
                />
              </Box>
            </div>
          )}
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
                    onChange={(e) => handleMessageChange(e)}
                    value={messageContent}
                    disabled={refundTicket?.status !== "Pending"}
                  />
                  <div>
                    <input
                      ref={inputRef}
                      type="file"
                      name="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="postImg-upload"
                      onChange={handleFileChange}
                      disabled={refundTicket?.status !== "Pending"}
                    />
                    <IconButton
                      onClick={() =>
                        inputRef.current && inputRef.current.click()
                      }
                      sx={{
                        width: "16px",
                        height: "16px",
                        position: "absolute",
                        right: 12,
                        top: 16,
                      }}
                    >
                      <AttachFileIcon />
                    </IconButton>
                  </div>
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
                disabled={
                  (messageContent.length < 1 && !postPicPreview) || loading
                }
              >
                <SendRoundedIcon />
              </Button>
            </form>
          </div>
        </div>
      </Card>
      <ViewImageModel open={open} setOpen={setOpen} />
    </>
  );
}

export default RefundChatSection;
