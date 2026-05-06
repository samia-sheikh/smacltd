import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../globalComponents/global_inputs/TextInput";
import TextArea from "../../globalComponents/global_inputs/TextArea";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../features/hooks/useFetch";
import { useDispatch } from "react-redux";
import { setPaymentResponse } from "../../../features/slice/Payment/paymentResponseSlice";
import { JazzCashIcon } from "../../globalComponents/constants";

const validationSchema = Yup.object().shape({
  MobileNumber: Yup.string()
    .matches(/^\d+$/, "Only numeric value is allowed")
    .min(11, "Mobile Number must be atleast 11 character")
    .max(11, "Mobile Number should be less then 11 character")
    .required("JazzCash wallet number is required"),
  CNIC: Yup.string()
    .matches(/^\d+$/, "Only numeric value is allowed")
    .min(6, "Please Enter Last 6-Digits of CNIC Registered Against Your Wallet")
    .max(6, "Please Enter Last 6-Digits of CNIC Registered Against Your Wallet")
    .required("Enter Product Price"),
  Description: Yup.string()
    .max(200, "Description should be less than 200 Character")
    .required("Description is required"),
});
const WalletPayment = ({ url, setIsAddDetailsOpen }) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const { postData, loading } = useFetch();
  const initialValues = {
    MobileNumber: "",
    CNIC: "",
    Description: "",
  };
  const onSubmit = async (values) => {
    console.log(values);
    await postData(url, values, undefined, undefined, undefined, (res) => {
      if (res?.status) {
        setIsAddDetailsOpen(false);
        navigate("/payments/response", { state: location.pathname });
        dispatch(setPaymentResponse({ paymentResponse: res?.data }));
      } else {
        return;
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "25px",
        flexDirection: "column",
        paddingTop: "16px",
        minWidth: "300px",
      }}
    >
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
            <Box>
              <Typography variant="h6">JassCash Wallet Number</Typography>
              <Field
                component={TextInput}
                placeholder="03123456789"
                type="text"
                name="MobileNumber"
                label="MobileNumber"
              />
            </Box>
            <Box>
              <Typography variant="h6">Last 6-Digits of CNIC</Typography>
              <Field
                component={TextInput}
                placeholder="345678"
                type="text"
                name="CNIC"
                label="Product Price"
              />
            </Box>
            <Box>
              <Typography variant="h6">Reason of Payment</Typography>
              <Field
                component={TextArea}
                placeholder="Reason Of Payment"
                type="text"
                name="Description"
                label="Description"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "24px" }}>
            <Button
              variant="contained"
              type={"submit"}
              sx={{ padding: "12px 40px", fontSize: "16px", color: "white" }}
              disabled={loading}
            >
              <JazzCashIcon />
              Proceed With JazzCash Wallet
            </Button>
          </Box>
        </Form>
      </Formik>
      {error && <Typography>{error}</Typography>}
    </Box>
  );
};

export default WalletPayment;
