import React from "react";
import cart from "../../assets/landingPage/cart.webp";
import network from "../../assets/landingPage/network.webp";
import learning from "../../assets/landingPage/learning.webp";
import { Box, Typography } from "@mui/material";
import ImageComp from "../globalComponents/ImageComp";
import ButtonComp from "../globalComponents/ButtonComp";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
const OurPrograms = () => {
  const navigate = useNavigate();
  const whySMAC = [
    {
      id: 0,
      icon: network,
      name: "Social Network",
      description:
        "Connect with professionals, grow your network, and engage in meaningful conversations with SMAC’s social networking feature.connect to grow.",
      links: "/feed",
    },
    {
      id: 1,
      icon: cart,
      name: "Marketplace",
      description:
        "Unlock new business opportunities with energetic marketplace. Whether you're selling products, offering services, or searching for freelancers, everything in its marketplace.",
      links: "/market",
    },
    {
      id: 2,
      icon: learning,
      name: "Courses",
      description:
        "Range of unique courses designed to expand your career forward. SMAC’s online learning platform provides everything from foundational knowledge to advanced skills.",
      links: "/courses",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1.5rem",
        mt: "3.125rem",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          // lineHeight: "86.24px",
          textAlign: "center",
          color: "#000000",
        }}
      >
        Our Programs
      </Typography>

      {/* <Typography variant="paragraph" maxWidth={864}>
        Discover various programs that empower your professional journey and
        personal growth on SMAC.
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "33px",
          marginTop: "1.563rem",
          [theme.breakpoints.down("lg")]: {
            gap: "1rem",
          },
          [theme.breakpoints.down("md")]: {
            gap: "1rem",
            flexWrap: "wrap",
          },
        }}
      >
        {whySMAC.map((why) => {
          return (
            <Box
              key={why.id}
              sx={{
                width: "100%",
                maxWidth: "525px",
                minWidth: "300px",
                padding: "19px",
                borderRadius: "2.5rem",
                border: "1px solid #14B8A6",
                position: "relative",
                [theme.breakpoints.down("lg")]: {
                  maxWidth: "373px",
                },
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "100%",
                },
              }}
            >
              <Box
                sx={{
                  background: "#F6F6F6",
                  width: "100%",
                  height: "290px",
                  borderRadius: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 0px 8.5px 0px #CCCCCC inset",
                  mb: "20px",
                  [theme.breakpoints.down("lg")]: {
                    height: "206px",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "clamp(9.375rem, 8.875rem + 2.5vw, 11.875rem)",
                    height: "clamp(9.375rem, 8.875rem + 2.5vw, 11.875rem)",
                    [theme.breakpoints.down("lg")]: {
                      width: "clamp(4.688rem, 4.69vw + 3.808rem, 7.813rem)",
                      height: "clamp(4.688rem, 4.69vw + 3.808rem, 7.813rem)",
                    },
                  }}
                >
                  <ImageComp src={why.icon} sx={{ width: "100%" }} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {why.name}
                </Typography>
                <Typography
                  variant="subparagraph"
                  sx={{
                    lineHeight: "30px",
                    textAlign: "center",
                    color: "#6D6D6D",
                    minHeight: "120px",
                    [theme.breakpoints.down("lg")]: {
                      lineHeight: "28px",
                    },
                    [theme.breakpoints.down("sm")]: {
                      minHeight: "100px",

                      lineHeight: "28px",
                    },
                  }}
                >
                  {why.description}
                </Typography>
                <ButtonComp
                  label={"Explore Now"}
                  click={() => navigate(`${why.links}`)}
                  customStyles={{
                    width: "180px",
                    background: theme.palette.primary.main,
                    color: "white",
                    height: "56px",
                    [theme.breakpoints.down("lg")]: {
                      fontSize: "16px",
                      width: "150px",
                    },

                    // padding: "0",
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OurPrograms;
