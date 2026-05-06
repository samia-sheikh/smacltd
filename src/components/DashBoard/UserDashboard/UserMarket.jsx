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
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import useFetch from "../../../features/hooks/useFetch";
import MarketCard from "./Cards/MarketCard";
import ButtonComp from "../../globalComponents/ButtonComp";
import AddProduct from "../../Market/Modals/Add Product/AddProduct";
import { useDispatch } from "react-redux";
import { setProductParentCategories } from "../../../features/slice/categoriesSlice";
import Layout from "../../globalComponents/Layout/Layout";
import theme from "../../../theme";
import MarketTable from "./Listing/MarketTable";

const UserMarket = () => {
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState(null);

  const [productOpen, setProductOpen] = useState(false);
  const { fetchData } = useFetch();
  let dispatch = useDispatch();
  const getProductCategories = async () => {
    await fetchData("/api/product/parent", undefined, (res) => {
      if (res) {
        dispatch(setProductParentCategories({ data: res?.data }));
      }
    });
  };

  useEffect(() => {
    fetchData("/api/product/my-products", undefined, (res) => {
      setProductList(res?.data);
      //console.log(res, "check data of my products");
    });
    getProductCategories();
  }, [newProduct]);
  return (
    <>
      {/* <Layout> */}
      <AddProduct
        setNewProduct={setNewProduct}
        open={productOpen}
        setOpen={setProductOpen}
      />
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
          <Typography variant="userDashboardHeading">Market</Typography>
          <Box sx={{ width: "100%", maxWidth: "160px" }}>
            <ButtonComp
              icon={<AddIcon />}
              label="Add Product"
              click={() => {
                setProductOpen(!productOpen);
                // //console.log(productOpen, "open");
              }}
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
                      Product Name
                    </TableCell>
                    <TableCell
                      variant="h3"
                      sx={{
                        width: "20%",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      Total Impressions
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
                  {productList.map((product) => {
                    return (
                      <MarketTable
                        key={product.productId}
                        product={product}
                        setProductList={setProductList}
                        productList={productList}
                        name="market"
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      {/* </Layout> */}
    </>
  );
};

export default UserMarket;
