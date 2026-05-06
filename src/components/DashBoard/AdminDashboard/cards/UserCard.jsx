import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import DropDownIcons from "../../../../assets/DropDown.png";
import ProfilePicture from "../../../globalComponents/ProfilePicture";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserCard = ({ userDetails, handleStatus }) => {
  //console.log(userDetails,"userDetails");
  const Users = useSelector((state) => state.user?.user);
  //console.log(Users,"usersss");
  const naviagte = useNavigate();
  const handleNavigate = () => {
    //console.log("handleClick");
    if (Users?.email === userDetails?.email) {
      naviagte("/profile-user");
    } else {
      naviagte(`/user/${userDetails?.id}`);
    }
  };
  return (
    <TableRow>
      <TableCell onClick={handleNavigate}>
        <ProfilePicture
          src={
            userDetails && userDetails.profilePic ? userDetails.profilePic : ""
          }
          firstName={userDetails.firstName}
          lastName={userDetails.lastName}
        />
      </TableCell>
      <TableCell>
        <Typography>Name</Typography>{" "}
        <Typography variant="h5BlackBold">
          {userDetails.firstName + " " + userDetails.lastName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>Email</Typography>
        <Typography variant="h5BlackBold">{userDetails.email}</Typography>
      </TableCell>
      <TableCell
        onClick={() => {
          //console.log(userDetails, "Detailsss");
        }}
      >
        <Typography>Status</Typography>
        <Typography variant="h5BlackBold">
          {userDetails.isBlocked ? "Blocked" : "Active"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>Actions</Typography>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <IconButton variant="contained" {...bindTrigger(popupState)}>
                <img src={DropDownIcons} alt=" " />
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                {userDetails.isBlocked ? (
                  <MenuItem
                    onClick={(e) => {
                      const data = {
                        userEmail: userDetails.email,
                        isBlocked: false,
                      };
                      handleStatus(data);
                    }}
                  >
                    UnBlock
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={(e) => {
                      const data = {
                        userEmail: userDetails.email,
                        isBlocked: true,
                      };
                      handleStatus(data);
                    }}
                  >
                    Block
                  </MenuItem>
                )}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </TableCell>
    </TableRow>
  );
};

export default UserCard;
