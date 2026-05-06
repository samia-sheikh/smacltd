import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1740px;
  padding: 0 30px;
  @media (max-width: 450px) {
    padding: 0 10px;
    margin: 0 auto;
  }
`;
const Layout = ({
  children,
  styles,
  extra,
  title = "SMAC",
  description = "A project by ZNZ to the freelancers of pakistan",
  keywords = "freelance, ecommerce, products, e-learning, courses, skills",
  author = "ZNZ, Alishan Masood, Fayyaz Alam",
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <div style={{ display: "flex", height: "100%", ...extra }}>
        <Main style={{ ...styles }}>{children}</Main>
      </div>
    </>
  );
};

export default Layout;
