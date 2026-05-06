import { Box, Typography, Button } from "@mui/material";
import React from "react";
import TextInput from "../../../../globalComponents/global_inputs/TextInput";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextArea from "../../../../globalComponents/global_inputs/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../../../../../features/slice/addProductSlice";
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be atleast 3 character")
    .max(100, "Title should be less then 100 character")
    .required("Title or Name is required"),
  price: Yup.string()
    .matches(/^\d+$/, "Only numeric value is allowed")
    .max(10, "Price must be less than 10-digit")
    .required("Enter Product Price"),
  description: Yup.string()
    .max(1000, "Description should be less than 1000 Character")
    .required("Description is required"),
});

const EnterDetails = ({ activeStep, setActiveStep }) => {
  let dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.addProduct);
  const initialValues = {
    // Define your form initial values here
    title: productDetails?.title || "",
    price: productDetails?.price || "",
    description: productDetails?.description || "",
  };
  const onSubmit = (values) => {
    let obj = {
      product: {
        ...productDetails,
        ...values,
      },
    };
    dispatch(setProductDetails(obj));
    handleNext(activeStep);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep + 1;
    });
  };

  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };
  return (
    <Box>
      <Typography variant="h5">Enter your details</Typography>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "16px",
                mt: "24px",
                maxWidth: "auto !important",
              }}
            >
              <Field
                component={TextInput}
                placeholder="Title"
                type="text"
                name="title"
                label="title"
              />

              <Field
                component={TextInput}
                placeholder="Product Price"
                type="text"
                name="price"
                label="Product Price"
              />
              <Field
                component={TextArea}
                placeholder="Description"
                type="text"
                name="description"
                label="description"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
              />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "24px" }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={() => handleBack(activeStep)}
                sx={{ padding: "12px 40px", fontSize: "16px" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                type={"submit"}
                // onClick={() => {
                //   handleNext(activeStep);
                // }}
                sx={{ padding: "12px 40px", fontSize: "16px" }}
              >
                Next
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default EnterDetails;
