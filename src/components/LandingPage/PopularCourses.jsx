import React, { useEffect, useState } from "react";
import CourseCard from "../Courses/CourseCard";
import theme from "../../theme";
import { Box, Typography } from "@mui/material";
import useFetch from "../../features/hooks/useFetch";
import Marquee from "react-fast-marquee";

const PopularCourses = () => {
  const [trendingCourses, setTrendingCourses] = useState([]);
  const { fetchData } = useFetch();
  const fetchTrendingCourses = () => {
    //this api to be changed if the the trending post api is created
    try {
      fetchData("/api/open/course?limit=6", undefined, (res) => {
        setTrendingCourses(res?.data || []);
      });
    } catch (err) {
      //console.log(err, "error while getting courses");
    }
  };
  useEffect(() => {
    fetchTrendingCourses();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        gap: "1.5rem",
        mt: "3.125rem",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          // lineHeight: "86.24px",
          textAlign: "center",
          color: "#000000",
        }}
      >
        Top Courses from Leading Experts
      </Typography>

      {/* <Typography variant="uploadForm" maxWidth={864} textAlign={"center"}>
        SMAC is{" "}
        <span style={{ fontWeight: 600, color: theme.palette.primary.main }}>
          your one-stop solution
        </span>{" "}
        for all your development needs!
      </Typography> */}

      <Marquee
        pauseOnHover
        style={{ padding: "1.5rem 0rem", marginTop: "1.563rem" }}
      >
        {trendingCourses.map((course) => {
          return (
            <div
              style={{
                marginLeft: "1rem",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "1rem",
              }}
              key={course.courseId}
            >
              <CourseCard course={course} />
            </div>
          );
        })}
      </Marquee>
    </Box>
  );
};

export default PopularCourses;
