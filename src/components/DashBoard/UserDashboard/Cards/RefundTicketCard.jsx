import { Box, Typography, TableCell, TableRow, Tooltip } from "@mui/material";
import React, { useState } from "react";
import useFetch from "../../../../features/hooks/useFetch";
import { useNavigate } from "react-router-dom";

const RefundTicketCard = ({ ticket }) => {
  const { putData } = useFetch();
  const [status, setStatus] = useState(null);

  function convertCreatedAtTime(params) {
    const createdAt = params;
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    // const formattedDate = `${day}/${month}/${year} - ${formattedHours}:${minutes}${ampm}`;
    return formattedDate;
  }
  const navigate = useNavigate();
  const closeTicket = () => {
    let payload = {
      status: "Closed",
    };
    if (ticket?.course) {
      putData(
        `/api/course/orders/refunds/${ticket.refundId}`,
        payload,
        undefined,
        (res) => {
          setStatus(res?.data);
        }
      );
    } else {
      putData(
        `/api/service/orders/refunds/${ticket.refundId}`,
        payload,
        undefined,
        (res) => {
          setStatus(res?.data);
        }
      );
    }
  };
  return (
    <>
      <TableRow
        sx={{
          borderRadius: "8px",
          border: "1px solid #F1F1F1",
          boxShadow: "0px 0px 4px 2px #00000010",
          marginBottom: "12px",
        }}
      >
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          {/* <Typography
            component={"span"}
            variant="h6Grey"
            sx={{ display: "block" }}
          >
            Course Name
          </Typography> */}

          <Tooltip
            title={ticket.course ? ticket.course.title : ticket?.service?.title}
            arrow
          >
            <Typography variant="h6Grey">
              {ticket.course
                ? ticket?.course?.title.substring(0, 30)
                : ticket?.service?.title.substring(0, 30)}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          {/* <Typography
            component={"span"}
            variant="h6Grey"
            sx={{ display: "block" }}
          >
            Date
          </Typography> */}
          <Typography variant="h6Grey">
            {convertCreatedAtTime(ticket.createdAt)}
          </Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          {/* <Typography
            component={"span"}
            variant="h6Grey"
            sx={{ display: "block" }}
          >
            Tokens Number
          </Typography> */}
          <Typography variant="h6Grey">{ticket.ticketNumber}</Typography>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          {/* <Typography
            component={"span"}
            variant="h6Grey"
            sx={{ display: "block" }}
          >
            Status
          </Typography> */}
          <Box
            sx={{
              border: "0.5px solid #F9A11D",
              borderRadius: "6px",
              padding: "5px 8px",
              width: "max-content",
              marginTop: "2px",
              color: "#F9A11D",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            {status ? status.status : ticket.status}
          </Box>
        </TableCell>
        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
          {/* <Typography
            component={"span"}
            variant="h6Grey"
            sx={{ display: "block" }}
          >
            Actions
          </Typography> */}
          {/* {ticket?.status === "Pending" ? (
            <Box
              disabled={true}
              onClick={closeTicket}
              sx={{
                border: "0.5px solid #F04E48",
                borderRadius: "6px",
                padding: "5px 8px",
                width: "max-content",
                marginTop: "2px",
                color: "#F04E48",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Close Ticket
            </Box>
          ) : ( */}
          <Box
            disabled={true}
            onClick={() => {
              if (ticket.course) {
                navigate(`/ticket/${ticket.refundId}`);
              } else {
                navigate(`/ticket/service/${ticket.refundId}`);
              }
            }}
            sx={{
              border: "0.5px solid #F04E48",
              borderRadius: "6px",
              padding: "5px 8px",
              width: "max-content",
              marginTop: "2px",
              color: "#F04E48",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            View Ticket
          </Box>
          {/* )} */}
        </TableCell>
      </TableRow>
    </>
  );
};

export default RefundTicketCard;
