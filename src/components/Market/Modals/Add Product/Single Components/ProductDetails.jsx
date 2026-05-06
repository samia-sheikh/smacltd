import { Box, Typography, Button } from "@mui/material";
import React from "react";
import ImageComp from "../../../../globalComponents/ImageComp";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../../features/hooks/useFetch";
import Loader from "../../../../globalComponents/loader";
import {
  setProductDetails,
  setProductImages,
} from "../../../../../features/slice/addProductSlice";

const ProductDetails = ({
  activeStep,
  setActiveStep,
  marketImages,
  setMarketImages,
  setNewProduct,
}) => {
  const { productDetails } = useSelector((state) => state.addProduct);
  const { loading, postData } = useFetch();
  let dispatch = useDispatch();
  // handler for back in  stepper/multistate
  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };
  //add product function
  const handleAddProduct = () => {
    // let subCat = productDetails.subCategories.map((c) => {
    //   // return c.title;
    //   return c;
    // });
    let selectedItemId = [];
    for (
      let index = 0;
      index < productDetails?.subCategories?.length;
      index++
    ) {
      selectedItemId.push(productDetails?.subCategories[index].id);
    }
    // formate payload as required
    let payload = {
      ...productDetails,
      images: marketImages,
      subCategories: selectedItemId,
      parentCategory: productDetails?.parentCategory?.productParentCategoryId,
    };

    if (marketImages?.length && productDetails) {
      postData("/api/product", payload, undefined, undefined, true, (res) => {
        //reset redux after adding product
        setNewProduct(res.data);
        dispatch(setProductDetails({ product: null }));
        dispatch(setProductImages({ product: null }));
        setMarketImages("");
        setActiveStep((prevActiveStep) => {
          return prevActiveStep + 1;
        });
      });
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "13.5px", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <CollectionsOutlinedIcon sx={{ color: "#0FA5E9" }} />
        {marketImages?.length > 0 && (
          <Typography variant="h5">
            {marketImages?.length + " "}
            {`${marketImages?.length === 1 ? "Picture" : "Pictures"}`} to upload
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {marketImages?.length &&
          Object.keys(marketImages).map((key) => {
            if (key !== "length") {
              const fileObject = marketImages[key];
              return (
                <ImageComp
                  key={key}
                  src={URL.createObjectURL(fileObject)}
                  sx={{
                    width: "256px",
                    height: "152px",
                    borderRadius: "8px",
                    obectFit: "contain",
                  }}
                />
              );
            }
            return null;
          })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          wordBreak: "break-all",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "8px",
            maxWidth: "100%",
          }}
        >
          <Typography
            variant="subHeaderBlack"
            sx={{ width: "100%", maxWidth: "43px" }}
          >
            Title
          </Typography>
          <Typography variant="subHeader">{productDetails?.title}</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "8px",

            maxWidth: "100%",
          }}
        >
          <Typography variant="subHeaderBlack">Product Price:</Typography>
          <Typography variant="subHeader">{productDetails?.price}</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "8px",
            "@media(max-width:420px)": {
              flexDirection: "column",
            },
          }}
        >
          <Typography
            variant="subHeaderBlack"
            sx={{ width: "100%", maxWidth: "105px" }}
          >
            Description:
          </Typography>
          <Typography
            variant="subHeader"
            sx={{ width: "100%", wordBreak: "break-all" }}
          >
            {productDetails?.description}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => handleBack(activeStep)}
          sx={{ padding: "12px 40px", fontSize: "16px" }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleAddProduct}
          sx={{ padding: "12px 40px", fontSize: "16px" }}
          disabled={loading}
        >
          Add Now {loading ? <Loader /> : null}
        </Button>
      </Box>
    </Box>
  );
};
export default ProductDetails;
