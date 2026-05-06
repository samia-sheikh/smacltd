import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import UserCourses from "./CourseTabs/UserCourses";
import PurchasedCourses from "./CourseTabs/PurchasedCourses";
import AddCourse from "../../Courses/Modals/Add Course/AddCourses";
import ButtonComp from "../../globalComponents/ButtonComp";
import AddIcon from "@mui/icons-material/Add";

const MyCourses = () => {
  const [value, setValue] = React.useState("0");
  const [newCourse, setNewCourse] = useState("");
  // const [courseList, setCourseList] = useState([]);

  const [courseOpen, setCourseOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    //add params for
  };

  let tabStyles = {
    borderBottom: "none",
    textDecoration: "none",
    fontSize: "14px",
    width: "100%",
    maxWidth: "213px",
    minHeight: "40px",
    // marginRight: "6px",
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      <AddCourse
        addNewCourse={setNewCourse}
        open={courseOpen}
        setOpen={setCourseOpen}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px 20px 24px 20px",
        }}
      >
        <Typography variant="userDashboardHeading">Courses</Typography>
        <Box sx={{ width: "100%", maxWidth: "160px" }}>
          <ButtonComp
            icon={<AddIcon />}
            label="Add Course"
            click={() => {
              setCourseOpen(!courseOpen);
            }}
          ></ButtonComp>
        </Box>
      </Box>
      <Divider />
      <Box>
        <TabContext value={value}>
          <Box
            sx={{
              width: "100%",
              marginTop: "35px",
              // padding: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TabList
                onChange={handleChange}
                // centered
                sx={{
                  "& .css-k008qs": {
                    display: "flex",

                    justifyContent: "space-around",
                  },
                  "& .css-heg063-MuiTabs-flexContainer": {
                    justifyContent: "space-around",
                  },

                  borderRadius: "12px",
                  // background: "white",
                  width: "100%",
                  maxWidth: "450.53px",
                  padding: "4px 0px",
                  // border: "1px solid black",
                  border: "1px solid #86868650",
                  height: "48px",
                  "& span": {
                    position: "block",
                    display: "none",
                    height: "0px",
                  },
                }}
              >
                <Tab label="My Courses" value="0" sx={tabStyles} />
                <Tab label="Purchased Courses" value="1" sx={tabStyles} />
              </TabList>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              background: "white",
              padding: "0px",
              "& .css-14kxxez": {
                // backgroundColor:"red",
                padding: "0px",
              },
              "& .css-qp7u5o": {
                padding: "0px",
              },
            }}
          >
            <TabPanel value="0">
              <UserCourses courseData={newCourse} />
            </TabPanel>
            <TabPanel value="1">
              <PurchasedCourses />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};

export default MyCourses;
