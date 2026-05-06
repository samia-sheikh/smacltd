import { List, ListItem, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Element,
  animateScroll as scroll,
  scroller,
  Events,
} from "react-scroll";

import theme from "../../theme";

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center",
// };

const ScrollNavigation = () => {
  // Effect for registering and unregistering events
  useEffect(() => {
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("begin", to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register("end", (to, element) => {
      console.log("end", to, element);
    });

    // Updating scrollSpy when the component mounts.
    // scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);
  const [activeClass, setActiveClass] = useState(0);
  // const scrollToTop = () => {
  //   scroll.scrollToTop();
  // };

  const scrollTo = (id) => {
    scroller.scrollTo(id, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -97,
    });
  };
  const style = {
    lineHeight: "36px",
    color: "#868686",
  };
  let inActiveStyles = {
    width: "100%",
    display: "inline-block",
    cursor: "pointer",
    background: "#E6E6E6",
    color: "#2E2E2E",
    padding: "12px 25px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "clamp(1rem, 0.447vw + 0.713rem, 1.25rem)",
  };
  let activeStyles = {
    color: "#FFFFFF",
    background: theme.palette.primary.main,
  };

  const links = [
    { name: "Introduction", to: "elevenInsideContainer" },
    { name: "Information We Collect", to: "firstInsideContainer" },
    { name: "How We Use User Information", to: "secondInsideContainer" },
    { name: "Information Sharing and Disclosure", to: "thirdInsideContainer" },
    { name: "Data Security", to: "fourthInsideContainer" },
    { name: "Your Privacy Rights", to: "fifthInsideContainer" },
    { name: "Cookies & Tracking Technologies", to: "sixInsideContainer" },
    { name: "Third-Party Links", to: "sevenInsideContainer" },
    { name: "Children's Privacy", to: "eightInsideContainer" },
    {
      name: "Marketplace & Subscription Plans ",
      to: "subscriptionPlansInsideContainer",
    },
    { name: "Changes to This Policy", to: "nineInsideContainer" },
    { name: "Contact Us", to: "tenInsideContainer" },
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        padding: "5rem 0rem",
        position: "relative",
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: "362px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          textDecoration: "none",
          listStyle: "none",
          padding: 0,
          margin: 0,
          position: "sticky",
          left: 0,
          top: 97,
          height: "max-content",
        }}
      >
        {links.map((item, index) => {
          return (
            <ListItem
              key={index}
              onClick={(e) => {
                setActiveClass(index);
                scrollTo(item.to);
              }}
              sx={
                activeClass !== index
                  ? { ...inActiveStyles }
                  : { ...inActiveStyles, ...activeStyles }
              }
            >
              {item.name}
            </ListItem>
          );
        })}
      </List>
      <div style={{ width: "2px", background: "#CDCDCD" }}></div>
      <Element
        name="test7"
        className="element"
        id="containerElement"
        style={{
          position: "relative",
          // height: "80vh",
          overflowY: "scroll",
        }}
      >
        <Element name="elevenInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">Introduction</Typography>
          <br />
          <Typography variant="aboutTerms">
            At SMAC, your personal information is essential to us. This Privacy
            Policy outlines how we collect, use, store, and protect your data
            while providing a platform for professional connections, services,
            product listings, and course transactions. By using SMAC, you agree
            to the terms outlined in this policy.
          </Typography>
        </Element>
        <Element name="firstInsideContainer" style={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">
            Information We Collect
          </Typography>
          <Typography>
            We gather specific information to improve your experience:
          </Typography>
          <ul style={style}>
            <li>
              <strong>Personal details: </strong>Name, email, contact
              information, and profile data during sign-up.
            </li>
            <li>
              <strong>Payment details: </strong>Credit/debit card, PayPal, or
              bank account information for transactions.
            </li>
            <li>
              <strong>Geo-location data: </strong>(if allowed) to provide
              localized services and listings.
            </li>
            <li>
              <strong>Activity data: </strong> Courses bought, sold, or
              completed, including their performance metrics.
            </li>
          </ul>
        </Element>
        <Element name="secondInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">
            How We Use User Information
          </Typography>
          <Typography>The collected data helps us:</Typography>
          <Typography>
            <ul style={style}>
              <li>
                Facilitate account creation, manage logins, and enhance user
                experience.{" "}
              </li>
              <li>
                Process payments, complete transactions, and provide customer
                support.
              </li>
              <li>
                Recommend services, products, or courses based on user
                preferences.
              </li>
              <li>Analyze trends to improve platform performance.</li>
              <li>
                Enable user communication for services or course-related
                queries.
              </li>
              <li>Ensure compliance with laws and safeguard against fraud.</li>
            </ul>
          </Typography>
        </Element>
        <Element name="thirdInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">
            Information Sharing and Disclosure
          </Typography>
          <br />
          <Typography variant="aboutTerms">
            SMAC does not sell or rent your personal data. Your data may be
            shared only under these circumstances:
          </Typography>
          <ul style={style}>
            <li>
              <strong>With Service Providers:</strong> For payment processing,
              storage, or marketing.
            </li>
            <li>
              <strong>For Legal Reasons:</strong>When mandated by law or to
              protect user and platform rights.
            </li>
            <li>
              <strong>User Transactions: </strong>Limited information (e.g.,
              email, address) is shared for service/product transactions.
            </li>
          </ul>
        </Element>
        <Element name="fourthInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">Data Security</Typography>
          <br />
          <Typography variant="aboutTerms">
            We employ industry-standard measures to protect your data from
            unauthorized access. However, no digital storage or transmission
            method is entirely secure.
          </Typography>
        </Element>
        <Element name="fifthInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">
            Your Privacy Rights
          </Typography>
          <br />
          <ul style={style}>
            <li>
              <strong>Access & Update: </strong> Modify or review your data
              through your account settings.
            </li>
            <li>
              <strong>Delete Information: </strong>Request data deletion,
              subject to legal obligations.
            </li>
          </ul>
        </Element>
        <Element name="sixInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">
            Cookies & Tracking Technologies
          </Typography>
          <br />
          <Typography variant="aboutTerms">
            We use cookies to enhance your browsing experience and monitor user
            behavior. You can manage your cookie preferences via browser
            settings.
          </Typography>
        </Element>
        <Element name="sevenInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">Third-Party Links</Typography>
          <Typography variant="aboutTerms">
            <br />
            Our platform may include links to third-party websites or services.
            SMAC is not responsible for their content or privacy practices.
          </Typography>
        </Element>
        <Element name="eightInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">
            Children's Privacy
          </Typography>
          <br />
          <Typography variant="aboutTerms">
            SMAC is designed for users above 18. Minors are welcome but
            prohibited from posting explicit content.
          </Typography>
        </Element>
        <Element
          name="subscriptionPlansInsideContainer"
          sx={{ marginBottom: "50px" }}
        >
          <Typography variant="aboutTermsHeading">
            Marketplace & Subscription Plans
          </Typography>
          <br />
          <Typography variant="aboutTerms">
            SMAC offers a feature-rich marketplace for product listings and
            subscriptions to enhance visibility.
          </Typography>
          <ul style={style}>
            <li>
              <strong>Transaction Fee: </strong> A 5% transaction fee applies to
              all services but not on marketplace product listings.
            </li>
            <li>
              <strong>Featured Ads in Marketplace: </strong>Marketplace users
              can promote their product listings with a subscription-based
              Featured Ads option.
            </li>
            <li>
              <strong>Subscription Plans: </strong>
            </li>
            <ul>
              <li>
                <strong>Basic:: </strong>PKR 300/month
              </li>
              <li>
                <strong>Regular: </strong>PKR 500/month
              </li>
              <li>
                <strong>Enterprise: </strong>PKR 1000/month
              </li>
            </ul>
          </ul>
          <p style={{ fontStyle: "italic" }}>
            Note: SMAC does not provide services directly but serves as a
            platform for users to connect, transact, and grow.
          </p>
        </Element>
        <Element name="nineInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">
            Changes to This Policy
          </Typography>
          <br />
          <Typography variant="aboutTerms">
            We may revise this policy periodically to reflect changes.
            Notifications will be sent via email or posted on our platform.
          </Typography>
        </Element>
        <Element name="tenInsideContainer" sx={{ marginBottom: "50px" }}>
          <Typography variant="aboutTermsHeading">Contact Us</Typography>
          <br />
          <Typography variant="aboutTerms">
            If you have any question or issues about our Privacy Policy, please
            feel free to contact us at:
            <ul style={style}>
              <li>
                <strong>Email:</strong>
                <a href="mailto:support@smac.com">support@smac.com</a>
              </li>
              <li>
                {" "}
                <strong>Phone:</strong>
                <a href="tel:+923441932822">+92-3441932822</a>
              </li>
            </ul>
          </Typography>
        </Element>
      </Element>
    </div>
  );
};

export default ScrollNavigation;
