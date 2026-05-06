import React from "react";
import file from "../../assets/icons/file.png";
import money from "../../assets/icons/money.png";
import Review from "../../assets/icons/Review.png";
import Validation from "../../assets/icons/Validation.png";
import { Box, Typography } from "@mui/material";
import ImageComp from "../globalComponents/ImageComp";
import theme from "../../theme";
import useWindowSize from "./../../features/hooks/useInnerWidth";
const EmpoweringEverySkill = () => {
  let { width } = useWindowSize();
  const servicesSMAC = [
    {
      id: 0,
      icon: file,
      name: "Post a Service",
      description:
        "Share your skills by posting a service. Whether it's tutoring, music lessons, or crafting, let the community know what you offer.",
    },
    {
      id: 1,
      icon: Validation,
      name: "Connect with Clients",
      description:
        "Review requests and connect directly with clients looking for your unique skills. Our platform makes it simple to manage communications and agreements.",
    },
    {
      id: 2,
      icon: Review,
      name: "Deliver and Impress",
      description:
        "Provide your service at agreed times and surpass expectations. Our platform supports you with tools to manage tasks and deadlines smoothly.",
    },
    {
      id: 3,
      icon: money,
      name: "Earn and Grow",
      description:
        "Receive payments securely through RozMarrah. We ensure that your hard work is rewarded, supporting you to grow your client base and service offerings.",
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
        Empowering Every Skill
      </Typography>

      {/* <Typography variant="paragraph" maxWidth={864}>
        Increase your potential by offering services and product listings
        through SMAC’s powerful platform.
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop:"1.563rem",
          [theme.breakpoints.down("lg")]: {
            flexWrap: "wrap",
          },
        }}
      >
        {servicesSMAC.map((service) => {
          return (
            <Box
              key={service.id}
              sx={{
                  minHeight:"fit-content",
                boxShadow: "0px 0px 22.4px 0px #7B777740 inset",
                width: "100%",
                maxWidth: "384px",

                padding: "2.25rem",
                borderRadius: "4rem",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "start",
                border: "2px solid #B3B3B3",
                [theme.breakpoints.down("lg")]: {
                  borderRadius: "2rem",
                  gap: "6px",
                  maxWidth: "273px",
                  padding: "1.5rem",
                  minHeight:"fit-content"
                },
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                  background: "#14B8A61A",
                  border: "1px solid #20CDBA",
                  borderRadius: "22px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  [theme.breakpoints.down("lg")]: {
                    width: "71px",
                    height: "71px",
                  },
                }}
              >
                <ImageComp
                  src={service.icon}
                  sx={{ width: width > theme.breakpoints.lg ? "100%" : "46px" }}
                />
              </Box>

              <Typography
              variant="h4"
                sx={{
                  lineHeight: "36px",
                  textAlign: "left",
                  color: "#000000",
                  [theme.breakpoints.down("lg")]: {
                    fontSize: "18px",
                  },
                }}
              >
                {service.name}
              </Typography>
              <Typography
              variant="subparagraph"
                sx={{
                  lineHeight: "24px",
                  textAlign: "left",
                }}
              >
                {service.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default EmpoweringEverySkill;
