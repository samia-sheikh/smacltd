import React from "react";
import Layout from "./../../components/globalComponents/Layout/Layout";
import AboutUsContent from "../../components/globalComponents/AboutUsContent";
import Banner from "../../components/globalComponents/Banner";
import { Box, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ImageComp from "../../components/globalComponents/ImageComp";
import CeoProfile from "../../assets/profiles/ceo.png";
const AboutUs = () => {
  return (
    <>
      <Banner
        image={"assets/photos/profile-background.png"}
        title={"About Us"}
        text={`Welcome to SMAC, a platform powered by revolution and planned to elevate your professional journey. As a project of ZNZ Communications, which excels in web development, graphic design, and SEO. This project defines how you connect, learn, and engage with the marketplace. SMAC integrates three essential modules to support your growth—Social Media, Marketplace, and Courses—catering to your personal and professional development needs.`}
      />
      <Layout>
        <Box>
          <AboutUsContent
            title={"Social Media"}
            imageSrc={"assets/photos/socialBanner.png"}
            details={`At SMAC we offer you to connect with industry professionals, increase your networks, and engage yourself in useful activities. Our social features allow you to create valuable networks, increase your professional influence, and collaborate with peers. Experience an innovative environment where innovation meets meaningful professional networking.`}
            navigation={"/feed"}
          />
          <AboutUsContent
            imageSrc={"assets/photos/marketBanner.png"}
            title={"Market"}
            reverse={true}
            details={`Explore SMAC’s multipurpose marketplace where freelancers, buyers, and sellers meet. Whether you’re looking to sell your services, showcase products, or find exceptional items, SMAC attaches you with the right and valuable audience. Our platform streamlines transactions, empowering you to show your expertise and unlock new opportunities.`}
            navigation={"/market"}
          />
          <AboutUsContent
            imageSrc={"assets/photos/schoolBanner.png"}
            title={"Courses"}
            details={`Develop your career with SMAC’s inclusive learning platform. We offer a wide range of expert-led courses designed to help you secure new skills and get a boost in your field. From collaborating lessons to certifications, we provide the tools and resources you need to excel in today’s competitive world.`}
            navigation={"/courses"}
          />
          <AboutUsContent
            imageSrc={"assets/photos/serviceBanner.png"}
            title={"Services"}
            reverse={true}
            details={`Explore SMAC’s multipurpose marketplace where freelancers, buyers, and sellers meet. Whether you’re looking to sell your services, showcase products, or find exceptional items, SMAC attaches you with the right and valuable audience. Our platform streamlines transactions, empowering you to show your expertise and unlock new opportunities.`}
            navigation={`/services`}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1052px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", marginBottom: "24px" }}>
            <FormatQuoteIcon
              sx={{
                color: "#FFCA41",
                transform: "rotate(180deg)",
              }}
            />
            <Typography variant="uploadForm">
              Stop wasting time, stop sweeping reels, stop watching netflix,
              lets earn money, cause money talks <br />
              "button dabao, jutay na ghisao"
              <FormatQuoteIcon sx={{ color: "#FFCA41" }} />
            </Typography>
          </Box>
          <Box>
            <ImageComp
              src={CeoProfile}
              styles={{ marginBottom: "12px", borderRadius: "50%" }}
            />
            <Box>
              <Typography variant="bold24Black">Sher Alam</Typography>
              <Typography variant="subHeader" sx={{ display: "block" }}>
                Founder & CEO
              </Typography>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default AboutUs;
