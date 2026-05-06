import {
  Box,
  Typography,
  Button,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../../../globalComponents/global_inputs/TextInput";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextArea from "../../../../globalComponents/global_inputs/TextArea";
import theme from "../../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { setServiceDetails } from "../../../../../features/slice/addServiceSlice";
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be 3 Character")
    .max(100, "Title Should be less then 100 Character")
    .required("Course title is required"),
  mode: Yup.string().required("Please check one of above"),
  classDuration: Yup.string().required("Specify class duration"),
  courseDuration: Yup.string().required("Course duration is required"),
  // classDays: Yup.array().required("select the days"),
  courseFee: Yup.string()
    .matches(/^\d+$/, "Only numeric value is allowed")
    .required("Enter the course fee")
    .max(10, "Course fee must be less than 10-digit "),

  description: Yup.string()
    .max(1000, "Description should be less than 1000 Character")
    .required("Description is required"),
});

const EnterDetails = ({ activeStep, setActiveStep }) => {
  let dispatch = useDispatch();
  const { serviceDetails } = useSelector((state) => state.addService);
  const onSubmit = (values) => {
    let obj = {
      service: {
        ...serviceDetails,
        ...values,
      },
    };
    dispatch(setServiceDetails(obj));
    handleNext(activeStep);
  };
  const initialValues = {
    // Define your form initial values here
    title: serviceDetails?.title || "",
    mode: serviceDetails?.mode || "",
    classDuration: serviceDetails?.classDuration || "",
    courseDuration: serviceDetails?.courseDuration || "",
    courseFee: serviceDetails?.courseFee || "",
    classDays: serviceDetails?.classDays || null,
    description: serviceDetails?.description || "",
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

  const [isFocused, setIsFocused] = useState(false);
  const inputStyles = {
    width: "100%",
    minWidth: "280px",
    borderRadius: "30px",
    height: "60px",
    border: isFocused ? "1px solid #14A898" : "1px solid #DCDCDC", // Transparent border on focus
    paddingRight: "24px",
    paddingLeft: "30px",
    appearance: "none",
    backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="gray"><path d="M7 10l5 5 5-5z"/></svg>')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "calc(100% - 15px) center",
    backgroundSize: "16px",
    outline: "none", // Removes the default focus outline
    transition: "border-color 0.2s ease", // Smooth transition for border change
  };

  // const radioStyles = {
  //   border: `1px solid ${theme.palette.primary.main}`,
  //   width: "50%",
  //   height: "60px",
  //   display: "flex",
  //   alignItems: "center",
  //   padding: "20px",
  //   borderRadius: "30px",
  //   marginRight: "15px",
  // };

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
              {/* radio */}
<Box
  sx={{
    display: "flex",
    gap: "15px",
  }}
>
  {[
    { value: "online", label: "Online" },
    { value: "onsite", label: "Onsite" },
  ].map((option) => (
    <Field key={option.value} name="mode">
      {({ field, form }) => {
        const isSelected = form.values.mode === option.value;
        return (
          <Box
            onClick={() => form.setFieldValue("mode", option.value)}
            sx={{
              border: `1px solid ${isSelected ? "#14A898" : theme.palette.grey[400]}`,
              backgroundColor: isSelected ? "rgba(98, 197, 187, 0.2)" : "transparent",
              borderRadius: "30px",
              width: "50%",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              cursor: "pointer",
              padding:"20px",
              transition: "all 0.3s ease",
            }}
          >
            <Radio
              {...field}
              checked={isSelected}
              value={option.value}
              sx={{
                "&.Mui-checked": {
                  color: "#14A898",
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: isSelected ? "#14A898" : theme.palette.text.primary,
                fontWeight: isSelected ? "bold" : "normal",
                marginLeft: "8px",
              }}
            >
              {option.label}
            </Typography>
          </Box>
        );
      }}
    </Field>
  ))}
</Box>

              {/* course duration  */}
              <Box>
                <label style={{ display: "block" }}>Course Duration</label>
                <Field
                  name="courseDuration"
                  as="select"
                  className="my-select"
                  autoFocus={false}
                  style={inputStyles}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                >
                  <option value="" label="Select Course Duration" />
                  <option value="1 Month" label="1 month" />
                  <option value="3 Months" label="3 months" />
                  <option value="6 Months" label="6 months" />
                  <option value="1 Year" label="1 year" />
                </Field>
              </Box>
              <Box>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  Class Days
                </label>
                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <Field
                      key={day}
                      type="checkbox"
                      name="classDays"
                      value={day}
                    >
                      {({ field, form }) => {
                        const isSelected = form.values.classDays?.includes(day);
                        return (
                          <label
                            style={{
                              display: "flex",
                              // flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              padding: "10px",
                              border: `1px solid ${
                                isSelected ? "#14A898" : "#ccc"
                              }`,
                              background: `${
                                isSelected ? "rgb(98 197 187 / 21%)" : ""
                              }`,
                              borderRadius: "50px",
                              fontSize: "12px",
                              cursor: "pointer",
                              transition: "0.3s",
                              width: "150px",
                              textAlign: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              {...field}
                              value={day}
                              checked={isSelected}
                              style={{
                                width: "15px",
                                height: "15px",
                                borderRadius: "50%",
                                border: "1px solid grey",
                                appearance: "none",
                                outline: "none",
                                transition: "0.2s ease",
                                cursor: "pointer",
                                backgroundColor: isSelected
                                  ? "#14A898"
                                  : "#fff",
                 
                              }}
                            />
                            {day}
                          </label>
                        );
                      }}
                    </Field>
                  ))}
                </div>
              </Box>

              <Box>
                <label
                  style={{
                    display: "block",
                  }}
                >
                  Class Duration
                </label>
                <Field
                  name="classDuration"
                  as="select"
                  className="my-select"
                  style={inputStyles}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                >
                  <option value="" label="Select Class Duration" />
                  <option value="30 Minutes" label="30 minutes" />
                  <option value="45 Minutes" label="45 minutes" />
                  <option value="1 hour" label="1 hour" />
                  <option value="90 Minutes" label="90 minutes" />
                </Field>
              </Box>
              <Field
                component={TextInput}
                placeholder="Course Fee (PKR)"
                type="number"
                name="courseFee"
                label="Course Fee"
              />
              <Field
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
                component={TextArea}
                placeholder="Description"
                type="text"
                name="description"
                label="description"
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
                sx={{ padding: "12px 40px", color: "white", fontSize: "16px" }}
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