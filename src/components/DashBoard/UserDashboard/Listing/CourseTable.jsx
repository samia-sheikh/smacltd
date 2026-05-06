import React, { useState } from "react";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  Button,
  Divider,
} from "@mui/material";
import { RiArrowDropDownLine } from "react-icons/ri";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../../features/hooks/useFetch";
import ImageComp from "../../../globalComponents/ImageComp";
import TextArea from "../../../globalComponents/global_inputs/TextArea";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import theme from "../../../../theme";
const CourseTable = ({ item, setCourseList, courseList, name, orderID }) => {
  const navigate = useNavigate();
  const [refundModelOpen, setRefundModelOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { deleteData, postData } = useFetch();
  const { user } = useSelector((state) => state.user);

  const course = item.course ? item.course : item;
  const navigateToMyCourse = () => {
    if (course?.authorEmail === user?.email) {
      navigate(`/user/dashboard/${user?.email}/${course.courseId}`);
    } else {
      navigate(`/user/dashboard/${course?.authorEmail}/${course.courseId}`);
    }
  };

  const handleDeleteOptionClick = () => {
    deleteData(`/api/course/${course.courseId}`, (res) => {
      const afterDelete = courseList.filter(
        (valueData) => valueData.courseId !== course.courseId
      );
      setCourseList(afterDelete);
      handleClose();
    });
  };

  const handleRequestRefund = (values) => {
    const payload = { reasonForRefund: values?.reason };
    postData(
      `/api/course/orders/${orderID}/refunds`,
      payload,
      undefined,
      undefined,
      undefined,
      () => {
        setRefundModelOpen(false);
      }
    );
  };

  const handleClose = () => setAnchorEl(null);

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
  });

  const initialValues = { reason: "" };

  // Function to format date
  function convertCreatedAtTime(params) {
    const date = new Date(params);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "none",
          }}
        >
          <ImageComp
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              navigateToMyCourse();
            }}
            src={course?.images[0]}
            alt={course?.title}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">{course?.title}</Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {course?.totalEnrollments || "N/A"}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none" }}>
          <Typography variant="h6Grey">
            {convertCreatedAtTime(course?.createdAt)}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "30%" }}>
          <Typography variant="h6Grey">{course?.status || "Active"}</Typography>
        </TableCell>

        <TableCell sx={{ borderBottom: "none" }}>
          <IconButton
            aria-label="more"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              e.stopPropagation();
            }}
          >
            <RiArrowDropDownLine />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
          >
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
        </TableCell>
      </TableRow>

      <Dialog
        open={refundModelOpen}
        onClose={() => setRefundModelOpen(!refundModelOpen)}
      >
        <Box
          sx={{
            padding: "24px",
            width: "clamp(18.75rem, 21.716vw + 5.191rem, 31.25rem)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",

              position: "relative",
            }}
          >
            <Typography variant="h4">Request Refund</Typography>
            <IconButton
              onClick={() => setRefundModelOpen(!refundModelOpen)}
              sx={{
                alignSelf: "flex-end",
                width: "16px",
                height: "16px",

                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ margin: "0.75rem 0" }} />
          <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
            {course?.title}
          </Typography>
          <Typography variant="subtitle2">
            {convertCreatedAtTime(course?.createdAt)}
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRequestRefund}
          >
            {() => (
              <Form>
                <Field
                  component={TextArea}
                  name="reason"
                  placeholder="Reason for refund..."
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: "16px" }}
                  fullWidth
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default CourseTable;
