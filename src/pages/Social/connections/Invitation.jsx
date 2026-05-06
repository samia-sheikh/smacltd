import React, { useEffect, useState } from "react";
// import Layout from "../../../components/globalComponents/Layout/Layout";
import {
  Box,
  Button,
  useMediaQuery,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import moment from "moment";
import useFetch from "../../../features/hooks/useFetch";
import theme from "../../../theme";
const Invitation = () => {
  const { patchData, fetchData } = useFetch();
  const [invitationsUser, setInvitationsUser] = useState(null);

  const [follow, setFollow] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)"); // Define your breakpoint for mobile
  // get follow requests
  const getFollowRequests = async () => {
    fetchData("/api/user/connection/request", undefined, (res) => {
      // //console.log(res,"ress");
      setInvitationsUser(res?.data);
    });
  };

  //accept the follow request
  const acceptRequest = (inv) => {
    let keys = {
      email: inv?.user.email,
      status: "accepted",
    };
    patchData(
      `/api/user/connection/${inv?.followerId}`,
      keys,
      undefined,
      (res) => {
        // //console.log(res,"invitation");
        setFollow(res.data);
      },
      undefined
    );
  };

  //reject the follow request
  const handleIgnore = (inv) => {
    let keys = {
      email: inv?.user.email,
      status: "rejected",
    };
    patchData(
      `/api/user/connection/${inv?.followerId}`,
      keys,
      undefined,
      (res) => {
        setFollow(res.data);
      },
      undefined
    );
  };

  useEffect(() => {
    getFollowRequests();
  }, [follow]);
  const messages = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
            padding:"8px",
          }
         }}>
          {invitationsUser?.map((invitation) => {
            return (
              <Box sx={messages} key={invitation.user.email}>
                <Box sx={{
                    width:"100%",
                  }}> 
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={invitation?.user.profilePic}></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        invitation?.user.firstName +
                        " " +
                        invitation?.user.lastName
                      }
                      secondary={moment(invitation?.createdAt).fromNow()}
                    />
                  </ListItem>
                </Box>

                <Box sx={{ display: "flex",
                 [theme.breakpoints.down("sm")]:{
                  justifyContent:"end",
                  width:"100%",
                }
                 }}>
                  <Button
                    sx={{
                      height: "40px",
                      width: "90px",
                      ...buttonsquery,
                      ...buttons,
                    }}
                    onClick={() => handleIgnore(invitation)}
                  >
                    Reject
                  </Button>
                  <Button
                    sx={{
                      border: "1px solid teal",
                      height: "40px",
                      width: "90px",
                      ...buttonsquery,
                      ...buttons,
                    }}
                    onClick={() => acceptRequest(invitation)}
                  >
                    Accept
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
export default Invitation;
