import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  // TableCell,
  TableContainer,
  // TableHead,
  // TableRow,
  Divider,
  Box,
  // Menu,
  MenuItem,
  // IconButton,
  Typography,
  Button,
  Grow,
  Popper,
  MenuList,
  Paper,
  ClickAwayListener,
  // Stack,
} from "@mui/material";
import useGetAPI from "../../../../features/hooks/useGetAPI";
// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import useFetch from "../../../../features/hooks/useFetch";
import DashBoardSearchInputField from "../../../../components/DashBoard/DashBoardSearchInputField/DashBoardSearchInputField";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardUser } from "../../../../features/slice/DashBoardProductsSlice";
import TuneIcon from "@mui/icons-material/Tune";
// import ImageComp from "../../../../components/globalComponents/ImageComp";
import UserCard from "../../../../components/DashBoard/AdminDashboard/cards/UserCard";
import UserPersonalDetailsCard from "../../../../components/DashBoard/AdminDashboard/cards/UserPersonalDetailsCard";

const DashboardUser = () => {
  const [showUser, setShowUser] = useState([]);
  const { getData } = useGetAPI();
  // const [filter, setFilter] = useState("All"); // State to manage the filter
  const { putData } = useFetch();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  // getting the user from the Redux....
  const Users = useSelector(
    (state) => state.DashBoardProductsSlice.dashBoarduser
  );
  const handleStatus = (dataPerformAction) => {
    let setNewUser;
    // //console.log(dataPerformAction, "dataPerformAction to Perform Action");
    putData("/api/admin/user", dataPerformAction, undefined, (res) => {
      // //console.log(res,"resssssss after update");
      setNewUser = showUser.map((user) => {
        // //console.log(user.email !== res.data.email,"maix");
        return user.email !== res.data.email ? user : res.data;
      });
      // //console.log(setNewUser, "resssssss");
      setShowUser(setNewUser);
      dispatch(setDashboardUser(res.data));
    });
  };

  //function to get all users
  const getAllUsers = () => {
    getData("/api/admin/user", (res) => {
      setShowUser(res.data || []);
      dispatch(setDashboardUser(null));
      setOpen(false);
      // //console.log(res?.data, "all");
    });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const getActiveUsers = (e) => {
    getData("/api/admin/user?isBlocked=false", (res) => {
      setShowUser(res.data || []);
      dispatch(setDashboardUser(null));
      // //console.log(res?.data, "active");
    });
    handleClose(e);
  };
  const getBlockedUsers = (e) => {
    getData("/api/admin/user?isBlocked=true", (res) => {
      setShowUser(res.data || []);
      dispatch(setDashboardUser(null));
      // //console.log(res?.data, "blocked");
    });
    handleClose(e);
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // here i'm fetching the data.....

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "15px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          margin: "10px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component={"span"}
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Users
        </Typography>
        <Box>
          <Button
            ref={anchorRef}
            id="composition-button"
            // aria-controls={open ? "composition-menu" : undefined}
            // aria-expanded={open ? "true" : undefined}
            // aria-haspopup="true"
            onClick={handleToggle}
          >
            <TuneIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            sx={{ zIndex: "100" }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={getAllUsers}>All users</MenuItem>
                      <MenuItem onClick={getActiveUsers}>Active Users</MenuItem>
                      <MenuItem onClick={getBlockedUsers}>
                        Blocked Users
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      </Box>
      <Divider
        sx={{
          width: "100%",
        }}
      />
      <Box
        sx={{
          margin: "10px 0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DashBoardSearchInputField url="api/admin/user" />
      </Box>{" "}
      {Users && Users ? (
        <UserPersonalDetailsCard Users={Users} handleStatus={handleStatus} />
      ) : (
        <TableContainer>
          <Table>
            <TableBody>
              {showUser.map((userDetails, index) => (
                <UserCard
                  userDetails={userDetails}
                  key={index}
                  handleStatus={handleStatus}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
export default DashboardUser;
