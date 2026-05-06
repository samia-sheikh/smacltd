import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  height: ${(props) => props.$height}px;
  max-height: 619px;
  background: url(${(props) => props.$imageurl}) no-repeat center center;
  background-size: cover; /* Initial background size */
  transition: background-size 0.5s ease; /* Smooth transition */

  @media (max-width: 1200px) {
    background-size: 120% auto;
  }

  @media (max-width: 992px) {
    background-size: 140% auto;
  }

  @media (max-width: 768px) {
    background-size: 160% auto;
  }

  @media (max-width: 576px) {
    background-size: 180% auto;
  }
`;
const AutoHeightImage = ({ url }) => {
  const [height, setHeight] = useState(window.innerWidth * 0.75);

  const updateHeight = () => {
    setHeight(window.innerWidth * 0.75);
  };

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    //console.log(url, "url");
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return <Section $imageurl={url} $height={height}></Section>;
};

export default AutoHeightImage;
