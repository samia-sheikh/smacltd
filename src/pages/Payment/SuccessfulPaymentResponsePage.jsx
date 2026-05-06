import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
// import ImageComp from "../ImageComp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SuccessfulSVG } from "../../components/globalComponents/constants";
import theme from "../../theme";
import ButtonComp from "../../components/globalComponents/ButtonComp";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./../../components/globalComponents/Layout/Layout";
const SuccessfulPaymentResponsePage = () => {
  const { paymentResponse } = useSelector((state) => state.paymentResponse);
  const navigate = useNavigate();
  let location = useLocation();
  return (
    <Layout
      styles={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginBottom: "24px",
          alignItems: "center",
          width: "100%",
          maxWidth: "520px",
        }}
      >
        <SuccessfulSVG />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="black24"
              sx={{
                color:
                  paymentResponse?.payment?.status === "success"
                    ? theme.palette.primary.main
                    : paymentResponse?.payment?.status === "pending"
                    ? "yellow"
                    : "red",
              }}
            >
              {paymentResponse?.payment?.status}
            </Typography>
            {/* <CheckCircleIcon
            sx={{ color: theme.palette.primary.main, padding: "5px" }}
          /> */}
          </Box>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {paymentResponse?.payment?.message}
          </Typography>
          <ButtonComp
            label={"Go Back"}
            click={() => {
              //   navigate(location.state);
              navigate(location.state || "/feed");
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default SuccessfulPaymentResponsePage;
