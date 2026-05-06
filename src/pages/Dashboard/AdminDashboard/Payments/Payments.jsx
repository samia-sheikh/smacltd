import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../../../theme";
import useFetch from "../../../../features/hooks/useFetch";
import ButtonComp from "../../../../components/globalComponents/ButtonComp";
import SubscriptionTable from "../../../../components/DashBoard/UserDashboard/Listing/SubscriptionTable";

const Payments = () => {
  const { fetchData, postData, loading } = useFetch();
  const navigate = useNavigate();
  const [paymentRequests, setPaymentRequests] = useState([]);
  const getWithdrawRequests = async () => {
    await fetchData("/api/payment/getAllPayments", undefined, (res) => {
      console.log(res?.data);
      setPaymentRequests(res?.data);
    });
  };
  useEffect(() => {
    getWithdrawRequests();
  }, []);
  return (
    <>
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
            // padding: "40px",
            [theme.breakpoints.down("md")]: {
              padding: "16px",
            },
          }}
          component={"div"}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "flex-start",
              mt: "12px",
            }}
          >
            {/*  */}
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
            </Box>

            <Divider />
            {/*  */}
            {loading ? (
              <Box>Please wait while we fetch your data</Box>
            ) : (
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
                        Type
                      </TableCell>
                      <TableCell
                        variant="h3"
                        sx={{
                          width: "10%",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Amount
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
                          width: "10%",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paymentRequests?.map((subData, id) => {
                      return (
                        <SubscriptionTable
                          key={subData?.paymentId}
                          subitems={subData}
                          name="subscriptions"
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Payments;
