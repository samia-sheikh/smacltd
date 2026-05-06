import React, { useState, useEffect } from "react";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import { Box, Typography } from "@mui/material";
import theme from "../../../theme";
import { useNavigate } from "react-router-dom";
import ImageComp from "../../../components/globalComponents/ImageComp";
const Coursebanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const BannerData = [
    {
      image: "url(assets/png/coursebanner/course-img1.png)",
      icons: "assets/png/coursebanner/icon1.png",
      title: "Learn",
      subtitle: "Tech & Programming",
      description: "Everyday Add On Your Daily Routine",
      btnColor: "#EBFF00",
      color: "#0E1982",
    },
    {
      image: "url(assets/png/coursebanner/course-img2.png)",
      icons: "assets/png/coursebanner/icon2.png",
      title: "Learn ",
      subtitle: "Design & Creative",
      description: "Everyday Add On Your Daily Routine",
      btnColor: "#FF8F3E",
      color: "#F9F9F9",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BannerData.length);
    }, 3000); // Change slide every 3 seconds
    //console.log(currentIndex);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [BannerData.length]);
  const styles = {
    dotsContainer: {
      textAlign: "center",

      [theme.breakpoints.down("sm")]: {
        marginTop: "1rem",
      },
    },
    dot: {
      height: "14px",
      width: "14px",
      margin: "0 5px",
      backgroundColor: "rgb(42, 165, 172)",
      borderRadius: "50%",
      display: "inline-block",
    },
    activeDot: {
      backgroundColor: `${BannerData[currentIndex].btnColor}`,
      width: "14px",
      height: "14px",
      borderRadius: "50px",
    },
  };
  return (
    <>
      <Box
        sx={{
          marginBottom: "60px",
          marginTop: "50px",
          "@media(max-width:590px)": {
            marginBottom: "30px",
            marginTop: "25px",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1717px",
            backgroundImage: `${BannerData[currentIndex].image}`,
            borderRadius: "12px",
            height: "355px",
            padding: "0px 55px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            [theme.breakpoints.down("lg")]: {
              height: "auto",
              flexDirection: "column",
              backgroundSize: "cover",
              gap: "24px",
              alignItems: "center",
              justifyContent: "center",
              padding: "25px 55px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: "890px" }}>
                <Typography variant="quranBanner">
                  {BannerData[currentIndex].title}&nbsp;
                  <span
                    style={{ color: `${BannerData[currentIndex].btnColor}` }}
                  >
                    {BannerData[currentIndex].subtitle}
                  </span>
                  &nbsp;
                  {BannerData[currentIndex].description}
                </Typography>
                <ButtonComp
                  label={"View Courses"}
                  customStyles={{
                    background: `${BannerData[currentIndex].btnColor}`,
                    color: `${BannerData[currentIndex].color}`,
                    border: "none",
                    width: "164px",
                    borderRadius: "4px",
                    fontWeight: "400 !important",
                    marginTop: "15px",
                  }}
                  customHover={{
                    background: "#EBFF00",
                    color: "white",
                    border: "none",
                  }}
                  click={() => {
                    navigate("/courses/quranic");
                  }}
                />
              </Box>

              <Box
                sx={{
                  "@media(max-width:1366px)": {
                    display: "none",
                  },
                }}
              >
                <ImageComp
                  src={BannerData[currentIndex].icons}
                  alt="bannerImages"
                />
              </Box>
            </Box>
            <Box sx={styles.dotsContainer}>
              {BannerData.map((_, index) => (
                <span
                  key={index}
                  style={{
                    ...styles.dot,
                    ...(currentIndex === index ? styles.activeDot : {}),
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Coursebanner;
