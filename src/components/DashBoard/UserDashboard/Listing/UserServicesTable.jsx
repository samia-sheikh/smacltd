import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  // Table,
  // TableBody,
  TableCell,
  // TableContainer,
  TableRow,
  Typography,
  Menu,
  MenuItem,
  Button,
  Dialog,
  Divider,
} from "@mui/material";
import * as Yup from "yup";
import { RiArrowDropDownLine } from "react-icons/ri";
import useFetch from "../../../../features/hooks/useFetch";
import ImageComp from "../../../globalComponents/ImageComp";
import theme from "../../../../theme";
import CloseIcon from "@mui/icons-material/Close";
import ViewProduct from "../../../Market/Modals/ViewProduct/ViewProduct";
import TextArea from "../../../globalComponents/global_inputs/TextArea";
import { Field, Form, Formik } from "formik";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ServicesTable = ({
  userservices,
  setMyServics,
  name,
  orderID,
  myservices,
}) => {
  const [refundModelOpen, setRefundModelOpen] = useState(false);
  // const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(false);
  const { deleteData, postData } = useFetch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteOptionClick = (deletedData) => {
    deleteData(`/api/service/${deletedData}`, (res) => {
      // //console.log(res, "response");
      //console.log(myservices, "userservices");
      setMyServics((prev) => {
        return prev.filter((valueData) => valueData.serviceId !== deletedData);
      });
      handleClose();
    });
  };
  // this is for the Refund..

  const handleRequestRefund = (values) => {
    const payload = { reasonForRefund: values?.reason };
    postData(
      `/api/service/orders/${orderID}/refunds`,
      payload,
      undefined,
      undefined,
      undefined,
      (res) => {
        setRefundModelOpen(false);
      }
    );
  };
  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
  });

  // this is for navigate to modal....
  const navigateToMyService = () => {
    navigate(
      `/user/dashboard/${userservices.user.email}/service/${userservices.serviceId}`
    );
    // if (userservices?.authorId === user?.id) {
    //   navigate(`/service/${userservices.serviceId}`);
    // } else {
    //   navigate(
    //     `/user/dashboard/${userservices?.authorId}/${userservices.serviceId}`
    //   );
    // }
  };

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
      <ViewProduct />

      <TableRow>
        <TableCell
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "none",
          }}
        >
          {name === "myServices" ? (
            <ImageComp
              // onClick={()
              //   setAnchorEl(e.currentTarget);
              //   navigateToMyCourse}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                navigateToMyService();
              }}
              src={userservices?.images[0]}
              alt={userservices?.title}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          ) : name === "purchasedServices" ? (
            <ImageComp
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                navigateToMyService();
              }}
              src={userservices?.service?.images[0]}
              alt={userservices?.service?.title}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          ) : (
            "null"
          )}
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {name === "myServices"
              ? userservices?.title
              : name === "purchasedServices"
              ? userservices?.service?.title
              : "null"}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {userservices?.totalEnrollments || "N/A"}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {name === "myServices"
              ? convertCreatedAtTime(userservices?.createdAt)
              : name === "purchasedServices"
              ? convertCreatedAtTime(userservices?.purchaseDate)
              : "null"}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          <Typography variant="h6Grey">
            {userservices?.status || "Active"}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          {/* <IconButton aria-label="more">
                </IconButton> */}
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => handleClick(e)}
            sx={{
              isolation: "isolate",
              // mixBlendMode:"difference",
              color: "white",
              backgroundColor: "black",
              filter: "invert(1)",
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
            {name === "myServices" ? (
              <MenuItem
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  },
                }}
                src={userservices?.images[0]}
                onClick={() => handleDeleteOptionClick(userservices?.serviceId)}
              >
                Delete
              </MenuItem>
            ) : name === "purchasedServices" ? (
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
            {userservices?.title}
          </Typography>
          <Typography variant="subtitle2">
            {convertCreatedAtTime(userservices?.createdAt)}
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

export default ServicesTable;
