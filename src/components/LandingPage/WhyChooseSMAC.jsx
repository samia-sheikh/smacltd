import React from "react";
import dollar from "../../assets/icons/doller.png";
import star from "../../assets/icons/star.png";
import tick from "../../assets/icons/tick.png";
import { Box, Typography } from "@mui/material";
import ImageComp from "../globalComponents/ImageComp";
import theme from "../../theme";
const WhyChooseSMAC = () => {
  const whySMAC = [
    {
      id: 0,
      icon: star,
      name: "Proof of quality",
      description:
        "With SMAC, quality is guaranteed. Our platform connects you with certified professionals and expert instructors who are leading in their fields. SMAC is helping you achieve your goals.",
    },
    {
      id: 1,
      icon: dollar,
      name: "No cost until you hire",
      description:
        "Experience zero risk with SMAC's no-cost policy until you find the person you want. Browse, connect, and engage with freelancers without upfront fees. You only pay when you hire.",
    },
    {
      id: 2,
      icon: tick,
      name: "Safe and secure",
      description:
        "Your security is our priority at SMAC. We make sure a safe and trusted environment for all transactions, protecting your data and financial information. Your privacy and safety are secure at every step of your journey with us.",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1.5rem",
        mt: "3.125rem",
      }}
    >
      <Typography
      variant="h2"
        sx={{
          // lineHeight: "86.24px",
          textAlign: "left",
          color: "#000000",
        }}
      >
        Why Choose SMAC
      </Typography>

      {/* <Typography variant="paragraph" maxWidth={864}>
        SMAC is your ultimate platform for connecting, learning, and
        growing—trusted by professionals worldwide.
      </Typography> */}

      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
          gap: "1rem",
          marginTop:"1.563rem",
          [theme.breakpoints.down("md")]: {
            flexWrap: "wrap",
          },
        }}
      >
        {whySMAC.map((why) => {
          return (
            <Box
              key={why.id}
              sx={{
                minHeight:"318px",
                boxShadow: "0px 0px 22.4px 0px #7B777740 inset",
                width: "100%",
                maxWidth: "520px",
                // minWidth: "300px",
                padding: "2.25rem",
                borderRadius: "4rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
                border: "2px solid #B3B3B3",
              }}
            >
              <ImageComp src={why.icon} />

              <Typography
              variant="h4"
                sx={{
                  lineHeight: "36px",
                  textAlign: "center",
                  color: "#000000",
                }}
              >
                {why.name}
              </Typography>
              <Typography
              variant="subparagraph"
                sx={{
                 
                  lineHeight: "24px",
                  textAlign: "center",
               
                }}
              >
                {why.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WhyChooseSMAC;
