import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonComp from "../../../../components/globalComponents/ButtonComp";
import SubscriptionCard from "../../../../components/DashBoard/AdminDashboard/cards/SubscriptionCard";
import AddSubscriptionPlan from "../../../../components/DashBoard/AdminDashboard/Models/AddSubscriptionPlan";
import useFetch from "../../../../features/hooks/useFetch";

const SubscriptionTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const { loading, fetchData } = useFetch();
  useEffect(() => {
    fetchData("/api/subscription/retrieve", undefined, (res) => {
      setSubscriptions(res?.data);
      console.log(res?.data);
    });
  }, []);
  return (
    <Box
      sx={{
        // backgroundColor: "red",
        // padding: "15px",
        overflow: "hidden",
        width: "100%",
        background: "white",
      }}
    >
      <AddSubscriptionPlan
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        setIsOpen={setIsOpen}
        // url={"/api//admin/course/parent"}
        // anyChanges={setAnyCategoryChanges}
      />
      <Box
        sx={{
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component={"span"}
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Subscriptions
        </Typography>
        <Box sx={{ width: "200px" }}>
          <ButtonComp
            label={"Add New Subscription"}
            click={() => setIsOpen(!isOpen)}
          />
        </Box>
      </Box>

      <Divider
        sx={{
          width: "100%",
        }}
      />
      <Box
        sx={{
          padding: "clamp(1.5rem, 1.739vw + 0.413rem, 2.5rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: "clamp(1rem, 0.87vw + 0.457rem, 1.5rem)",
        }}
      >
        {subscriptions &&
          subscriptions?.map((plan, index) => {
            return <SubscriptionCard plan={plan} key={index} />;
          })}
      </Box>
    </Box>
  );
};

export default SubscriptionTab;
