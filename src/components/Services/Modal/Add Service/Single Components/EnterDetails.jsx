import { Box, Typography, Button } from "@mui/material";
import React from "react";
import TextInput from "../../../../globalComponents/global_inputs/TextInput";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextArea from "../../../../globalComponents/global_inputs/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../../../../../features/slice/addProductSlice";
import { setServiceDetails } from "../../../../../features/slice/addServiceSlice";
import { setUserServiceDetails } from "../../../../../features/slice/addUserServiceSlice";
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be atleast 3 character")
    .max(100, "Title should be less then 100 character")
    .required("Title or Name is required"),
    serviceFee: Yup.string()
    .matches(/^\d+$/, "Only numeric value is allowed")
    .max(10, "Price must be less than 10-digit")
    .required("Enter Product Price"),
  description: Yup.string()
    .max(1000, "Description should be less than 1000 Character")
    .required("Description is required"),
});

const EnterDetails = ({ activeStep, setActiveStep }) => {
  let dispatch = useDispatch();
  const { userServiceDetails } = useSelector((state) => state.addUserService);
  const initialValues = {
    // Define your form initial values here
    title: userServiceDetails?.title || "",
    serviceFee: parseInt(userServiceDetails?.price) || 0,
    description: userServiceDetails?.description || "",
  };
  const onSubmit = (values) => {
    let obj = {
      userService: {
        ...userServiceDetails,
        ...values,
      },
    };
    dispatch(setUserServiceDetails(obj));
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
                placeholder="Service Price"
                type="text"
                name="serviceFee"
                label="Service Price"
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
