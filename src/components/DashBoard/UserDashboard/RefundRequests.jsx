import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider, Tab } from "@mui/material";
import React from "react";
import MyRefundRequests from "./RefundTabs/MyRefundRequests";
import RequestedRefundTickets from "./RefundTabs/RequestedRefundTickets";

const RefundRequests = () => {
  const [value, setValue] = React.useState("0");
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
                <Tab label="Requested Refund Tickets" value="0" sx={tabStyles} />
                <Tab label="My Refund Tickets" value="1" sx={tabStyles} />
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
              <RequestedRefundTickets />
            </TabPanel>
            <TabPanel value="1">
             <MyRefundRequests/>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};

export default RefundRequests;
