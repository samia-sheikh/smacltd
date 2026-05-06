import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import theme from "../../theme";

export default function FAQs() {
  const [expanded, setExpanded] = useState(false);
  const [FAQs, setFAQs] = useState([
    {
      id: "panel1",
      question: "What is SMAC?",
      answer:
        "SMAC is a platform where users can share updates, sell services or products, and buy or sell courses to boost their skills. It merges the features of social networking, marketplace, and learning hubs.",
    },
    {
      id: "panel2",
      question: "How can I sell my services on SMAC",
      answer:
        "To sell your services, simply make an account on SMAC, Build your profile, and list the services or products you want to offer. Buyers can browse and Buy directly from your profile.",
    },
    {
      id: "panel3",
      question: "Can I post job updates or professional milestones on Smac?",
      answer:
        "Yes! Smac allows you to share professional updates, milestones, and career and life achievements, just like on Facebook and LinkedIn, helping you grow your professional network.",
    },
    {
      id: "panel4",
      question: "What types of courses can I buy or sell on Smac?",
      answer:
        "Smac offers a wide range of best online courses, including Quranic studies, IT, and other professional skill development Courses. Instructors can also make and sell their courses on the platform.",
    },
    {
      id: "panel5",
      question: "How do I become a Scholar at SMAC?",
      answer:
        "To become an instructor, sign up On SMAC as a Scholar, create your course, and make it available for sale. You can touch a global audience willing to learn new job-ready skills from experts like you.",
    },
    {
      id: "panel6",
      question: "Is Smac suitable for freelancers? ",
      answer:
        "Of course! Smac provides a freelance marketplace where you can offer your services and attract clients. You can sell your skills, connect with potential customers, and earn passive income through the platform.",
    },
    {
      id: "panel7",
      question: "How do I connect with other professionals on SMAC?",
      answer:
        "You can connect with professionals by following them, engaging with their updates, and joining discussions. SMAC adopts a community-driven environment to help users cooperate and rise.",
    },
    {
      id: "panel8",
      question: "Are there free courses available on SMAC?",
      answer:
        "Although, there are no offers of free online courses but you can get demo classes of premium classes to make a selection about course enrollment.",
    },
    {
      id: "panel9",
      question: "How does SMAC ensure secure transactions?",
      answer:
        "SMAC uses advanced encryption and secure payment gateways to protect all transactions between buyers and sellers. We are dedicated to providing a safe and secure environment for every user, whether you're selling services or purchasing a course using our platform.",
    },
    {
      id: "panel10",
      question: "Can I buy and sell products on SMAC?",
      answer:
        "Absolutely! SMAC platform offers a broad marketplace where you can both buy and sell products. Whether you're a seller looking to showcase unique items or a buyer searching for something special, SMAC's marketplace connects you with a valuable audience for smooth and secure transactions.",
    },
  ]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    // console.log(panel, "isExpanded");
    let openedQuestion;
    let number;
    for (let i = 0; i < FAQs.length; i++) {
      const element = FAQs[i];
      if (element.id === panel) {
        number = i;
        openedQuestion = element;
      }
    }
    function swapOddWithNext(array) {
      // Find the index of the chosen odd number

      // Check if the odd number exists in the array, and it's odd
      if (number % 2 !== 0) {
        // Make sure there's a number following the odd number (not at the end of the array)
        if (number < array.length - 1) {
          // Swap the odd number with the next number
          let nextNumber = array[number + 1];
          // console.log(nextNumber, "next");

          array[number] = nextNumber;
          array[number + 1] = openedQuestion;
        } else {
          // console.log(
          //   "No number to swap with, as the odd number is the last in the array."
          // );
        }
      } else {
        // console.log("Odd number not found or invalid.");
      }

      return array;
    }

    let newArray = swapOddWithNext(FAQs);
    // console.log(newArray);

    setFAQs(newArray);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",

        textAlign: "left",
        gap: "1.5rem",
        mt: "3.125rem",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          // lineHeight: "86.24px",
          textAlign: "center",
          color: "#000000",
        }}
      >
        Popular FAQ’s
      </Typography>

      {/* <Typography variant="paragraph" sx={{textAlign: "center"}}>
        SMAC is{" "}
        <span style={{ fontWeight: 600, color: theme.palette.primary.main }}>
          your one-stop solution
        </span>{" "}
        for all your development needs!
      </Typography> */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 columns layout
          gap: "1rem", // Gap between columns and rows
          // maxWidth: "1200px", // Limit container width
          // margin: "0 auto", // Center container
          marginTop: "1.563rem",

          overflow: "visible", // Allow overflow for expanded accordion
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "repeat(1, 1fr)", // 2 columns layout
          },
        }}
      >
        {FAQs.map((faq, index) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                padding: "1.25rem",
                boxShadow: "0px 0px 14.3px 0px #0000001F",
                border: "2px solid #F0F0F0",
                borderRadius: "22px !important",
                "&:before": {
                  display: "none",
                },
                gridColumn: expanded === faq.id ? "span 2" : "auto", // Take up both columns if expanded
                transition: "grid-column 0.3s ease", // Smooth transition for grid-column
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${faq.id}bh-content`}
                id={`${faq.id}bh-header`}
              >
                <Typography sx={{ color: "#000", fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
