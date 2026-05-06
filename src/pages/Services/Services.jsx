import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../../components/globalComponents/Layout/Layout";
import HeroSectionSwiper from "../../components/HeroSectionSwiper/HeroSectionSwiper";
import theme from "../../theme";
// import SearchInput from "../../components/globalComponents/global_inputs/SearchInput";
// import { top100Films } from "../../components/data";
import {
  MarketAccessories,
  MarketCars,
  MarketHouse,
  MarketLands,
  MarketSocial,
  MarketVehicles,
} from "../../assets/MarkerHeroSection";
import Dropdown from "../../components/globalComponents/Dropdown";
import useFetch from "../../features/hooks/useFetch";
import { useDispatch } from "react-redux";
import { setServiceParentCategories } from "../../features/slice/categoriesSlice";
import CategoryCard from "../../components/Market/Cards/CategoryCard";
// import Serviceimage from "../../assets/sample/Serviceimage.svg";
import ServicesCard from "../../components/Services/ServicesCard";
import styled from "styled-components";

const Services = () => {
  const [flag, setFlag] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  // const [filteredProducts, setFilteredProducts] = useState(null);
  const [allservices, setAllservices] = useState([]);
  const [productCategoriesList, setProductCategoriesList] = useState([]);
  const [parents, setParents] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [topParentCategories, setTopParentCategories] = useState([]);
  const { fetchData, postData } = useFetch();
  let dispatch = useDispatch();

  let productCat = [];
  //function to fetch all products
  const getProductCategories = async () => {
    await fetchData("/api/service/parent", undefined, (res) => {
      if (res) {
        res?.data?.map((category) => {
          productCat.push(category.name);
        });
        setProductCategoriesList((current) => {
          current = productCat;
          return [...productCategoriesList, ...current];
        });
        setParents(res?.data);
        dispatch(setServiceParentCategories({ data: res?.data }));
        setFlag(true);
      }
    });
  };
  const getTopServiceCategories = async () => {
    let payload = {
      names: [
        "Tech & programming",
        "Design & Creative",
        "Business",
        "Digital Marketing",
        "Writing & Translation",
        "Telemarketing",
      ],
    };
    await postData(
      "/api/service/parentCatByNames",
      payload,
      undefined,
      undefined,
      false,
      (res) => {
        if (res) {
          setTopParentCategories(res?.data);
        }
      }
    );
  };

  const getAllServices = (parentCategory = undefined, title = undefined) => {
    fetchData(
      `/api/service?${
        parentCategory && title
          ? `parentCategory=${parentCategory}&title=${title}`
          : !parentCategory && title
          ? `title=${title}`
          : parentCategory && !title
          ? `parentCategory=${parentCategory}`
          : ""
      }`,
      undefined,
      (res) => {
        setAllservices(res.data);
      }
    );
  };
  const filterServices = () => {
    setSelectedCategory(selectedCategory);
    // //console.log(selectedCategory, "selected");
    let element;
    for (let index = 0; index < parents?.length; index++) {
      if (selectedCategory === parents[index].name) {
        element = parents[index];
      }
    }
    if (element) {
      getAllServices(element.serviceParentCategoryId, searchValue);
    } else if (selectedCategory?.serviceParentCategoryId) {
      // console.log("else if", selectedCategory, searchValue);
      getAllServices(selectedCategory?.serviceParentCategoryId, searchValue);
    } else if (
      searchValue &&
      !element?.serviceParentCategoryId &&
      !selectedCategory?.serviceParentCategoryId
    ) {
      // console.log("else undefined ", searchValue);
      getAllServices(undefined, searchValue);
    } else {
      //get all products
      getAllServices();
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Call your desired function here
      filterServices();
    }
  };
  useEffect(() => {
    filterServices();
  }, [selectedCategory]);

  useEffect(() => {
    getProductCategories();
    getAllServices();
    getTopServiceCategories();
  }, []);
  const marketSwiper = [
    {
      imagecourse: MarketAccessories,
    },
    {
      imagecourse: MarketHouse,
    },
    {
      imagecourse: MarketLands,
    },
    {
      imagecourse: MarketCars,
    },
    {
      imagecourse: MarketSocial,
    },
    {
      imagecourse: MarketVehicles,
    },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#4AEDDB1F",
          width: "100%",
          minHeight: "395px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Layout title={"Marketplace | SMAC"}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Grid md={6} item>
              <Box
                sx={{
                  display: "flex",
                  // alignItems:"center",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  gap: "25px",
                }}
              >
                <Typography
                  variant="h1"
                  style={{
                    color: "#14B8A6",
                  }}
                >
                  Discover Top Services in No Time
                </Typography>
                <Typography variant="paragraph">
                  Effortlessly buy and sell services on our marketplace, where
                  showcasing your offerings and discovering top solutions is
                  quick and simple.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    // width: "100%",
                    justifyContent: "start",
                    border: "1px solid grey",
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      width: "25%",
                    }}
                  >
                    {flag ? (
                      <Dropdown
                        name={"market"}
                        data={productCategoriesList}
                        cb={setSelectedCategory}
                        width={"100%"}
                      />
                    ) : null}
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <input
                      style={{
                        width: "100%",
                        padding: "8px 20px 8px 16px",
                        borderRadius: "12px",
                        height: "100%",
                        border: "none",
                        outline: "none",
                      }}
                      placeholder="Search"
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                      value={searchValue}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              md={5}
              sx={{
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            >
              <HeroSectionSwiper swiperData={marketSwiper} />
            </Grid>
          </Grid>
        </Layout>
      </Box>
      <Layout>
        {/* this is for the Services to show categore.... */}
        <Box
          sx={{
            marginTop: "55px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="topCategoriesHeading">
              Top Services Categories
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "30px",
              borderRadius: "32px",
              gap: "40px",
              "@media(max-width:910px)": {
                justifyContent: "center",
                gap: "8px",
              },
            }}
          >
            {topParentCategories?.map((value, id) => {
              return (
                <CategoryCard value={value} key={id} parentModule={"service"} />
              );
            })}
          </Box>
        </Box>
      </Layout>
      <Layout>
        <Grid
          container
          spacing={10}
          sx={{ padding: "1rem", marginTop: "20px" }}
        >
          {allservices.length > 0
            ? allservices?.map((data, id) => {
                return <ServicesCard key={id} value={data} />;
              })
            : "There is not Services"}
        </Grid>
      </Layout>
    </>
  );
};
export default Services;
