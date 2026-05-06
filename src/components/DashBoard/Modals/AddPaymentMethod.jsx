import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import theme from "../../../theme";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
// import TextInput from "../../globalComponents/global_inputs/TextInput";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import Cards from "react-credit-cards-2";
import {
  JazzCashIcon,
  VisaAndMasterCardIcon,
} from "../../globalComponents/constants.js";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import useFetch from "../../../features/hooks/useFetch.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import CardPayment from "./CardPayment.jsx";
import WalletPayment from "./WalletPayment.jsx";
import ImageComp from "../../globalComponents/ImageComp.jsx";
const validationSchema = Yup.object().shape({
  pp_TxnType: Yup.string(),
});
const AddPaymentMethod = ({
  isAddDetailsOpen,
  setIsAddDetailsOpen,
  url,
  item,
}) => {
  const { postData, loading } = useFetch();
  const initialValues = {
    pp_TxnType: "MPAY",
  };

  console.log(item, "item");
  const onSubmit = async (values) => {
    console.log(values, "logs");

    await postData(url, values, undefined, undefined, undefined, (res) => {
      console.log(res);
      if (res?.status === 201) {
        let payload = {
          ...res?.data?.payload,
          pp_ReturnURL: `${res?.data?.payload?.pp_ReturnURL}?courseId=${item?.courseId}&serviceId=${item?.serviceId}&PID=${res?.data?.PID}`,
        };
        // Create a form element dynamically

        const form = document.createElement("form");
        form.method = "POST";
        // ?courseId=${item?.courseId}&serviceId=${item?.serviceId}&PID=${res?.data?.PID}
        form.action = `https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform`;
        // Add form fields from res.data
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = payload[key];
            form.appendChild(input);
          }
        }
        // Append and submit the form
        document.body.appendChild(form);
        form.submit();
      }
    });
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
        open={isAddDetailsOpen}
        onClose={() => setIsAddDetailsOpen(!isAddDetailsOpen)}
      >
        <Box
          sx={{ width: "100%", padding: "24px 18px", background: "#F9F9F9" }}
        >
          <Typography variant="h4">Choose Payment Method</Typography>
          <WalletPayment
            url={url}
            item={item}
            setIsAddDetailsOpen={setIsAddDetailsOpen}
          />
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
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  type={"submit"}
                  sx={{
                    padding: "0",
                    fontSize: "16px",
                    width: "100%",
                    color: "white",
                  }}
                  disabled={loading}
                >
                  <VisaAndMasterCardIcon />
                  <p>Proceed with card</p>
                </Button>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default AddPaymentMethod;
