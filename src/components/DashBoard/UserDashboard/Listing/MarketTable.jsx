import React, { useState } from "react";
import {
  IconButton,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../features/hooks/useFetch";
import ImageComp from "../../../globalComponents/ImageComp";
import theme from "../../../../theme";
import {
  setIsViewProductOpen,
  setProduct,
} from "../../../../features/slice/Market/viewProductSlice";
import ViewProduct from "../../../Market/Modals/ViewProduct/ViewProduct";
const MarketTable = ({ product, setProductList, productList }) => {
  let market = product;
  const { isViewProductOpen } = useSelector((state) => state.viewProduct);
  const [anchorEl, setAnchorEl] = useState(false);
  let dispatch = useDispatch();
  const { deleteData } = useFetch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // //console.log(event, "event child Clicked");
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteOptionClick = () => {
    deleteData(`/api/product/${product.productId}`, (res) => {
      //after deleting data filter current data and set updated markets data
      const afterDelete = productList.filter((valueData) => {
        return valueData.productId !== product.productId;
      });
      setProductList(afterDelete);
      // //console.log(res);
      handleClose();
    });
  };
  const handleViewProduct = (event) => {
    // //console.log("parent clicked");
    if (!anchorEl) {
      event.stopPropagation();
      dispatch(setIsViewProductOpen({ open: !isViewProductOpen }));
      dispatch(setProduct({ product }));
    }
  };
  // Function to format date
  function convertCreatedAtTime(params) {
    const date = new Date(params);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <ViewProduct />

      <TableRow>
        <TableCell
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "none",
          }}
        >
          <ImageComp
            onClick={handleViewProduct}
            src={market?.images[0]}
            alt={market?.title}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">{market?.title}</Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {market?.totalEnrollments || "N/A"}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {convertCreatedAtTime(market?.createdAt)}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">{market?.status || "Active"}</Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          {/* <IconButton aria-label="more">
                </IconButton> */}
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
            <RiArrowDropDownLine />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
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
        </TableCell>
      </TableRow>
    </>
  );
};

export default MarketTable;
