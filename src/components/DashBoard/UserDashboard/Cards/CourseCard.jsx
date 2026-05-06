import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageComp from "../../../globalComponents/ImageComp";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import theme from "../../../../theme";
import useFetch from "../../../../features/hooks/useFetch";
import TextArea from "../../../globalComponents/global_inputs/TextArea";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import { useLocation } from "react-router-dom";
const CourseCard = ({ item, setCourseList, courseList, name, orderID }) => {
  //this query functionality to check the place where it is being called and according to that we have to change the date in the card
  let course;
  // const location = useLocation();
  // const query = new URLSearchParams(location.search).get("tab");
  course = item.course ? item.course : item;

  const navigate = useNavigate();
  const [refundModelOpen, setRefundModelOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { deleteData, postData } = useFetch();
  const { user } = useSelector((state) => state.user);
  const navigateToMyCourse = (event) => {
    if (!anchorEl) {
      event.stopPropagation();
      if (course?.authorEmail === user?.email) {
        navigate(`/user/dashboard/${user?.email}/${course.courseId}`);
      } else {
        navigate(`/user/dashboard/${course?.authorEmail}/${course.courseId}`);
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteOptionClick = () => {
    // //console.log(courseId, "Course for deleting on handle Delete button");

    deleteData(`/api/course/${course.courseId}`, (res) => {
      //after deleting data filter current data and set updated courses data
      const afterDelete = courseList.filter((valueData) => {
        return valueData.courseId !== course.courseId;
      });
      setCourseList(afterDelete);
      //console.log(res);
      handleClose();
    });
  };
  const handleRequestRefund = (values) => {
    //console.log(values?.reason, "values refund req");
    const payload = {
      reasonForRefund: values?.reason,
    };
    postData(
      `/api/course/orders/${orderID}/refunds`,
      payload,
      undefined,
      undefined,
      undefined,
      (res) => {
        setRefundModelOpen(false);
      }
    );
  };
  function convertCreatedAtTime(params) {
    const createdAt = params;
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} - ${formattedHours}:${minutes}${ampm}`;
    return formattedDate;
  }
  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
  });
  const initialValues = {
    reason: "",
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: "378px",
          borderRadius: "15px",
          height: "523px",
          padding: "22px",
        }}
        onClick={navigateToMyCourse}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                isolation: "isolate",
                // mixBlendMode:"difference",
                color: "white",
                backgroundColor: "#0000007d",
                filter: "invert(1)",
                // color: "primary",
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {/* <MenuItem
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
              },
            }}
            onClick={handleDeleteOptionClick}
          >
            Delete
          </MenuItem> */}
              {name === "myCourses" ? (
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                  onClick={handleDeleteOptionClick}
                >
                  Delete
                </MenuItem>
              ) : name === "purchasedCourses" ? (
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    setRefundModelOpen(!refundModelOpen);
                  }}
                >
                  Refund
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
          <ImageComp
            //   src={FilterProducts.images[0]}
            src={course?.images[0]}
            style={{
              width: "100%",
              borderRadius: "14px",
              objectFit: "fit",
              height: "339px",
            }}
            alt={course?.title}
          />
        </Box>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="postUserTypo">
              {course?.title.substring(0, 25) + "....."}
            </Typography>
            <Typography variant="subHeader" sx={{ wordBreak: "break-all" }}>
              {course?.description.length > 45
                ? course?.description.substring(0, 45) + "....."
                : course?.description}
            </Typography>
            <Typography>
              {moment
                .utc(item?.purchaseDate ? item.purchaseDate : course?.createdAt)
                .local()
                .startOf("seconds")
                .fromNow()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Dialog
        open={refundModelOpen}
        onClose={() => setRefundModelOpen(!refundModelOpen)}
      >
        <Box
          sx={{
            padding: "24px",
            width: "100%",
            // minWidth: "260px",
            maxWidth: "808px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "100%",
              mb: "24px",
            }}
          >
            <IconButton
              onClick={() => setRefundModelOpen(!refundModelOpen)}
              sx={{ width: "25px", height: "25px", color: "black" }}
            >
              <CloseIcon />
            </IconButton>
            <Box width={"100%"}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="h1">{course?.title}</Typography>
                <Typography
                  variant="h1"
                  sx={{ color: `${theme.palette.primary.main}` }}
                >
                  ${course?.courseFee}
                </Typography>
              </Box>
              <Typography variant="uploadForm">
                {convertCreatedAtTime(course?.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRequestRefund}
          >
            <>
              <Typography variant="h5BlackBold">Reason of Refund</Typography>
              <Form>
                <Box
                  sx={{
                    mt: "8px",
                    width: "100%",
                  }}
                >
                  <Field
                    component={TextArea}
                    placeholder="Write Your Reason for Refund......"
                    type="text"
                    name="reason"
                    label="reason"
                  />
                </Box>
                <Box
                  sx={{
                    mt: "24px",
                  }}
                >
                  <Button
                    variant="contained"
                    type={"submit"}
                    // onClick={() => {
                    //   handleNext(activeStep);
                    // }}
                    sx={{
                      padding: "12px 40px",
                      color: "white",
                      width: "100%",
                    }}
                  >
                    Submit Request
                  </Button>
                </Box>
              </Form>
            </>
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default CourseCard;
