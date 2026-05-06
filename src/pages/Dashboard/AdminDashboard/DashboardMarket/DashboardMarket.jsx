import * as React from "react";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useFetch from "../../../../features/hooks/useFetch";
import { useEffect } from "react";
import useGetAPI from "../../../../features/hooks/useGetAPI";
import DashBoardSearchInputField from "../../../../components/DashBoard/DashBoardSearchInputField/DashBoardSearchInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setDashboardAllProducts,
  setDashboardProducts,
} from "../../../../features/slice/DashBoardProductsSlice";
import ViewProduct from "../../../../components/Market/Modals/ViewProduct/ViewProduct";
import { setIsViewProductOpen } from "../../../../features/slice/Market/viewProductSlice";
import ImageComp from "../../../../components/globalComponents/ImageComp";

export default function DashboardMarket() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [marketData, setMarketData] = React.useState([]);
  const { fetchData } = useFetch();
  const { getData } = useGetAPI();
  const { deleteData } = useFetch();
  const [showMarketData, setShowMarketData] = React.useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);
  // const openModal = () => setOpen(true);
  const { isViewProductOpen } = useSelector((state) => state.viewProduct);
  const openModal = (dataCourse) => {
    //console.log("Clicked");
    setShowMarketData(dataCourse);
    setOpen(true);
    dispatch(setIsViewProductOpen({ open: !isViewProductOpen }));
  };

  // const [prductsOfUser,setProductsOfUser]=React.useState(null)
  // geting User from the Redux
  const user = useSelector(
    (state) => state.DashBoardProductsSlice.dashBoarduser
  );
  // getting Products from the redux..
  const FilterProducts = useSelector(
    (state) => state.DashBoardProductsSlice.dashBoardproducts
  );
  // console.log(FilterProducts, " filter products in Market");
  const handleDeleteIconClick = (event, productId) => {
    // //console.log(courseId,"ccc");
    setAnchorEl(event.currentTarget);
    setSelectedCourseId(productId.productId);
  };
  // delete handler get product id from event  and send to server for deleting it
  const handleDeleteOptionClick = (productId) => {
    setAnchorEl(null);
    deleteData(`/api/admin/product/${productId}`, (res) => {
      //filter  data after deletion and update marketData
      const afterDelete = marketData.filter((valueData) => {
        return valueData.productId !== productId;
      });
      setMarketData(afterDelete);
    });
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    //hit admin  api /api/admin/product and set  it to dashboardProduct
    getData("/api/admin/product", (res) => {
      // //console.log(res, "response in the Market");
      setMarketData(res.data);
      //dispatch  this data to DashBoardReducer
      dispatch(setDashboardAllProducts(res.data));
      //check user in redux uset that data (user.email) to get all products
      if (user?.email) {
        fetchData("/api/admin/product/" + user.email, undefined, (res) => {
          //set products in redux
          dispatch(setDashboardProducts(res.data));
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Function to format date
  function convertCreatedAtTime(params) {
    const date = new Date(params);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "15px",
        }}
      >
        <Typography
          variant="h2"
          noWrap
          component={"span"}
          sx={{
            margin: "10px 0",
          }}
        >
          Market
        </Typography>
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
          <DashBoardSearchInputField
            url={"/api/admin/product/"}
            cb={setMarketData}
          />
        </Box>
        {/* here i'm getting the value from redux */}
        <Box>
          {" "}
          {user && user ? (
            <>
              <Typography
                component={"span"}
                variant="h2"
                sx={{
                  padding: "10px 0px",
                }}
              >
                User personal details
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <img
                          style={{
                            width: "100%",
                            maxWidth: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          src={
                            user && user.profilePic
                              ? user.profilePic
                              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                          }
                          alt="UserImage"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          component={"span"}
                          variant="h6Grey"
                          sx={{ marginBottom: "10px", display: "block" }}
                        >
                          Name
                        </Typography>
                        {user ? user.firstName + " " + user.lastName : ""}
                      </TableCell>

                      <TableCell>
                        <Typography
                          component={"span"}
                          variant="h6Grey"
                          sx={{ marginBottom: "10px", display: "block" }}
                        >
                          Email
                        </Typography>
                        {user ? user.email : ""}
                      </TableCell>
                      <TableCell>
                        <Typography
                          component={"span"}
                          variant="h6Grey"
                          sx={{ marginBottom: "10px", display: "block" }}
                        >
                          Status
                        </Typography>
                        {user ? (user.isBlocked ? "Unblock" : "Block") : ""}
                      </TableCell>
                      {/* this is clear icon */}
                      {/* <TableCell>
                        <ButtonComp
                          customStyles={{ width: "2px" }}
                          icon={<ClearIcon sx={{ marginRight: "65px" }} />}
                        />
                      </TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            ""
          )}
        </Box>
        {/* end of redux */}
        <Typography
          component={"span"}
          variant="h2"
          sx={{
            padding: "20px 0px",
          }}
        >
          User Product details
        </Typography>

        {FilterProducts && FilterProducts.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "20%",
                    }}
                  ></TableCell>
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
                    Seller Email
                  </TableCell>
                  <TableCell
                    variant="h3"
                    sx={{
                      width: "20%",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Listed Date
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
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {FilterProducts.map((row, index) => {
                console.log(row);

                return (
                  <TableRow
                    key={index}
                    onClick={() => {
                      openModal(row);
                    }}
                  >
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "none",
                      }}
                    >
                      <ImageComp
                        src={row.images[0]}
                        sx={{
                          width: "53px",
                          height: "53px",
                          borderRadius: "6px",
                          objectFit: "cover",
                        }}
                        alt="Market"
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                      <Typography variant="h6Grey">
                        {row.title.length > 25
                          ? row.title.substring(0, 25) + "....."
                          : row.title}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                      <Typography variant="h6Grey">
                        {row?.authorEmail}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                      <Typography variant="h6Grey">
                        {convertCreatedAtTime(row.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                      <Typography variant="h6Grey">Listed</Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none", width: "20%" }}>
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
                          handleDeleteIconClick(event, row);
                        }}
                      >
                        <MoreVertIcon
                        // sx={{
                        //   position: "absolute",
                        //   top: 0,
                        //   right: 0,
                        //   margin: "5px 5px 0px 0px",
                        //   color: "white",
                        // }}
                        // onClick={(event) => {
                        //   event.stopPropagation();
                        //   handleDeleteIconClick(event, DashMarket);
                        // }}
                        />
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
                            handleDeleteOptionClick(selectedCourseId);
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </TableContainer>
        ) : FilterProducts && FilterProducts.length === 0 ? (
          <Typography component={"span"} sx={{ display: "block" }}>
            No Products of this User
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "20%",
                      }}
                    ></TableCell>
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
                      Listed Date
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
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {marketData?.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        onClick={() => {
                          openModal(row);
                        }}
                      >
                        <TableCell
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderBottom: "none",
                          }}
                        >
                          <ImageComp
                            src={row.images[0]}
                            sx={{
                              width: "53px",
                              height: "53px",
                              borderRadius: "6px",
                              objectFit: "cover",
                            }}
                            alt="Market"
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                          <Typography variant="h6Grey">
                            {row.title.length > 25
                              ? row.title.substring(0, 25) + "....."
                              : row.title}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                          {/* seller Name */}

                          <Typography variant="h6Grey">
                            {row?.user?.firstName + " " + row?.user?.lastName}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                          <Typography variant="h6Grey">
                            {convertCreatedAtTime(row.createdAt)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                          <Typography variant="h6Grey">Listed</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none", width: "20%" }}>
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
                              handleDeleteIconClick(event, row);
                            }}
                          >
                            <MoreVertIcon
                            // sx={{
                            //   position: "absolute",
                            //   top: 0,
                            //   right: 0,
                            //   margin: "5px 5px 0px 0px",
                            //   color: "white",
                            // }}
                            // onClick={(event) => {
                            //   event.stopPropagation();
                            //   handleDeleteIconClick(event, DashMarket);
                            // }}
                            />
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
                                handleDeleteOptionClick(selectedCourseId);
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
      <ViewProduct dataShow={showMarketData} open={open} />
    </>
  );
}
