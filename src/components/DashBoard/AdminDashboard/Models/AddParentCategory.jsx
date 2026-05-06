import { Box, Dialog, Divider, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import useFetch from "../../../../features/hooks/useFetch";
import TextInput from "../../../globalComponents/global_inputs/TextInput";
import ButtonComp from "../../../globalComponents/ButtonComp";
import theme from "../../../../theme";
import TextArea from "../../../globalComponents/global_inputs/TextArea";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useImagePreview } from "../../../../features/hooks/useImagePreview";
import ImageComp from "../../../globalComponents/ImageComp";
import CloseIcon from "@mui/icons-material/Close";

const initialValues = {
  // Define your form initial values here
  name: "",
  description: "",
};
const AddParentCategory = ({ isOpen, anyChanges, onClose, url }) => {
  const { loading, postData } = useFetch();
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [categoryPic, setCategoryPic] = useState(null);
  const [show, setShow] = useState(false);
  const iconRef = React.useRef(null);
  const picRef = React.useRef(null);
  const categoryIconPreview = useImagePreview(categoryIcon);
  const categoryPicPreview = useImagePreview(categoryPic);
  const handleCategoryIconChange = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage) {
      // //console.log("post pic is selected");
      setCategoryIcon(selectedImage);
    }
  };
  const handleCategoryPicChange = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage) {
      // //console.log("post pic is selected");
      setCategoryPic(selectedImage);
    }
  };
  const handleCategoryIconDelete = (e) => {
    if (categoryIconPreview) {
      // let newFilteredArray = [];
      // newFilteredArray = categoryIcon.filter((item) => item.name !== e.name);
      // setCategoryIcon(newFilteredArray);
      setCategoryIcon(null);
    }
  };
  const handleCategoryPicDelete = (e) => {
    if (categoryPicPreview) {
      // let newFilteredArray = [];
      // newFilteredArray = categoryIcon.filter((item) => item.name !== e.name);
      // setCategoryIcon(newFilteredArray);
      setCategoryPic(null);
    }
  };
  const closeModel = () => {
    setCategoryIcon(null);
    setCategoryPic(null);
    onClose();
  };
  const onSubmit = (values, { resetForm }) => {
    // //console.log(values);
    let payload = {
      name: values.name,
      description: values.description,
      icon: values.categoryIcon,
      banner: values.categoryPic,
    };
    //console.log(payload);
    postData(url, payload, undefined, undefined, true, (res) => {
      if (res) {
        resetForm();
        //console.log("response", res);
        // setIsOpen(false);
        anyChanges((prev) => !prev);
        closeModel();
      }
    });

    // Reset the form if needed
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category name is required"),
    description: Yup.string()
      .min(8, "Description must be at least 8 characters")
      .max(165, "Description can not be of more than 165 characters"),
    // categoryPic: Yup.mixed().test(
    //   "fileFormat",
    //   "Only WEBP and SVG files are allowed",
    //   (value) => {
    //     if (categoryPicPreview === null) {
    //       //console.log(value, "from upload post file valuve");
    //       !value || ["image/webp", "image/svg"].includes(value.type);
    //     } else {
    //       return true;
    //     }
    //   }
    // ),
  });

  const flexCol = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
  return (
    <Dialog
      open={isOpen}
      onClose={closeModel}
      PaperProps={{
        sx: {
          width: "clamp(18.75rem, 42.188vw + 10.313rem, 60.938rem)",

          borderRadius: "clamp(1rem, 0.75vw + 0.85rem, 1.75rem)",
        },
      }}
    >
      <Box
        sx={{
          padding:
            "clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem)   clamp(1.25rem, 1.79vw + 0.102rem, 2.25rem) 12px clamp(1.25rem, 1.79vw + 0.102rem, 2.25rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="bold20">Add Category</Typography>
        <IconButton
          onClick={closeModel}
          sx={{
            color: "black",
            width: "28px",
            height: "28px",

            padding: "2px",
          }}
        >
          <CloseIcon
            sx={{
              color: "black",
              height: "22px",
              width: "22px",
            }}
          />
        </IconButton>
      </Box>

      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        // style={{ height: "100%" }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Box
              {...flexCol}
              sx={{
                gap: "16px",
                padding:
                  "clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem) clamp(1.25rem, 1.79vw + 0.102rem, 2.25rem)",
              }}
            >
              <Field
                component={TextInput}
                placeholder="Name"
                type="text"
                name="name"
                label="name"
              />
              <Box sx={{ position: "relative", width: "100%" }}>
                <Field
                  component={TextArea}
                  placeholder="Description"
                  type={"text"}
                  name="description"
                  label="description"
                />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "48.5% 48.5%",
                  gap: "3%",
                  width: "100%",
                }}
              >
                <Box>
                  <Typography variant="bold20">Category Icon</Typography>

                  <Box
                    sx={{
                      mt: "12px",
                      border: "1px dashed  #BABABA",
                      borderRadius: "0.75rem",
                      height: "clamp(7.5rem, 6.488vw + 3.34rem, 11.125rem)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#F5F5F5",
                    }}
                  >
                    {categoryIconPreview && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <ImageComp
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "15px",
                            objectFit: "contain",
                          }}
                          src={categoryIconPreview}
                        />

                        <Box
                          onClick={(e) => handleCategoryIconDelete(e)}
                          sx={{
                            background: "#EDEDED",
                            color: "#FF5050",
                            width: "92px",
                            height: "28px",
                            padding: "2px",

                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </Box>
                      </Box>
                    )}
                    {!categoryIconPreview && (
                      <label
                        htmlFor="postImg-upload"
                        style={{
                          width: "100%",
                        }}
                      >
                        <input
                          ref={iconRef}
                          type="file"
                          name="icon"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="postImg-upload"
                          onChange={(e) => {
                            handleCategoryIconChange(e);
                            setFieldValue("categoryIcon", e.target.files[0]);
                          }}
                        />{" "}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <CloudUploadOutlinedIcon
                            sx={{
                              color: "#868686",
                              width: "40px",
                              height: "40px",
                            }}
                          />
                          <Typography
                            variant="uploadForm"
                            component={"div"}
                            sx={{ textAlign: "center" }}
                          >
                            Add Your Image
                          </Typography>
                        </Box>
                      </label>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="bold20">Category Image</Typography>

                  <Box
                    sx={{
                      mt: "12px",
                      border: "1px dashed  #BABABA",
                      borderRadius: "0.75rem",
                      background: "#F5F5F5",
                      height: "clamp(7.5rem, 6.488vw + 3.34rem, 11.125rem)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {!categoryPicPreview && (
                      <label
                        htmlFor="categoryPic-upload"
                        style={{
                          width: "100%",
                        }}
                      >
                        <input
                          ref={picRef}
                          type="file"
                          name="pic"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="categoryPic-upload"
                          onChange={(e) => {
                            handleCategoryPicChange(e);
                            setFieldValue("categoryPic", e.target.files[0]);
                          }}
                        />{" "}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <CloudUploadOutlinedIcon
                            sx={{
                              color: "#868686",
                              width: "40px",
                              height: "40px",
                            }}
                          />
                          <Typography
                            variant="uploadForm"
                            component={"div"}
                            sx={{ textAlign: "center" }}
                          >
                            Add Your Image
                          </Typography>
                        </Box>
                      </label>
                    )}
                    {categoryPicPreview && (
                      <Box
                        sx={{
                          position: "relative",
                        }}
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                      >
                        <ImageComp
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={categoryPicPreview}
                        />
                        {show && (
                          <Box
                            onClick={(e) => handleCategoryPicDelete(e)}
                            sx={{
                              background: "#EDEDED",
                              color: "#FF5050",
                              width: "92px",
                              height: "28px",
                              padding: "2px",
                              position: "absolute",
                              top: "calc(clamp(7.5rem, 6.488vw + 3.34rem, 11.125rem)/2)",
                              left: "35%",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            Remove
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <ButtonComp
                label={"Create category"}
                type={"submit"}
                disabled={loading}
                customStyles={{
                  width: "100%",
                  background: theme.palette.primary.main,
                  border: "1px solid #CFCFCF",
                  boxShadow: "0px 4px 14.3px 0px #93939338",
                  color: "white",
                }}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddParentCategory;
