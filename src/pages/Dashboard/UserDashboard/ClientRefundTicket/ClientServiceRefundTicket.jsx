import React, { useState, useEffect } from "react";
import {
  Box,
  // Dialog,
  // IconButton,
  // Menu,
  // MenuItem,
  Paper,
  Typography,
} from "@mui/material";
// import * as Yup from "yup";
// import { Field, Formik, Form } from "formik";
import useFetch from "../../../../features/hooks/useFetch";
import Layout from "../../../../components/globalComponents/Layout/Layout";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import RefundChatSection from "../../../../components/Chat/RefundChatSection";
import { setRefundMessages } from "../../../../features/slice/Chat/refundChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRefundTicket } from "../../../../features/slice/refundTicketSlice";
// import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
// import DropDownIcons from "../../../../assets/DropDown.png";
// import CloseIcon from "@mui/icons-material/Close";
// import TextArea from "../../../../components/globalComponents/global_inputs/TextArea";
// import ButtonComp from "../../../../components/globalComponents/ButtonComp";

const ClientServiceRefundTicket = () => {
  // //console.log(role, "role");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [ticketState, setTicketState] = useState("");
  const [ticket, setTicket] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  // const [refundModelOpen, setRefundModelOpen] = useState(false);
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
  const { fetchData } = useFetch();
  let { ticketId } = useParams();
  const getTicket = () => {
    fetchData(`/api/service/orders/refunds/${ticketId}`, undefined, (res) => {
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

  return (
    <>
      <Layout>
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
                  navigate(-1);
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
                <Typography variant="sub24">{ticket?.ticketNumber}</Typography>
              </Box>
              <Typography variant="subHeader">
                {convertCreatedAtTime(ticket?.createdAt)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="black24">Reason for refund</Typography>
              <Box sx={{ mt: "12px" }}>
                <Typography variant="subHeader" sx={{ fontSize: "18px" }}>
                  {ticket?.reasonForRefund}
                </Typography>
              </Box>
            </Box>
            {ticket?.reasonForRejected && (
              <Box>
                <Typography variant="black24">Reason for Rejected</Typography>
                <Box sx={{ mt: "12px" }}>
                  <Typography variant="subHeader" sx={{ fontSize: "18px" }}>
                    {ticket?.reasonForRejected}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <RefundChatSection ticket={ticket} />
        </Paper>
      </Layout>
    </>
  );
};

export default ClientServiceRefundTicket;
