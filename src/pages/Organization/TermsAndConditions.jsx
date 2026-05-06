import React from "react";
import Banner from "../../components/globalComponents/Banner";
import ScrollNavigation from "../../components/globalComponents/ScrollNavigation";
import Layout from "../../components/globalComponents/Layout/Layout";

const TermsAndConditions = () => {
  return (
    <>
      <Banner
        placement={"start"}
        title={"Privacy Policy and Terms & Conditions "}
      />
      <Layout>
        <ScrollNavigation />
      </Layout>
    </>
  );
};

export default TermsAndConditions;
