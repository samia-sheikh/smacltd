import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/Market/Cards/Card";
import useFetch from "../../../features/hooks/useFetch";
import { Box } from "@mui/material";
import theme from "../../../theme";

const ProductsTab = () => {
  const { fetchData } = useFetch();
  const [productCardList, setProductCradList] = useState([]);
  useEffect(() => {
    fetchData("/api/product/my-products", undefined, (res) => {
      setProductCradList(res?.data);
    });
  }, []);
  return (
    <Box
      sx={{
        margin: "0 auto",
        display: "grid",
        gap: "20px",

        gridTemplateColumns: "49% 49%",
        // gridAutoRows: "462px",

        [theme.breakpoints.down("md")]: {
          gridTemplateColumns: "auto",
          justifyItems: "center",
        },
      }}
    >
      {productCardList?.map((products) => {
        return <ProductCard cardData={products} key={products.productId} />;
      })}
    </Box>
  );
};

export default ProductsTab;
