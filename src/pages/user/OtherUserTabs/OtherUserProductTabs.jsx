import React, { useEffect, useState } from "react";
import useFetch from "../../../features/hooks/useFetch";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/Market/Cards/Card";
import { Box } from "@mui/material";
import theme from "../../../theme";

const OtherUserProductTabs = () => {
  const [otherUserProducts, setOtherUserProducts] = useState([]);
  const { fetchData } = useFetch();
  const { id } = useParams();

  useEffect(() => {
    fetchData(
      `/api/product/getallProductsOfSpecificUser/${id}`,
      undefined,
      (res) => {
        // //console.log(res);
        setOtherUserProducts(res?.data);
      }
    );
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
      {otherUserProducts?.map((products) => {
        return <ProductCard cardData={products} key={products.productId} />;
      })}
    </Box>
  );
};

export default OtherUserProductTabs;
