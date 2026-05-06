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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";

import useFetch from "../../../../features/hooks/useFetch";
import WithdrawPaymentModel from "../../../../components/DashBoard/Modals/WithdrawPaymentModel";
import theme from "../../../../theme";
import Layout from "../../../../components/globalComponents/Layout/Layout";
import ChangeWithdrawlRequest from "../../../../components/DashBoard/AdminDashboard/Models/ChangeWithdrawlRequest";

const WithdrawlRequests = () => {
  const { fetchData, postData, loading } = useFetch();
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isWithdrawPaymentModelOpen, setWithdrawPaymentModelOpen] =
    useState(false);
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [totalAmounts, setTotalAmounts] = useState(null);
  const handleOpenPaymentModel = () => {
    setWithdrawPaymentModelOpen(!isWithdrawPaymentModelOpen);
  };
  const getWithdrawRequests = async () => {
    await fetchData(
      "/api/payment/withdraw/requests/getAll",
      undefined,
      (res) => {
        console.log(res?.data);

        setPaymentRequests(res?.data);
      }
    );
  };
  const getTotalAmounts = async () => {
    await fetchData("/api/payment/withdrawable/amount", undefined, (res) => {
      setTotalAmounts(res?.data);
    });
  };
  const handleDeleteIconClick = (event, payment) => {
    setAnchorEl(event.currentTarget);
    // ////console.log(payment, "course icon Click");
    setSelectedRequest(payment);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDeleteOptionClick = (course) => {
    setWithdrawPaymentModelOpen(!isWithdrawPaymentModelOpen);
    setAnchorEl(null);
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
        {selectedRequest?.withdrawlId && (
          <ChangeWithdrawlRequest
            isWithdrawPaymentModelOpen={isWithdrawPaymentModelOpen}
            setWithdrawPaymentModelOpen={setWithdrawPaymentModelOpen}
            requestId={selectedRequest}
          />
        )}
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
                <Typography variant="userDashboardHeading">
                  Withdrawl Requests
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
                          Transaction ID
                        </TableCell>
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
                          User
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
                        <TableCell
                          variant="h3"
                          sx={{
                            width: "20%",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {paymentRequests?.map((payment, id) => {
                      return (
                        <TableRow key={payment?.withdrawlId}>
                          <TableCell
                            sx={{ borderBottom: "none", width: "20%" }}
                          >
                            <Typography variant="h6Grey">
                              {payment?.txnReference || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "none", width: "20%" }}
                          >
                            <Typography variant="h6Grey">
                              {payment?.withdrawlAmount}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "none", width: "20%" }}
                          >
                            <Typography variant="h6Grey">
                              {payment?.sellerEmail || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "none", width: "20%" }}
                          >
                            <Typography variant="h6Grey">
                              {payment?.approvedBy || "N/A"}
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
                          <TableCell
                            sx={{ borderBottom: "none", width: "20%" }}
                          >
                            <IconButton
                              sx={{
                                margin: "5px 5px 0px 0px",
                                isolation: "isolate",
                                // mixBlendMode:"difference",
                                color: "white",
                                backgroundColor: "black",
                                filter: "invert(1)",
                              }}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteIconClick(event, payment);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>

                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleCloseMenu}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <MenuItem
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleDeleteOptionClick(selectedRequest);
                                }}
                              >
                                Approve
                              </MenuItem>
                            </Menu>
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

export default WithdrawlRequests;
