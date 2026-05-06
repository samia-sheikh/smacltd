import React, { useEffect, useState } from "react";
import Layout from "../../../components/globalComponents/Layout/Layout";
import { Box, Paper, Typography } from "@mui/material";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import { Link, useParams } from "react-router-dom";
import theme from "../../../theme";
import useGetAPI from "../../../features/hooks/useGetAPI";
import { useSelector } from "react-redux";
import moment from "moment";
import AddPaymentMethod from "../../../components/DashBoard/Modals/AddPaymentMethod";
import ProfilePicture from "../../../components/globalComponents/ProfilePicture";
import HeroSectionImageSlider from "../../../components/SwiperJs/HeroSectionImageSlider/HeroSectionImageSlider";

const SingleCourse = () => {
  const { user } = useSelector((state) => state.user);
  const [course, setCourse] = useState(null);
  const [isAddDetailsOpen, setIsAddDetailsOpen] = useState(false);
  const params = useParams();
  // const [selectedImage, setSelectedImage] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const { getData } = useGetAPI();
  // const { postData } = useFetch();
  const getSpecificCourse = async () => {
    await getData(
      `/api/course/getASpecificCourse/${params.courseId}`,
      (res) => {
        setCourse(res?.data);
        // //console.log(res?.data);
      }
    );
  };

  // const handleBuyCourse = (courseToBuy) => {
  //   postData(
  //     `/api/course/${courseToBuy.courseId}/orders`,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     (res) => {
  //       //console.log(res, "Purchased");
  //     }
  //   );
  // };
  const widthResize = () => {
    setWidth(window.innerWidth);
  };
  // const onClose = () => {
  //   setIsAddDetailsOpen(!isAddDetailsOpen);
  // };

  useEffect(() => {
    getSpecificCourse();
    window.addEventListener("resize", widthResize);
    widthResize();
    return () => window.removeEventListener("resize", widthResize);
  }, []);

  return (
    <>
      <Layout title={course?.title + " | SMAC"}>
        {course?.images ? (
          <HeroSectionImageSlider images={course?.images} />
        ) : (
          ""
        )}
        <Paper
          sx={{
            borderRadius: "22px",
            padding: `${width > 850 ? "66px" : "20px"}`,
            display: "flex",
            flexDirection: `${width > 1250 ? "row" : "column"}`,
            // flexWrap:"wrap",
            gap: "1.9rem",
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
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{ wordBreak: "break-all", maxWidth: "100%" }}
              >
                {course?.title}
              </Typography>
              <Typography variant="h4Black">
                •{" "}
                {moment
                  .utc(course?.createdAt)
                  .local()
                  .startOf("seconds")
                  .fromNow()}
              </Typography>
            </Box>
            <Typography variant="h4Black" sx={{ wordBreak: "break-all" }}>
              {course?.description}
            </Typography>
            <ButtonComp
              click={() => {
                setIsAddDetailsOpen(true);
              }}
              label={`Buy this course RS ${course?.courseFee} PKR`}
              customStyles={{ maxWidth: "337px", borderRadius: " 4px" }}
            />
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
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
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
                  width: "auto",
                  maxWidth: "max-content",
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
                  maxWidth: "95%",
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
            <Box>
              <Typography variant="h2">Instructor</Typography>

              <Box sx={{ display: "flex", gap: "24px", marginTop: "24px" }}>
                <ProfilePicture
                  src={course?.user?.profilePic}
                  firstName={course?.user?.firstName}
                  sx={{
                    height: "100px",
                    width: "100px",
                  }}
                  innerBox={{
                    height: "80px",
                    width: "80px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
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
                  {course?.user?.bio ? (
                    <Typography variant="h4Black">
                      {course?.user?.bio.substring(0, 30)}
                    </Typography>
                  ) : null}
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
          </Box>
        </Paper>
      </Layout>
      {/* <AddCardDetails
        onClose={onClose}
        setIsAddDetailsOpen={setIsAddDetailsOpen}
        isAddDetailsOpen={isAddDetailsOpen}
        courseId={course?.courseId}
        courseFee={course?.courseFee}
      /> */}
      <AddPaymentMethod
        setIsAddDetailsOpen={setIsAddDetailsOpen}
        isAddDetailsOpen={isAddDetailsOpen}
        url={`/api/course/${course?.courseId}/orders`}
        item={course}
      />
    </>
  );
};

export default SingleCourse;
