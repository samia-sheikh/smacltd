import React, { useEffect, useState } from "react";
import Layout from "../../components/globalComponents/Layout/Layout";
import { Box, Paper, Typography } from "@mui/material";
import ButtonComp from "../../components/globalComponents/ButtonComp";
import { Link, useParams } from "react-router-dom";
import theme from "../../theme";
import useGetAPI from "../../features/hooks/useGetAPI";
import { useSelector } from "react-redux";
import moment from "moment";
import ProfilePicture from "../../components/globalComponents/ProfilePicture";
import HeroSectionImageSlider from "../../components/SwiperJs/HeroSectionImageSlider/HeroSectionImageSlider";
import useFetch from "../../features/hooks/useFetch";
import ChatFromOtherUser from "../../components/Chat/ChatFromOtherUser";

const SingleProduct = () => {
  const { user } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const { getData } = useGetAPI();
  const { fetchData } = useFetch();
  console.log(productId);

  const getSingleProduct = async () => {
    //function to get single product
    //console.log(productId, "check params");
    console.log("product");
    await getData(`/api/product/getById/${productId}`, (res) => {
      setProduct(res?.data);
    });
  };

  const widthResize = () => {
    //function to set resize of screen width
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log("this is single product");

    getSingleProduct();
    window.addEventListener("resize", widthResize);
    widthResize();
    return () => window.removeEventListener("resize", widthResize);
  }, []);

  return (
    <>
      <Layout title={product?.title + " | SMAC"}>
        {product?.images ? (
          <HeroSectionImageSlider images={product?.images} />
        ) : (
          ""
        )}
        <Paper
          sx={{
            borderRadius: "22px",
            padding: `50px 20px`,
            display: "flex",
            flexDirection: `${width > 1250 ? "row" : "column"}`,
            // flexWrap:"wrap",
            gap: "5rem",
            mt: "76px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1007px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{ wordBreak: "break-all", maxWidth: "100%" }}
              >
                {product?.title}
              </Typography>
              <Typography variant="h4Black">
                •{" "}
                {moment
                  .utc(product?.createdAt)
                  .local()
                  .startOf("seconds")
                  .fromNow()}
              </Typography>
            </Box>
            <Typography variant="h4Black" sx={{ wordBreak: "break-all" }}>
              {product?.description}
            </Typography>
            {/* <ButtonComp
              click={() => {
                setIsAddDetailsOpen(true);
              }}
              label={`Buy this product RS ${product?.courseFee} PKR`}
              customStyles={{ maxWidth: "337px", borderRadius: " 4px" }}
            /> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="productTitle"
                sx={{ color: `${theme.palette.primary.main}` }}
              >
                PKR {product?.price}
              </Typography>
              {user?.email === product?.user?.email ? null : (
                <Box sx={{ width: "110px" }}>
                  {/* <ButtonComp label={"Message"} /> */}
                  <ChatFromOtherUser
                    email={product?.user?.email}
                    buttonStyles={{
                      width: "130px",
                      height: "55px",
                      fontSize: "1rem",
                      borderRadius: "12px",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ width: "100%", maxWidth: "378px" }}>
            <Typography variant="h2">Seller Information</Typography>

            <Box sx={{ display: "flex", gap: "24px", marginTop: "24px" }}>
              <ProfilePicture
                src={product?.user?.profilePic}
                firstName={product?.user?.firstName}
                sx={{
                  height: "100px",
                  width: "100px",
                }}
                innerBox={{
                  height: "80px",
                  width: "80px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Typography
                  variant="black24"
                  sx={{ textTransform: "capitalize" }}
                >
                  {product?.user?.firstName.substring(0, 10) +
                    " " +
                    product?.user?.lastName.substring(0, 10)}
                </Typography>
                {product?.user?.bio ? (
                  <Typography variant="h4Black">
                    {product?.user?.bio.substring(0, 30)}
                  </Typography>
                ) : null}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    textDecoration: "none",
                    textTransform: "capitalize",
                  }}
                  to={
                    user?.email === product?.user?.email
                      ? "/profile-user"
                      : `/user/${product?.user?.email}`
                  }
                >{`view profile of ${
                  product?.user?.firstName.substring(0, 10) +
                  " " +
                  product?.user?.lastName.substring(0, 10)
                }`}</Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Layout>
    </>
  );
};

export default SingleProduct;
