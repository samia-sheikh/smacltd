import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Divider } from "@mui/material";
import ProductParentCategory from "./ProductCategories/ProductParentCategory";
import ProductSubCategories from "./ProductCategories/ProductSubCategories";
import CourseParentCategory from "./CourseCategories/CourseParentCategory";
import CourseSubCategories from "./CourseCategories/CourseSubCategories";
import PostTags from "./PostTags/PostTags";
import ServiceParentCategories from "./ServiceCategories/ServiceParentCategories";
import ServiceSubCategories from "./ServiceCategories/ServiceSubCategories";

function formatString(str) {
  return str.trim().replace(/\s+/g, "-");
}
//multistate tabs labels
const tabLabels = ["Product", "Course"];

const labelToIndex = tabLabels.reduce((acc, label, index) => {
  acc[formatString(label)] = index.toString();
  return acc;
}, {});

const ProfileUpdate = () => {
  const [value, setValue] = React.useState("0");
  const [productCategory, setProductCategory] = React.useState(true);
  const [courseCategory, setCourseCategory] = React.useState(true);
  const[serviceCategory,setServiceCategory]=React.useState(true)

  // tabs on change event handler
  const handleChange = (event, newValue) => {
    setValue(newValue);

    setProductCategory(true);
    setCourseCategory(true);
    setServiceCategory(true)
    //add params for
  };

  let tabStyles = {
    borderBottom: "none",
    textDecoration: "none",
    fontSize: "14px",

    width: "100%",
    maxWidth: "213px",
    minHeight: "40px",
    marginRight: "6px",
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              width: "100%",

              background: "white",

              padding: "10px",

              "@media (max-width:650px)": {
                overflowX: "scroll",
                "::-webkit-scrollbar": {
                  height: "5px",
                  background: "transparent",
                },
              },
            }}
          >
            <Box>
              <TabList
                onChange={handleChange}
                // centered
                sx={{
                  "& span": {
                    position: "block",
                    display: "none",
                    height: "0px",
                  },
                }}
              >
                <Tab label="Product" value="0" sx={tabStyles} />
                <Tab label="Course" value="1" sx={tabStyles} />
                <Tab label="Services" value="2" sx={tabStyles} />
                <Tab label="Post Tags" value="3" sx={tabStyles} />
              </TabList>
            </Box>
          </Box>
          <Divider
            sx={{
              width: "100%",
            }}
          />
          <Box sx={{ width: "100%", background: "white" }}>
            <TabPanel value="0" sx={{}}>
              {productCategory ? (
                <ProductParentCategory
                  setProductCategory={setProductCategory}
                />
              ) : (
                <ProductSubCategories setProductCategory={setProductCategory} />
              )}
            </TabPanel>
            <TabPanel value="1">
              {" "}
              {courseCategory ? (
                <CourseParentCategory setCourseCategory={setCourseCategory} />
              ) : (
                <CourseSubCategories setCourseCategory={setCourseCategory} />
              )}
            </TabPanel>
            <TabPanel value="2">
              {" "}
              {serviceCategory ? (
                <ServiceParentCategories setServiceCategory={setServiceCategory} />
              ) : (
                <ServiceSubCategories setServiceCategory={setServiceCategory} />
              )}
            </TabPanel>
            {/* <TabPanel value="2">Services</TabPanel> */}
            <TabPanel value="3">
              <PostTags />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ProfileUpdate;
