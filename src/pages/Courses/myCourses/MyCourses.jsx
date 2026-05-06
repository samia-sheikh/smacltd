import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageComp from "../../../components/globalComponents/ImageComp";
import HeroSection from "../../../components/globalComponents/HeroSection";
import Dropdown from "../../../components/globalComponents/Dropdown";
import Layout from "../../../components/globalComponents/Layout/Layout";
import SearchInput from "../../../components/globalComponents/global_inputs/SearchInput";
import { coursesData, top100Films } from "../../../components/data";
import theme from "../../../theme";
import useFetch from "../../../features/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const MarketCourses = () => {
  const [marketCourse, setMarketCourse] = useState();
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();
  const { fetchData } = useFetch();

  useEffect(() => {
    fetchData("/api/course/my-courses", undefined, (res) => {
      setCourseList(res?.data);
    });
  }, []);

  return (
    <Box>
      <HeroSection
        title={`Unlock Your Potential: Explore Our Diverse Range of Courses`}
        description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}
      />
      <Layout>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-30px !important",
            zIndex: 999,
          }}
        >
          <SearchInput
            dropDownData={top100Films}
            inputType="multitag"
            display={"block"}
            Icondisply={{
              display: "none",
            }}
          />
        </Box>
        <Box sx={{ margin: "25px 0" }}>
          <Dropdown
            data={coursesData}
            objKey={`courseName`}
            cb={setMarketCourse}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {courseList?.map((c) => {
            return (
              <Paper
                sx={{
                  width: "100%",
                  maxWidth: "544px",
                  cursor: "pointer",
                  ":hover": {
                    boxShadow: "0px 0px 10px 0px rgba(105,105,105,0.5)",
                  },
                }}
                key={c.courseId}
                onClick={() => {
                  navigate(`/course/${c.courseId}`);
                }}
              >
                <ImageComp
                  src={c.images[0]}
                  alt={c.title}
                  sx={{ height: "269px", width: "100%" }}
                />
                <Box sx={{ padding: "24px" }}>
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
                          <Typography variant="subHeader">{c.mode}</Typography>
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
                        }}
                      >
                        <Typography variant="subHeaderBlack">
                          Class Days:{" "}
                        </Typography>
                        <Typography variant="subHeader">
                          {c.classDays?.map((d, i) => {
                            let str = i === c.classDays.length - 1 ? " " : ", ";
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="h4Black"
                        sx={{ textTransform: "capitalize" }}
                      >
                        By: {c.user?.firstName.substring(0,10) + " " + c.user?.lastName.substring(0,10)}
                      </Typography>
                      <Typography variant="h4Black">

                      {moment
                          .utc(c.createdAt.substring(0, 10))
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
          })}
        </Box>
      </Layout>
    </Box>
  );
};

export default MarketCourses;
