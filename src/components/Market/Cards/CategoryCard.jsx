import { Box, Typography } from "@mui/material";
import React from "react";
import ImageComp from "../../globalComponents/ImageComp";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ value, id, parentModule, backgrounds }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        key={id}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "clamp(9.375rem, 4.2vw + 8.273rem, 13.313rem)",
          height: "clamp(9.375rem, 1.6vw + 8.955rem, 10.875rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "33px", // Applying the border radius
          boxShadow: "0px 0px 22.4px 0px #D0E5F9 inset",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, #11669D 0%, #1AFBFB 50%, #E30256 100%)", // Using the color as background instead of borderImageSource
          padding: "3px", // Ensuring some space between the content and border
          cursor: "pointer",
        }}
        onClick={() => {
          if (parentModule === "service") {
            navigate(`category/${value.serviceParentCategoryId}`);
            // return;
          } else if (parentModule === "product") {
            navigate(`category/${value.productParentCategoryId}`);
            // return;
          } else {
            navigate(`category/${value.courseParentCategoryId}`);
          }
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F9F9F9", // Inner content box background
            width: "100%",
            height: "100%",
            borderRadius: "inherit", // Inherit the same border radius
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
          }}
        >
          <ImageComp
            src={value.icon}
            alt={value.name}
            style={{ width: "100% ", maxWidth: "64px", minHeight: "64px" }} // Fixing the width of the image
          />
          <Typography variant="topCategoriesContent">{value.name}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default CategoryCard;
