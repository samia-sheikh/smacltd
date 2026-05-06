import React, { useEffect, useState } from "react";
import { Button, Popover, Typography, Box } from "@mui/material";
import useFetch from "../../features/hooks/useFetch";
import Layout from "../globalComponents/Layout/Layout";
import ImageComp from "../globalComponents/ImageComp";
import theme from "../../theme";
import useWindowSize from "../../features/hooks/useInnerWidth";
import ButtonComp from "../globalComponents/ButtonComp";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const MarketMegaMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { fetchData } = useFetch();
  const [productCategories, setProductCategories] = useState([]);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchData("/api/product/parent?limit=6", undefined, (res) => {
      setProductCategories(res.data);
    });
  }, []);
  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        sx={{
          background: open ? "#F0F0F0" : "inherit",
          borderRadius: "12px",
          padding: "10px 12px",
        }}
      >
        Market
        <FaAngleDown
          style={{
            transform: open ? "rotate(180deg)" : null,
            transition: "transform 0.5s ease",
          }}
        />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            width: width,
            boxShadow: "none",
            background: "white",
            margin: "50px 0px 0px 0px",
          },
        }}
        // container={"div"}
        disableScrollLock
      >
        {" "}
        <Box
          sx={{
            width: "100%",
          }}
          onMouseLeave={handleClose}
        >
          <Layout styles={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                padding: "9px 0px 46px 0px",
                display: "flex",
                gap: "2.5rem",
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "359px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  [theme.breakpoints.down("md")]: {
                    maxWidth: "100%",
                  },
                }}
              >
                <Typography variant="h1">Market</Typography>
                <Typography variant="paragraph">
                  Unlock a world of expert-led courses designed to advance your
                  career with flexible, self-paced learning in IT, business, and
                  personal growth.
                </Typography>
                <ButtonComp
                  label={"Explore"}
                  customStyles={{
                    width: "115px",
                    background: "white",
                    color: "black",
                    border: "0.68px solid #000000",
                  }}
                  click={() => navigate("market")}
                />
              </Box>
              <Box sx={{ width: "1px", background: "#DDDDDD" }}></Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                  gap: "1rem",
                  [theme.breakpoints.down("lg")]: {
                    gridTemplateColumns: "auto auto",
                  },
                }}
              >
                {productCategories?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        // width: "100%",
                        // maxWidth: "294px",
                        borderRadius: "29px",
                        background: "#FAFAFA",
                        padding: "28px 16px",
                        display: "flex",
                        gap: "14px",
                      }}
                    >
                      <Box
                        sx={{
                          height: "75px",
                          width: "75px !important",
                          minWidth: "75px",
                          background: "#F0F0F0",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ImageComp
                          sx={{
                            width: "90%",
                            maxWidth: "42px",
                            borderRadius: "100%",
                          }}
                          src={item.icon}
                        />
                      </Box>
                      <Box>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography sx={{ fontSize: "10px" }}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Layout>
        </Box>
      </Popover>
    </>
  );
};

export default MarketMegaMenu;
