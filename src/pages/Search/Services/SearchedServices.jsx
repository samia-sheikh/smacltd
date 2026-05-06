import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ImageComp from "../../../components/globalComponents/ImageComp";
import theme from "../../../theme";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ServicesCard from "../../../components/Services/ServicesCard";
const SearchedServices = () => {
  const { services, searchValue } = useSelector((state) => state.globalSearch);

  return (
    <Box
      sx={{
        margin: "0 auto",
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "32% 32% 32%",
        [theme.breakpoints.down("lg")]: {
          gridTemplateColumns: "50% 50%",
        },
        [theme.breakpoints.down("md")]: {
          gridTemplateColumns: "auto",
          justifyItems: "center",
        },
        // [theme.breakpoints.down("sm")]: {
        //   gridTemplateColumns: "auto",
        //   justifyItems: "center",
        // },
      }}
    >
      {services?.length === 0 ? (
        <Typography variant="h4Black">
          There are no services for query {searchValue}
        </Typography>
      ) : (
        services?.map((item, id) => {
          return <ServicesCard key={id} value={item} />;
        })
      )}
    </Box>
  );
};

export default SearchedServices;
