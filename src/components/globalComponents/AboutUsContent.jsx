import { Box, Typography } from "@mui/material";
import React from "react";
import ButtonComp from "./ButtonComp";
import ImageComp from "./ImageComp";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";

const AboutUsContent = ({ title, details, navigation, reverse, imageSrc }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: reverse ? "row-reverse" : "row",
        marginBottom: "150px",
        marginTop: "150px",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          marginBottom: "70px",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "723px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Typography variant="h2">{title}</Typography>
        <Typography variant="uploadForm">{details}</Typography>
        <ButtonComp
          label={"Explore Now"}
          click={()=>navigate(navigation)}
          customStyles={{
            width: "180px",
            background: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "8px",
            fontWeight: "400 !important",
            padding: "14px",
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
          src={imageSrc}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};

export default AboutUsContent;
