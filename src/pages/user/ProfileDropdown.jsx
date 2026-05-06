import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/slice/userSlice";
import { googleLogout } from "@react-oauth/google";

import ProfilePicture from "../../components/globalComponents/ProfilePicture";
import { CustomNavLink } from "../../components/styledComponents";

const ProfileDropdown = ({ onClose }) => {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !token) {
      dispatch(logout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storyProfileStyles = {
    backgroundSize: "cover",
    objectFit: "cover",
    borderRadius: "50%",
    padding: "5px",
    width: "70px",
    height: "70px",
    verticalAlign: "middle",
    zIndex: 999,
    position: "relative",
    top: "35px",
    left: "40%",
  };

  const handleSignOut = () => {
    dispatch(logout());
    googleLogout();
    onClose();
  };

  return (
    <Box
      sx={{
        width: "379px",
        // height:"466px"
      }}
    >
      {user ? (
        <>
          <Box
            sx={{
              backgroundImage: `url(${user.coverPic})`,
              height: "86.8px",
              backgroundSize: "cover",
              marginBottom: "30px",
              margin: "5px 10px 10px 10px",
              borderRadius: "16px",
            }}
          >
            <ProfilePicture
              src={user.profilePic}
              firstName={user.firstName}
              sx={storyProfileStyles}
              innerBox={{
                height: "58px",
                width: "58px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "14px",
              gap: "14px",
              padding: "10px",
            }}
          >
            <Typography
              variant="postUserTypo"
              sx={{ textTransform: "capitalize", wordBreak: "break-all" }}
            >
              {user?.firstName?.substring(0, 10) +
                "  " +
                user?.lastName?.substring(0, 10)}
            </Typography>
            <Typography variant="addStoryTypo">{user?.email}</Typography>
          </Box>
          <hr style={{ background: "#F1F1F1", opacity: "0.5" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0px 20px",
              // gap: "",
            }}
          >
            <CustomNavLink to={"profile-user"} onClick={onClose}>
              Profile
            </CustomNavLink>
            <CustomNavLink
              onClick={onClose}
              to={"connections"}
              className="nav-links"
            >
              Connections
            </CustomNavLink>
            <CustomNavLink
              onClick={onClose}
              to={"messaging"}
              className="nav-links"
            >
              Chat
            </CustomNavLink>
            {user?.role === "admin" ? (
              <CustomNavLink onClick={onClose} to={"admin/dashboard"}>
                Admin Dashboard
              </CustomNavLink>
            ) : (
              <CustomNavLink
                onClick={onClose}
                to={`user/dashboard/${user?.email}`}
              >
                Dashboard
              </CustomNavLink>
            )}

            <CustomNavLink
              onClick={onClose}
              to={"settings"}
              className="nav-links"
            >
              Settings
            </CustomNavLink>
          </Box>
          <hr style={{ background: "#F1F1F1", opacity: "0.5" }} />
          <Box
            sx={{
              padding: "10px 20px",
            }}
          >
            <Box
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "#868686",
                padding: "0px 10px",
                borderRadius: "5px",
                "&:hover": { color: "#099E8E" },
              }}
              onClick={handleSignOut}
            >
              Signout
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 20px",
              gap: "15px",
            }}
          >
            <CustomNavLink to={"signin"} onClick={onClose}>
              SignIn
            </CustomNavLink>
          </Box>
          <Box
            sx={{
              padding: "10px 20px",
            }}
          >
            <CustomNavLink to={"signup"} onClick={onClose}>
              SignUp
            </CustomNavLink>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProfileDropdown;
