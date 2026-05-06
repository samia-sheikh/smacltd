import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PiWrenchFill } from "react-icons/pi";
import PaymentsUserIcon from "../../../assets/payments.png";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "../../../components/globalComponents/Layout/Layout";
import UserMarket from "./../../../components/DashBoard/UserDashboard/UserMarket";
import UserPayments from "../../../components/DashBoard/UserDashboard/UserPayments";
import { useLocation, useNavigate } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";
import PaymentIcon from "@mui/icons-material/Payment";

import MyCourses from "../../../components/DashBoard/UserDashboard/MyCourses";
import UserServices from "../../../components/DashBoard/UserDashboard/UserServices";
import SubScription from "../../../components/DashBoard/UserDashboard/SubScription";
// import MyRefundRequest from "../../../components/DashBoard/UserDashboard/MyRefundRequest";
import RefundRequests from "../../../components/DashBoard/UserDashboard/RefundRequests";
import { useSelector } from "react-redux";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "100%" }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function formatString(str) {
  return str.trim().replace(/\s+/g, "-");
}

const tabLabels = [
  "Courses", //if you change My-Courses to another name please add the same in course card in the url query condition
  "Services",
  "Market",
  "My Subscriptions",
  "Payment",
  "Refund Requests",
];

const labelToIndex = tabLabels.reduce((acc, label, index) => {
  acc[formatString(label)] = index.toString();
  return acc;
}, {});

export default function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [value, setValue] = React.useState(() => {
    const query = new URLSearchParams(location.search).get("tab");
    return labelToIndex[query] ?? "0";
  });
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    const label = tabLabels[newValue];
    const queryURL = formatString(label);
    setValue(newValue);
    navigate(`?tab=${queryURL}`);
  };

  React.useEffect(() => {
    const query = new URLSearchParams(location.search).get("tab");
    if (query && labelToIndex[query] !== value) {
      setValue(labelToIndex[query]);
    }
  }, [location.search, value]);

  const IconsStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    margin: "0 1.5rem",
    // gap: "16px",
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  React.useEffect(() => {
    if (user.role === "admin" || user.role === "refundSupervisor") {
      navigate("/");
    }
  }, []);
  return (
    <Layout styles={{ minHeight: "90vh" }}>
      {/* <Typography
        variant="h2"
        sx={{
          backgroundColor: "white",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        Dashboard
      </Typography> */}
      {/* <Box sx={{ marginTop: "44px" }}> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center" },
          alignItems: { xs: "center", md: "start", lg: "start" },
          height: "100%",
          flexDirection: { xs: "column" },
          width: "100%",
          gap: "40px",
        }}
      >
        {/* Hamburger menu button */}
        <Box sx={{ width: "100%" }}>
          <IconButton
            sx={{ display: { xs: "block", md: "none", marginLeft: "4%" } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Drawer for smaller screens */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              "& span": {
                position: "block",
                display: "none",
                height: "0px",
              },
              borderRight: 1,
              borderColor: "divider",
              width: "clamp(18.75rem, 23.529vw + 14.044rem, 28.75rem)",
              display: isMobile ? "flex" : "none",
              justifyContent: "center",
              mt: "2rem",
            }} // Only display on mobile
          >
            <Tab
              sx={IconsStyle}
              icon={
                <HiUserGroup
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              alt="Courses"
              label="Courses"
              value="0"
              {...a11yProps(0)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                <PiWrenchFill
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Services"
              value="1"
              {...a11yProps(1)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                <IoStorefrontSharp
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Market"
              value="2"
              {...a11yProps(2)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                <MdSubscriptions
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="My Subscriptions"
              value="3"
              {...a11yProps(3)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                // <img
                //   src={PaymentsUserIcon}
                //   alt="Payment"
                //   style={{ margin: "0px 10px" }}
                // />
                <PaymentIcon
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Payment"
              value="4"
              {...a11yProps(4)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                <CurrencyExchangeIcon
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Refund Request"
              value="5"
              {...a11yProps(5)}
            />
          </Tabs>
        </Drawer>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {/* Tabs for larger screens */}
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              // borderRight: 1,
              // borderColor: "divider",
              "& span": {
                position: "block",
                display: "none",
                height: "0px",
              },
              marginRight: "20px",
              minWidth: "150px",
              width: "405px",
              "@media(max-width:1024px)": {
                width: "365px",
              },

              display: isMobile ? "none" : "flex",
            }} // Only display on desktop
          >
            <Tab
              sx={IconsStyle}
              icon={
                <HiUserGroup
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              alt="Courses"
              label="Courses"
              value="0"
              {...a11yProps(0)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                <PiWrenchFill
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Services"
              value="1"
              {...a11yProps(1)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                <IoStorefrontSharp
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Market"
              value="2"
              {...a11yProps(2)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                <MdSubscriptions
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="My Subscriptions"
              value="3"
              {...a11yProps(3)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                // <img
                //   src={PaymentsUserIcon}
                //   alt="Payment"
                //   style={{ margin: "0px 10px" }}
                // />
                <PaymentIcon
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Payment"
              value="4"
              {...a11yProps(4)}
            />
            <Tab
              sx={IconsStyle}
              icon={
                <CurrencyExchangeIcon
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Refund Request"
              value="5"
              {...a11yProps(5)}
            />
          </Tabs>

          {/* Tab panels */}
          {/* in AdminDashBoard we use Grid to handle the Tabpanel here we use the Box... */}
          <Box sx={{ width: "100%" }}>
            <TabPanel value={parseInt(value, 10)} index={0}>
              {/* <UserCourses /> */}
              <MyCourses />
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={1}>
              <UserServices />
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={2}>
              <UserMarket />
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={3}>
              {/* <RefundRequests /> */}
              <SubScription />
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={4}>
              <UserPayments />
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={5}>
              {/* <RefundRequests /> */}
              <RefundRequests />
            </TabPanel>
          </Box>
        </Box>
      </Box>
      {/* </Box> */}
    </Layout>
  );
}
