import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropdown from "../../../components/globalComponents/Dropdown";
import Layout from "../../../components/globalComponents/Layout/Layout";
// import SearchInput from "../../../components/globalComponents/global_inputs/SearchInput";
// import { top100Films } from "../../../components/data";
import theme from "../../../theme";
import useFetch from "../../../features/hooks/useFetch";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourseParentCategories } from "../../../features/slice/categoriesSlice";
import CourseCard from "../../../components/Courses/CourseCard";
import CategoryCard from "../../../components/Market/Cards/CategoryCard";
import HeroSectionSwiper from "../../../components/HeroSectionSwiper/HeroSectionSwiper";
import img1 from "./../../../assets/heroSectionImages/course1.png";
import {
  img2,
  img3,
  img4,
  img5,
  img6,
} from "../../../assets/heroSectionImages";
const MarketCourses = () => {
  const [flag, setFlag] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(null);
  const [courseCategoriesList, setCourseCategoriesList] = useState([]);
  const [topParentCategories, setTopParentCategories] = useState([]);
  const [parents, setParents] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  let dispatch = useDispatch();
  // const navigate = useNavigate();
  const { fetchData, postData } = useFetch();

  let courseCat = [];
  //function to get the course categories from the backend
  const getCourseCategories = async () => {
    await fetchData("/api/course/parent", undefined, (res) => {
      if (res) {
        res?.data?.map((category) => {
          courseCat.push(category.name);
        });
        setCourseCategoriesList((current) => {
          current = courseCat;
          return [...courseCategoriesList, ...current];
        });
        setParents(res?.data);
        dispatch(setCourseParentCategories({ data: res?.data }));
        setFlag(true);
      }
    });
  };
  const getTopCourseCategories = async () => {
    let payload = {
      names: [
        "Digital Marketing",
        "Languages & Communication",
        "IT & Programming",
        "Business",
        "Quran",
        // "Education",
        "Design and Creative",
      ],
    };
    await postData(
      "/api/course/parentCatByNames",
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
  //function to fetch all products
  const getAllCourses = async (
    parentCategory = undefined,
    title = undefined
  ) => {
    await fetchData(
      `/api/course?${
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
        setFilteredCourses(res?.data);
      }
    );
  };
  //function to filter all courses if there is a selected category from dropdown
  const filterCourses = () => {
    setSelectedCategory(selectedCategory);
    let element;
    for (let index = 0; index < parents?.length; index++) {
      if (selectedCategory === parents[index].name) {
        element = parents[index];
      }
    }
    if (element) {
      getAllCourses(element.courseParentCategoryId, searchValue);
    } else if (selectedCategory?.courseParentCategoryId) {
      // console.log("else if", selectedCategory, searchValue);
      getAllCourses(selectedCategory?.courseParentCategoryId, searchValue);
    } else if (
      searchValue &&
      !element?.courseParentCategoryId &&
      !selectedCategory?.courseParentCategoryId
    ) {
      // console.log("else undefined ", searchValue);
      getAllCourses(undefined, searchValue);
    } else {
      getAllCourses();
    }
  };
  useEffect(() => {
    filterCourses();
  }, [selectedCategory]);
  useEffect(() => {
    getCourseCategories();
    getAllCourses();
    getTopCourseCategories();
  }, []);
  const courseSwiper = [
    {
      imagecourse: img1,
    },
    {
      imagecourse: img2,
    },
    {
      imagecourse: img3,
    },
    {
      imagecourse: img4,
    },
    {
      imagecourse: img5,
    },
    {
      imagecourse: img6,
    },
  ];
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Call your desired function here
      filterCourses();
    }
  };
  return (
    <Box>
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
        <Layout title={"Skill Enhancement Zone | SMAC"}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              "@media(max-width:992px)": {
                justifyContent: "center",
              },
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
                <Typography variant="h1" style={{ color: "#14B8A6" }}>
                  Level Up Your Skills Anytime
                </Typography>
                <Typography
                  vaiant="paragraph"
                  // sx={{
                  //   wordBreak: "break-all",
                  // }}
                >
                  Unlock a world of expert-led courses designed to advance your
                  career with flexible, self-paced learning in IT, business, and
                  personal growth.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    // width: "100%",
                    border: "1px solid grey",
                    background: "white",
                    borderRadius: "8px",
                    justifyContent: "start",
                  }}
                >
                  <Box
                    sx={{
                      width: "25%",
                    }}
                  >
                    {flag ? (
                      <Dropdown
                        data={courseCategoriesList}
                        cb={setSelectedCategory}
                        name={"course"}
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
              <HeroSectionSwiper swiperData={courseSwiper} />
            </Grid>
          </Grid>
        </Layout>
      </Box>
      <Layout>
        <Box
          sx={{
            padding: "40px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography variant="topCategoriesHeading">
              Top Courses Categories
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
              gap: "clamp(1.563rem, 1.566vw + 0.558rem, 2.438rem)",
              // gap: "39px",
              "@media(max-width:910px)": {
                justifyContent: "center",
                gap: "25px",
              },
            }}
          >
            {topParentCategories?.map((value, id) => {
              return <CategoryCard value={value} key={id} />;
            })}
          </Box>
        </Box>

        <Box
          sx={{
            margin: "0 auto",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "32% 32% 32%",
            [theme.breakpoints.down("lg")]: {
              gridTemplateColumns: "50% 50%",
            },
            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "auto",
              justifyItems: "center",
            },
            // [theme.breakpoints.down("sm")]: {
            //   gridTemplateColumns: "auto",
            //   justifyItems: "center",
            // },
          }}
        >
          {filteredCourses?.length === 0 ? (
            <Typography variant="h4Black">
              {selectedCategory == "Select Categories"
                ? `Currently there are no courses available`
                : `There are no courses of ${selectedCategory}`}
            </Typography>
          ) : (
            filteredCourses?.map((course) => {
              return <CourseCard course={course} key={course.courseId} />;
            })
          )}
        </Box>
      </Layout>
    </Box>
  );
};

export default MarketCourses;
