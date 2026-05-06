import { Box, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetch from "../../../../features/hooks/useFetch";
import Layout from "../../../globalComponents/Layout/Layout";
import theme from "../../../../theme";
import CourseTable from "../Listing/CourseTable";
// import { toast } from "react-toastify";
const PurchasedCourses = () => {
  const [courseList, setCourseList] = useState([]);
  const { fetchData } = useFetch();
  const getPurchasedCourses = async () => {
    await fetchData("/api/course/user/orders", undefined, (res) => {
      setCourseList(res?.data);
      
    });
  };
  useEffect(() => {
    getPurchasedCourses();
  }, []);
  return (
    <>
      <Layout styles={{ padding: "0" }}>
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
          >            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
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
                        Teacher Name
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



              {courseList?.map((course,id) => {
                return (
                  <CourseTable
                    key={course.courseId}
                    item={course}
                    name={"purchasedCourses"}
                    orderID={course.orderId}
                  />
                );
              })}

</Table>
</TableContainer>

            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default PurchasedCourses;
