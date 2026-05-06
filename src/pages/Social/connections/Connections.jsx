import React, { useEffect } from "react";
import Layout from "../../../components/globalComponents/Layout/Layout";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Followers from "./Followers";
import Following from "./Following";
import Invitation from "./Invitation";
import useFetch from "../../../features/hooks/useFetch";
import { useDispatch } from "react-redux";
import {
  setFollowers,
  setFollowing,
} from "../../../features/slice/followSlice";
import { useLocation, useNavigate } from "react-router-dom";
// import ProfilePicture from "../../../components/globalComponents/ProfilePicture";
function formatString(str) {
  return str.trim().replace(/\s+/g, "-");
}
//multistate tabs labels
const tabLabels = ["Followers", "Following", "Invitations"];

const labelToIndex = tabLabels.reduce((acc, label, index) => {
  acc[formatString(label)] = index.toString();
  return acc;
}, {});
const Connections = () => {
  const { fetchData } = useFetch("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(() => {
    const query = new URLSearchParams(location.search).get("tab");
    return labelToIndex[query] ?? "0";
  });
  const handleChange = (event, newValue) => {
    // setValue(newValue);
    getFollowers();
    getFollowing();
    const label = tabLabels[parseInt(newValue)];
    const queryURL = formatString(label);
    setValue(newValue);
    //add params for

    navigate(`?tab=${queryURL}`);
  };

  const tabStyles = {
    width: "100%",
    maxWidth: "213px",
    minHeight: "38px",
  };

  // here i am getting the Followers data from API and storing it in state using useFetch hook

  const getFollowers = async () => {
    fetchData("/api/user/connection/follower", undefined, (res) => {
      // setShowFollowers(res?.data);
      dispatch(setFollowers(res));
    });
  };
  // here i am getting the Following data from API and storing it in state using useFetch hook

  const getFollowing = async () => {
    fetchData("/api/user/connection/following", undefined, (res) => {
      dispatch(setFollowing(res));
      // getAllPosts();
    });
  };
  // yahan nechay useeffect mein dono function ko  call is liya kiya hy kio k handleChange py to state change ho jay gie agar vo apko remove krta hy to magar jb page ko refresh  krta hy to state  nhii hoti is liya refresh  krne par useffect call ho jayega
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("tab");
    if (query && labelToIndex[query] !== value) {
      setValue(labelToIndex[query]);
    }
  }, [location.search, value]);
  useEffect(() => {
    getFollowers();
    getFollowing();
  }, []);

  return (
    <Layout title={"Your Social Network | SMAC"}>
      {/*  */}
      {/*Followers or Cards section */}
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
                padding: "1.5rem .5rem",
              }}
            >
              <TabList
                onChange={handleChange}
                sx={{
                  "& span": {
                    position: "block",
                    display: "none",
                    height: "0px",
                  },
                  borderRadius: "12px",
                  background: "white",
                  width: "100%",
                  maxWidth: "665px",
                  padding: "4px 9px",
                  // border: "1px solid black",
                  border: "1px solid #86868650",
                  height: "48px",
                }}
              >
                <Tab
                  label={"Followers"}
                  value="0"
                  sx={{ marginRight: "6px", ...tabStyles }}
                />
                <Tab label={"Following"} value="1" sx={tabStyles} />
                <Tab label={"Invitations"} value="2" sx={tabStyles} />
              </TabList>
            </Box>
            <TabPanel value="0">
              <Box>
                <Followers />
              </Box>
            </TabPanel>
            <TabPanel value="1">
              <Following />
            </TabPanel>
            <TabPanel value="2">
              <Invitation />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Layout>
  );
};

export default Connections;
