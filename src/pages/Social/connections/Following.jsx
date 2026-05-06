import {
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import useFetch from "../../../features/hooks/useFetch";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { setFollowing } from "../../../features/slice/followSlice";
import moment from "moment";
import theme from "../../../theme";

const Following = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Define your breakpoint for mobile

  const { deleteData } = useFetch();
  let dispatch = useDispatch();
  const { following } = useSelector((state) => state.follow);

  const handleUnfollow = async (follower) => {
    // //console.log(follower, "follower");
    await deleteData(
      `/api/user/connection/following/${follower?.followingEmail}`,
      () => {
        //this filter is used to render  the followings without refreshing the page
        let filteredFollowers = following.filter((data) => {
          return data !== follower;
        });
        let obj = { data: filteredFollowers };
        dispatch(setFollowing(obj));
        // setFollowingData(filteredFollowers);
      }
    );
  };

  const messages = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: isMobile ? "column" : "row", // Adjust direction for mobile",
    background: "#fff",
    width: "100%",
    [theme.breakpoints.down("sm")]:{
      flexDirection: "row"
    } 
  };

  const buttonsquery = {
    marginRight: isMobile ? 0 : 1, // Adjust margin for mobile
  };

  const buttons = {
    fontSize: isMobile ? "0.5rem" : "0.8rem", // Adjust font size for mobile
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            width: "100%",
            borderRadius: "16px",
          }}
        >
         <Box sx={{ padding: "40px",
          [theme.breakpoints.down("sm")]:{
            padding:"8px"
          }
         }}>
            {following?.map((follower) => {
              return (
                <Box sx={messages} key={follower.user.email}>
                  <Box sx={{
                    width:"100%",
                  }}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={follower?.user.profilePic}></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          follower?.user.firstName +
                          " " +
                          follower?.user.lastName
                        }
                        secondary={moment(follower?.createdAt).fromNow()}
                      />
                    </ListItem>
                  </Box>

                  <Box sx={{ display: "flex", [theme.breakpoints.down("sm")]:{
            justifyContent:"end"
          } }}>
                    <Button
                      sx={{
                        height: "40px",
                        width: "90px",
                        border: "1px solid teal",
                        ...buttonsquery,
                        ...buttons,
                      }}
                      onClick={() => handleUnfollow(follower)}
                    >
                      Unfollow
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Following;
