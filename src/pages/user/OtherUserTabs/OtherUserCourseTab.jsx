import React, { useEffect, useState } from "react";
import useFetch from "../../../features/hooks/useFetch";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import CourseCard from "../../../components/Courses/CourseCard";

const OtherUserCourseTab = () => {
  const [otherUserCourse, setOtherUserCourse] = useState([]);
  const { fetchData } = useFetch();
  const { id } = useParams();

  useEffect(() => {
    fetchData(
      `/api/course/getAllCoursesOfASpecificUserOpen/${id}`,
      undefined,
      (res) => {
        setOtherUserCourse(res?.data);
      }
    );
  }, []);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {otherUserCourse?.map((courseData) => {
        return (
          <CourseCard
            course={courseData}
            key={courseData.courseId}
            widthCourse={"404px"}
          />
        );
      })}
    </Box>
  );
};

export default OtherUserCourseTab;
