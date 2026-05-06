import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Layout from "./Layout/Layout";
import { navlinks } from "../data";
import ProfileDropdown from "../../pages/user/ProfileDropdown";
import SideNav from "./Modals/SideNav/SideNav";
import ImageComp from "./ImageComp";
import useFetch from "../../features/hooks/useFetch";
import smacLogo from "../../assets/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";

import {
  setUsers,
  setPosts,
  setProducts,
  setCourses,
  setSearchValue,
  setServices,
} from "../../features/slice/globalSearchSlice.js";
import NotificationsDrawer from "./NotificationsDrawer.jsx";
import { FaAngleDown } from "react-icons/fa6";
import MarketMegaMenu from "../MegaMenus/MarketMegaMenu.jsx";
// import theme from "../../theme.js";
import CoursesMegaMenu from "../MegaMenus/CoursesMegaMenu.jsx";
import SearchInput from "./global_inputs/SearchInput.jsx";
import ServicesMegaMenu from "../MegaMenus/ServicesMegaMenu.jsx";
export default function Header() {
  const { allNotifications } = useSelector((state) => state.socket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [inputWidth, setInputWidth] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth <= 1000);
  const { fetchData } = useFetch();
  const { user } = useSelector((state) => state.user);

  const handleGlobalSearch = (event) => {
    event.preventDefault();
    try {
      fetchData(
        `/api/search?searchQuery=${event.target.value}`,
        undefined,
        (res) => {
          if (res) {
            dispatch(setSearchValue({ data: event.target.value }));
            dispatch(setUsers({ data: res?.data?.users }));
            dispatch(setPosts({ data: res?.data?.posts }));
            dispatch(setProducts({ data: res?.data?.products }));
            dispatch(setCourses({ data: res?.data?.courses }));
            dispatch(setServices({ data: res?.data?.services }));
            navigate(`/search?searchQuery=${event.target.value}`);
          }
        }
      );

      // fetchData()
    } catch (error) {
      ////console.log(error);
    }
  };
  useEffect(() => {
    // ////console.log(user, "checkuser");

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  useEffect(() => {
    dispatch({ type: "connect" });
    ////console.log("check connect");
  }, []);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      sx={{
        padding: "0px !important",
        margin: "0px",
        marginTop: "3rem",
      }}
    >
      <ProfileDropdown onClose={handleMenuClose} />
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}
      sx={{
        padding: "0px !important",
        margin: "0px",
        marginTop: "3rem",
      }}
    ></Menu>
  );

  return (
    <Box
      sx={{
        // flexGrow: 1,
        background: "white",
        maxHeight: "80px",
        minHeight: "65px",
        position: "sticky",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "999",
      }}
    >
      <Layout extra={{ alignItems: "center" }}>
        <AppBar
          position="static"
          sx={{
            background: "white",
            boxShadow: "0",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "120px",
                  minWidth: "90px",
                  height: "max-content",
                }}
                component={Link}
                to={user ? "/feed" : "/"}
              >
                <ImageComp
                  src={smacLogo}
                  alt={"smac logo"}
                  styles={{ width: "100%" }}
                ></ImageComp>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                }}
              >
                <MarketMegaMenu />
                <CoursesMegaMenu />
                <ServicesMegaMenu />
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Box
                sx={{
                  width: inputWidth ? "500px" : "15vw",
                  maxWidth: "clamp(195px,30vw,500px)",
                  transition: "width 0.3s ease",
                }}
              >
                {/* Search */}
                <SearchInput
                  display={true}
                  onChange={handleGlobalSearch}
                  area
                  setInputWidth={setInputWidth}
                />
              </Box>
              {isLargeScreen && <SideNav />}

              <Box
                sx={{
                  display: { sm: "none", xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                {navlinks.map((item) => (
                  <IconButton
                    key={item.id}
                    size="small"
                    color="inherit"
                    component={Link}
                    to={item.url || "/"}
                    sx={{
                      padding: "0",
                      height: "45px",
                      "&:hover": {
                        color: "#14B8A6",
                        // borderBottom: "1px solid #14B8A6",
                        background: "transparent",
                        // fill: theme.palette.primary.main,
                      },
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "0px",
                      gap: "2px",
                      fontSize: "14px !important",

                      color:
                        location.pathname === item.url ? "#14B8A6" : "inherit",
                      "&:focus": {
                        color: "#14B8A6",

                        background: "transparent",
                      },
                    }}
                  >
                    <>{item.linkIcon}</>
                    {/* <Typography variant="body1">{item.linkName}</Typography> */}
                  </IconButton>
                ))}
                <NotificationsDrawer allNotifications={allNotifications} />

                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "flex",
                      lg: "flex",
                      xl: "flex",
                    },

                    "&:hover": {
                      color: "#14B8A6",
                      // borderBottom: "1px solid #14B8A6",
                      background: "transparent",
                      // fill: theme.palette.primary.main,
                    },

                    borderRadius: "0px",
                    // gap: "6px",
                    fontSize: "14px !important",
                  }}
                >
                  <Box>
                    {user?.profilePic ? (
                      <ImageComp
                        alt="profileImg"
                        sx={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          "&:hover": { width: "50px" },
                        }}
                        src={user.profilePic}
                      />
                    ) : (
                      <AccountCircle />
                    )}
                  </Box>
                  <Box>
                    <FaAngleDown />
                  </Box>
                </IconButton>
              </Box>
            </Box>
            {renderMobileMenu}
            {renderMenu}
          </Toolbar>
        </AppBar>
      </Layout>
    </Box>
  );
}

