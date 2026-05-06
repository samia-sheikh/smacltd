import {
  Box,
  Button,
  Divider,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import AddPaymentMethod from "../Modals/AddPaymentMethod";
import Layout from "./../../globalComponents/Layout/Layout";
import theme from "../../../theme";
import ButtonComp from "../../globalComponents/ButtonComp";
import WithdrawPaymentModel from "../Modals/WithdrawPaymentModel";
import useFetch from "../../../features/hooks/useFetch";

const UserPayments = () => {
  const { fetchData, postData, loading } = useFetch();
  const [isWithdrawPaymentModelOpen, setWithdrawPaymentModelOpen] =
    useState(false);
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [totalAmounts, setTotalAmounts] = useState(null);
  const handleOpenPaymentModel = () => {
    setWithdrawPaymentModelOpen(!isWithdrawPaymentModelOpen);
  };
  const getWithdrawRequests = async () => {
    await fetchData(
      "/api/payment/withdraw/requests/getAllBySellerEmail",
      undefined,
      (res) => {
        setPaymentRequests(res?.data);
      }
    );
  };
  const getTotalAmounts = async () => {
    await fetchData("/api/payment/withdrawable/amount", undefined, (res) => {
      console.log(res);

      setTotalAmounts(res?.data);
    });
  };
  // Function to format date
  function convertCreatedAtTime(params) {
    const date = new Date(params);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    getWithdrawRequests();
    getTotalAmounts();
  }, []);
  return (
    <>
      <Layout styles={{ padding: "0", width: "100%" }}>
        <WithdrawPaymentModel
          isWithdrawPaymentModelOpen={isWithdrawPaymentModelOpen}
          setWithdrawPaymentModelOpen={setWithdrawPaymentModelOpen}
          totalWithdrawl={totalAmounts?.withdrawableAmount}
        />
        {!loading && (
          <Box
            sx={{
              // maxWidth: "1252px",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "15px",
              height: "auto",
              width: "100%",
              // background: "lightgreen",
              [theme.breakpoints.down("md")]: {
                padding: "0px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: "40px 20px 24px 20px",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="userDashboardHeading">Payments</Typography>
              </Box>
              <Box sx={{ width: "100%", maxWidth: "185px" }}>
                <ButtonComp
                  label={"Withdraw Request"}
                  click={() => {
                    setWithdrawPaymentModelOpen(!isWithdrawPaymentModelOpen);
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                mb: "1rem",
              }}
            >
              <Box
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  padding: "1.5rem",
                  borderRadius: "1rem",
                }}
              >
                <Typography variant="h4">Total Earned</Typography>
                <Typography variant="h5">
                  {totalAmounts?.totalAmountEarned}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: `1px solid #33A528`,
                  padding: "1.5rem",
                  borderRadius: "1rem",
                }}
              >
                <Typography variant="h4">Withdrawn to date</Typography>
                <Typography variant="h5">
                  {totalAmounts?.totalAmountWithdrawn}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: `1px solid #FF2934`,
                  padding: "1.5rem",
                  borderRadius: "1rem",
                }}
              >
                <Typography variant="h4">Available Balance</Typography>
                <Typography variant="h5">
                  {totalAmounts?.withdrawableAmount}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: `1px solid #D86D21`,
                  padding: "1.5rem",
                  borderRadius: "1rem",
                }}
              >
                <Typography variant="h4">Pending Amount</Typography>
                <Typography variant="h5">
                  {totalAmounts?.totalAmountPending}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "40px",
                [theme.breakpoints.down("md")]: {
                  padding: "16px",
                },
              }}
              component={"div"}
            >
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  mt: "12px",
                }}
              >
                <TableContainer>
                  <Table>
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
                          Withdrawl Amount
                        </TableCell>
                        <TableCell
                          variant="h3"
                          sx={{
                            width: "20%",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Approved By
                        </TableCell>
                        <TableCell
                          variant="h3"
                          sx={{
                            width: "20%",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Transcation ID
                        </TableCell>
                        <TableCell
                          variant="h3"
                          sx={{
                            width: "20%",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
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
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {paymentRequests?.map((payment, id) => {
                      return (
                        <TableRow key={payment?.withdrawlId}>
                          <TableCell
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderBottom: "none",
                            }}
                          >
                            <Typography variant="h6Grey">
                              {payment?.withdrawlAmount}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "none", width: "20%" }}
                          >
                            <Typography variant="h6Grey">
                              {payment?.approvedBy || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "none", width: "20%" }}
                          >
                            <Typography variant="h6Grey">
                              {payment?.txnReference || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>
                            <Typography variant="h6Grey">
                              {convertCreatedAtTime(payment?.createdAt)}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "none", width: "30%" }}
                          >
                            <Typography variant="h6Grey">
                              {payment?.status}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        )}
        {loading && <>Please Wait while we fetch your data</>}
      </Layout>
    </>
  );
};

export default UserPayments;
