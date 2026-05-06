import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import SinglePost from "../../components/Social/posts/SinglePost";
import SkeletonLoader from "../../components/globalComponents/SkeletonLoader";
import { Masonry } from "@mui/lab";
import useGetAPI from "../../features/hooks/useGetAPI";
import ActiveSection from "../../components/Social/Explore/ActiveSection";
import art from "../../assets/explore/posts/art.png";
import artThumbnail from "../../assets/explore/posts/artThumbnail.png";
import beauty from "../../assets/explore/posts/beauty.png";
import beautyThumbnail from "../../assets/explore/posts/beautyThumbnail.png";
import education from "../../assets/explore/posts/education.png";
import educationThumbnail from "../../assets/explore/posts/educationThumbnail.png";
import electronics from "../../assets/explore/products/electronics.png";
import property from "../../assets/explore/products/property.png";
import vehicle from "../../assets/explore/products/vehicle.png";
import electronicsThumbnail from "../../assets/explore/products/electronicsThumbnail.png";
import propertyThumbnail from "../../assets/explore/products/propertyThumbnail.png";
import vehicleThumbnail from "../../assets/explore/products/vehicleThumbnail.png";
import development from "../../assets/explore/courses/development.png";
import graphic from "../../assets/explore/courses/graphic.png";
import quran from "../../assets/explore/courses/quran.png";
import developmentThumbnail from "../../assets/explore/courses/developmentThumbnail.png";
import graphicThumbnail from "../../assets/explore/courses/graphicThumbnail.png";
import quranThumbnail from "../../assets/explore/courses/quranThumbnail.png";
import ActiveCategory from "../../components/Social/Explore/ActiveCategory";
import ModuleCard from "../../components/Social/Explore/ModuleCard";
import theme from "../../theme";

