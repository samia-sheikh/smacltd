import React, { useEffect, useState } from "react";
import Layout from "../../../components/globalComponents/Layout/Layout";
import ImageComp from "../../../components/globalComponents/ImageComp";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import theme from "../../../theme";
import useGetAPI from "../../../features/hooks/useGetAPI";
import { useSelector } from "react-redux";
import moment from "moment";
import useFetch from "../../../features/hooks/useFetch";
import CourseApplicantCard from "../../../components/DashBoard/UserDashboard/Cards/CourseApplicantCard";

const MySingleCourse = () => {
  const { user } = useSelector((state) => state.user);
  const [course, setCourse] = useState(null);
  const [requestedUsers, setRequestedUsers] = useState(null);
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const { getData } = useGetAPI();
  const { postData } = useFetch();
  const getSpecificCourse = async () => {
    await getData(
      `/api/course/getASpecificCourse/${params.courseId}`,
      (res) => {
        setCourse(res?.data);
        //console.log(res?.data);
      }
    );
  };
  const getRequestedUsers = async () => {
    await getData(`/api/course/${params?.courseId}/orders`, (res) => {
      setRequestedUsers(res?.data);
      //console.log(res?.data, "get requested users");
    });
  };

  // const handleBuyCourse = (courseToBuy) => {
  //   postData(`/api/course/order`, { courseId: courseToBuy.courseId }, (res) => {
  //     //console.log(res);
  //   });
  // };
  const widthResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    getSpecificCourse();
    getRequestedUsers();
    window.addEventListener("resize", widthResize);
    widthResize();
    return () => window.removeEventListener("resize", widthResize);
  }, []);

  return (
    <>
      <Layout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <ImageComp
            src={selectedImage ? selectedImage : course?.images[0]}
            sx={{ width: "auto", maxWidth: "100%", height: "621px" }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              position: "relative",
              bottom: "76px",
              overflowX: "scroll",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              background: "rgb(255,255,255)",
              background:
                "linear-gradient(0deg, rgba(255,255,255,0.8239670868347339) 49%, rgba(255,255,255,0) 100%)",
            }}
          >
            {course?.images?.map((i) => {
              return (
                <ImageComp
                  key={i}
                  src={i}
                  sx={{
                    width: "286px",
                    height: "152px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                  onClick={() => setSelectedImage(i)}
                />
              );
            })}
          </Box>
        </Box>
        <Paper
          sx={{
            borderRadius: "22px",
            padding: `${width > 850 ? "66px" : "20px"}`,
            display: "flex",
            flexDirection: `${width > 850 ? "row" : "column"}`,
            gap: "40px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "778px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "44px" }}>
              <Typography variant="h1" sx={{ wordBreak: "break-all" }}>
                {course?.title}
              </Typography>

              <Typography variant="h4Black">
                <ul>
                  <li>
                    {moment
                      .utc(course?.createdAt)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </li>
                </ul>
              </Typography>
            </Box>
            <Typography variant="h4Black" sx={{ wordBreak: "break-all" }}>
              {course?.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "24px",

              flexDirection: "column",
              width: "100%",
              maxWidth: "686px",
            }}
          >
            <Typography variant="h2">Course Details</Typography>
            <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
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
                <Typography variant="subHeaderBlack">Course Type: </Typography>
                <Typography variant="subHeader">{course?.mode}</Typography>
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
                  {course?.courseDuration}
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
                  {course?.classDuration}
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
                <Typography variant="subHeaderBlack">Class Days: </Typography>
                <Typography variant="subHeader">
                  {course?.classDays?.map((d) => {
                    return d + "," + " ";
                  })}
                </Typography>
              </Box>
            </Box>
            {course?.authorEmail === user?.email ? (
              <Box>
                <Typography variant="h2">Instructor</Typography>

                <Box sx={{ display: "flex", gap: "24px", marginTop: "24px" }}>
                  <ImageComp
                    src={course?.user?.profilePic}
                    alt={"story_image"}
                    sx={{
                      borderRadius: "50%",
                      height: "100px",
                      width: "100px",
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <Typography
                      variant="black24"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {course?.user?.firstName.substring(0, 10) +
                        " " +
                        course?.user?.lastName.substring(0, 10)}
                    </Typography>
                    <Typography variant="h4Black">
                      {course?.user?.bio
                        ? course?.user?.bio.substring(0, 30)
                        : ""}
                    </Typography>
                    <Link
                      style={{
                        color: theme.palette.primary.main,
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        textDecoration: "none",
                        textTransform: "capitalize",
                      }}
                      to={
                        user?.email === course?.user?.email
                          ? "/profile-user"
                          : `/user/${course?.user?.email}`
                      }
                    >{`view profile of ${
                      course?.user?.firstName.substring(0, 10) +
                      " " +
                      course?.user?.lastName.substring(0, 10)
                    }`}</Link>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
        </Paper>

        {course?.authorEmail === user?.email ? (
          // <Box>

          // </Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {requestedUsers?.map((applicant) => {
                  return (
                    <CourseApplicantCard
                      applicant={applicant}
                      key={applicant.orderId}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Layout>
    </>
  );
};

export default MySingleCourse;
