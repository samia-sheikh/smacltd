import {
  Box,
  Divider,
  // Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DashBoardSearchInputField from "../../../../components/DashBoard/DashBoardSearchInputField/DashBoardSearchInputField";
import AdminRefundTicketCard from "../../../../components/DashBoard/AdminDashboard/cards/AdminRefundTicketCard";
import useFetch from "../../../../features/hooks/useFetch";
const RefundTickets = () => {
  const { fetchData } = useFetch();
  // const [open, setOpen] = React.useState(false);
  const [refundRequest, setRefundRequest] = useState([]);
  const GetRefundTickets = () => {
    fetchData("/api/refundTickets/admin", undefined, (res) => {
      console.log(res, "Response");
      setRefundRequest(res?.data);
    });
  };
  useEffect(() => {
    GetRefundTickets();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "15px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          margin: "10px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component={"span"}
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Refund Tickets
        </Typography>
      </Box>

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
        <DashBoardSearchInputField url={"api/admin/user?filter=test"} />
      </Box>
      <Box>
        <TableContainer>
          <Table>
            <TableBody>
              {refundRequest?.map((refundData, id) => (
                <AdminRefundTicketCard refundData={refundData} key={id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default RefundTickets;
