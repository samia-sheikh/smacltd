import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Layout from "../../../components/globalComponents/Layout/Layout";
import General from "./General";
import PersonalInformation from "./PersonalInformation";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import { useNavigate, useLocation } from "react-router-dom";
import AdditionalDetails from "./AdditionalDetails";
import ChangePassword from "./ChangePassword";

function formatString(str) {
  return str.trim().replace(/\s+/g, "-");
}
//multistate tabs labels
const tabLabels = [
  "General",
  "Personal Info",
  "Additional Details",
  "Change Password",
];

const labelToIndex = tabLabels.reduce((acc, label, index) => {
  acc[formatString(label)] = index.toString();
  return acc;
}, {});

const ProfileUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(() => {
    const query = new URLSearchParams(location.search).get("tab");
    return labelToIndex[query] ?? "0";
  });
  // tabs on change event handler
  const handleChange = (event, newValue) => {
    const label = tabLabels[parseInt(newValue)];
    const queryURL = formatString(label);
    setValue(newValue);
    //add params for

    navigate(`?tab=${queryURL}`);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("tab");
    if (query && labelToIndex[query] !== value) {
      setValue(labelToIndex[query]);
    }
  }, [location.search, value]);

  let tabStyles = {
    padding: "0px 10px",
    width: "max-content",
    borderBottom: "none",
    textDecoration: "none",
    fontSize: "14px",
  };

  return (
    <Layout title={"Settings | SMAC"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "100px",
          marginTop: "70px",
        }}
      >
        <Box sx={{ width: "max-content" }}>
          <ButtonComp
            label={"Back to Profile"}
            click={() => {
              navigate("/profile-user");
            }}
            customStyles={{ height: "39px", width: "148px" }}
          />
        </Box>
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
                borderRadius: "12px",
                background: "white",
                width: "100%",
                maxWidth: "max-content",
                padding: "8px 10px",
                boxShadow: " 0px 0px 4px 0px #00000040",
                "@media (max-width:650px)": {
                  overflowX: "scroll",
                  "::-webkit-scrollbar": {
                    height: "5px",
                    width: "40px",
                    background: "transparent",
                  },
                },
              }}
            >
              <TabList
                onChange={handleChange}
                // centered
                sx={{
                  "& span": {
                    display: "none",
                    height: "0px",
                  },
                  "& .css-heg063-MuiTabs-flexContainer": {
                    display: "flex",
                    gap: "10px",
                  },
                }}
              >
                <Tab label="Basic Info" value="0" sx={tabStyles} />
                <Tab label="Personal Info" value="1" sx={tabStyles} />
                <Tab label="Additional Details" value="2" sx={tabStyles} />
                <Tab label="Change Password" value="3" sx={tabStyles} />
              </TabList>
            </Box>
            <Box sx={{ width: "100%", maxWidth: "828px" }}>
              <TabPanel value="0">
                <General key={0} />
              </TabPanel>
              <TabPanel value="1">
                <PersonalInformation
                  key={1}
                  setValue={setValue}
                  value={value}
                />
              </TabPanel>
              <TabPanel value="2">
                <AdditionalDetails key={2} />
              </TabPanel>
              <TabPanel value="3">
                <ChangePassword key={3} />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProfileUpdate;
