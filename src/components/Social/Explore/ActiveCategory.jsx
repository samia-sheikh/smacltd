import { Box, Typography } from "@mui/material";
import React from "react";
import ImageComp from "../../globalComponents/ImageComp";
import { GoArrowDownRight } from "react-icons/go";
import theme from "../../../theme";
import useWindowSize from "../../../features/hooks/useInnerWidth";
import { useNavigate } from "react-router-dom";
const ActiveCategory = ({ activeCategory }) => {
  const { width } = useWindowSize();
  //console.log(width, "image check");
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: "2rem 0rem 0rem 2.5rem",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(213, 255, 255, 0.08) 0%, #F1F1F1 100%)",
        borderRadius: "1.75rem",
        width: "100%",
        maxWidth: "827px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        position: "relative",
        [theme.breakpoints.down("lg")]: {
          maxWidth: "100%",
          minHeight: "152px",
        },
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "clamp(2rem, 1.429vw + 1.286rem, 3rem)",
          fontWeight: 700,
          lineHeight: "49.92px",
          letterSpacing: "-0.03em",
        }}
      >
        {activeCategory.name}
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: "27px",
          color: "#263238",
        }}
      >
        {activeCategory.categoryDescription}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "0.5rem 1.25rem ",
          border: "1px solid black",
          width: "max-content",
          borderRadius: "12px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "44px",
            letterSpacing: "-0.03em",
            cursor: "pointer",
          }}
          onClick={() => navigate(activeCategory.navigate)}
        >
          Explore
        </Typography>
        <GoArrowDownRight size={"1.25em"} />
      </Box>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
        <Box sx={{ width: "100%" }}>
          <ImageComp
            src={activeCategory.categoryThumbnail}
            sx={{ width: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "max-content",
          display: "flex",
          position: "absolute",
          left: "2rem",
          bottom: "0px",
          gap: "18px",
          padding: "0px 0px 2rem 0px",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{ background: "#E6E6E6", padding: "1rem", borderRadius: "12px" }}
        >
          <Typography>{activeCategory.totalItems}</Typography>
        </Box>
        <Box
          sx={{ background: "#E6E6E6", padding: "1rem", borderRadius: "12px" }}
        >
          <Typography>{activeCategory.totalSellers}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ActiveCategory;