const Explore = () => {
  const activeRef = useRef(null);
  let exploreData = [
    {
      cardId: "1",

      cardTitle: "Best Cources to explore",
      cardDescription:
        "Discover the best courses tailored to boost your skills and career.",
      categories: [
        {
          id: "1",
          navigate: "/courses",
          ref: activeRef,
          name: "Design & Creative",
          image: graphic,
          categoryDescription:
            "Discover your inner artist and master design today.",
          totalItems: "Over 3000+ Premium Graphic Courses ",
          totalSellers: "Over 100+ High Qualified Teachers",
          categoryThumbnail: graphicThumbnail,
          categoryGradient: "linear-gradient(180deg, #FFE9D0 0%, #FFC8BC 100%)",
        },
        {
          id: "2",
          ref: activeRef,
          navigate: "/courses",
          name: "Quran & Seerah",
          image: quran,
          categoryDescription:
            "Learn about the Quran and the Prophet Muhammad (PBUH)  life from top scholars",
          totalItems: "Over 3000+ Premium Quran Courses",
          totalSellers: "Over 100+ High Qualified Teachers",
          categoryThumbnail: quranThumbnail,
          categoryGradient: "linear-gradient(180deg, #FEE8AF 0%, #C3F393 100%)",
        },
        {
          id: "3",
          ref: activeRef,
          name: "Computer  Science & IT",
          navigate: "/courses",
          image: development,
          categoryDescription:
            "Stay ahead with the latest courses in technology and IT innovation.",
          totalItems: "Over 3000+ Premium Tech Courses ",
          totalSellers: "Over 100+ High Qualified Teachers ",
          categoryThumbnail: developmentThumbnail,
          categoryGradient: "linear-gradient(180deg, #A8DDFF 0%, #D4D3FF 100%)",
        },
      ],
    },
    {
      cardId: "2",

      cardTitle: "Top quality products for you",
      cardDescription:
        "Explore a world of top-quality products, handpicked to suit your every need!",
      categories: [
        {
          id: "1",
          navigate: "/market",
          ref: activeRef,
          name: "Electronics and Home Appliances",
          image: electronics,
          categoryDescription:
            "Upgrade your home with cutting-edge tech – explore our top electronics!",
          totalItems: "Over 3000+ Premium Products",
          totalSellers: "Over 1000+ Trusted Sellers ",
          categoryThumbnail: electronicsThumbnail,
          categoryGradient:
            "linear-gradient(180deg, rgba(0, 170, 240, 0.38) 0%, rgba(0, 210, 255, 0.38) 100%)",
        },
        {
          id: "2",
          navigate: "/market",
          ref: activeRef,
          name: "Property",
          image: property,
          categoryDescription:
            "Find your dream home or next investment – explore our top property listings today!",
          totalItems: "Over 3000+ Premium Products ",
          totalSellers: "Over 1000+ Trusted Sellers ",
          categoryThumbnail: propertyThumbnail,
          categoryGradient:
            "linear-gradient(180deg, rgba(255, 223, 151, 0.73) 0%, rgba(255, 163, 159, 0.73) 100%)",
        },
        {
          id: "3",
          navigate: "/market",
          ref: activeRef,
          name: "Vehicles",
          image: vehicle,
          categoryDescription:
            "Drive in style and comfort – check out our top vehicle picks for every lifestyle!",
          totalItems: "Over 3000+ Premium Products ",
          totalSellers: "Over 1000+ Trusted Sellers ",
          categoryThumbnail: vehicleThumbnail,
          categoryGradient:
            "linear-gradient(180deg, rgba(20, 184, 166, 0.48) 0%, rgba(32, 205, 186, 0.48) 100%)",
        },
      ],
    },
    {
      cardId: "3",

      cardTitle: "get inspired by trending topics",
      cardDescription:
        "Trending now: Get inspired by the hottest topics everyone’s talking about this week!",
      categories: [
        {
          id: "1",
          navigate: "/services",
          ref: activeRef,
          name: "Education & Knowledge",
          image: education,
          categoryDescription:
            " Stay ahead with the latest insights – learn something new today!",
          totalItems: "300+ Education & Knowledge Topics",
          totalSellers: "Over 1000+ Trends Followers",
          categoryThumbnail: educationThumbnail,
          categoryGradient:
            "linear-gradient(180deg, rgba(175, 231, 255, 0.63) 0%, rgba(255, 211, 126, 0.63) 100%)",
        },
        {
          id: "2",
          navigate: "/services",
          ref: activeRef,
          name: "Art & Design",
          image: art,
          categoryDescription:
            " Explore creativity and inspiration – dive into trending art and design!",
          totalItems: "Over 3000+ Art & Design Topics",
          totalSellers: "Over 1000+ Trends Followers",
          categoryThumbnail: artThumbnail,
          categoryGradient:
            "linear-gradient(180deg, rgba(175, 231, 255, 0.63) 0%, rgba(255, 211, 126, 0.63) 100%)",
        },
        {
          id: "3",
          navigate: "/services",
          ref: activeRef,
          name: "Beauty & Fashion",
          image: beauty,
          categoryDescription:
            "Discover the hottest trends in beauty and fashion – style yourself today!",
          totalItems: "Over 3000+ Beauty & Fashion Topics",
          totalSellers: "Over 1000+ Trends Followers",
          categoryThumbnail: beautyThumbnail,
          categoryGradient:
            "linear-gradient(180deg, rgba(175, 231, 255, 0.63) 0%, rgba(255, 211, 126, 0.63) 100%)",
        },
      ],
    },
  ];
  const { getData } = useGetAPI(); // Custom hook to get data from API
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(true);
  const [activeSection, setActiveSection] = useState(exploreData[0]);
  const [activeCategory, setActiveCategory] = useState(
    activeSection?.categories[0]
  );
  const [modules, setModules] = useState([
    { ...exploreData[1] },
    { ...exploreData[2] },
  ]);
  // Function to scroll to a section
  const scrollToSection = (sectionRef) => {
    const offsetTop = sectionRef.current.offsetTop - 120; // Adjust 100px from the top
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };
  // Function to fetch data from API
  const fetchScrollData = async () => {
    //this api to be changed if the the trending post api is created
    try {
      await getData(`/api/user/post?limit=6&page=1`, (response) => {
        const data = response.data;
        setPosts(data);
        setLoad(false);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reArrangeArray = (item) => {
    let modulesArray = [];
    let activeModule = {};
    for (let i = 0; i < exploreData.length; i++) {
      if (item === exploreData[i].cardId) {
        activeModule = exploreData[i];
      } else {
        modulesArray.push(exploreData[i]);
      }
    }
    //console.log(activeModule);
    //console.log(activeModule);

    setActiveSection(activeModule);
    setModules(modulesArray);
  };
  useEffect(() => {
    fetchScrollData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "18px",
          mt: "3rem",
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
          },
        }}
      >
        <Box>
          <ActiveSection
            item={activeSection}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            scrollToSection={scrollToSection}
            activeRef={activeRef}
          />
          <Box
            sx={{
              mt: "16px",
              display: "flex",
              gap: "16px",
              width: "100%",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },
            }}
          >
            {modules?.map((item, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => reArrangeArray(item.cardId)}
                  sx={{ cursor: "pointer" }}
                >
                  <ModuleCard
                    item={item}
                    setActiveSection={setActiveSection}
                    setActiveCategory={setActiveCategory}
                  />{" "}
                </Box>
              );
            })}
          </Box>
        </Box>
        <div ref={activeRef}>
          <ActiveCategory activeCategory={activeCategory} />
        </div>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "clamp(2rem, 1.429vw + 1.286rem, 3rem)",
            color: "#333333",
            fontWeight: 700,
            margin: "2rem 0px 1.25rem 0px",
          }}
        >
          What’s New on SMAC
        </Typography>

        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Masonry
            sx={{ display: "flex", flexWrap: "wrap" }}
            columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
            spacing={8}
          >
            {load
              ? [1, 2, 3].map((post, index) => <SkeletonLoader key={index} />)
              : posts.map((post, index) => (
                  <div
                    key={post.postID}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <SinglePost post={post} />
                  </div>
                ))}
          </Masonry>
        </Box>
      </Box>
    </Box>
  );
};

export default Explore;
