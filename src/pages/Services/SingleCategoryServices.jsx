import React, { useEffect, useState } from "react";
import useFetch from "../../features/hooks/useFetch";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ImageComp from "../../components/globalComponents/ImageComp";
import theme from "../../theme";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/globalComponents/Layout/Layout";
import ButtonComp from "../../components/globalComponents/ButtonComp";
import Dropdown from "../../components/globalComponents/Dropdown";
import icon from "../../assets/icons/All.png";
const SingleCategoryServices = () => {
  const [flag, setFlag] = useState(false);
  const { serviceParentCategoryId } = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [subCatList, setSubCatList] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Define state for the input
  const { fetchData } = useFetch();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [topSubCategories, setTopSubCategories] = useState([]);
  const getParentCategory = async () => {
    await fetchData(
      //here instead of parent category, privide id to get
      `/api/service/parent/${serviceParentCategoryId}`,
      undefined,
      (res) => {
        //console.log(res, "resssss");
        setParentCategory(res?.data);

        //console.log(res.data);
      }
    );
  };
  const getCoursesOfSingleProductCategory = async () => {
    await fetchData(
      //here instead of parent category, privide id to get
      `/api/service?parentCategory=${serviceParentCategoryId}`,
      undefined,
      (res) => {
        //console.log(res, "resssss");
        setCourses(res.data);
        //console.log(res.data);
      }
    );
  };
  let courseCat = [];
  const getTopCourseSubCategories = async () => {
    await fetchData(
      //here instead of parent category, privide id to get
      `/api/service/sub?parentCategoryId=${serviceParentCategoryId}`,
      undefined,
      (res) => {
        //console.log(res, "resssss");
        res?.data?.map((category) => {
          courseCat.push(category.name);
        });
        setSubCatList((current) => {
          current = courseCat;
          return [...subCatList, ...current];
        });
        setTopSubCategories(res.data);
        setFlag(true);
        //console.log(res.data);
      }
    );
  };
  const getCourses = async (
    serviceSubCategoryId = undefined,
    serviceName = undefined
  ) => {
    await fetchData(
      //here instead of sub category, privide id to get
      `/api/service/getBySubCat?${
        serviceSubCategoryId && serviceName
          ? `serviceSubCategoryId=${serviceSubCategoryId}&serviceName=${serviceName}`
          : !serviceSubCategoryId && serviceName
          ? `serviceName=${serviceName}`
          : serviceSubCategoryId && !serviceName
          ? `serviceSubCategoryId=${serviceSubCategoryId}`
          : ""
      }`,
      undefined,
      (res) => {
        //console.log(res, "resssss");
        setCourses(res.data);
        //console.log(res.data);
      }
    );
  };
  const filterCourses = async () => {
    let element;
    for (let index = 0; index < topSubCategories?.length; index++) {
      if (selectedSubCategory === topSubCategories[index].name) {
        element = topSubCategories[index];
      }
    }
    if (element) {
      // console.log("if element", element, searchValue);
      getCourses(element.serviceSubCategoryId, searchValue);
    } else if (selectedSubCategory?.serviceSubCategoryId) {
      // console.log("else if", selectedSubCategory, searchValue);
      getCourses(selectedSubCategory?.serviceSubCategoryId, searchValue);
    } else if (
      searchValue &&
      !element?.serviceSubCategoryId &&
      !selectedSubCategory?.serviceSubCategoryId
    ) {
      // console.log("else undefined ", searchValue);
      getCourses(undefined, searchValue);
    } else {
      // console.log("else");
      getCoursesOfSingleProductCategory();
    }
  };

  useEffect(() => {
    getParentCategory();
    getTopCourseSubCategories();
    getCoursesOfSingleProductCategory();
  }, []);
  useEffect(() => {
    filterCourses();
  }, [selectedSubCategory]);
  const SubCategoryCard = ({ value }) => {
    return (
      <ButtonComp
        customStyles={{
          display: "flex",
          gap: "1.25rem",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          maxWidth: "256px",
          borderRadius: "9px",
          height: "70px",
          color: "black",
          background:
            selectedSubCategory === value.name
              ? theme.palette.primary.main
              : "#ECECEC",
        }}
        customHover={{
          color: "white",
        }}
        click={() => {
          setSelectedSubCategory(value);
        }}
        image={value.icon}
        label={value.name}
      ></ButtonComp>
    );
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      filterCourses();
    }
  };
  return (
    <div>
      {/* <HeroSection
        title={`Explore Quran Courses`}
        description={`Add Quran learning into your daily routine with our comprehensive Quranic courses.`}
      /> */}
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
                {parentCategory?.name}
              </Typography>
              <Typography
                vaiant="paragraph"
                // sx={{
                //   wordBreak: "break-all",
                // }}
              >
                {parentCategory?.description}
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
                      data={subCatList}
                      cb={setSelectedSubCategory}
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
                    type="text"
                    placeholder="What do you want to learn?"
                    value={searchValue}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      const value = e.target.value;

                      setSearchValue(value); // Update the state
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 20px 8px 16px",
                      borderRadius: "12px",
                      height: "100%",
                      border: "none",
                      outline: "none",
                    }}
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
            <ImageComp
              src={parentCategory?.banner}
              sx={{ width: "100%", objectFit: "contain" }}
            />
          </Grid>
        </Grid>
      </Layout>
      <Layout title={"Learn Quran | SMAC"}>
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
          <ButtonComp
            customStyles={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              maxWidth: "256px",
              borderRadius: "9px",
              height: "70px",
              color: "black",
              background:
                selectedSubCategory === "All"
                  ? theme.palette.primary.main
                  : "#ECECEC",
            }}
            image={icon}
            customHover={{
              color: "white",
              background: theme.palette.primary.main,
            }}
            click={() => {
              filterCourses();
              setSelectedSubCategory("All");
            }}
            // image={value.icon}
            label={"All"}
          />
          {topSubCategories?.map((value, id) => {
            return <SubCategoryCard value={value} key={id} />;
          })}
        </Box>
        <Box
          sx={{
            marginTop: "25px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {courses?.length ? (
            courses?.map((c) => {
              return (
                <Paper
                  sx={{
                    width: "100%",
                    maxWidth: "544px",
                    cursor: "pointer",
                    ":hover": {
                      boxShadow: "0px 0px 10px 0px rgba(105,105,105,0.5)",
                    },

                    "@media(max-width:375px)": {
                      maxWidth: "300px",
                    },
                  }}
                  key={c.courseId}
                  onClick={() => {
                    navigate(`/service/${c.courseId}`);
                  }}
                >
                  <ImageComp
                    src={c.images[0]}
                    alt={c.title}
                    sx={{ height: "270px", width: "100%", objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      padding: "24px",
                      "@media (max-width:375px)": {
                        padding: "12px",
                      },
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                          marginBottom: "24px",
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {c.title}
                        </Typography>
                        <Typography variant="h4Black">
                          {c.description.substring(0, 100)}
                        </Typography>
                        <Box sx={{ display: "flex", gap: "20px" }}>
                          <Box
                            sx={{
                              backgroundColor: "#EDEDED",
                              width: "max-content",
                              display: "flex",
                              gap: "8px",
                              padding: "5px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            <Typography variant="subHeaderBlack">
                              Course Type:
                            </Typography>
                            <Typography variant="subHeader">
                              {c.mode}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              backgroundColor: "#EDEDED",
                              width: "max-content",
                              display: "flex",
                              gap: "8px",
                              padding: "5px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            <Typography variant="subHeaderBlack">
                              Course Duration:{" "}
                            </Typography>
                            <Typography variant="subHeader">
                              {c.courseDuration}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "#EDEDED",
                            width: "max-content",
                            display: "flex",
                            gap: "8px",
                            padding: "5px 8px",
                            borderRadius: "4px",
                            "@media(max-width:375px)": {
                              gap: "0px",
                              padding: "5px 5px",
                            },
                          }}
                        >
                          <Typography variant="subHeaderBlack">
                            Class Days:{" "}
                          </Typography>
                          <Typography variant="subHeader">
                            {c.classDays?.map((d, i) => {
                              let str =
                                i === c.classDays.length - 1 ? " " : ", ";
                              return d + str;
                            })}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "#EDEDED",
                            width: "max-content",
                            display: "flex",
                            gap: "8px",
                            padding: "5px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          <Typography variant="subHeaderBlack">
                            Class Duration:{" "}
                          </Typography>
                          <Typography variant="subHeader">
                            {c.classDuration}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h4Black"
                          sx={{ textTransform: "capitalize" }}
                        >
                          By:{" "}
                          {c.user?.firstName.substring(0, 10) +
                            " " +
                            c.user?.lastName.substring(0, 10)}
                        </Typography>
                        <Typography variant="h4Black">
                          {moment
                            .utc(c.createdAt)
                            .local()
                            .startOf("seconds")
                            .fromNow()}
                        </Typography>
                        <Typography
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            padding: "5px 16px",
                            color: "white",
                            borderRadius: "4px",
                          }}
                        >
                          {c.courseFee}PKR
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              );
            })
          ) : (
            <>
              At the moment there are no courses available for{" "}
              {parentCategory?.name}
            </>
          )}
        </Box>
      </Layout>
    </div>
  );
};

export default SingleCategoryServices;
