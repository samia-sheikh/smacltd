import React, { useEffect, useState } from "react";
// import Layout from "../../globalComponents/Layout/Layout";
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
import theme from "../../../theme";
import SubscriptionTable from "./Listing/SubscriptionTable";
import ButtonComp from "../../globalComponents/ButtonComp";
// import { FaCrown } from "react-icons/fa";
import ImageComp from "../../globalComponents/ImageComp";
import Crown from "../../../assets/Crown.png";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../features/hooks/useFetch";

const SubScription = () => {
  const { fetchData, postData, loading } = useFetch();
  const navigate = useNavigate();
  const [paymentRequests, setPaymentRequests] = useState([]);
  const subscription = [
    {
      id: 1,
      title: "Subscription",
      totalEnrollments: 100,
      description: "This is Subscription 1",
      createdAt: "12 Auguest 2024",
      status: "Deactivated",
      images: Crown,
    },
  ];

  const getWithdrawRequests = async () => {
    await fetchData("/api/payment/getUserPayments", undefined, (res) => {
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
            display: "flex",
            justifyContent: "space-between",
            padding: "40px 20px 24px 20px",
          }}
        >
          <Typography variant="userDashboardHeading">
            {" "}
            My Subscription Plans
          </Typography>
          <Box sx={{ width: "100%", maxWidth: "160px" }}>
            <ButtonComp
              label="View Plans"
              click={() => navigate("/pricing")}
            ></ButtonComp>
          </Box>
        </Box>
        <Divider />

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
                position: "relative",
                width: "100%",
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(90deg, #FFDE66 0%, #FD7E3D 100%), linear-gradient(#FFFBF5, #FFFBF5)",
                backgroundOrigin: "border-box",
                borderRadius: "13px",
                padding: "2px", // Space for the gradient border
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "50px",
                  top: "-50px",
                }}
              >
                <ImageComp src={Crown} />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  background: "#FFFBF5",
                  borderRadius: "11px", // Slightly smaller to fit within outer border
                  height: "203px",
                  display: "flex",
                  alignItems: "center",
                  padding: "44px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "50%",
                  }}
                >
                  <Typography variant="paragraph">
                    Your Current Plan is
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      background:
                        "linear-gradient(90deg, #FFDE66 0%, #FD7E3D 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    PREMIUM PLAN
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  <ButtonComp
                    label="View Benefits"
                    customStyles={{
                      backgroundColor: "transparent",
                      color: "black",
                      border: "2px solid black",
                      borderRadius: "20x",
                    }}
                  />
                  <ButtonComp
                    label="Upgrade Plan"
                    customStyles={{
                      backgroundColor: "black",
                      color: "white",
                      border: "2px solid black",
                      borderRadius: "20x",
                    }}
                    click={() => navigate("/pricing")}
                  />
                </Box>
              </Box>
            </Box>

            {/*  */}
            {loading ? (
              <>Please wait while we fetch your data</>
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
export default SubScription;
