import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../../components/Market/Cards/Card";
import Layout from "../../components/globalComponents/Layout/Layout";
import Dropdown from "../../components/globalComponents/Dropdown";
import useFetch from "../../features/hooks/useFetch";
import { setProductParentCategories } from "../../features/slice/categoriesSlice";
import { useDispatch } from "react-redux";
import theme from "../../theme";
import CategoryCard from "../../components/Market/Cards/CategoryCard";
import HeroSectionSwiper from "../../components/HeroSectionSwiper/HeroSectionSwiper";
import {
  MarketAccessories,
  MarketCars,
  MarketHouse,
  MarketLands,
  MarketSocial,
  MarketVehicles,
} from "../../assets/MarkerHeroSection";
const Market = () => {
  const [flag, setFlag] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [productCategoriesList, setProductCategoriesList] = useState([]);
  const [topParentCategories, setTopParentCategories] = useState([]);
  const [parents, setParents] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const { fetchData, postData } = useFetch();
  let dispatch = useDispatch();

  let productCat = [];

  //function to fetch all products
  const getProductCategories = async () => {
    await fetchData("/api/product/parent", undefined, (res) => {
      if (res) {
        res?.data?.map((category) => {
          productCat.push(category.name);
        });
        setProductCategoriesList((current) => {
          current = productCat;
          return [...productCategoriesList, ...current];
        });
        setParents(res?.data);
        dispatch(setProductParentCategories({ data: res?.data }));
        setFlag(true);
      }
    });
  };
  const getAllProducts = async (
    parentCategory = undefined,
    title = undefined
  ) => {
    await fetchData(
      `/api/product?${
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
        setFilteredProducts(res?.data);
      }
    );
  };

  const filterProducts = () => {
    setSelectedCategory(selectedCategory);
    // //console.log(selectedCategory, "selected");
    let element;
    for (let index = 0; index < parents?.length; index++) {
      if (selectedCategory === parents[index].name) {
        element = parents[index];
      }
    }
    if (element) {
      getAllProducts(element.productParentCategoryId, searchValue);
    } else if (selectedCategory?.productParentCategoryId) {
      // console.log("else if", selectedCategory, searchValue);
      getAllProducts(selectedCategory?.productParentCategoryId, searchValue);
    } else if (
      searchValue &&
      !element?.productParentCategoryId &&
      !selectedCategory?.productParentCategoryId
    ) {
      // console.log("else undefined ", searchValue);
      getAllProducts(undefined, searchValue);
    } else {
      //get all products
      getAllProducts();
    }
  };
  const getTopProductsCategories = async () => {
    let payload = {
      names: [
        "Fashion & Beauty",
        "Books & Stationary",
        "electronics",
        "furniture",
        "Property",
        "Vehicles",
      ],
    };
    await postData(
      "/api/product/parentCatByNames",
      payload,
      undefined,
      undefined,
      false,
      (res) => {
        if (res) {
          setTopParentCategories(res?.data);
        }
      },
      false
    );
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Call your desired function here
      filterProducts();
    }
  };
  useEffect(() => {
    getTopProductsCategories();
    getProductCategories();
    getAllProducts();
  }, []);
  useEffect(() => {
    filterProducts();
  }, [selectedCategory]);

  // this is for the market category...
  const backgrounds = [
    {
      iconColor:
        "linear-gradient(180deg, #11669D 0%, #1AFBFB 50%, #E30256 100%)",
    },
    {
      iconColor: "linear-gradient(180deg, #0AB3FF 0%, #4B65FF 100%)",
    },
    {
      iconColor:
        "linear-gradient(180deg, #4F9D11 0%, #1AFB8F 50%, #02E35C 100%)",
    },
    {
      iconColor: "linear-gradient(180deg, #9ABADB 0%, #ED3E3C 100%)",
    },
    {
      iconColor: "linear-gradient(180deg, #9997CF 0%, #7E7BC6 100%)",
    },
    {
      iconColor: "linear-gradient(180deg, #0AB3FF 0%, #4B65FF 100%)",
    },
  ];
  // this is for the market hero Section Images...
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
        {/* this is for the market to show categore.... */}
        <Box
          sx={{
            padding: "40px 0px",
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
              Top Categories
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
                <CategoryCard
                  value={value}
                  key={id}
                  parentModule={"product"}
                  backgrounds={backgrounds}
                />
              );
            })}
          </Box>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              margin: "0 auto",
              display: "grid",
              gap: "20px",

              gridTemplateColumns: "49% 49%",
              // gridAutoRows: "462px",

              [theme.breakpoints.down("md")]: {
                gridTemplateColumns: "auto",
                justifyItems: "center",
              },
            }}
          >
            {filteredProducts?.length === 0 ? (
              <Typography variant="h4Black">
                <Typography variant="h4Black">
                  {selectedCategory == "Select Categories"
                    ? `Currently there are no products available`
                    : `There are no products of ${selectedCategory}`}
                </Typography>
              </Typography>
            ) : (
              filteredProducts?.map((cardData, index) => {
                return <Card cardData={cardData} key={index} index={index} />;
              })
            )}
          </Box>
        </Box>

        {/* this is the model for view single product details */}
        {/* <ViewProduct /> */}
        {/* this is the model for adding a product */}
        {/* <AddProduct open={productOpen} setOpen={setProductOpen} /> */}
      </Layout>
      {/* </Box> */}
    </>
  );
};

export default Market;
