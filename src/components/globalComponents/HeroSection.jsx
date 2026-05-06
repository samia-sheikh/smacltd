import { Box } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";

const HeroSection = ({ title, description,customStyles }) => {
  return (
    <Box>
      <Box
        sx={{
          height: customStyles?customStyles:"189px",
          background:"#4AEDDB1F",
          // background:
          //   "linear-gradient(90deg, #E6F9FE 0.03%, #E6F9FE 50.42%, #EDDDFB 99.96%)",
          "@media (min-width: 601px) and (max-width: 862px)": {
            height: "240px",
          },
        }}
      >
        <Box sx={{ margin: "0 auto", width: "95%", maxWidth: "828px" }}>
          <Box
            sx={{
              width: "88.50%",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: "40px",
            }}
          >
            <Typography variant="black24">{title}</Typography>
            <Typography
              variant="h5"
              sx={{ marginTop: "8px", lineHeight: "30px" }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
