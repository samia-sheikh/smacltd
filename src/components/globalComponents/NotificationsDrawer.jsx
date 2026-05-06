import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import ImageComp from "./ImageComp";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoIosNotifications } from "react-icons/io";
import { Badge, IconButton, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ProfilePicture from "./ProfilePicture";
import moment from "moment";
import { useSocket } from "../../Socket/socketMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../../Socket/socketActions";
import ButtonComp from "./ButtonComp";
import { useNavigate } from "react-router-dom";

export default function NotificationsDrawer({ isMobile }) {
  const { allNotifications } = useSelector((state) => state.socket);
  const navigate = useNavigate();
  const { readNotification, clearNotifications } = useSocket();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const handleClick = (event) => {
    // //console.log(event, "event child Clicked");
    event.stopPropagation();
  };
  const handleReadNotification = (e, notification) => {
    readNotification(notification.id);
    let afterDelete = allNotifications.filter(
      (item) => item.id !== notification.id
    );
    dispatch(getAllNotifications(afterDelete));
    navigate("/messaging");
    e.stopPropagation();
  };
  const handleClearAll = (e) => {
    let ids = [];
    for (let index = 0; index < allNotifications.length; index++) {
      ids.push(allNotifications[index].id);
    }
    //console.log(ids);

    clearNotifications(ids);
    dispatch(getAllNotifications([]));
    e.stopPropagation();
  };
  const toggleDrawer = (anchor, open) => (event) => {
    event.stopPropagation();
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        borderTopLeftRadius: "16px",
        // position: "absolute",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          borderBottom: "1px solid #F1F1F1",
          paddingTop: "24px",
          position: "sticky",
          top: 0, //temporary top added
          backgroundColor: "white",
          zIndex: 999,
          height: "10%",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", width: "100%" }}>
          Notifications
        </Typography>
      </Box>

      <List
        sx={{
          height: "83%",
          overflow: "hidden",
          overflowY: "scroll",
          width: "95%",
        }}
      >
        {allNotifications?.map((notification, index) => (
          <ListItem
            key={index}
            onClick={(e) => handleReadNotification(e, notification)}
            sx={{
              background: "#32333310",
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
                <Typography variant="postUserTypo" sx={{ fontSize: "16px" }}>
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
              }}
            >
              <Typography
                variant="subHeader"
                sx={{ fontSize: "14px", wordBreak: "break-all" }}
              >
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

      <Box
        sx={{
          height: "7%",
          position: "sticky",
          width: "95%",
          bottom: 0, //temporary top added
          display: "flex",
          gap: "16px",
        }}
      >
        <ButtonComp
          label={"View all"}
          customStyles={{ height: "max-content" }}
          click={() => {
            navigate("/notifications");
          }}
        />
        <ButtonComp
          label={"Read all"}
          customStyles={{ height: "max-content" }}
          click={(e) => handleClearAll(e)}
        />
      </Box>
    </Box>
  );
  const drawerStyles = {
    top: "4rem !important",
    bottom: "1rem !important",
    height: "calc(100vh - 80px)", // Ensure auto height
    width: "clamp(320px,100vw,400px)",
    borderLeft: "1px solid #B6B6B650",
    borderBottom: "1px solid #B6B6B650",
    borderTop: "1px solid #B6B6B650",
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    position: "absolute",
    boxShadow: "-4px 3px 6px 0px #B6B6B650",
  };
  let anchor = "right";
  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        size="small"
        edge="end"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={toggleDrawer(anchor, true)}
        color="inherit"
        sx={{
          height: "55px",
          "&:hover": {
            color: "#14B8A6",
            // borderBottom: "1px solid #14B8A6",
            background: "transparent",
            // fill: theme.palette.primary.main,
          },
          display: "flex",
          flexDirection: "column",
          borderRadius: "0px",
          gap: "0px",
          margin: "0px 0px 0px 0px",
        }}
      >
        <Badge
          color={"error"}
          badgeContent={allNotifications?.length}
          sx={{
            "& .MuiBadge-colorError": {
              background: allNotifications?.length > 0 ? "red" : "transparent",
            },
          }}
        >
          <IoIosNotifications
            size={"1.5em"}
            color={isMobile ? "#757575" : ""}
          />
          {isMobile && (
            <Typography
              variant="body1"
              sx={{ marginLeft: "12px", color: "#757575" }}
            >
              Notifications
            </Typography>
          )}
        </Badge>
        {/* 
        <Typography variant="body2" sx={{ fontSize: "16px" }}>
          Notifications
        </Typography> */}
      </IconButton>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        sx={{
          boxShadow: "none",
          "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
            // background:"yellow",
            // position:"relative"
            backgroundColor: "transparent",
          },
          "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
            ...drawerStyles,
            // position: "fixed",
          },
          // these two classe are for live website do not change there if u see the height bug on local ".css-1ab2xsx"
          "& .css-1ab2xsx": {
            ...drawerStyles,
          },
          "& .css-919eu4": {
            background: "transparent",
          },
        }}
      >
        {list(anchor)}
      </Drawer>
    </Box>
  );
}
