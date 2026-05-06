import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../../../../../features/slice/addProductSlice";
import theme from "../../../../../theme";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useFetch from "../../../../../features/hooks/useFetch";
import ImageComp from "../../../../globalComponents/ImageComp";

const SelectCategory = ({ activeStep, setActiveStep }) => {
  const { productParentCategories } = useSelector(
    (state) => state.parentCategories
  );
  const { productDetails } = useSelector((state) => state.addProduct);
  const [selectedItems, setSelectedItems] = useState(
    productDetails?.subCategories ? productDetails?.subCategories : []
  );
  const [selectedParentCategory, setSelectedParentCategory] = useState(
    productDetails?.parentCategory
      ? productDetails?.parentCategory.name
      : productParentCategories[0]?.name
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [parentId, setParentID] = useState(
    productParentCategories[0]?.productParentCategoryId
  );
  //new code
  let dispatch = useDispatch();
  const { fetchData } = useFetch();

  //function to get sub categories of a selected parent category
  async function getSubcategories(parent_id) {
    // //console.log("get sub category function");
    let subCategoryOfParent = [];
    await fetchData(
      `/api/product/sub?parentCategoryId=${parent_id}`,
      undefined,
      (res) => {
        subCategoryOfParent = res?.data || [];
        setSelectedSubCategories(subCategoryOfParent);
      }
    );
  }
  // function to get parent categories from the course array
  function getParentCategory() {
    // //console.log("get parent category function");
    const currentParent = productParentCategories?.find(
      (cat) => cat.name === selectedParentCategory
    );
    if (currentParent) {
      // //console.log(currentParent.name, "current Parent");
      setParentID(currentParent);
      getSubcategories(currentParent.productParentCategoryId);
    }
  }
  function handleSelect(data) {
    // //console.log("handle select function");
    const isSelected = selectedItems.some((item) => item.id === data.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item.id !== data.id));
    } else {
      setSelectedItems([...selectedItems, data]);
    }
  }
  // Array of different titles for each interest
  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep + 1;
    });
  };

  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };
  //reRender data on items selection
  const updateRedux = () => {
    // //console.log("update redux function");

    // setCategoriesData(selectedItemId);
    dispatch(
      setProductDetails({
        product: {
          parentCategory: parentId,
          subCategories: selectedItems,
        },
      })
    );
  };

  useEffect(() => {
    getParentCategory();
    updateRedux();
  }, [selectedItems, parentId]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        height: "100%",
      }}
    >
      <Box>
        <Typography variant="postUserTypo">Parent Catergory</Typography>
        <Autocomplete
          options={productParentCategories}
          id="productParentCategories"
          sx={{ border: "none", mt: "8px" }}
          getOptionLabel={(option) => option.name || ""}
          defaultValue={
            productDetails?.parentCategory
              ? { ...productDetails.parentCategory }
              : { ...productParentCategories[0] }
          }
          isOptionEqualToValue={(option, value) =>
            option.productParentCategoryId === value.productParentCategoryId
          }
          onChange={(e) => {
            setSelectedParentCategory(e.target.textContent.trim());
            setSelectedItems([]);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Select Parent Category"
            />
          )}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <Typography variant="postUserTypo">Sub Catergory</Typography>
          <Box
            sx={{
              marginTop: "8px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                maxHeight: "500px",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
            >
              {selectedParentCategory
                ? selectedSubCategories?.map((catdata, index) => {
                    const data = {
                      id: catdata.productSubCategoryId,
                    };
                    const isSelected = selectedItems.some(
                      (item) => item.id === catdata.productSubCategoryId
                    );
                    return (
                      <Box
                        key={catdata.productSubCategoryId}
                        sx={{
                          height: "250px",
                          width: "256px",
                          backgroundSize: "cover",
                          borderRadius: "8px",
                          border: isSelected
                            ? `1px solid ${theme.palette.primary.main}`
                            : "1px solid #00000030",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: "16px",
                          boxShadow: isSelected
                            ? "0px 0px 15px 1px #00000040"
                            : "none",
                          color: isSelected
                            ? theme.palette.primary.main
                            : "grey",
                        }}
                        onClick={() => handleSelect(data)}
                      >
                        <ImageComp src={catdata.icon} />
                        <Typography>
                          {catdata?.name ? catdata?.name : "testing text"}
                        </Typography>
                      </Box>
                    );
                  })
                : null}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "24px" }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => handleBack(activeStep)}
            sx={{ padding: "12px 40px", fontSize: "16px" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => handleNext(activeStep)}
            sx={{ padding: "12px 40px", fontSize: "16px" }}
            disabled={
              selectedItems?.length === 0 ||
              selectedParentCategory?.length === 0
            }
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectCategory;
