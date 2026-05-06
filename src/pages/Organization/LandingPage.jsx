import React, { useRef, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import Layout from "../../components/globalComponents/Layout/Layout";
import HeroSection from "../../components/LandingPage/HeroSection";
import { useSelector } from "react-redux";

// Lazy load the components
const AboutSMAC = React.lazy(() =>
  import("../../components/LandingPage/AboutSMAC")
);
const WhyChooseSMAC = React.lazy(() =>
  import("../../components/LandingPage/WhyChooseSMAC")
);
const EmpoweringEverySkill = React.lazy(() =>
  import("../../components/LandingPage/EmpoweringEverySkill")
);
const Testimonials = React.lazy(() =>
  import("../../components/LandingPage/Testmonials")
);
const FAQs = React.lazy(() => import("../../components/LandingPage/FAQs"));
const ContactSMAC = React.lazy(() =>
  import("../../components/LandingPage/ContactSMAC")
);
const PopularCourses = React.lazy(() =>
  import("../../components/LandingPage/PopularCourses")
);
const FeaturedCategories = React.lazy(() =>
  import("../../components/LandingPage/FeaturedCategories")
);
const OurPrograms = React.lazy(() =>
  import("../../components/LandingPage/OurPrograms")
);
const Footer = React.lazy(() =>
  import("../../components/globalComponents/footer/footer")
);

const LandingPage = () => {
  const { user } = useSelector((state) => state.user);
  const aboutRef = useRef(null);
  const programsRef = useRef(null);
  const categoriesRef = useRef(null);
  const faqsRef = useRef(null);

  // Function to scroll to a section
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ background: "#fbfbfb" }}>
      <Suspense fallback={<CircularProgress />}>
        <HeroSection
          scrollToSection={scrollToSection}
          aboutRef={aboutRef}
          programsRef={programsRef}
          categoriesRef={categoriesRef}
          faqsRef={faqsRef}
        />
        <Layout>
          <div ref={aboutRef}>
            <AboutSMAC />
          </div>
          <div ref={programsRef}>
            <OurPrograms />
          </div>
          <div ref={categoriesRef}>
            <FeaturedCategories />
          </div>
          <EmpoweringEverySkill />
          <PopularCourses />
          <WhyChooseSMAC />
        </Layout>

        <Testimonials />

        <Layout>
          <div ref={faqsRef}>
            <FAQs />
          </div>
          <ContactSMAC />
        </Layout>

        {!user ? <Footer /> : null}
      </Suspense>
    </Box>
  );
};

export default LandingPage;
