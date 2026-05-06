import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import AddCourse from "../../Courses/Modals/Add Course/AddCourses";
import ButtonComp from "../../globalComponents/ButtonComp";
import AddIcon from "@mui/icons-material/Add";
import MyServices from "./ServicesTabs/MyServices";
import PurchasedServices from "./ServicesTabs/PurchasedServices";
import AddService from "../../Services/AddService";
import useFetch from "../../../features/hooks/useFetch";
import { useDispatch } from "react-redux";
import { setServiceParentCategories } from "../../../features/slice/categoriesSlice";

const UserServices = () => {
  const [value, setValue] = React.useState("0");
  const [newService, setNewService] = useState("");
  const { fetchData } = useFetch();
  let dispatch = useDispatch();
  // here i am getting the parent categories of Services.....
  const getServicesCategories = () => {
    fetchData("/api/service/parent", undefined, (res) => {
      if (res) {
        dispatch(setServiceParentCategories({ data: res?.data }));
      }
    });
  };

  const [serviceOpen, setServiceOpen] = useState(false);
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

  useEffect(() => {
    getServicesCategories();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      <AddService
        addNewUserService={setNewService}
        open={serviceOpen}
        setOpen={setServiceOpen}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px 20px 24px 20px",
        }}
      >
        <Typography variant="userDashboardHeading">Services</Typography>
        <Box sx={{ width: "100%", maxWidth: "160px" }}>
          <ButtonComp
            icon={<AddIcon />}
            label="Add Services"
            click={() => {
              setServiceOpen(!serviceOpen);
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
                  ".css-heg063-MuiTabs-flexContainer": {
                    justifyContent: "space-around",
                  },
                  borderRadius: "12px",
                  background: "white",
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
                <Tab label="My Services" value="0" sx={tabStyles} />
                <Tab label="Purchased Services" value="1" sx={tabStyles} />
              </TabList>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              background: "white",
              padding: "0px",
              "& .iidJLy": {
                padding: "0px",
              },
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
              <MyServices servicesData={newService} />
            </TabPanel>
            <TabPanel value="1">
              <PurchasedServices />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};

export default UserServices;
