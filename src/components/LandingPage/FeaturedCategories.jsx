import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme";
import ImageComp from "../globalComponents/ImageComp";
import Online from "../../assets/landingPage/Online.webp";
import Communication from "../../assets/landingPage/Communication.webp";
import connect from "../../assets/landingPage/connect.webp";
import market from "../../assets/landingPage/market.webp";
import mobile from "../../assets/landingPage/mobile.webp";
import sell from "../../assets/landingPage/sell.webp";

const FeaturedCategories = () => {
  const HorizontalDesign = ({ title, paragraph, image, sx, position }) => {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1054px",
          borderRadius: "58px",
          background: "#EBEBEB8F",
          padding: "2rem",
          display: "flex",
          
          justifyContent: "space-between",
          // minHeight: "416px",
          minHeight:"350px",
          flexDirection:"row",
          // maxHeight: "416px",
          [theme.breakpoints.down("lg")]: {
            maxWidth: "749px",
            minHeight: "fit-content",
            // minHeight: "300px",
            // maxHeight:"300px",
            padding: "2.5rem 2.5rem 1rem 2.5rem",
          },
          [theme.breakpoints.down("md")]: {
            flexDirection: position ? "row-reverse" : "row",
            minHeight: "fit-content",
            gap: "24px",
            padding: "2.5rem 2.5rem 2.5rem 2.5rem",

            maxWidth: "100%",
            justifyContent: "start",
            borderRadius: "25px",
          },
          [theme.breakpoints.down("sm")]: {
            flexDirection:"column",
            minHeight: "fit-content",
            gap: "24px",
            padding: "1.5rem 1.5rem 1.5rem 1.5rem",
            maxWidth: "100%",
            justifyContent: "start",
            borderRadius: "25px",

          },
        }}
      >
        {/* <Box sx={{ display: "flex",alignItems:"center",justifyContent:"center",width:"100%" }}> */}
          {" "}
          {/* Below box  for the content */}
          <Box
            sx={{
              width: "100%",
              [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <Box
              sx={{
                width:"100%",
                maxWidth: "501px",
                [theme.breakpoints.down("lg")]: {
                  maxWidth: "340px",
                },
                [theme.breakpoints.down("md")]: {
                  maxWidth: "400px",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#2C2C2C",
                  lineHeight: "3rem",
                  mb: "12px",
                }}
              >
                {title}
              </Typography>
              <Typography variant="subparagraph">{paragraph}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              ...sx,
              minWidth: "240px",
              [theme.breakpoints.down("lg")]: {
                minWidth: "240px",
              },
            }}
          >
            <ImageComp
              src={image}
              sx={{
                width: "100%",
                // width:"clamp(9.375rem, 26.667vw - 3.125rem, 28.875rem)",
                maxWidth: "462px",
                // height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        {/* </Box> */}
      </Box>
    );
  };
  const VerticalDesign = ({ title, paragraph, image, position }) => {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "550px",
          borderRadius: "58px",
          background: "#EBEBEB8F",
          padding: "4rem 2rem 0rem 2rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxHeight: "872px",
          [theme.breakpoints.down("lg")]: {
            maxHeight: "auto",
            maxWidth: "391px",
            padding: "2.5rem 2.5rem 0rem 2.5rem",
          },
          [theme.breakpoints.down("md")]: {
            flexDirection: position ? "row-reverse" : "row",
            padding: "2.5rem 2.5rem 2.5rem 2.5rem",
            width: "100%",
            maxWidth: "100%",
            minHeight: "fit-content",
            gap: "24px",
            borderRadius: "25px",

          },
          [theme.breakpoints.down("sm")]: {
            flexDirection:"column",
            minHeight: "auto",
            gap: "24px",
            maxWidth: "100%",
            justifyContent: "start",
            padding: "1.5rem 1.5rem 1.5rem 1.5rem",
            borderRadius: "25px",

          },
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.down("md")]: {
              width: "100%",
              maxWidth: "500px",
              height: "300px",
              [theme.breakpoints.down("sm")]: {
    
                height: "auto",
            
              },
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2C2C2C",
              mb: "12px",
            }}
          >
            {title}
          </Typography>
          <Typography variant="subparagraph">{paragraph}</Typography>
        </Box>
        <ImageComp
          src={image}
          sx={{
            width: "100%",
            maxWidth: "400px",
            maxHeight: "450px",

            padding: "0px 0px 45px 0px",
            objectFit: "contain",
            overflow: "visible",
          }}
        />
      </Box>
    );
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        Featured Categories
      </Typography>

      {/* <Typography variant="paragraph" maxWidth={864}>
        SMAC is{" "}
        <span style={{ fontWeight: 600, color: theme.palette.primary.main }}>
          your one-stop solution
        </span>{" "}
        for all your development needs!
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
          marginTop: "1.563rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          <VerticalDesign
            title={"Looking for an Instructor"}
            image={Online}
            paragraph={
              "Buy online courses from skilled instructors to guide your learning journey in different fields and skills. Choose from a variety of professionals set to help you excel."
            }
          />
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <HorizontalDesign
              title={"Become a Scholar"}
              image={Communication}
              paragraph={
                "Share your knowledge and proficiency by becoming a mentor at SMAC. Create and sell courses to encourage and teach learners worldwide."
              }
              position={true}
            />
            <HorizontalDesign
              title={"Market your Skills"}
              image={market}
              paragraph={
                "Showcase your expertise and invite clients to the SMAC  freelance marketplace. Encourage your skills and services to a rising community of professionals."
              }
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <HorizontalDesign
              title={"Buy with Smac"}
              image={mobile}
              paragraph={
                "Realise a wide range of services, courses, and products tailored to your requirements. Buy services online with self-confidence and spend on your personal and professional development."
              }
              position={true}
            />
            <HorizontalDesign
              title={"Sell with Smac"}
              image={sell}
              paragraph={
                "Share your knowledge and proficiency by becoming a mentor at SMAC. Create and sell courses to encourage and teach learners worldwide."
              }
            />
          </Box>
          <VerticalDesign
            title={"Connect with a Community"}
            image={connect}
            paragraph={
              "Want to connect with professionals? Absorb with like-minded professionals, share updates, and cooperate on SMAC. Form meaningful connections to develop your career."
            }
            position={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedCategories;
