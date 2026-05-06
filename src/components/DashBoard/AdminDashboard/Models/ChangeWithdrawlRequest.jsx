import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useFetch from "../../../../features/hooks/useFetch.js";
import TextInput from "../../../globalComponents/global_inputs/TextInput.jsx";

const ChangeWithdrawlRequest = ({
  isWithdrawPaymentModelOpen,
  setWithdrawPaymentModelOpen,
  requestId,
}) => {
  const validationSchema = Yup.object().shape({
    txnReference: Yup.string().required("The field cannot be left blank."), // Sets it as a compulsory field
  });
  const { putData, loading } = useFetch();
  const initialValues = {
    requestId: requestId?.withdrawlId,
    txnReference: "",
  };

  const onSubmit = async (values) => {
    await putData(
      "/api/payment/withdraw/request/update",
      values,
      undefined,
      (res) => {
        console.log(res);
        setWithdrawPaymentModelOpen(!isWithdrawPaymentModelOpen);
      },
      false
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
          <Typography variant="h4">Approve Request For</Typography>
          <Typography>RequestId: {requestId?.withdrawlId}</Typography>
          <Typography>RequestBy: {requestId?.sellerEmail}</Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Box sx={{ mt: "16px" }}>
                <Typography variant="h6">
                  Please enter transaction Id for future reference
                </Typography>
                <Field
                  component={TextInput}
                  placeholder="txnReference"
                  type="text"
                  name="txnReference"
                  label="txnReference"
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

export default ChangeWithdrawlRequest;
