import { Box, Button, Dialog, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ImageComp from "../../../globalComponents/ImageComp";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsViewProductOpen,
  setProduct,
} from "../../../../features/slice/Market/viewProductSlice";
import theme from "../../../../theme";
import ButtonComp from "./../../../globalComponents/ButtonComp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProfilePicture from "../../../globalComponents/ProfilePicture";
const ViewProduct = ({ dataShow, handleClose }) => {
  //model to view details of single product
  const { isViewProductOpen } = useSelector((state) => state.viewProduct);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const handleCommentClose = () => {
    dispatch(setProduct({ product: null }));
    dispatch(setIsViewProductOpen({ open: !isViewProductOpen }));
  };
  // //console.log(users,"uuuu");
  const { product } = useSelector((state) => state.viewProduct);

  //slide to previous image
  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage
      ? product?.images.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
    //console.log(currentIndex, "clicked prev");
  };

  //slide to next image
  const goToNext = () => {
    const isLastImage = currentIndex === product?.images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    //console.log(currentIndex, "clicked next");
  };

  const dialogStyles = {
    "& .MuiDialog-container": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px", // Remove container padding if necessary
    },
    "& .MuiDialog-paper": {
      width: "100%", // Ensures full width of the modal
      maxWidth: "828px", // Sets max width to 828px
      padding: "30px", // Applies the desired padding
      margin: "0", // Remove any margins
      borderRadius: "16px", // Border radius if needed
      boxSizing: "border-box", // Ensures padding is inside the width
    },
  };
  return (
    <Box
      sx={{
        "& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
          backgroundColor: "red !important",
        },
      }}
    >
      <Dialog
        sx={{
          ...dialogStyles,
        }}
        open={isViewProductOpen}
        onClose={handleCommentClose}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleClose ? handleClose : handleCommentClose}
                sx={{ minWidth: "16px !important", padding: "0px" }}
              >
                <CloseRoundedIcon sx={{ color: "black" }} />
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <ProfilePicture
                src={dataShow ? dataShow.profilePic : product?.user?.profilePic}
                firstName={dataShow?.user?.firstName}
                lastName={dataShow?.user?.lastName}
                sx={{
                  width: "100px",
                  height: "100px",
                }}
                innerBox={{
                  width: "85px",
                  height: "85px",
                }}
              />
              <Typography variant="h2" sx={{ textTransform: "capitalize" }}>
                {dataShow
                  ? dataShow.user?.firstName.substring(0, 10) +
                    " " +
                    dataShow.user?.lastName.substring(0, 10)
                  : product?.user?.firstName.substring(0, 10) +
                    " " +
                    product?.user?.lastName.substring(0, 10)}
              </Typography>
            </Box>
            <Box sx={{ position: "relative" }}>
              <ImageComp
                src={
                  dataShow
                    ? dataShow.images[currentIndex]
                    : product?.images[currentIndex]
                }
                sx={{
                  width: "100%",
                  maxHeight: "428px",
                  objectFit: "contain",
                }}
              />

              <IconButton
                onClick={goToPrevious}
                sx={{
                  background: "white",
                  position: "absolute",
                  bottom: "50%",
                  left: 5,
                  border: `1px solid${theme.palette.primary.main}`,
                  "&:hover": { background: theme.palette.primary.main },
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                onClick={goToNext}
                sx={{
                  background: "white",
                  position: "absolute",
                  bottom: "50%",
                  right: 5,
                  border: `1px solid${theme.palette.primary.main}`,
                  "&:hover": { background: theme.palette.primary.main },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                "@media(max-width:420px)": {
                  flexWrap: "wrap",
                },
              }}
            >
              <Typography
                variant="productTitle"
                sx={{ wordBreak: "break-all" }}
              >
                {dataShow ? dataShow.title : product?.title}
              </Typography>
              <Typography
                variant="productTitle"
                sx={{ color: `${theme.palette.primary.main}`, display: "flex" }}
              >
                Rs. {dataShow ? dataShow.price : product?.price}
              </Typography>
            </Box>
            <Box
              sx={{ height: "1px", width: "100%", backgroundColor: "#E6E6E6" }}
            />
            <Typography variant="h5" sx={{ wordBreak: "break-all" }}>
              {dataShow ? dataShow.description : product?.description}
            </Typography>
          </Box>
          <ButtonComp
            label={"Send Message"}
            customStyles={{
              borderRadius: "12px",
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
};
export default ViewProduct;
