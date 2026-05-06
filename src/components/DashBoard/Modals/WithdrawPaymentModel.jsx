import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { VisaAndMasterCardIcon } from "../../globalComponents/constants.js";
import useFetch from "../../../features/hooks/useFetch.js";
import TextInput from "../../globalComponents/global_inputs/TextInput.jsx";

const WithdrawPaymentModel = ({
  isWithdrawPaymentModelOpen,
  setWithdrawPaymentModelOpen,
  totalWithdrawl,
}) => {
  const validationSchema = Yup.object().shape({
    withdrawlAmount: Yup.number("Must be a number type") // Validates for numerical value
      .positive("Must be a positive value") // Validates against negative values
      .required("The field cannot be left blank.") // Sets it as a compulsory field
      .min(100, "Hey! Transcation amount must be greater than or equal to 100!")
      .max(
        totalWithdrawl,
        `Transction Amount Can not be greater than ${totalWithdrawl} PKR`
      ),
  });
  const { postData, loading } = useFetch();
  const initialValues = {
    withdrawlAmount: "",
  };

  const onSubmit = async (values) => {
    // alert(values.withdrawlAmount);
    await postData(
      "/api/payment/withdraw/request",
      values,
      undefined,
      undefined,
      undefined,
      (res) => {
        console.log(res);
        setWithdrawPaymentModelOpen(!isWithdrawPaymentModelOpen);
      }
    );
  };

  return (
    <>
      <Dialog
        sx={{
          // maxWidth: "828px",
          minWidth: "350x",
          margin: "0 auto",
          borderRadius: "12px",
        }}
        open={isWithdrawPaymentModelOpen}
        onClose={() => setWithdrawPaymentModelOpen(!isWithdrawPaymentModelOpen)}
      >
        <Box
          sx={{ width: "100%", padding: "24px 18px", background: "#F9F9F9" }}
        >
          <Typography variant="h4">Choose Payment Method</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Box sx={{ mt: "16px" }}>
                <Typography variant="h6">
                  Enter amout you want to withdraw(PKR)
                </Typography>
                <Field
                  component={TextInput}
                  placeholder="0000"
                  type="text"
                  name="withdrawlAmount"
                  label="withdrawlAmount"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: "16px",
                }}
              >
                <Button
                  variant="contained"
                  type={"submit"}
                  sx={{
                    padding: "12px 0",
                    fontSize: "16px",
                    width: "100%",
                    color: "white",
                  }}
                  disabled={loading}
                >
                  Submit Request
                </Button>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default WithdrawPaymentModel;
