import React, { useState } from "react";
import { Box, Tab, useMediaQuery } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import Layout from "../../components/globalComponents/Layout/Layout";
import SearchedUsers from "./Users/SearchedUsers";
import SearchedPosts from "./Posts/SearchedPosts";
import SearchedProducts from "./Products/SearchedProducts";
import SearchedCourses from "./Courses/SearchedCourses";
import SearchedServices from "./Services/SearchedServices";

const GlobalSearch = () => {
  const [value, setValue] = useState("1");
  //change tab value
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const matches = useMediaQuery("(min-width:900px)");

  return (
    <Layout title={"Search | SMAC"}>
      {/*  */}
      {/*Followers or Cards section */}
      <Box
        sx={{
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
            <Box sx={{ margin: "50px 0px" }}>
              <TabList
                onChange={handleChange}
                orientation={matches ? "horizontal" : "vertical"}
                centered={matches ? true : false}
                sx={{
                  "& span": {
                    position: "block",
                    display: "none",
                    height: "0px",
                  },
                  textAlign: "start",
                }}
              >
                {/* tab buttons? */}
                <Tab label={"People"} value="1" />
                <Tab label={"Posts"} value="2" />
                <Tab label={"Products"} value="3" />
                <Tab label={"Courses"} value="4" />
                <Tab label={"Services"} value="5" />
              </TabList>
            </Box>
            <Box sx={{ width: "100%", background: "white", minHeight: "80vh" }}>
              <TabPanel value="1">
                <SearchedUsers />
              </TabPanel>
              <TabPanel value="2">
                <SearchedPosts />
              </TabPanel>
              <TabPanel value="3">
                <SearchedProducts />
              </TabPanel>
              <TabPanel value="4">
                <SearchedCourses />
              </TabPanel>
              <TabPanel value="5">
                <SearchedServices />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Box>
    </Layout>
  );
};

export default GlobalSearch;
