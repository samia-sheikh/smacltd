import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import DasboardUserIcon from "../../../assets/users.png";
// import MarketUserIcon from "../../../assets/markets.png";
// import CoursesUserIcon from "../../../assets/courses.png";
// import PaymentsUserIcon from "../../../assets/payments.png";
// import RefendTicketsIcon from "../../../assets/RefundTickets.png";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "../../../components/globalComponents/Layout/Layout";
import DashboardUser from "./DashboardUser/DashboardUser";
import DashboardCourses from "./DashboardCourses/DashboardCourses";
import DashboardMarket from "./DashboardMarket/DashboardMarket";
import RefundTickets from "./RefundTickets/RefundTickets";
import { useNavigate, useLocation } from "react-router-dom";
import CategoriesPage from "./Categories/CategoriesPage";
import { FaUsers } from "react-icons/fa6";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { HiUserGroup } from "react-icons/hi";
import { IoStorefrontSharp } from "react-icons/io5";
import { FiRepeat } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import SubscriptionTab from "./Subscriptions/SubscriptionTab";
import WithdrawlRequests from "./WithdrawlRequests/WithdrawlRequests";
import Payments from "./Payments/Payments";
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
  "Users",
  "Courses",
  "Markets",
  "Payments",
  "Withdrawl Requests",
  "Refund Tickets",
  "Manage Categories",
  "Subscriptions",
];

const labelToIndex = tabLabels.reduce((acc, label, index) => {
  acc[formatString(label)] = index.toString();
  return acc;
}, {});

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(() => {
    const query = new URLSearchParams(location.search).get("tab");
    return labelToIndex[query] ?? "0";
  });
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    const label = tabLabels[parseInt(newValue)];
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

  const TabStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    margin: "0 1.5rem",
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Layout
      styles={{
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          marginTop: "20px",
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
        <Box
          sx={{
            width: "100%",
          }}
        >
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
            }}
          >
            <Tab
              sx={TabStyle}
              icon={
                <FaUsers
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Users"
              value="0"
              {...a11yProps(0)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <HiUserGroup
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Courses"
              value="1"
              {...a11yProps(1)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <IoStorefrontSharp
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Markets"
              value="2"
              {...a11yProps(2)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <CreditScoreIcon
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Payments"
              value="3"
              {...a11yProps(3)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <CreditScoreIcon
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Withdrawl Requests"
              value="4"
              {...a11yProps(4)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <FiRepeat
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Refund Tickets"
              value="5"
              {...a11yProps(5)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <IoMdSettings
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Categories"
              value="6"
              {...a11yProps(6)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <IoMdSettings
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Subscriptions"
              value="7"
              {...a11yProps(7)}
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
              "& span": {
                position: "block",
                display: "none",
                height: "0px",
              },
              borderRight: 1,
              borderColor: "divider",
              minWidth: "150px",
              width: "405px",
              "@media(max-width:1024px)": {
                width: "365px",
              },
              // width:"100%",
              display: isMobile ? "none" : "flex", // Only display on desktop
            }}
          >
            <Tab
              sx={TabStyle}
              icon={
                <FaUsers
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Users"
              value="0"
              {...a11yProps(0)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <HiUserGroup
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Courses"
              value="1"
              {...a11yProps(1)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <IoStorefrontSharp
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Markets"
              value="2"
              {...a11yProps(2)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <CreditScoreIcon
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Payments"
              value="3"
              {...a11yProps(3)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <CreditScoreIcon
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Withdrawl Requests"
              value="4"
              {...a11yProps(4)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <FiRepeat
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Refund Tickets"
              value="5"
              {...a11yProps(5)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <IoMdSettings
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Manage Categories"
              value="6"
              {...a11yProps(6)}
            />
            <Tab
              sx={TabStyle}
              icon={
                <IoMdSettings
                  style={{ margin: "0px 10px", width: "24px", height: "24px" }}
                />
              }
              label="Subscriptions"
              value="7"
              {...a11yProps(7)}
            />
          </Tabs>

          <Box sx={{ width: "100%" }}>
            <TabPanel value={parseInt(value, 10)} index={0}>
              <Box>
                <DashboardUser />
              </Box>
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={1}>
              <Box>
                <DashboardCourses />
              </Box>
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={2}>
              <Box>
                <DashboardMarket />
              </Box>
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={3}>
              <Box>
                <Payments />
              </Box>
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={4}>
              <Box>
                <WithdrawlRequests />
              </Box>
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={5}>
              <Box>
                <RefundTickets />
              </Box>
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={6}>
              <Box>
                <CategoriesPage />
              </Box>
            </TabPanel>
            <TabPanel value={parseInt(value, 10)} index={7}>
              <SubscriptionTab />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
