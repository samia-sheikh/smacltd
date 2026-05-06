import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { IconButton, Typography } from "@mui/material";
import { megaMenus } from "../../../data";
import Layout from "../../Layout/Layout";
import SearchInput from "../../global_inputs/SearchInput";
import Collapseable from "../../Collapseable/Collapseable";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import NotificationsDrawer from "../../NotificationsDrawer";
import useFetch from "../../../../features/hooks/useFetch";
import {
  setUsers,
  setPosts,
  setProducts,
  setCourses,
  setSearchValue,
  setServices,
} from "../../../../features/slice/globalSearchSlice";
import { useDispatch } from "react-redux";
export default function SideNav() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchData } = useFetch();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleItemClick = (item) => {
    navigate(item.url || "/");
  };
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
            setOpen(false);
          }
        }
      );

      // fetchData()
    } catch (error) {
      ////console.log(error);
    }
  };
  const DrawerList = (
    <Layout>
      <Box sx={{ marginTop: "20px", marginLeft: "15px" }}>
        {/* <SearchInput show="show" width="width" /> */}
        <SearchInput
          display={false}
          show="show"
          onChange={handleGlobalSearch}
          area
        />
      </Box>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          {/* here i use the  mega menu data to
           render the menu items and never use the 
           navlink because we want to show the navlink just only main screen  */}

          {megaMenus.map((item, index) => (
            <IconButton
              key={index}
              onClick={() => handleItemClick(item)}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "0px",
                gap: "10px",
                fontSize: "16px !important",
              }}
            >
              <ListItemButton>
                <>{item.linkIcon}</>
                <Typography variant="body1" sx={{ marginLeft: "15px" }}>
                  {item.linkName}
                </Typography>
              </ListItemButton>
            </IconButton>
          ))}
          <ListItemButton>
            <NotificationsDrawer isMobile={true} />
          </ListItemButton>
        </List>
        {/* <List>
          {navlinks.map((item, index) => (
            <IconButton
              key={index}
              onClick={() => handleItemClick(item)}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "0px",
                gap: "10px",
                fontSize: "16px !important",
              }}
            >
              <ListItemButton>
                <>{item.linkIcon}</>
                <Typography variant="body1" sx={{ marginLeft: "15px" }}>
                  {item.linkName}
                </Typography>
              </ListItemButton>
            </IconButton>
          ))}
        </List> */}
      </Box>
      <Collapseable />
    </Layout>
  );
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <RxHamburgerMenu />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
