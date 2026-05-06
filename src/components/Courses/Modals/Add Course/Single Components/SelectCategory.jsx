import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { setServiceDetails } from "../../../../../features/slice/addServiceSlice";
import useFetch from "../../../../../features/hooks/useFetch";
import { CategoryMobile } from "../../../../globalComponents/constants";
import ImageComp from "../../../../globalComponents/ImageComp";

const SelectCategory = ({ activeStep, setActiveStep }) => {
  const { courseParentCategories } = useSelector(
    (state) => state.parentCategories
  );
  const { serviceDetails } = useSelector((state) => state.addService);
  // send this data from parent or redux
  const [selectedItems, setSelectedItems] = useState(
    serviceDetails?.subCategories ? serviceDetails?.subCategories : []
  );
  const [selectedParentCategory, setSelectedParentCategory] = useState(
    serviceDetails?.parentCategory
      ? serviceDetails?.parentCategory.name
      : courseParentCategories[0].name
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [parentId, setParentID] = useState(
    courseParentCategories[0].courseParentCategoryId
  );

  const { fetchData } = useFetch();
  //new code
  let dispatch = useDispatch();
  //reRender data on items selection
  //function to get sub categories of a selected parent category
  async function getSubcategories(parent_id) {
    let subCategoryOfParent = [];

    await fetchData(
      `/api/course/sub?parentCategoryId=${parent_id}`,
      undefined,
      (res) => {
        subCategoryOfParent = res?.data || [];
        setSelectedSubCategories(subCategoryOfParent);
      }
    );
  }
  // function to get parent categories from the course array
  function getParentCategory() {
    const currentParent = courseParentCategories.find(
      (cat) => cat.name === selectedParentCategory
    );
    if (currentParent) {
      setParentID(currentParent);
      getSubcategories(currentParent.courseParentCategoryId);
    }
  }
  //function to select and deselect a sub category
  function handleSelect(data) {
    const isSelected = selectedItems.some((item) => item.id === data.id);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item.id !== data.id));
    } else {
      setSelectedItems([...selectedItems, data]);
    }
  }
  // Array of different titles for each interest
  const handleNext = (e) => {
    if (selectedItems.length > 0) {
      setActiveStep((prevActiveStep) => {
        return prevActiveStep + 1;
      });
    }
  };

  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };
  const updateRedux = () => {
    dispatch(
      setServiceDetails({
        service: {
          ...serviceDetails,
          subCategories: selectedItems,
          parentCategory: parentId,
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
      }}
    >
      <Box>
        <Autocomplete
          id="parentCategory"
          options={courseParentCategories}
          placeholder="Select a parent category"
          sx={{ border: "none" }}
          getOptionLabel={(option) => option.name || ""}
          defaultValue={
            serviceDetails?.parentCategory
              ? { ...serviceDetails?.parentCategory }
              : { ...courseParentCategories[0] }
          }
          isOptionEqualToValue={(option, value) =>
            option.courseParentCategoryId === value.courseParentCategoryId
          }
          onChange={(e) => {
            setSelectedParentCategory(e.target.textContent.trim());
            setSelectedItems([]);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select a parent category"
              variant="outlined"
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="postUserTypo">Sub Category</Typography>
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
              height: "100%",
              maxHeight: "500px",
              minHeight: "200px",
              display: "flex",

              gap: "20px",
              flexWrap: "wrap",
              overflowY: "scroll",
              width: "100%",
            }}
          >
            {selectedParentCategory
              ? selectedSubCategories?.map((catdata, index) => {
                  const data = {
                    id: catdata.courseSubCategoryId,
                  };
                  const isSelected = selectedItems.some(
                    (item) => item.id === catdata.courseSubCategoryId
                  );
                  return (
                    <Box
                      key={catdata.courseSubCategoryId}
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
                        color: isSelected ? theme.palette.primary.main : "grey",
                      }}
                      onClick={() => handleSelect(data)}
                    >
                      {/* <CategoryMobile /> */}
                      <ImageComp src={catdata.icon} />
                      <Typography textAlign={"center"}>
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
          sx={{ padding: "12px 40px", color: "white", fontSize: "16px" }}
          disabled={
            selectedItems.length === 0 || selectedParentCategory.length === 0
          }
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SelectCategory;
