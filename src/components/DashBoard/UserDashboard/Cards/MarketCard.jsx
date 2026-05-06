import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Card,
  CardContent,
  Typography,
  // CardMedia,
} from "@mui/material";
import ImageComp from "../../../globalComponents/ImageComp";
import moment from "moment";
// import { useNavigate } from "react-router-dom";
import theme from "../../../../theme";
import useFetch from "../../../../features/hooks/useFetch";
import { useSelector } from "react-redux";
import {
  setProduct,
  setIsViewProductOpen,
} from "../../../../features/slice/Market/viewProductSlice";
import { useDispatch } from "react-redux";
import ViewProduct from "../../../Market/Modals/ViewProduct/ViewProduct";
const MarketCard = ({ product, setProductList, productList }) => {
  const { isViewProductOpen } = useSelector((state) => state.viewProduct);
  const [anchorEl, setAnchorEl] = useState(false);
  let dispatch = useDispatch();
  const { deleteData } = useFetch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // console.log(event, "event child Clicked");
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteOptionClick = () => {
    deleteData(`/api/product/${product.productId}`, (res) => {
      //after deleting data filter current data and set updated courses data
      const afterDelete = productList.filter((valueData) => {
        return valueData.productId !== product.productId;
      });
      setProductList(afterDelete);
      // console.log(res);
      handleClose();
    });
  };
  const handleViewProduct = (event) => {
    // console.log("parent clicked");
    if (!anchorEl) {
      event.stopPropagation();
      dispatch(setIsViewProductOpen({ open: !isViewProductOpen }));
      dispatch(setProduct({ product }));
    }
  };
  return (
    <>
      <ViewProduct />
      <Card
        sx={{
          position: "relative",
          maxWidth: 378,
          borderRadius: "15px",
          paddingBottom: "25px",
          padding: "22px",
          height: "523px",
        }}
      >
        <Box onClick={handleViewProduct}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                top: "0",
                right: "0",
              }}
            >
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={(e) => handleClick(e)}
                sx={{
                  isolation: "isolate",
                  // mixBlendMode:"difference",
                  color: "white",
                  backgroundColor: "black",
                  filter: "invert(1)",
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                  onClick={handleDeleteOptionClick}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Box>
            <ImageComp
              //   src={FilterProducts.images[0]}
              src={product?.images[0]}
              style={{
                width: "333px",
                borderRadius: "14px",
                objectFit: "cover",
                height: "339px",
              }}
              alt={product?.title.substring(0, 30)}
            />
          </Box>
          <CardContent
            sx={{
              padding: "0px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography variant="postUserTypo" sx={{ wordBreak: "break-all" }}>
              {/* {FilterProducts.title} */}
              {product?.title.substring(0, 25) + "....."}
            </Typography>
            <Typography variant="subHeader" sx={{ wordBreak: "break-all" }}>
              {product.description.length > 45
                ? product.description.substring(0, 45) + "....."
                : product.description}
            </Typography>
            <Typography variant="cardDates">
              {moment
                .utc(product?.createdAt)
                .local()
                .startOf("seconds")
                .fromNow()}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default MarketCard;
