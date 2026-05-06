import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme";
import Layout from "./Layout/Layout";
import ImageComp from "./ImageComp";
import { aboutUsBanner } from "../../assets/heroSectionImages";
const Banner = ({ title, placement, text, image }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(232, 232, 232, 1)",
          minHeight: "475px",
          [theme.breakpoints.down("lg")]: {
            marginBottom: "30px",
          },
        }}
      >
        <Layout
          styles={
            {
              // display: "flex",
              // justifyContent: placement ? placement : "center",
              // padding: "86px 16px 146px 16px",
              // marginBottom: "80px",
            }
          }
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={12} sm={7}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  [theme.breakpoints.down("sm")]: {
                    marginTop: "30px",
                  },
                }}
              >
                <Typography variant="h1" sx={{ color: "black" }}>
                  {title}
                </Typography>
                {text ? (
                  <Typography sx={{ color: "#5C5C5C", marginTop: "24px" }}>
                    {text}
                  </Typography>
                ) : null}
              </Box>
            </Grid>
            <Grid
              Grid
              item
              xs={12}
              sm={4}
              sx={{
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                  height: "100%",
                  marginTop: "87px",
                }}
              >
                <ImageComp
                  src={aboutUsBanner}
                  alt="Banner Image"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Layout>
      </Box>
    </>
  );
};

export default Banner;
