import React from "react";
import theme from "../../../theme";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../../components/Market/Cards/Card";
import ViewProduct from "../../../components/Market/Modals/ViewProduct/ViewProduct";

const SearchedProducts = () => {
  const { products, searchValue } = useSelector((state) => state.globalSearch);
  return (
    <Box
      sx={{
        margin: "0 auto",
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "24% 24% 24% 24%",
        gridAutoRows: "462px",
        [theme.breakpoints.down("lg")]: {
          gridTemplateColumns: "32% 32% 32%",
        },
        [theme.breakpoints.down("md")]: {
          gridTemplateColumns: "49% 49%",
        },
        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "auto",
          justifyItems: "center",
        },
      }}
    >
      {products?.length === 0 ? (
        <Typography variant="h4Black">
          There are no products for query {searchValue}
        </Typography>
      ) : (
        products?.map((cardData, index) => {
          return <ProductCard cardData={cardData} key={index} />;
        })
      )}
      <ViewProduct />
    </Box>
  );
};

export default SearchedProducts;
