import React, { useEffect } from "react";
import Layout from "../../components/globalComponents/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import ProfilePicture from "../../components/globalComponents/ProfilePicture";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSocket } from "../../Socket/socketMiddleware";
import { getAllNotifications } from "../../Socket/socketActions";
import useFetch from "../../features/hooks/useFetch";
import { setNotifications } from "../../features/slice/Social/notificationsSlice";
const AllNotifications = () => {
  const { readNotification } = useSocket();
  const dispatch = useDispatch();
  const { fetchData } = useFetch();
  const { allNotifications } = useSelector((state) => state.socket);
  const { notifications } = useSelector((state) => state.notificatations);
  // function to mark a notification read
  function markMessageAsRead(messages, idToFind) {
    return messages.map((message) => {
      // Check if the current message matches the given id
      if (message.id === idToFind) {
        // Set isRead to true
        return {
          ...message,
          isRead: true,
        };
      }
      // Return the message unchanged if it's not the target
      return message;
    });
  }
  const handleReadNotification = (e, notification) => {
    try {
      readNotification(notification.id);
      // this is for all messages
      const updatedMessages = markMessageAsRead(notifications, notification.id);
      dispatch(setNotifications(updatedMessages));
      let afterDelete = allNotifications.filter(
        (item) => item.id !== notification.id
      );

      dispatch(getAllNotifications(afterDelete));
    } catch (error) {
      //console.log(error);
    }
    e.stopPropagation();
  };
  const getAllNotificationsFunction = async () => {
    await fetchData("/api/user/notifications", undefined, (res) => {
      // setFilteredProducts(res?.data);
      dispatch(setNotifications(res.data));
      //console.log(res);
    });
  };
  const handleClick = (event) => {
    // //console.log(event, "event child Clicked");
    event.stopPropagation();
  };
  useEffect(() => {
    getAllNotificationsFunction();
  }, []);
  return (
    <Layout>
      {notifications?.length > 0 ? (
        <>
          <Typography variant="h2">All Notifications</Typography>
          <List>
            {notifications?.map((notification, index) => (
              <ListItem
                key={index}
                onClick={(e) => handleReadNotification(e, notification)}
                sx={{
                  background: notification?.isRead ? "white" : "#32333310",
                  marginBottom: "12px",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",

                    width: "100%",
                  }}
                >
                  <Box>
                    {/* <ImageComp
                  src={"assets/photos/profile.png"}
                  alt={"story_image"}
                  sx={{
                    borderRadius: "50%",
                    height: "61px",
                    width: "61px",
                    backgroundSize: "cover",
                  }}
                /> */}
                    <ProfilePicture
                      src={notification?.sender?.profilePic}
                      firstName={notification?.sender?.firstName}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "200px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {/* add user details */}
                    <Typography
                      variant="postUserTypo"
                      sx={{ fontSize: "16px" }}
                    >
                      {notification?.sender?.firstName +
                        " " +
                        notification?.sender?.lastName}
                    </Typography>
                    <Typography variant="subHeader" sx={{ fontSize: "14px" }}>
                      {notification?.message}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",

                    width: "100%",
                    maxWidth: "160px",
                  }}
                >
                  <Typography variant="subHeader" sx={{ fontSize: "14px" }}>
                    {moment
                      .utc(notification.createdAt)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </Typography>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    // aria-controls={open ? "long-menu" : undefined}
                    // aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e)}
                    sx={{
                      isolation: "isolate",
                      // mixBlendMode:"difference",
                      color: "white",
                      backgroundColor: "black",
                      filter: "invert(1)",
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            padding: "1.5rem 0 0 0",
            color: "#868686",
          }}
        >
          No Notifications to show
        </Typography>
      )}
    </Layout>
  );
};

export default AllNotifications;
