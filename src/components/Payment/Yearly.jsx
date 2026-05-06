import React from "react";
import SubscriptionCard from "./SubscriptionCard";
import { Box } from "@mui/material";

const Yearly = () => {
  let data = [
    {
      _id: "661d69a29728795c7e0e3803",
      name: "STARTER",
      price: 15.99,

      about:
        "Ad non consectetur duis sunt occaecat. Amet do sunt esse et eiusmod\r\n",
      features: ["2 courses", "2 Market Products for Sale"],
    },
    {
      _id: "661d69a23c76de0a40aea4a3",
      name: "BUSINESS",
      price: 24.99,
      about:
        "Ad non consectetur duis sunt occaecat. Amet do sunt esse et eiusmod\r\n",
      features: ["5 courses", "5 Market Products for Sale"],
    },
    {
      _id: "661d69a2f5f96d2b50e7d10a",
      name: "SCALE-UP",
      price: 36.99,
      about:
        "Ad non consectetur duis sunt occaecat. Amet do sunt esse et eiusmod\r\n",
      features: ["8 courses", "8 Market Products for Sale"],
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {data.map((item) => {
        return <SubscriptionCard key={item._id} data={item} plan={"yr"} />;
      })}
    </Box>
  );
};

export default Yearly;
