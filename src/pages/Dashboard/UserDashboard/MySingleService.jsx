import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import { Link, useParams } from "react-router-dom";
import useGetAPI from "../../../features/hooks/useGetAPI";
import { useSelector } from "react-redux";
import moment from "moment";
import ProfilePicture from "../../../components/globalComponents/ProfilePicture";
import Layout from "../../../components/globalComponents/Layout/Layout";
import theme from "../../../theme";
import HeroSectionImageSlider from "../../../components/SwiperJs/HeroSectionImageSlider/HeroSectionImageSlider";
import CourseApplicantCard from "../../../components/DashBoard/UserDashboard/Cards/CourseApplicantCard";
const MySingleService = () => {
  const { user } = useSelector((state) => state.user);
  const [service, setService] = useState(null);
  let { serviceId } = useParams();
  const [requestedUsers, setRequestedUsers] = useState(null);
  const [isAddDetailsOpen, setIsAddDetailsOpen] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const { getData } = useGetAPI();

  const getSingleService = async () => {
    //function to get single service
    await getData(`/api/service/getASpecificService/${serviceId}`, (res) => {
      setService(res?.data);
    });
  };
  const getRequestedUsers = async () => {
    await getData(`/api/service/${serviceId}/orders`, (res) => {
      setRequestedUsers(res?.data);
      //console.log(res?.data, "get requested users");
    });
  };
  const widthResize = () => {
    //function to set resize of screen width
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    getSingleService();
    getRequestedUsers();
    window.addEventListener("resize", widthResize);
    widthResize();
    console.log(requestedUsers, "req");

    return () => window.removeEventListener("resize", widthResize);
  }, []);

  return (
    <>
      <Layout title={service?.title + " | SMAC"}>
        {service?.images ? (
          <HeroSectionImageSlider images={service?.images} />
        ) : (
          ""
        )}
        <Paper
          sx={{
            borderRadius: "22px",
            padding: `50px 20px`,
            display: "flex",
            flexDirection: `${width > 1250 ? "row" : "column"}`,
            // flexWrap:"wrap",
            gap: "5rem",
            mt: "76px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1007px",
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
                {service?.title}
              </Typography>
              <Typography variant="h4Black">
                •{" "}
                {moment
                  .utc(service?.createdAt)
                  .local()
                  .startOf("seconds")
                  .fromNow()}
              </Typography>
            </Box>
            <Typography variant="h4Black" sx={{ wordBreak: "break-all" }}>
              {service?.description}
            </Typography>
            {/* </Box> */}
          </Box>
          <Box sx={{ width: "100%", maxWidth: "378px" }}>
            <Typography variant="h3">Seller Information</Typography>

            <Box sx={{ display: "flex", gap: "24px", marginTop: "24px" }}>
              <ProfilePicture
                src={service?.user?.profilePic}
                firstName={service?.user?.firstName}
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
                  {service?.user?.firstName.substring(0, 10) +
                    " " +
                    service?.user?.lastName.substring(0, 10)}
                </Typography>
                {service?.user?.bio ? (
                  <Typography variant="h4Black">
                    {service?.user?.bio.substring(0, 30)}
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
                    user?.email === service?.user?.email
                      ? "/profile-user"
                      : `/user/${service?.user?.email}`
                  }
                >{`view profile of ${
                  service?.user?.firstName.substring(0, 10) +
                  " " +
                  service?.user?.lastName.substring(0, 10)
                }`}</Link>
              </Box>
            </Box>
          </Box>
        </Paper>
        {/* <TableContainer>
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
        </TableContainer> */}
      </Layout>
    </>
  );
};

export default MySingleService;
