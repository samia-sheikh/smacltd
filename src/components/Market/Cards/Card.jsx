import React, { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import ViewButton from "../Button/ViewButton";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setIsViewProductOpen,
//   setProduct,
// } from "../../../features/slice/Market/viewProductSlice";
import { useNavigate } from "react-router-dom";
import theme from "./../../../theme";
const ProductCard = ({ cardData, index }) => {
  const [show, setShow] = useState(false);
  // const { isViewProductOpen } = useSelector((state) => state.viewProduct);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleViewProduct = (details) => {
  //   //function to open product details and set single product data to redux
  //   dispatch(setIsViewProductOpen({ open: !isViewProductOpen }));
  //   dispatch(setProduct({ product: details }));
  // };
  function convertToK(number) {
    if (number >= 10000) {
      return (number / 1000).toFixed(1) + "k";
    }
    return number?.toString();
  }
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        borderRadius: "8px",
        maxWidth: "847px",
        padding: "clamp(1rem, 1.026vw + 0.519rem, 1.75rem)",
        gap: "1rem",
        border: " 1.03px solid #F8F8F8",
        boxShadow: "none",
        position: "relative",
        // "@media(max-width:375px)": {
        //   maxWidth: "250px",
        // },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "410px",
          // background:
          //   " radial-gradient(50% 50% at 50% 50%, rgba(213, 255, 255, 0.08) 0%, #F1F1F1 100%)",
          borderRadius: "10px",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => {
          // handleViewProduct(cardData);
          navigate(`/market/${cardData?.productId}`);
        }}
      >
        <Box sx={{ position: "absolute" }}>
          <ViewButton product={cardData} show={show} />
        </Box>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "252px",
            objectFit: "contain",
            [theme.breakpoints.down("sm")]: {
              height: "290px",
            },
          }}
          src={cardData.images[0]}
          alt="green iguana"
        />
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "space-between",
          width: "100%",
          padding: "0px",
          maxWidth: "368px",
        }}
      >
        <Typography size="small" color="primary">
          {cardData.createdAt.substring(0, 10)}
        </Typography>

        <Typography
          gutterBottom
          variant="bold24Black"
          // sx={{
          //   maxWidth:"50%"
          // }}
        >
          {cardData.title.length > 35
            ? cardData.title.substring(0, 35) + ".."
            : cardData.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ wordBreak: "break-all" }}
        >
          {cardData?.description.length > 100
            ? cardData.description.substring(0, 100) + "....."
            : cardData.description}
        </Typography>
        <Typography
          variant="contained"
          style={{
            borderRadius: "7px",
            width: "max-content",
            background: "#14B8A6",
            padding: "10px",
            color: "white",
          }}
        >
          PKR &nbsp;{convertToK(cardData.price)}
        </Typography>
      </CardContent>
      {index % 3 === 0 ? (
        <Box
          sx={{
            background: "linear-gradient(90deg, #CA8009 0%, #DDA949 100%)",
            fontWeight: 600,
            fontSize: "1rem",
            color: "white",
            height: "36px",
            width: "max-content",
            padding: "8px 28px",
            borderBottomLeftRadius: "1.25rem",
            borderBottomRightRadius: "1.25rem",
            position: "absolute",
            right: 26,
            top: 0,
          }}
        >
          Featured
        </Box>
      ) : null}
    </Card>
  );
};

export default ProductCard;
