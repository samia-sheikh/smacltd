import * as React from "react";

import {
  Box,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";

import DashBoardModal from "../../../../components/DashBoard/Modals/DashBoardModal";
import { useEffect } from "react";
import useGetAPI from "../../../../features/hooks/useGetAPI";
import DashBoardSearchInputField from "../../../../components/DashBoard/DashBoardSearchInputField/DashBoardSearchInputField";
import { useSelector } from "react-redux";
import CourseListCard from "../../../../components/DashBoard/AdminDashboard/cards/CourseListCard";
import ProfilePicture from "../../../../components/globalComponents/ProfilePicture";

export default function DashboardCourses() {
  const [coursesData, setCoursesData] = React.useState([]);
  const { getData } = useGetAPI();

  const [open, setOpen] = React.useState(false);
  const [showMarketData, setShowMarketData] = React.useState(null);

  const openModal = (dataCourse) => {
    setShowMarketData(dataCourse);
    setOpen(true);
  };
  const handleClose = (data) => {
    setOpen(false);
    updateDataOnDelete(data?.data?.courseId);
  };

  // geting User from the Redux

  const user = useSelector(
    (state) => state.DashBoardProductsSlice.dashBoarduser
  );
  // getting Products from the redux..

  const FilterProducts = useSelector(
    (state) => state.DashBoardProductsSlice.dashBoardcourse
  );
  // here i get the courseId on the click of the handleDeleteOptionClick which is  bydefult in the Mui

  //get course ID from event and hit delete course as admin

  function updateDataOnDelete(courseId) {
    const afterDelete = coursesData.filter((valueData) => {
      return valueData.courseId !== courseId;
    });
    setCoursesData(afterDelete);
  }

  // hit courses api on render
  useEffect(() => {
    getData("/api/admin/course", (res) => {
      setCoursesData(res.data);
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "15px",
        }}
      >
        <Typography
          component={"span"}
          variant="h2"
          noWrap
          sx={{
            margin: "10px 0",
          }}
        >
          Courses
        </Typography>
        <Divider
          sx={{
            width: "100%",
          }}
        />
        <Box
          sx={{
            margin: "10px 0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DashBoardSearchInputField
            url={"/api/admin/course/"}
            cb={setCoursesData}
          />
        </Box>
        {/* here i'm getting the value from redux */}
        <Box>
          {" "}
          {user && user ? (
            <>
              <Typography
                component={"span"}
                variant="h2"
                sx={{
                  padding: "10px 0px",
                }}
              >
                User personal details
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <ProfilePicture
                          src={user?.profilePic}
                          firstName={user.firstName}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          component={"span"}
                          variant="h5"
                          sx={{ marginBottom: "10px", display: "block" }}
                        >
                          Name
                        </Typography>
                        {user ? user.firstName + " " + user.lastName : ""}
                      </TableCell>
                      <TableCell>
                        <Typography
                          component={"span"}
                          variant="h5"
                          sx={{ marginBottom: "10px", display: "block" }}
                        >
                          Email
                        </Typography>
                        {user ? user.email : ""}
                      </TableCell>
                      <TableCell>
                        <Typography
                          component={"span"}
                          variant="h5"
                          sx={{ marginBottom: "10px", display: "block" }}
                        >
                          Status
                        </Typography>
                        {user ? (user.isBlocked ? "Block" : "Active") : ""}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            ""
          )}
        </Box>
        {/* end of redux */}
        <Typography
          component={"span"}
          variant="h2"
          sx={{
            padding: "20px 0px",
          }}
        >
          User courses details
        </Typography>

        {FilterProducts && FilterProducts.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {FilterProducts.map((row, index) => {
              return (
                <CourseListCard
                  row={row}
                  key={index}
                  onClick={() => {
                    openModal(row);
                  }}
                  updateDataOnDelete={updateDataOnDelete}
                />
              );
            })}
          </Table>
        ) : FilterProducts && FilterProducts.length === 0 ? (
          <Typography>No Courses of this User</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  ></TableCell>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Instructor Name
                  </TableCell>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Listed Date
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
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coursesData.map((row, index) => {
                  return (
                    <CourseListCard
                      row={row}
                      key={index}
                      onClick={() => {
                        openModal(row);
                      }}
                      updateDataOnDelete={updateDataOnDelete}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {open && (
        <DashBoardModal
          dataShow={showMarketData}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
