import React, { useState } from "react";
import { Box } from "@mui/material";
import SwitchBtn from "./../../components/globalComponents/Switch";
import Yearly from "../../components/Payment/Yearly";
import Monthly from "../../components/Payment/Monthly";
import Layout from "../../components/globalComponents/Layout/Layout";
const Pricing = () => {
  const [state, setState] = useState(false);
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SwitchBtn
          checked={state}
          right={"Yearly"}
          left={"Monthly"}
          click={() => {
            setState(!state);
          }}
          sx={{ marginTop: "83px", marginBottom: "80px" }}
        />
        <Box>{state ? <Yearly /> : <Monthly />}</Box>
      </Box>
    </Layout>
  );
};

export default Pricing;
