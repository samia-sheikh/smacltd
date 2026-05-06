import React from "react";
import Marquee from "react-fast-marquee";
import ProfilePicture from "../../components/globalComponents/ProfilePicture";
import { FaStar } from "react-icons/fa";
import { Box, Typography } from "@mui/material";
import hammad from "../../assets/landingPage/testmonials/hammad.png";
import savera from "../../assets/landingPage/testmonials/savera.png";
import muzamal from "../../assets/landingPage/testmonials/muzamal.png";
import Layout from "../globalComponents/Layout/Layout";

const Testmonials = () => {
  const testmonials = [
    {
      id: 0,
      avatar: muzamal,
      name: "Rao Muzamal",
      date: "04 August, 2023",
      description:
        "SMAC has given me the perfect platform to not only offer my services as a freelancer but also sell products. The combination of marketplace and social networking is unlike any other",
    },
    {
      id: 1,
      avatar: savera,
      name: "Sawera Iqbal",
      date: "04 August, 2023",
      description:
        " I love how SMAC allows me to post updates, connect with professionals, and sell my graphic design services all in one place. It’s like LinkedIn, Fiverr, and a marketplace rolled into one!.",
    },
    {
      id: 2,
      avatar: hammad,
      name: "Hammad Tahir",
      date: "04 August, 2023",
      description:
        "The course marketplace on SMAC is a goldmine. I was able to enroll in IT courses, sharpen my skills, and then land new clients through the platform’s social networking features!.",
    },
    {
      id: 3,
      avatar: savera,
      name: "Aqsa Khushi",
      date: "04 August, 2023",
      description:
        "I used SMAC to sell my hand-crafted products and also learn new marketing strategies through its courses. The platform's flexibility helps me grow both professionally and as a businesswoman!.",
    },
    {
      id: 4,
      avatar: muzamal,
      name: "Umer Ahmed Shah",
      date: "04 August, 2023",
      description:
        "SMAC's marketplace is fantastic for service providers like me. I’ve been able to offer my cloud architect services while also learning from the best through its professional courses. It’s a win-win!.",
    },
    {
      id: 5,
      avatar: savera,
      name: "Afshan Riaz",
      date: "04 August, 2023",
      description:
        "SMAC has unlocked new opportunities for me, from buying IT courses to connecting with industry experts and selling my services. The all-in-one platform is exactly what freelancers need in 2024!",
    },
    {
      id: 6,
      avatar: hammad,
      name: "Raheel Malik",
      date: "04 August, 2023",
      description:
        "SMAC's marketplace is fantastic for service providers like me. I’ve been able to offer my cloud architect services while also learning from the best through its professional courses. It’s a win-win!.",
    },
    {
      id: 7,
      avatar: savera,
      name: "Sidra Rani",
      date: "04 August, 2023",
      description:
        "Through SMAC, I’ve not only been able to expand my freelance services but also sell digital products to a global audience. The platform’s unique mix of features is unbeatable!",
    },
    {
      id: 8,
      avatar: muzamal,
      name: "Ali Hassan",
      date: "04 August, 2023",
      description:
        "SMAC has revolutionized my business by allowing me to offer my freelance services and sell physical products. Plus, I’ve taken a few professional courses to keep up with the latest trends!",
    },
    {
      id: 9,
      avatar: savera,
      name: "Meerab Asad Rana",
      date: "04 August, 2023",
      description:
        "SMAC stands out from other platforms because it combines social networking, a service and product marketplace, and professional courses. It’s helped me grow my network, earn more, and learn at the same time!",
    },
  ];
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #14B8A6 0%, #09524A 100%)",
        mt: "3.125rem",
      }}
    >
      <Layout>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            margin: "3.125rem 0rem",
          }}
        >
          <Typography
          variant="h2"
            sx={{
              // lineHeight: "86.24px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Testimonials
          </Typography>

          {/* <Typography variant="paragraph" sx={{textAlign:"center"}}  color={"white"}>
            SMAC is{" "}
            <span style={{ fontWeight: 600, color: "white" }}>
              your one-stop solution
            </span>{" "}
            for all your development needs!
          </Typography> */}

          <Marquee
            style={{
              display: "flex",
              justifyContent: "center",
          marginTop:"1.563rem",

            }}
            pauseOnHover
          >
            {testmonials.map((why) => {
              return (
                <Box
                  key={why.id}
                  sx={{
                    width: "clamp(18.75rem, 14.775rem + 19.875vw, 38.625rem)",
                    padding: "2.25rem",
                    borderRadius: "4rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(196, 196, 196, 0.2) 100%)",
                    border: "2px solid #53E9D8",
                    ml: "1rem",
                  }}
                >
                  <ProfilePicture
                    src={why.avatar}
                    sx={{
                      height: "100px",
                      width: "100px",
                      border: "2px solid white",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "clamp(1.5rem, 1.4rem + 0.5vw, 2rem)",
                      fontWeight: 700,
                      lineHeight: "36px",
                      color: "#fff",
                    }}
                  >
                    {why.name}
                  </Typography>
                  <Typography
                  variant="subparagraph"
                    sx={{
                      lineHeight: "24px",
                      color: "#fff",
                    }}
                  >
                    {why.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: "4px" }}>
                      {[0, 1, 2, 3, 4].map((i) => {
                        return <FaStar color="#FFD37E" key={i} />;
                      })}
                    </Box>
                    <Typography color="#FFD37E">{why.date}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Marquee>
        </Box>
      </Layout>
    </Box>
  );
};

export default Testmonials;
