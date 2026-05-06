import { Box, Typography } from "@mui/material";
import React from "react";
import Layout from "../../components/globalComponents/Layout/Layout";
import {
  singleblog,
  singlecookiesimg,
  contentimages,
} from "../../assets/Blogs";
import ImageComp from "../../components/globalComponents/ImageComp";
import theme from "../../theme";
const Singleblog = () => {
  const boxMargin = {
    marginTop: "30px",
    // width: "100%",
    // maxWidth: "1539px",
  };
  const blogHeading = {
    marginBottom: "41px",
  };
  return (
    <Layout>
      <Box
        sx={{
          marginTop: "47px",
          width: "100%",
          height: "433px",
          backgroundImage: `url(${singleblog})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "49.1px",
          backgroundRepeat: "no-repeat",
          boxShadow: "0px 0px 10.76px 0px #00000040 inset",
          color: "white",
          [theme.breakpoints.down("sm")]: {
            padding: "20px",
          },
        }}
      >
        <Typography variant="h1" sx={blogHeading}>
          10 Best Ecommerce Hosting Services for 2024
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "47px",
        }}
      >
        <Box>
          <Typography variant="h3" sx={blogHeading}>
            About
          </Typography>
          <Typography variant="blogparagraph">
            We are a passionate, fun-loving, growing team. We are looking for
            passionate programmers.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus. <br />
            <br />
            Lorem ipsum dolor sit amet consectetur. Diam mauris tortor lobortis
            nunc aliquam amet. Viverra magna aliquet volutpat quam nec mi purus
            quam. Quam urna pharetra interdum sed augue bibendum cras at
            vestibulum. Ac ut urna penatibus sed. Vestibulum a ut cum tortor
            morbi egestas luctus. Eget molestie amet pellentesque urna euismod
            ipsum. Ultrices tristique sit tincidunt libero augue. Nulla aliquet
            consequat lobortis commodo vulputate non integer. Quam neque enim
            pulvinar sed fermentum. In odio aliquet vulputate dignissim tempor
            eu. Porttitor diam quam euismod vivamus mus. Accumsan adipiscing
            ultrices eget egestas eu. Nisl cursus et lobortis nullam velit
            blandit sit magna nibh. Eu ornare egestas lacus in ultrices tempus
            egestas ut purus. Lacinia scelerisque arcu nisl tellus. At eu massa
            nulla lobortis. Risus faucibus aliquam elit eu mus. Praesent at
            cursus a integer turpis sit. Tellus sapien sapien lectus vel.
          </Typography>
        </Box>
        <Box sx={boxMargin}>
          <Typography variant="h3" sx={blogHeading}>
            Cookies
          </Typography>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur. Diam mauris tortor lobortis
            nunc aliquam amet. Viverra magna aliquet volutpat quam nec mi purus
            quam. Quam urna pharetra interdum sed augue bibendum cras at
            vestibulum. Ac ut urna penatibus sed. Vestibulum a ut cum tortor
            morbi egestas luctus. Eget molestie amet pellentesque urna euismod
            ipsum. Ultrices tristique sit tincidunt libero augue. Nulla aliquet
            consequat lobortis commodo vulputate non integer. Quam neque enim
            pulvinar sed fermentum.{" "}
          </Typography>
        </Box>

        <ImageComp
          src={singlecookiesimg}
          sx={{
            width: "100%",
            marginTop: "65px",
          }}
        />

        <Box sx={boxMargin}>
          <Typography variant="h3" sx={blogHeading}>
            License
          </Typography>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus.
          </Typography>
          <ul
            style={{
              color: "#9B9B9B",
              lineHeight: "30px",
            }}
          >
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
          </ul>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus. Lorem ipsum dolor sit amet consectetur.
            Mauris nam lectus lectus quam vitae quis pretium ut risus. Faucibus
            aliquet dolor vitae porttitor nibh. Luctus vulputate ornare lectus
            nulla scelerisque ligula congue velit tellus.
          </Typography>
        </Box>
        <ImageComp
          src={singlecookiesimg}
          sx={{
            width: "100%",
            marginTop: "65px",
          }}
        />
        <Box sx={boxMargin}>
          <Typography variant="h3" sx={blogHeading}>
            Hyperlink to our Content
          </Typography>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus. Lorem ipsum dolor sit amet consectetur.
            Mauris nam lectus lectus quam vitae quis pretium ut risus. Faucibus
            aliquet dolor vitae porttitor nibh. Luctus vulputate ornare lectus
            nulla scelerisque ligula congue velit tellus.
          </Typography>
          <ul
            style={{
              color: "#9B9B9B",
              lineHeight: "30px",
            }}
          >
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
          </ul>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus.
          </Typography>
        </Box>
        <Box sx={boxMargin}>
          <Typography variant="h3" sx={blogHeading}>
            iFrames
          </Typography>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus.
          </Typography>
        </Box>
        <Box sx={boxMargin}>
          <Typography variant="h3" sx={blogHeading}>
            Content Lability
          </Typography>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus. Lorem ipsum dolor sit amet consectetur.
            Mauris nam lectus lectus quam vitae quis pretium ut risus. Faucibus
            aliquet dolor vitae porttitor nibh. Luctus vulputate ornare lectus
            nulla scelerisque ligula congue velit tellus. Lorem ipsum dolor sit
            amet consectetur. Mauris nam lectus lectus quam vitae quis pretium
            ut risus. Faucibus aliquet dolor vitae porttitor nibh. Luctus
            vulputate ornare lectus nulla scelerisque ligula congue velit
            tellus.{" "}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "15px", display: "flex", gap: "20px" }}>
          <Box sx={{ width: "100%" }}>
            <ImageComp src={contentimages} sx={{ width: "100%" }} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <ImageComp src={contentimages} sx={{ width: "100%" }} />
          </Box>
        </Box>
        <Box sx={boxMargin}>
          <Typography variant="h3" sx={blogHeading}>
            Your Privacy
          </Typography>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus.{" "}
          </Typography>
          <ul
            style={{
              color: "#9B9B9B",
              lineHeight: "30px",
            }}
          >
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
          </ul>
        </Box>
        <Box sx={boxMargin}>
          <Typography variant="h3" sx={blogHeading}>
            Reservation of Rights
          </Typography>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus. Lorem ipsum dolor sit amet consectetur.
            Mauris nam lectus lectus quam vitae quis pretium ut risus. Faucibus
            aliquet dolor vitae porttitor nibh. Luctus vulputate ornare lectus
            nulla scelerisque ligula congue velit tellus.
          </Typography>
          <ul
            style={{
              color: "#9B9B9B",
              lineHeight: "30px",
            }}
          >
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
          </ul>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus.{" "}
          </Typography>
        </Box>
        <Box sx={boxMargin}>
          <Typography variant="h3" sx={blogHeading}>
            Disclaimer
          </Typography>
          <Typography variant="blogparagraph">
            Lorem ipsum dolor sit amet consectetur. Mauris nam lectus lectus
            quam vitae quis pretium ut risus. Faucibus aliquet dolor vitae
            porttitor nibh. Luctus vulputate ornare lectus nulla scelerisque
            ligula congue velit tellus.
          </Typography>
          <ul
            style={{
              color: "#9B9B9B",
              lineHeight: "30px",
            }}
          >
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
            <li>Lorem ipsum dolor sit amet consec</li>
            <li>
              tetur. Sed lorem semper mattis fusce nunc turpis sit. Sem molestie{" "}
            </li>
            <li>
              sed vitae aliquam orci. Orci a faucibus urna nisl urna cursus
              vitae eget et consectetur. Mauris nam lectus leius
            </li>
            <li>celerisque. Eu in egestas at enim lectus ame</li>
          </ul>
        </Box>
      </Box>
    </Layout>
  );
};

export default Singleblog;
