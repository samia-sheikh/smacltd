import React, { useEffect, useState } from "react";
import useFetch from "../../../features/hooks/useFetch";
import CourseCard from "../../../components/Courses/CourseCard";
import { Box } from "@mui/material";

const CoursesTab = () => {
  const [courseList, setCourseList] = useState([]);
  const { fetchData } = useFetch();
  useEffect(() => {
    fetchData("/api/course/my-courses", undefined, (res) => {
      setCourseList(res?.data);
    });
  }, []);
  return (
    <Box sx={{display: "flex", flexWrap:"wrap" ,gap:6}}>
      {courseList?.map((courseData) => {
        return <CourseCard course={courseData} key={courseData.courseId} widthCourse={"404px"} />;
      })}
    </Box>
  );
};

export default CoursesTab;
