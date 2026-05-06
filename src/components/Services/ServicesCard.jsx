import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import theme from "../../theme";
import ProfilePicture from "../globalComponents/ProfilePicture";
import ImageComp from "../globalComponents/ImageComp";
import { useNavigate } from "react-router-dom";

const ServicesCard = ({ value, key }) => {
  const navigate = useNavigate("");
  return (
    <Grid item xs={12} sm={6} md={4} key={key}>
      <Box
        sx={{
          maxWidth: "545px",
          display: "flex",
          border: "1px solid #C9C9C9",
          borderRadius: "16px",
          padding: "19px",
          flexDirection: "column",
        }}
        onClick={() => {
          navigate(`/service/${value.serviceId}`);
        }}
      >
        <ImageComp
          src={value.images[0]}
          sx={{
            width: "100%",
            maxWidth: "508px",
            height: "391px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 0px",
            alignItems: "center",
            borderBottom: "1px solid #C9C9C9",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ProfilePicture src={value?.user?.profilePic} firstName={value?.user?.firstName} />
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: "1.25rem",
                color: "#333333",
                fontWeight: 700,
              }}
            >
              {value?.user?.firstName + " " +value?.user?.lastName }
            </Typography>
          </Box>

          <Box
            sx={{
              color: theme.palette.primary.main,
              padding: "5px 16px",
              fontWeight: 700,
              borderRadius: "9px",
              border: "1px solid #CFCFCF",
              fontStyle: "italic",
              height: "max-content",
              boxShadow: "0px 5.13px 18.35px 0px #93939338",
            }}
          >
            PKR {value?.serviceFee}
          </Box>
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Typography variant="h5">{value.title}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {value?.description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
export default ServicesCard;
