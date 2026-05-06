import React, { useEffect, useState } from "react";
import Layout from "../../components/globalComponents/Layout/Layout";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import {
  blogimagefirst,
  blogimagesecond,
  blogimagethird,
} from "../../assets/Blogs";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/globalComponents/global_inputs/SearchInput";
import { top100Films } from "../../components/data";
import useFetch from "../../features/hooks/useFetch";
import { useDispatch } from "react-redux";
import { setCourseParentCategories } from "../../features/slice/categoriesSlice";
import Dropdown from "../../components/globalComponents/Dropdown";

const Blogs = () => {
  const { fetchData } = useFetch();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courseCategoriesList, setCourseCategoriesList] = useState([]);
  const [parents, setParents] = useState(null);
  // const [filteredCourses, setFilteredCourses] = useState(null);

  let dispatch = useDispatch();
  const blogData = [
    {
      img: blogimagefirst,
      title: "10 Best Ecommerce Hosting Services for 2024",
      date: "25 July 2024",
      id: 1,
    },
    {
      img: blogimagesecond,
      title: "The Future of Networking: NFC Digital Business Cards",
      date: "25 August 2024",
      id: 2,
    },
    {
      img: blogimagethird,
      title: "The Future of Networking: NFC Digital Business Cards",
      date: "25 September 2024",
      id: 3,
    },
    {
      img: blogimagefirst,
      title: "10 Best Ecommerce Hosting Services for 2024",
      date: "25 July 2024",
      id: 4,
    },
    {
      img: blogimagesecond,
      title: "The Future of Networking: NFC Digital Business Cards",
      date: "25 August 2024",
      id: 5,
    },
    {
      img: blogimagethird,
      title: "The Future of Networking: NFC Digital Business Cards",
      date: "25 September 2024",
      id: 6,
    },
  ];
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
      fetchData(
        `/api/course?parentCategory=${element.courseParentCategoryId}`,
        undefined,
        (res) => {
          // setFilteredCourses(res?.data);
        }
      );
    } else {
    }
  };
  useEffect(() => {
    filterCourses();
  }, [selectedCategory]);
  useEffect(() => {
    getCourseCategories();
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          // maxWidth: "1661px",
          marginTop: "47px",
          height: "452.33px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "49.1px",
          flexDirection: "column",
          boxShadow: "0px 0px 10.76px 0px #00000040 inset",
          gap: "25px",
          padding: "30px",
          [theme.breakpoints.down("sm")]: {
            padding: "20px",
          },
        }}
      >
        <Typography variant="h1">All Blogs</Typography>
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            maxWidth: "1156.43px",
            textAlign: "center",
          }}
        >
          Here are all the blogs we have published so far. You can find more
          information about each blog by clicking on the title. Lorem ipsum
          dolor sit amet consectetur adipisicing elit.
        </Typography>

        {/* here is the search input field */}

        <Box
          sx={{
            boxShadowh: "0px 0px 10.76px 0px #00000040 inset",
            display: "flex",
            width: "100%",
            border: "1px solid grey",
            maxWidth: "864.97px",
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
            <SearchInput
              dropDownData={top100Films}
              inputType="multitag"
              display={false}
              width={true}
              Icondisply={{
                display: "none",
              }}
              margin={"0px"}
              area={true}
            />
          </Box>
        </Box>

        {/*  */}
      </Box>

      <Box
        sx={{
          marginTop: "30px",
        }}
      >
        {blogData.map((blog, index) =>
          index % 3 === 0 ? (
            // Row with one vertical and two horizontal cards
            <Box
              sx={{
                display: "flex",
                gap: "30px",
                marginTop: "30px",
                width: "100%",
                [theme.breakpoints.down("md")]: {
                  flexWrap: "wrap",
                },
              }}
              key={index}
            >
              {/* Vertical Card */}
              <Box
                sx={{
                  width: "50%",
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                  },
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "849px",
                    borderRadius: "45.83px",
                    border: "2px solid rgba(176, 176, 176, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    backgroundImage: `url(${blog.img})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <Box
                    sx={{
                      height: "374px",
                      display: "flex",
                      alignItems: "unset",
                      justifyContent: "end",
                      flexDirection: "column",
                      padding: "22px",
                      color: "white",
                      background:
                        "linear-gradient(180deg, rgba(2, 2, 2, 0) 0%, rgba(1, 1, 1, 0.86) 50%, #000000 100%)",
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h3"
                        sx={{
                          width: "100%",
                          maxWidth: "500px",
                        }}
                        component="div"
                      >
                        {blog.title}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>{blog.date}</Typography>
                      <Button onClick={() => navigate(`/blogs/${blog.id}`)}>
                        <BsArrowUpRightCircleFill
                          style={{ width: "50px", height: "50px" }}
                        />
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Box>

              {/* Horizontal Cards Container */}
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "33px",
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                  },
                }}
              >
                {/* First Horizontal Card */}
                {blogData[index + 1] && (
                  <Card
                    sx={{
                      width: "100%",
                      height: "412px",
                      borderRadius: "45.83px",
                      border: "2px solid rgba(150, 150, 150, 0.5)",
                      backgroundImage: `url(${blogData[index + 1].img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      display: "flex",
                      // justifyContent: "center",
                      alignItems: "end",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "374px",
                        display: "flex",
                        alignItems: "unset",
                        justifyContent: "end",
                        flexDirection: "column",
                        padding: "22px",
                        color: "white",
                        background:
                          "linear-gradient(180deg, rgba(2, 2, 2, 0) 0%, rgba(1, 1, 1, 0.86) 50%, #000000 100%)",
                      }}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h3"
                          component="div"
                          sx={{
                            width: "100%",
                            maxWidth: "500px",
                          }}
                        >
                          {blogData[index + 1].title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>{blogData[index + 1].date}</Typography>
                        <Button
                          onClick={() =>
                            navigate(`/blogs/${blogData[index + 1].id}`)
                          }
                        >
                          <BsArrowUpRightCircleFill
                            style={{ width: "40px", height: "40px" }}
                          />
                        </Button>
                      </CardActions>
                    </Box>
                  </Card>
                )}
                {/* Second Horizontal Card */}
                {blogData[index + 2] && (
                  <Card
                    sx={{
                      width: "100%",
                      height: "412px",
                      borderRadius: "45.83px",
                      border: "2px solid rgba(150, 150, 150, 0.5)",
                      backgroundImage: `url(${blogData[index + 2].img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      display: "flex",
                      // justifyContent: "center",
                      alignItems: "end",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "374px",
                        display: "flex",
                        alignItems: "unset",
                        justifyContent: "end",
                        flexDirection: "column",
                        padding: "22px",
                        color: "white",
                        background:
                          "linear-gradient(180deg, rgba(2, 2, 2, 0) 0%, rgba(1, 1, 1, 0.86) 50%, #000000 100%)",
                      }}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h3"
                          component="div"
                          sx={{
                            width: "100%",
                            maxWidth: "500px",
                          }}
                        >
                          {blogData[index + 2].title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            // maxWidth: "80px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {blogData[index + 2].date}
                        </Typography>
                        <Button
                          onClick={() =>
                            navigate(`/blogs/${blogData[index + 2].id}`)
                          }
                        >
                          <BsArrowUpRightCircleFill
                            style={{ width: "40px", height: "40px" }}
                          />
                        </Button>
                      </CardActions>
                    </Box>
                  </Card>
                )}
              </Box>
            </Box>
          ) : null
        )}
      </Box>
    </Layout>
  );
};

export default Blogs;
