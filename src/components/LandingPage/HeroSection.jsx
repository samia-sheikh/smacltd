import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import landingHero from "../../assets/heroLanding.png";
import graph from "../../assets/landingPage/graph.png";
import graph2 from "../../assets/landingPage/graph2.png";
import graph3 from "../../assets/landingPage/graph3.png";
import one from "../../assets/landingPage/1.png";
import two from "../../assets/landingPage/2.png";
import three from "../../assets/landingPage/3.png";
import Layout from "../globalComponents/Layout/Layout";
import ImageComp from "../globalComponents/ImageComp";
import theme from "../../theme";
import smaclogo from "../../assets/logo/logo.png";
import ButtonComp from "../globalComponents/ButtonComp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HeroSection = ({
  scrollToSection,
  aboutRef,
  programsRef,
  categoriesRef,
  faqsRef,
}) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const cardStyles = {
    // width: "100%",
    // maxWidth: "371px",
    width: "clamp(12.5rem, 14.615vw + 5.649rem, 23.188rem)",
    // minHeight: "333px",
    minHeight: "clamp(12.5rem, 11.368vw + 7.171rem, 20.813rem)",
    borderRadius: "4.75rem",
    display: "flex",
    flexDirection: "column",
    padding: "2.5rem",
    boxShadow: "0px 0px 14.51px 2.47px #7E7E7E40",
    [theme.breakpoints.down("lg")]: {
      // maxWidth: "264px",
      // height: "237px",
      padding: "1.5rem",
      borderRadius: "3rem",
    },
  };
  const heroSlider = [
    {
      id: 0,
      name: "Connect Learn and Earn",
      description:
        "At SMAC, we believe in empowering individuals to achieve their full potential. Join Smac to connect with professionals, learn new skills, and earn by offering services or selling products. Empower your growth, all in one platform!",
    },
    {
      id: 1,
      name: "From Knowledge to Success",
      description:
        "Take advantage of expert-led SMAC courses to transform your career. learn new skills at your own speed to stay competitive in the market. This is the beginning of your leadership journey!",
    },
    {
      id: 2,
      name: "Education to Entrepreneurial Success",
      description:
        "Become a part of the exciting professional community on SMAC. Utilise our marketplace and educational programs to expand your professional network, learn from industry professionals, and advance your expertise.",
    },
    {
      id: 3,
      name: "Discover More Save More",
      description:
        "Discover, sell, and buy products and services in the SMAC marketplace. Whether you're a freelancer or a business owner, showcase your capability and find opportunities for growth",
    },
    {
      id: 4,
      name: "Bringing You to Your Passions",
      description:
        "Access a wide range of best online courses from leading instructors on the SMAC platform. Whether you're just starting out or looking to advance your career, SMAC helps you reach your career goals.",
    },
  ];
  const FirstComponent = () => {
    return (
      <Box
        sx={{
          ...cardStyles,
          position: "relative",
          overflow: "hidden",

          "@media(max-width:750px)": {
            display: "none",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Typography
            variant="subparagraph"
            sx={{
              borderRadius: "28px",
              border: "0.82px solid #14B8A6",
              // background: "linear-gradient(90deg, #F7F7F7 0%, #E2E2E2 100%)",
              width: "max-content",
              padding: "15px 25px",
              color: "#959595",
              fontStyle: "italic",
              background:
                "linear-gradient(90deg, rgba(213, 255, 255, 0.22) 0%, rgba(213, 255, 255, 0.22) 100%)",
              [theme.breakpoints.down("lg")]: {
                fontSize: "11px",
                padding: "8px 14px",
              },
            }}
          >
            Revenue Generated
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              // background: "linear-gradient(90deg, #A2A2A2 0%, #D5D5D5 100%)",
              background: "linear-gradient(90deg, #2D2C2C 0%, #686868 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "32px",
              zIndex: 10,
              [theme.breakpoints.down("lg")]: {
                fontSize: "1.75rem",
              },
            }}
          >
            PKR 20,00000+
          </Typography>
          <Typography
            variant="subparagraph"
            sx={{
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: "24px",
              color: "#4e4d4d",
              // fontSize: "16px",
              [theme.breakpoints.down("lg")]: {
                fontSize: "10px",
                lineHeight: "14px",
              },
            }}
          >
            Nearly PKR 2,000,000 is earned by freelancers and sellers on our
            platform. Join now and become a part of this incredible success
            story to unlock your potential.
          </Typography>
        </Box>
        <ImageComp
          src={graph}
          styles={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 0,
            width: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
    );
  };
  const SecondComponent = () => {
    return (
      <Box
        sx={{
          ...cardStyles,

          position: "relative",
          // maxWidth: "483px",
          width: "clamp(21.875rem, 11.368vw + 16.546rem, 30.188rem)",
          // height: "375px",
          height: "clamp(18.75rem, 6.41vw + 15.745rem, 23.438rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px 0px 14.51px 2.47px #7E7E7E40",
          background: "linear-gradient(180deg, #FFFFFF 0%, #E1E1E1 100%)",
          [theme.breakpoints.down("lg")]: {
            // maxWidth: "344px",
            // height: "267px",
            padding: "1rem",
            borderRadius: "3rem",
          },
          [theme.breakpoints.down("sm")]: {
            width: "clamp(18.875rem, 8.368vw + 13.546rem, 27.188rem)",
          },
        }}
      >
        {" "}
        <Typography
          variant="h3"
          sx={{
            background: "linear-gradient(90deg, #949494 0%, #2E2E2E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "#959595",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Our Programs
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            gap: "20px",
            zIndex: 21,
          }}
        >
          <Box
            sx={{
              maxWidth: "90px",
              height: "77px",
              [theme.breakpoints.down("lg")]: {
                maxWidth: "64px",
                height: "55px",
              },
            }}
          >
            <ImageComp src={one} styles={{ maxWidth: "100%" }} />
          </Box>
          <Box
            sx={{
              maxWidth: "138px",
              height: "117px",
              [theme.breakpoints.down("lg")]: {
                maxWidth: "98px",
                height: "83px",
              },
            }}
          >
            <ImageComp src={two} styles={{ maxWidth: "100%" }} />
          </Box>
          <Box
            sx={{
              maxWidth: "90px",
              height: "77px",
              [theme.breakpoints.down("lg")]: {
                maxWidth: "64px",
                height: "55px",
              },
            }}
          >
            <ImageComp src={three} styles={{ maxWidth: "100%" }} />
          </Box>
        </Box>
        <ImageComp
          src={graph2}
          styles={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            zIndex: 1,
          }}
        />
        <ButtonComp
          label={"Explore"}
          click={() => navigate("/feed?tab=explore")}
          customStyles={{
            background: theme.palette.primary.main,
            zIndex: 10,
            maxWidth: "154px",
            [theme.breakpoints.down("lg")]: {
              maxWidth: "109px",
              fontSize: "12px",
            },
          }}
        />
      </Box>
    );
  };
  const ThirdComponent = () => {
    return (
      <Box
        sx={{
          ...cardStyles,
          position: "relative",
          "@media(max-width:750px)": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            zIndex: 2,
          }}
        >
          <Typography
            variant="subparagraph"
            sx={{
              borderRadius: "28px",
              border: "0.82px solid #14B8A6",
              width: "max-content",
              padding: "15px 25px",
              color: "#959595",
              fontStyle: "italic",
              background:
                "linear-gradient(90deg, rgba(213, 255, 255, 0.22) 0%, rgba(213, 255, 255, 0.22) 100%)",
              [theme.breakpoints.down("lg")]: {
                padding: "8px 14px",
              },
            }}
          >
            Earn & Grow
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              // background: "linear-gradient(90deg, #A2A2A2 0%, #D5D5D5 100%)",
              background: "linear-gradient(90deg, #2D2C2C 0%, #686868 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "32px",
              zIndex: 10,
            }}
          >
            All-in-One
          </Typography>
          <Typography
            variant="subparagraph"
            sx={{
              fontStyle: "italic",
              // fontSize: "12px",
            }}
          >
            Expand your network and boost your earnings by selling services and
            products. Unlock new opportunities with expert-led courses designed
            for your growth!
          </Typography>
        </Box>
        <ImageComp
          src={graph3}
          styles={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 0,
            objectFit: "cover",
            width: "100%",
          }}
        />
      </Box>
    );
  };
  const navigate = useNavigate();
  const rotateCards = () => {
    setActiveSlider((prevIndex) => (prevIndex + 1) % heroSlider.length);
  };
  const { user } = useSelector((state) => state.user);
  const landingPageAnchorLinks = [
    {
      id: 1,
      name: "About",
      ref: aboutRef,
    },
    {
      id: 2,
      name: "Our Programs",
      ref: programsRef,
    },
    {
      id: 3,
      name: "Categories",
      ref: categoriesRef,
    },
    {
      id: 4,
      name: "FAQ’s",
      ref: faqsRef,
    },
  ];
  useEffect(() => {
    const interval = setInterval(rotateCards, 3000);
    return () => {
      clearInterval(interval);
    }; // Cleanup interval on component unmount
  }, [heroSlider.length]);

  return (
    <Box
      sx={{
        width: "100%",
        background: `url(${landingHero})`,
        // height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <Layout
        styles={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // gap: "4rem",
        }}
      >
        {!user ? (
          <Box
            sx={{
              width: "100%",
              maxWidth: "1230px",
              borderBottom: "1px solid #CDCDCD",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.5rem 0rem",
              gap: "1rem",
              [theme.breakpoints.down("lg")]: {
                maxWidth: "1055px",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: "46px" }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "120px",
                  minWidth: "90px",
                }}
              >
                <ImageComp
                  src={smaclogo}
                  alt={"smac logo"}
                  styles={{ width: "100%" }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "32px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                }}
              >
                {landingPageAnchorLinks.map((item) => {
                  return (
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 400,
                        lineHeight: "30px",
                        textAlign: "left",
                        color: "#424242",
                        cursor: "pointer",
                        fontFamily: "Poppins",
                        width: "max-content",
                        ":hover": {
                          color: theme.palette.primary.main,
                        },
                        [theme.breakpoints.down("lg")]: {
                          fontSize: "14px",
                          lineHeight: "22px",
                        },
                      }}
                      onClick={() => {
                        scrollToSection(item.ref);
                      }}
                    >
                      {item.name}
                    </Typography>
                  );
                })}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "15px",
                width: "300px",
                [theme.breakpoints.down("lg")]: { width: "260px" },
              }}
            >
              <ButtonComp
                label={"Signup"}
                customStyles={{
                  background: "white",
                  color: theme.palette.primary.main,
                  border: `none`,
                  boxShadow: "0px 4px 14.3px 0px #14B8A638",
                }}
                click={() => navigate("/signup")}
              />
              <ButtonComp
                label={"Login"}
                customStyles={{
                  color: "white",
                  background: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                  boxShadow: "0px 4px 14.3px 0px #14B8A638",
                }}
                click={() => navigate("/signin")}
              />
            </Box>
          </Box>
        ) : null}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1283px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.down("lg")]: { maxWidth: "912px" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "black",
              mt: "60px",
            }}
          >
            {heroSlider[activeSlider].name}
          </Typography>
          {/* <Typography
            variant="paragraph"
            sx={{
              color: "#6D6D6D",
              mt: "23px",
            }}
          >
            {heroSlider[activeSlider].description}
          </Typography> */}
        </Box>
        <Box
          sx={{
            // transition: "all 0.5s ease-in-out",
            mt: "60px",
            display: "flex",
            gap: "1.75rem",
            alignItems: "center",
            [theme.breakpoints.down("lg")]: {
              maxWidth: "914px",
              gap: "1.25rem",
            },
          }}
        >
          <FirstComponent />

          <SecondComponent />

          <ThirdComponent />
        </Box>
      </Layout>
    </Box>
  );
};

export default HeroSection;
