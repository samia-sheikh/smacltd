import React, { useEffect, useState } from "react";
import Layout from "../../../globalComponents/Layout/Layout";
import UserServicesTable from "../Listing/UserServicesTable";
import useFetch from "../../../../features/hooks/useFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PurchasedServices = () => {
  const [purchasedService, setPurchasedService] = useState(null);
  const { fetchData } = useFetch();

  useEffect(() => {
    fetchData(`/api/service/user/orders`, undefined, (res) => {
      setPurchasedService(res?.data);
    });
  }, []);
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
                Seller Name
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
            {purchasedService ? (
              purchasedService?.map((purchasedServices) => {
                return (
                  <>
                    <UserServicesTable
                      key={purchasedServices?.serviceId}
                      userservices={purchasedServices}
                      name={"purchasedServices"}
                      orderID={purchasedServices.orderId}
                    />
                  </>
                );
              })
            ) : (
              <>
                <h1>No Purchased Services</h1>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default PurchasedServices;
