import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  Divider,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import EmailIcon from "@mui/icons-material/Email";
import Chat from "./Chat";
import ProfilePicture from "./../globalComponents/ProfilePicture";
import { Mousewheel, Pagination } from "swiper/modules";
import { setSelectedChat } from "../../features/slice/socketSlice";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import {
  setConversations,
  setSelectedConversation,
} from "../../features/slice/Chat/conversationsSlice";
import useFetch from "../../features/hooks/useFetch";
function Messages({ mblFlag, setMblFlag, windowSize, selectedChat }) {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { fetchData } = useFetch();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { conversations } = useSelector((state) => state.conversations);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [conversations]);
  function formatDate(isoDate) {
    const date = new Date(isoDate); // Convert the ISO string to a Date object
    const options = { year: "numeric", month: "short", day: "numeric" }; // Format options
    return date.toLocaleDateString("en-US", options); // Format the date
  }

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: windowSize > 850 ? "545px" : "100%",
        height: "calc(100vh-145px)",
        // overflow: "hidden",
        padding: "18px",
        display:
          mblFlag && selectedChat !== null
            ? "none"
            : !selectedChat && mblFlag
            ? "block"
            : "block",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailIcon sx={{ ml: 1, marginRight: "10px", my: "15px" }} />
          <Typography
            variant="h5"
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              flexGrow: 1,
            }}
          >
            Messages
          </Typography>
        </Box>
        <Chat />
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Divider />
        <Box
          sx={{
            width: "100%",
            height: "calc(100% - 56px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
            },
          }}
          ref={scrollRef}
        >
          {/* <CssBaseline /> */}
          <Box sx={{ padding: "0px" }}>
            <Swiper
              direction={"vertical"}
              slidesPerView={6}
              mousewheel={true}
              pagination={{
                clickable: true,
              }}
              modules={[Mousewheel, Pagination]}
              className="messageSwiper"
              style={{
                height: "80vh",
              }}
            >
              {conversations?.map((message, index) => (
                <SwiperSlide key={index}>
                  <Card
                    sx={{
                      backgroundColor:
                        selectedMessage === message ? "#32333310" : "white",
                      // backgroundColor: "lightgreen",
                      color: message.read ? "text.secondary" : "action.active",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "none",
                      padding: "1rem 1.5rem",
                      borderRadius: "12px",
                      width: "100%",
                    }}
                    key={index}
                    onClick={() => {
                      setSelectedMessage(message);
                      dispatch(setSelectedChat({ selectedChat: message }));
                      // dispatch(setSelectedChat({ selectedChat: message }));
                      fetchData(
                        `/api/chat/${message?.chatId}`,
                        undefined,
                        (res) => {
                          if (res) {
                            // console.log(res, "from messagse");

                            dispatch(
                              setSelectedConversation({ data: res?.data })
                            );
                          }
                        }
                      );
                      setMblFlag(windowSize < 850 ? true : null);

                      let updatedConversations = conversations?.map(
                        (conversation) => {
                          return conversation?.chatId === message?.chatId
                            ? {
                                ...conversation,
                                isSent: true,
                              }
                            : conversation;
                        }
                      );

                      dispatch(
                        setConversations({ data: updatedConversations })
                      );
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Badge
                        color={"error"}
                        sx={{
                          "& .MuiBadge-colorError": {
                            background:
                              message?.isSent === false &&
                              message.senderEmail !== user.email
                                ? "red"
                                : "transparent",
                          },
                        }}
                        variant="dot"
                      >
                        <ProfilePicture
                          src={message?.user?.profilePic}
                          firstName={message?.user?.firstName}
                        />
                      </Badge>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "start",
                          flexDirection: "column",
                        }}
                      >
                        {/* <Badge
                              color="secondary"
                              variant={message.read ? "standard" : "dot"}
                              sx={{ ml: 1, mb: 0.5 }}
                            /> */}
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "22px",
                            color: "#333",
                          }}
                        >
                          {message?.user?.firstName +
                            " " +
                            message?.user?.lastName}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "18px",
                            color: "#333",
                          }}
                        >
                          {message?.content?.length > 20
                            ? message?.content.substr(0, 20) + "..."
                            : message?.content}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "14px",
                          color: "#333",
                        }}
                      >
                        {formatDate(message.createdAt)}
                      </Typography>
                      <IconButton sx={{ width: "28px", height: "28px" }}>
                        <MoreHorizRoundedIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default Messages;
