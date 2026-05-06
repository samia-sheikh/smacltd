import {
  Box,
  Divider,
  TableContainer,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RefundTicketCard from "../Cards/RefundTicketCard";
import useFetch from "../../../../features/hooks/useFetch";
import Layout from "../../../globalComponents/Layout/Layout";
import theme from "../../../../theme";

const RequestedRefundTickets = () => {
  const [refundTickets, setRefundTickets] = useState(null);
  const { fetchData } = useFetch();
  useEffect(() => {
    fetchData("/api/refundTickets/nonAdmin/seller", undefined, (res) => {
      console.log(res, "testing data");
      setRefundTickets(res?.data);
    });
  }, []);
  return (
    <>
      <Layout styles={{ padding: "0" }}>
        <Box
          sx={{
            // maxWidth: "1252px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "15px",
            height: "auto",
            width: "100%",
            [theme.breakpoints.down("md")]: {
              padding: "0px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "40px 20px 24px 20px",
            }}
          >
            <Typography variant="userDashboardHeading">
              Refund Tickets
            </Typography>
          </Box>
          <Divider />

          <TableContainer
          // sx={{
          //   padding: "27px",
          //   display: "flex",
          //   flexDirection: "column",
          //   gap: "25px",
          //   width: "100%",
          // }}
          >
            <Table
              sx={{
                minWidth: 650,
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    Name
                  </TableCell>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    Date
                  </TableCell>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    Token Number
                  </TableCell>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    Status
                  </TableCell>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {refundTickets?.map((ticket, index) => {
                  return <RefundTicketCard key={index} ticket={ticket} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Layout>
    </>
  );
};

export default RequestedRefundTickets;
