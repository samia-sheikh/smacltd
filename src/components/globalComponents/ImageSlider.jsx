// ImageSlider.js
import React, { useState, useEffect } from "react";
// import image from "../../assets/cuate.png";
import theme from "../../theme";
import { Slide1, Slide2, Slide3 } from "./constants";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: <Slide2 />,
      title: "Upgrade skills, unlock success",
      description:
        "Welcome back! Ready to unlock new growth opportunities? Sign in and boost your career with SMAC.",
    },
    {
      image: <Slide1 />,
      title: "Advance your career, join the future.",
      description:
        "Join SMAC today and start your journey to success. Connect, learn, and develop yourself with an exciting professional community.",
    },
    {
      image: <Slide3 />,
      title: "Reset, reset, and rise.",
      description:
        "Forgot your Password? Don’t Worry! Reset your password and go back to SMAC to boost your skills and grow your career.",
    },
    // Add more slides as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  const styles = {
    sliderContainer: {
      position: "relative",
      width: "100%",
      maxWidth: "900px",
      overflow: "hidden",
      borderRadius: "10px",
      height: "95vh",
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "25px",
      justifyContent: "center",
      // padding: "75px 0px 54px 0px",
      padding: "20px",
    },
    sliderContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      //   backgroundImage: `url(${slides[currentIndex].image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      //   height: "546px",
      maxWidth: "744px",
      color: "#000",
    },
    textContent: {
      // padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      maxWidth: "max-content",
      color: "white",
    },
    title: {
      fontSize: "clamp(2rem,3vw,3.5rem)",
      fontWeight: 700,
      marginBottom: "10px",
    },
    description: {
      fontSize: "16px",
    },
    button: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#fff",
      border: "none",
      padding: "10px",
      cursor: "pointer",
      borderRadius: "50%",
    },
    prevButton: {
      left: "10px",
    },
    nextButton: {
      right: "10px",
    },
    dotsContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    },
    dot: {
      height: "17px",
      width: "17px",
      margin: "0 5px",
      backgroundColor: "rgb(42, 165, 172)",
      borderRadius: "50%",
      display: "inline-block",
    },
    activeDot: {
      backgroundColor: "#fff",
      width: "42.5px",
      height: "17px",
      borderRadius: "50px",
    },
    image: {
      maxHeight: "450px",
      width: "100%",
    },
  };

  return (
    <div style={styles.sliderContainer}>
      <div style={styles.sliderContent}>
        {/* <img style={styles.image} src={slides[currentIndex].image} /> */}
        {slides[currentIndex].image}
        <div style={styles.textContent}>
          <h2 style={styles.title}>{slides[currentIndex].title}</h2>
          <p style={styles.description}>{slides[currentIndex].description}</p>
        </div>
      </div>

      <div style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              ...(currentIndex === index ? styles.activeDot : {}),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