// <main>
//   {/* Start Mega Menu HTML */}
//   <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-dark shadow">
//     <div className="container-fluid">
//       <div className="collapse navbar-collapse" id="navbar-content">
//         <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
//           <li className="nav-item dropdown dropdown-mega position-static">
//             <a
//               className="nav-link dropdown-toggle"
//               href="#"
//               data-bs-toggle="dropdown"
//               data-bs-auto-close="outside"
//             >
//               Megamenu
//             </a>
//             <div className="dropdown-menu shadow">
//               <div className="mega-content px-4">
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-12 col-sm-4 col-md-3 py-4">
//                       <h5>Pages</h5>
//                       <div className="list-group">
//                         <a className="list-group-item" href="#">
//                           Accomodations
//                         </a>
//                         <a className="list-group-item" href="#">
//                           Terms &amp; Conditions
//                         </a>
//                         <a className="list-group-item" href="#">
//                           Privacy
//                         </a>
//                       </div>
//                     </div>
//                     <div className="col-12 col-sm-4 col-md-3 py-4">
//                       <h5>Card</h5>
//                       <div className="card">
//                         <img
//                           src="img/banner-image.jpg"
//                           className="img-fluid"
//                           alt="image"
//                         />
//                         <div className="card-body">
//                           <p className="card-text">
//                             Some quick example text to build on the card
//                             title and make up the bulk of the card's
//                             content.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-12 col-sm-4 col-md-3 py-4">
//                       <h5>About CodeHim</h5>
//                       <p>
//                         <b>CodeHim</b> is one of the BEST developer websites
//                         that provide web designers and developers with a
//                         simple way to preview and download a variety of free
//                         code &amp; scripts.
//                       </p>
//                     </div>
//                     <div className="col-12 col-sm-12 col-md-3 py-4">
//                       <h5>Damn, so many</h5>
//                       <div className="list-group">
//                         <a className="list-group-item" href="#">
//                           Accomodations
//                         </a>
//                         <a className="list-group-item" href="#">
//                           Terms &amp; Conditions
//                         </a>
//                         <a className="list-group-item" href="#">
//                           Privacy
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </nav>
//   {/* END Mega Menu HTML */}
// </main>
