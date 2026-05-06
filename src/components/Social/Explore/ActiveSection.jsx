import { Box, Typography } from "@mui/material";
import React from "react";
import { GoArrowDownRight } from "react-icons/go";
import ImageComp from "../../globalComponents/ImageComp";
import theme from "../../../theme";
const ActiveSection = ({
  item,
  setActiveCategory,
  activeCategory,
  scrollToSection,
}) => {
  return (
    <Box
      sx={{
        padding: "2rem 2.5rem",
        background: "#F1F1F1",
        borderRadius: "1.75rem",
        width: "100%",
        maxWidth: "827px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        [theme.breakpoints.down("lg")]: {
          maxWidth: "100%",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "clamp(2rem, 1.429vw + 1.286rem, 3rem)",
          fontWeight: 700,
          lineHeight: "49.92px",
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
        }}
      >
        {item.cardTitle}
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 300,
          lineHeight: "22px",
          color: "#263238",
        }}
      >
        {item.cardDescription}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "end" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "20.8px",
            letterSpacing: "-0.03em",
          }}
        >
          Browse By Category
        </Typography>
        <GoArrowDownRight size={"1.25em"} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "18px",
          gap: "10px",
          [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
          },
        }}
      >
        {item?.categories?.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                "&:hover": { background: item.categoryGradient },
                cursor:"pointer",
                width: "100%",
                maxWidth: "241px",
                background:
                  activeCategory.id === item.id
                    ? `${item.categoryGradient}`
                    : "#E6E6E6",
                padding: "0px 21px 30px 21px",
                borderRadius: "14px",
                [theme.breakpoints.down("lg")]: {
                  maxWidth: "100%",
                  minHeight: "152px",
                },
              }}
              onClick={() => {
                setActiveCategory(item);
                scrollToSection(item.ref);
              }}
            >
              <Box
                sx={{
                  background: "#F1F1F1",
                  width: "70px",
                  height: "62px",
                  padding: "10px",
                  borderRadius: "0px 0px 9px 9px",
                }}
              >
                <ImageComp src={item.image} />
              </Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "20.8px",
                  letterSpacing: "-0.03em",
                  mt: "19px",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ActiveSection;
