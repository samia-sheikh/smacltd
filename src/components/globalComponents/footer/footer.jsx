import React, { useEffect, useState } from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
// import MailIcon from "@mui/icons-material/Mail";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import Layout from "../Layout/Layout";
import theme from "../../../theme";
import smacLogo from "../../../assets/logo/logo.png";
import {
  // TwitterIcon,
  FacebookIcon,
  LinkedInIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./../constants";
import { Link, useNavigate } from "react-router-dom";
import ImageComp from "../ImageComp";
const Footer = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState(null);
  function formatDate() {
    const date = new Date(); // Create a new Date object
    setYear(date.getFullYear()); // Return only the year
  }
  useEffect(() => {
    formatDate();
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          mt: "50px",
          background: "white",
        }}
      >
        {" "}
        <Divider />
        <Layout>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem 0px",
              [theme.breakpoints.down("md")]: {
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "start",
                gap: "15px",
                padding: "15px 0px",
              },
              [theme.breakpoints.down("sm")]: {
                flexWrap: "wrap",
                alignItems: "start",
                flexDirection: "column",
                justifyContent: "start",
                gap: "15px",
                padding: "15px 0px",
              },
            }}
          >
            <Box>
              <Box
                sx={{
                  width: "120px",
                }}
                component={Link}
                to="/"
              >
                <ImageComp
                  src={smacLogo}
                  alt={"smac logo"}
                  styles={{ width: "inherit" }}
                ></ImageComp>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "32px",
                  color: "#000000",
                  [theme.breakpoints.down("sm")]: {
                    gap: "15px",
                    flexDirection: "column",
                  },
                }}
              >
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/about-us");
                  }}
                >
                  About Us
                </Typography>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/privacy-policy");
                  }}
                >
                  Privacy Policy & Terms Of Use
                </Typography>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/blogs");
                  }}
                >
                  Blogs
                </Typography>

                {/* <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/support");
                  }}
                >
                  Support
                </Typography> */}
              </Box>
            </Box>

            <Box
              sx={{
                "@media(max-width:1180px)": {},
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "5.7px",

                  "*:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <IconButton
                  onClick={() =>
                    window.open("https://www.facebook.com/smaclimited0")
                  }
                >
                  {" "}
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/znz-technologiess/"
                    )
                  }
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    window.open("https://www.instagram.com/smaclimited0/")
                  }
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    window.open("https://www.youtube.com/@SMAC-Limited")
                  }
                >
                  <YoutubeIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Layout>
        <Divider />
        <Box
          sx={{
            padding: "0.75rem 0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>
            ©{year} SMACLTD | All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
