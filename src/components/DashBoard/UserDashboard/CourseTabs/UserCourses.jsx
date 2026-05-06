import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetch from "../../../../features/hooks/useFetch";
import { setCourseParentCategories } from "../../../../features/slice/categoriesSlice";
import { useDispatch } from "react-redux";
import theme from "../../../../theme";
import Layout from "../../../globalComponents/Layout/Layout";
import CourseTable from "../Listing/CourseTable";
const UserCourses = ({ courseData }) => {
  const [courseList, setCourseList] = useState([]);
  const { fetchData } = useFetch();
  let dispatch = useDispatch();
  const getCourseCategories = async () => {
    await fetchData("/api/course/parent", undefined, (res) => {
      if (res) {
        dispatch(setCourseParentCategories({ data: res?.data }));
      }
    });
  };
  useEffect(() => {
    fetchData("/api/course/my-courses", undefined, (res) => {
      setCourseList(res?.data);
    });
    getCourseCategories();
  }, []);
  useEffect(() => {
    if (courseData.authorEmail) setCourseList((pre) => [courseData, ...pre]);
  }, [courseData]);
  return (
    <Layout styles={{ padding: "0" }}>
      <>
        <Box
          sx={{
            // maxWidth: "1252px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "15px",
            height: "auto",
            width: "100%",
            [theme.breakpoints.down("md")]: {
              padding: "0px",
            },
          }}
        >
          <Box
            sx={{
              padding: "40px",
              [theme.breakpoints.down("md")]: {
                padding: "16px",
              },
            }}
            component={"div"}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                // gap: "20px",
                mt: "12px",
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "20%" }}></TableCell>
                      <TableCell
                        variant="h3"
                        sx={{
                          width: "20%",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Course Name
                      </TableCell>
                      <TableCell
                        variant="h3"
                        sx={{
                          width: "20%",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Total Enrollments
                      </TableCell>
                      <TableCell
                        variant="h3"
                        sx={{
                          width: "20%",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Listing Date
                      </TableCell>
                      <TableCell
                        variant="h3"
                        sx={{
                          width: "20%",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courseList?.map((course) => {
                      return (
                        <CourseTable
                          key={course.courseId}
                          item={course}
                          courseList={courseList}
                          setCourseList={setCourseList}
                          name={"myCourses"}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </>
    </Layout>
  );
};

export default UserCourses;
