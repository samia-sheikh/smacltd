import { Box, Typography } from "@mui/material";
import React from "react";
import { GoArrowDownRight } from "react-icons/go";
import ImageComp from "../../globalComponents/ImageComp";
import theme from "../../../theme";
const ModuleCard = ({ item, setActiveCategory }) => {
  return (
    <Box
      sx={{
        padding: "2rem 2.5rem",
        background: "#F1F1F1",
        borderRadius: "1.75rem",
        width: "100%",
        maxWidth: "405px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        [theme.breakpoints.down("lg")]: {
          maxWidth: "100%",
        },
      }}
      onClick={() => {
        setActiveCategory(item?.categories[0]);
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          lineHeight: "24px",
          letterSpacing: "-0.03em",
          color: "#333333",
          textTransform: "uppercase",
        }}
      >
        {item.cardTitle}
      </Typography>
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 300,
          lineHeight: "14px",
          color: "#263238",
        }}
      >
        {item.cardDescription}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "end" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "16px",
            letterSpacing: "-0.03em",
          }}
        >
          Browse By Category
        </Typography>
        <GoArrowDownRight />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "18px",
          gap: "10px",
        }}
      >
        {item?.categories?.map((module, index) => {
          return (
            <Box
              key={index}
              sx={{
                "&:hover": { background: module.categoryGradient },

                width: "100%",
                maxWidth: "241px",
                background: "#E6E6E6",
                padding: "0px 9px 13px 9px",
                borderRadius: "6.5px",
              }}
            >
              <Box
                sx={{
                  background: "#F1F1F1",
                  width: "32px",
                  height: "30px",
                  padding: "10px",
                  borderRadius: "0px 0px 6px 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageComp src={module.image} sx={{ width: "20px" }} />
              </Box>
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  lineHeight: "10px",
                  letterSpacing: "-0.03em",
                  mt: "19px",
                }}
              >
                {module.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ModuleCard;
