import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";
import useFetch from "../../../../features/hooks/useFetch";
import Layout from "../../../../components/globalComponents/Layout/Layout";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import DropDownIcons from "../../../../assets/DropDown.png";
import CloseIcon from "@mui/icons-material/Close";
import TextArea from "../../../../components/globalComponents/global_inputs/TextArea";
import ButtonComp from "../../../../components/globalComponents/ButtonComp";
import { useDispatch, useSelector } from "react-redux";
import Unauthorized from "../../../../components/unauthorized/Unauthorized";
import RefundChatSection from "../../../../components/Chat/RefundChatSection";
import { setRefundMessages } from "../../../../features/slice/Chat/refundChatSlice";
import { setRefundTicket } from "../../../../features/slice/refundTicketSlice";

const SingleServiceRefundTicket = () => {
  // //console.log(role, "role");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [ticketState, setTicketState] = useState("");
  const [ticket, setTicket] = useState(null);
  const [refundModelOpen, setRefundModelOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  function convertCreatedAtTime(params) {
    // //console.log(ticket, "tickets");
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
  const navigate = useNavigate();
  const { fetchData, putData } = useFetch();
  let { ticketId } = useParams();
  // //console.log(ticket, "refund");
  const getTicket = () => {
    fetchData(`/api/service/orders/refunds/${ticketId}`, undefined, (res) => {
      //console.log(res?.data, "pageFetchData");
      setTicket(res?.data);
      dispatch(setRefundTicket({ data: res?.data }));
      const getChatsOfThisRefund = () => {
        fetchData(
          `/api/refundchat/${res.data.ticketNumber}`,
          undefined,
          (response) => {
            // console.log(response);
            dispatch(setRefundMessages({ data: response.data }));
          }
        );
      };
      getChatsOfThisRefund();
    });
  };
  const handleStatus = (refundTicket, status) => {
    // //console.log(refundTicket, "tickets");

    putData(
      `/api/admin/service/orders/refunds/${refundTicket?.refundId}`,
      { status },
      undefined,
      (res) => {
        // //console.log(res, "Response after Approved");
        setTicketState(res?.data?.status);
      },
      undefined
    );
  };

  const handleReject = (values) => {
    //console.log(values);
    const payload = {
      reasonForRejected: values?.reason,
      status: "Rejected",
    };
    //console.log(payload, "eee");
    putData(
      `/api/admin/service/orders/refunds/${ticket.refundId}`,
      payload,
      undefined,

      (res) => {
        setTicketState(res?.data?.status);
        setRefundModelOpen(false);
        //console.log(res);
      }
    );
  };
  useEffect(() => {
    getTicket();
    if (
      user.role === "admin" ||
      ticket?.service?.user?.email === user?.email ||
      ticket?.requestingUser === user?.email
    ) {
      setAuthorized(true);
    }
  }, []);
  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("reason is required"),
  });

  const initialValues = {
    reason: "",
  };
  return (
    <>
      <Layout>
        {authorized ? (
          <Paper sx={{ mt: "60px" }}>
            <Box
              sx={{
                borderBottom: "1px solid gray",
                padding: "20px 60px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="userDashboardHeading">
                <ArrowBackIosNewIcon
                  onClick={() => {
                    navigate("/admin/dashboard");
                  }}
                />
                Refund Ticket
              </Typography>

              <Box>
                {/* if the state is updated after given the approved this condition will run */}
                {ticketState ? (
                  <Typography
                    variant="h5BlackBold"
                    sx={{
                      border: "0.5px solid #F9A11D",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      width: "max-content",
                      marginTop: "2px",
                      color: "#F9A11D",
                      fontSize: "12px",
                      fontWeight: 600,
                      // width:"100%"
                    }}
                  >
                    {ticketState}
                  </Typography>
                ) : //  if the status is  Approved , Rejected  , Closed this condition will run and the dropdown button will not show
                ticket?.status === "Approved" ||
                  ticket?.status === "Rejected" ||
                  ticket?.status === "Closed" ? (
                  <Typography
                    variant="h5BlackBold"
                    sx={{
                      border: "0.5px solid #F9A11D",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      width: "max-content",
                      marginTop: "2px",
                      color: "#F9A11D",
                      fontSize: "12px",
                      fontWeight: 600,
                      // width:"100%"
                    }}
                  >
                    {ticket?.status}
                  </Typography>
                ) : (
                  // if the status is pending this condition will run and the dropDown will show...
                  <Typography
                    variant="h5BlackBold"
                    sx={{
                      border: "0.5px solid #F9A11D",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      width: "max-content",
                      marginTop: "2px",
                      color: "#F9A11D",
                      fontSize: "12px",
                      fontWeight: 600,
                      // width:"100%"
                    }}
                  >
                    {ticket?.status}
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <IconButton
                            sx={{
                              fontSize: "12px",
                              color: "#F9A11D",

                              "&:hover": {
                                background: "unset",
                              },
                            }}
                            variant="contained"
                            {...bindTrigger(popupState)}
                          >
                            {/* {refundData?.status} */}
                            <img
                              src={DropDownIcons}
                              style={{ color: "#F9A11D" }}
                              alt=" "
                            />
                          </IconButton>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem
                              onClick={(e) => {
                                handleStatus(ticket, "Approved");
                              }}
                            >
                              Approved
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                // //console.log(e,refundModelOpen,"click reject");
                                setRefundModelOpen(!refundModelOpen);
                              }}
                            >
                              Rejected
                            </MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </Typography>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                mt: "100px",
                padding: "0px 60px",
                display: "flex",
                flexDirection: "column",
                gap: "60px",
              }}
            >
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="userDashboardHeading">
                    {ticket?.user?.firstName}
                  </Typography>
                  <Typography variant="sub24">
                    {ticket?.ticketNumber}
                  </Typography>
                </Box>
                <Typography variant="subHeader">
                  {convertCreatedAtTime(ticket?.createdAt)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="black24">Reason for refund</Typography>
                <Box sx={{ mt: "12px" }}>
                  <Typography variant="subHeader">
                    {ticket?.reasonForRefund}
                  </Typography>
                </Box>
              </Box>
              <Box></Box>
            </Box>
            <RefundChatSection />
          </Paper>
        ) : (
          <Unauthorized />
        )}
      </Layout>
      {/* this is forshow the popUp to give reason for rejected..... */}
      <Dialog
        open={refundModelOpen}
        onClose={() => setRefundModelOpen(!refundModelOpen)}
        PaperProps={{
          sx: {
            width: "clamp(280px,450px,800px)",
          },
        }}
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
              mb: "10px",
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
                  // display: "flex",
                  // justifyContent: "space-between",

                  width: "100%",
                }}
              >
                <Typography variant="userDashboardHeading">
                  Refund Request Rejected
                </Typography>
              </Box>
              <Typography
                variant="h4Black"
                sx={{
                  margin: "10px 0px",
                }}
              >
                {convertCreatedAtTime(ticket?.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleReject}
          >
            <Form>
              <Box sx={{ width: "100%", mb: "16px" }}>
                <Typography variant="bold20">Reason</Typography>
                <Field
                  component={TextArea}
                  type="text"
                  name="reason"
                  placeholder="Write your Message here.."
                  sx={{
                    width: "100% !important",
                    borderRadius: "30px",
                    background: "#F5F5F5",
                    border: "1px solid rgba(20, 184, 166, 0.05)",
                    padding: "14px 20px",
                  }}
                />
              </Box>
              <ButtonComp label={"Reject Request"} type="submit" />
            </Form>
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default SingleServiceRefundTicket;
