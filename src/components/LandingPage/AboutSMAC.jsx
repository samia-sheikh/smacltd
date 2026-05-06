import React from "react";
import ImageComp from "../globalComponents/ImageComp";
import theme from "../../theme";
import { Box, Typography } from "@mui/material";
import ButtonComp from "../globalComponents/ButtonComp";
import post from "../../assets/post.webp"
import { useNavigate } from "react-router-dom";
const AboutSMAC = () => {
  const navigate=useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: "3.125rem",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          marginBottom: "70px",
          marginTop: "3.5rem",
          alignItems: "flex-start",
        },
        [theme.breakpoints.down("sm")]: {
         padding:"10px"
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "685px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
         variant="h2"
         sx={{
          fontWeight:"700"
         }}
        >
          About{" "}
          <span style={{ fontWeight: 700, color: theme.palette.primary.main }}>
            SMAC
          </span>
        </Typography>
        <Typography
        variant="h5"
          sx={{
            textAlign: "left",
            color: "#000000",
            // lineHeight: "2.5rem",
            mt: "18px",
          }}
        >
          Welcome to
          <span style={{ fontWeight: 600, color: theme.palette.primary.main }}>
            {" "}
            SMAC
          </span>
          , your hub for personal and professional growth.
        </Typography>
        <Typography
          variant="paragraph"
          sx={{
            lineHeight: "2.0rem",
            mt: "18px",
          }}
        >
          Here, you can connect, grow, and thrive in your career. Share updates,
          offer freelance services, buy or sell products, and explore courses to
          boost your skills.
        </Typography>
        <ButtonComp
          label={"Explore Now"}
          click={() => navigate("/about-us")}
          customStyles={{
            width: "180px",
            background: theme.palette.primary.main,
            color: "white",
            height: "56px",
            marginTop: "36px",
            // padding: "0",
          }}
        />
      </Box>
      <Box
        sx={{
          height: "100%",
          maxHeight: "606px",
          width: "100%",
          maxWidth: "723px",
          [theme.breakpoints.down("md")]: {
            marginTop: "24px",
          },
        }}
      >
        <ImageComp
          src={post}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};

export default AboutSMAC;
