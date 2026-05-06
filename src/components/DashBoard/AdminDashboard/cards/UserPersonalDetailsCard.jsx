import {
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ImageComp from "../../../globalComponents/ImageComp";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import DropDownIcons from "../../../../assets/DropDown.png";
import ProfilePicture from "../../../globalComponents/ProfilePicture";

const UserPersonalDetailsCard = ({ Users, handleStatus }) => {
  return (
    <>
      <Typography
        component={"span"}
        variant="h2"
        sx={{
          padding: "10px 0px",
        }}
      >
        User personal details
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>
                <ProfilePicture
                  src={Users && Users.profilePic ? Users.profilePic : ""}
                  firstName={Users.firstName}
                  lastName={Users.lastName}
                />
              </TableCell>
              <TableCell>
                <Typography
                  component={"span"}
                  variant="h5"
                  sx={{ marginBottom: "10px", display: "block" }}
                >
                  Name
                </Typography>
                <Typography variant="h5BlackBold">
                  {Users ? Users.firstName + " " + Users.lastName : ""}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  component={"span"}
                  variant="h5"
                  sx={{ marginBottom: "10px", display: "block" }}
                >
                  Email
                </Typography>
                <Typography variant="h5BlackBold">
                  {Users ? Users.email : ""}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  component={"span"}
                  variant="h5"
                  sx={{ marginBottom: "10px", display: "block" }}
                >
                  Status
                </Typography>
                <Typography variant="h5BlackBold">
                  {" "}
                  {Users ? (Users.isBlocked ? "Block" : "active") : ""}
                </Typography>
              </TableCell>
              {/* this is clear icon */}
              <TableCell>
                <PopupState
                  variant="popover"
                  popupId="demo-popup-menu"
                  component={"span"}
                >
                  {(popupState) => (
                    <React.Fragment>
                      <IconButton
                        variant="contained"
                        {...bindTrigger(popupState)}
                      >
                        <img src={DropDownIcons} alt=" " />
                      </IconButton>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem
                          onClick={(e) => {
                            const data = {
                              userEmail: Users.email,
                              isBlocked: true,
                            };
                            handleStatus(data);
                          }}
                        >
                          Block
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            const data = {
                              userEmail: Users.email,
                              isBlocked: false,
                            };
                            handleStatus(data);
                          }}
                        >
                          UnBlock
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserPersonalDetailsCard;
