import React from "react";
import styled from "styled-components";
import contact from "../../assets/contact.png";
import { Box, Typography } from "@mui/material";
import theme from "../../theme";
import ImageComp from "../globalComponents/ImageComp";
import email from "../../assets/landingPage/email.png";
import availability from "../../assets/landingPage/availability.png";
import location from "../../assets/landingPage/location.png";
const StyledInput = styled.input`
  padding: 18px;
  font-size: 20px;
  background: white;
  color: #878787;
  outline: none;
  border: none;
  border-bottom: 1px solid #d4d4d4;
  &::placeholder {
    color: #878787;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.palette.primary.main};
  }
`;
const StyledTextArea = styled.textarea`
  padding: 18px;
  font-size: 20px;
  background: white;
  color: #878787;
  outline: none;
  border: none;
  border-bottom: 1px solid #d4d4d4;
  font-family: "Open Sans";
  &::placeholder {
    color: #878787;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.palette.primary.main};
  }
`;
const ContactSMAC = () => {
  const contactInforamtion = [
    {
      id: 1,
      image: email,
      title: "Email Us",
      content: "support@smac.com",
    },
    {
      id: 2,
      image: availability,
      title: "Availability",
      content: "24/7 Support",
    },
    {
      id: 3,
      image: location,
      title: "Location",
      content: "Lahore, Pakistan",
    },
  ];

  return (
    <Box
      sx={{
        mt: "3.125rem",
        width: "100%",
        display: "grid",
        border: "1px solid #C1C1C1",
        borderRadius: "45px",
        padding: "2rem 3.5rem",
        background: "white",
        boxShadow: "0px 0px 25.9px 2px #9E9C9C1F",

        gridTemplateColumns: "48% 48%",
        gap: "4%",
        "@media (max-width:1000px)": {
          gridTemplateColumns: "100%",
        },
        "@media (max-width:750px)": {
          padding: "1rem",
          borderRadius: "25px",
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "45px",

          width: "100%",
          backgroundImage: `url(${contact})`,
          // height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "white",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          "@media(max-width:750px)": {
            padding: "1rem",
            borderRadius: "15px",
          },
        }}
      >
        <Box sx={{ maxWidth: "379px" }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "left",
              color: "white",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="paragraph"
            sx={{
              lineHeight: "1.75rem",
              textAlign: "left",
              color: "white",

              fontWeight: 400,
              // fontFamily: "Helvetica Light",
            }}
          >
            Feel free to drop message if you have any concern!
          </Typography>
        </Box>
        <Box>
          {contactInforamtion.map((item) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  mb: "1.5rem",
                }}
                key={item.id}
              >
                <ImageComp src={item.image} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "clamp(1rem, 0.895vw + 0.426rem, 1.5rem)",
                      fontWeight: 600,
                      textAlign: "left",
                      color: "white",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "clamp(1rem, 0.895vw + 0.426rem, 1.5rem)",
                      textAlign: "left",
                      color: "white",
                      fontWeight: 400,
                    }}
                  >
                    {item.content}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          background: "none",
          padding: "2rem 0rem",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "28px",
          }}
        >
          <StyledInput
            style={{
              fontFamily: "Open Sans",
            }}
            placeholder="Name"
          />
          <StyledInput
            placeholder="Email"
            style={{
              fontFamily: "Open Sans",
            }}
          />
          <StyledTextArea
            // style={{
            //   fontFamily: "Open Sans",
            // }}
            placeholder="Message"
            rows={8}
          />
          <StyledInput
            onClick={(e) => e.preventDefault()}
            type="submit"
            style={{
              width: "100%",
              maxWidth: "268px",
              background: theme.palette.primary.main,
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              placeSelf: "center",
              borderRadius: "1rem",
            }}
          />
        </form>
      </Box>
    </Box>
  );
};

export default ContactSMAC;
