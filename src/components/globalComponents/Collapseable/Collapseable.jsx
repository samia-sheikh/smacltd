import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { AccountCircle } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/slice/userSlice";
import { googleLogout } from "@react-oauth/google";

export default function Collapseable({ onClose }) {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleClick = () => {
    setOpen(!open);
  };
  const linkStyles = {
    color: "#868686",
    fontSize: "16px",
    textDecoration: "none",
  };

  // logout user
  const handleMobileSignOut = () => {
    dispatch(logout());
    googleLogout();
  };
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", marginTop: "-10px" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: "47px !important" }}>
          <AccountCircle sx={{ ml: "9px" }} />
        </ListItemIcon>
        <ListItemText primary="Me" />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <hr style={{ background: "#F1F1F1", opacity: "0.5" }} />
        <List component="div">
          <ListItemButton sx={{ ml: 13 }}>
            <NavLink style={linkStyles} to={"profile-user"}>
              Profile
            </NavLink>
          </ListItemButton>
          {/* <NavLink style={linkStyles} to={"profile-user"}> */}
          {user?.role === "admin" ? (
            <ListItemButton sx={{ ml: 13, my: 10 }}>
              <NavLink
                style={linkStyles}
                onClick={onClose}
                to={"admin/dashboard"}
              >
                Admin Dashboard
              </NavLink>
            </ListItemButton>
          ) : null}
          {/* </NavLink> */}
          <ListItemButton sx={{ ml: 13, my: 10 }}>
            <NavLink style={linkStyles} to={`user/dashboard/${user?.email}`}>
              Dashboard
            </NavLink>
          </ListItemButton>
          <ListItemButton sx={{ ml: 13, my: 10 }}>
            <NavLink style={linkStyles}>Settings</NavLink>
          </ListItemButton>
          <hr style={{ background: "#F1F1F1", opacity: "0.5" }} />
          <ListItemButton sx={{ ml: 13 }}>
            <NavLink style={linkStyles} onClick={handleMobileSignOut}>
              Signout
            </NavLink>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
