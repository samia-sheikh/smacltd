import React, { useEffect, useState } from "react";
import Layout from "../../../globalComponents/Layout/Layout";
import UserServicesTable from "../Listing/UserServicesTable";
import useFetch from "../../../../features/hooks/useFetch";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const MyServices = ({ servicesData }) => {
  const [myservices, setMyServics] = useState([]);
  const { fetchData } = useFetch();
  //   Fetch data for My-Services....
  const serviceData = () => {
    fetchData(`/api/service/my-services`, undefined, (res) => {
      setMyServics(res?.data);
    });
  };

  useEffect(() => {
    serviceData();
  }, []);
  useEffect(() => {
    if (servicesData?.authorId) setMyServics((pre) => [servicesData, ...pre]);
  }, [servicesData]);
  return (
    <Layout>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "20%" }}></TableCell>
              <TableCell
                variant="h3"
                sx={{
                  width: "20%",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Service Name
              </TableCell>
              <TableCell
                variant="h3"
                sx={{
                  width: "20%",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Total Purchasers
              </TableCell>
              <TableCell
                variant="h3"
                sx={{
                  width: "20%",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Listing Date
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
          <TableBody>
            {myservices && myservices.length > 0 ? (
              myservices?.map((myServices) => {
                return (
                  <>
                    <UserServicesTable
                      key={myServices.id}
                      userservices={myServices}
                      setMyServics={setMyServics}
                      // myservices={myservices}
                      name={"myServices"}
                    />
                  </>
                );
              })
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <h2>No Services Found</h2>
              </Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default MyServices;
