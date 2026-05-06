import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import useFetch from "../../features/hooks/useFetch";
import { useNavigate } from "react-router-dom";

const SingleSearchedUserCard = ({ item }) => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Define your breakpoint for mobile
  const { pendingAndFollowers } = useSelector((state) => state.follow);
  const { user } = useSelector((state) => state.user);
  let [isFollower, setIsFollower] = useState(false);
  const navigate = useNavigate();
  const { deleteData, postData } = useFetch();
  const checkFollower = () => {
    let follower = pendingAndFollowers?.find(
      (follower) => follower?.followingEmail === item.email
    );
    if (follower) {
      if (follower.status === "accepted") {
        setIsFollower(true);
      } else if (follower.status === "pending") {
        setIsFollower("pending");
      }
    } else {
      setIsFollower(false);
    }
  };

  // const handleFollow = async (item) => {};
  const handleUnfollow = async (email) => {
    try {
      await deleteData(`/api/user/connection/following/${email}`, (res) => {
        ////console.log("Unfollow request sent");
        setIsFollower(false);
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
  useEffect(() => {
    checkFollower();
    // getAllFollowers();
  }, []);
  const messages = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: isMobile ? "column" : "row", // Adjust direction for mobile",
    background: "#fff",
    width: "100%",
  };

  const buttonsquery = {
    marginRight: isMobile ? 0 : 1, // Adjust margin for mobile
  };

  const buttons = {
    fontSize: isMobile ? "0.5rem" : "0.8rem", // Adjust font size for mobile
  };
  return (
    <Box sx={messages} key={item.email}>
      <Box>
        <ListItem
          onClick={() => {
            if (user?.email === item?.email) {
              navigate(`/profile-user`);
            } else {
              navigate(`/user/${item?.id}`);
            }
          }}
          sx={{ cursor: "pointer" }}
        >
          <ListItemAvatar>
            <Avatar src={item.profilePic}></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item?.firstName + " " + item?.lastName}
            secondary={
              item?.userDetail?.country ? item?.userDetail?.country : "China"
            }
          />
        </ListItem>
      </Box>

      {user?.email === item.email ? (
        <Button
          sx={{
            border: "1px solid teal",
            height: "40px",
            width: "90px",
            ...buttonsquery,
            ...buttons,
          }}
          onClick={() => {
            navigate("/profile-user");
          }}
        >
          <Typography>View</Typography>
        </Button>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              height: "40px",
              width: "90px",
              ...buttonsquery,
              ...buttons,
            }}
          >
            Message
          </Button>
          <>
            {isFollower === "pending" ? (
              <Button
                sx={{
                  border: "1px solid teal",
                  height: "40px",
                  width: "90px",
                  ...buttonsquery,
                  ...buttons,
                }}
                onClick={() => {
                  handleUnfollow(item.email);
                }}
              >
                <Typography>Pending</Typography>
              </Button>
            ) : isFollower === true ? (
              <Button
                sx={{
                  border: "1px solid teal",
                  height: "40px",
                  width: "90px",
                  ...buttonsquery,
                  ...buttons,
                }}
                onClick={() => {
                  handleUnfollow(item.email);
                }}
              >
                <Typography>Unfollow</Typography>
              </Button>
            ) : isFollower === false ? (
              <Button
                sx={{
                  border: "1px solid teal",
                  height: "40px",
                  width: "90px",
                  ...buttonsquery,
                  ...buttons,
                }}
                onClick={() => {
                  let toFollow = {
                    followingEmail: item.email,
                  };
                  try {
                    postData(
                      "/api/user/connection",
                      toFollow,
                      undefined,
                      undefined,
                      undefined,
                      (res) => {
                        setIsFollower("pending");
                        // getAllFollowers()
                      }
                    );
                  } catch (error) {
                    console.error("Error following user:", error);
                  }
                }}
              >
                <Typography>Follow</Typography>
              </Button>
            ) : null}
          </>
        </Box>
      )}
    </Box>
  );
};

export default SingleSearchedUserCard;
