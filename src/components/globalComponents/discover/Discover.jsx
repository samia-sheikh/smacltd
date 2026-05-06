import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { discover } from "../../data";
import theme from "../../../theme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Discover = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ marginTop: "20px", fontSize: "20px" }}
      >
        Choose your preference...
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {discover.map((item) => {
          return (
            <Card
              sx={{
                width: "545px",
                padding: "40px",
                backgroundColor: "white",
                borderRadius: "25px",
                // boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                boxShadow: "0px 4px 60px 0px rgba(70, 67, 67, 0.08)",
                "&:hover": {
                  border: `1px solid ${theme.palette.primary.main}`,
                  boxShadow: "0px 4px 60px 0px rgba(36, 34, 34, 0.08)",
                },
              }}
              key={item.id}
            >
              {/* <CardActionArea> */}
              <CardMedia
                component="img"
                image={item.cardImage}
                alt="green iguana"
                sx={{ height: "206px", width: "286px", background: "inherit" }}
              />
              {/* <CardContent> */}
              <Typography
                gutterBottom
                variant="h2"
                component="div"
                sx={{ background: "white" }}
              >
                {item.cardTitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                // align="center"
               
                sx={{ fontSize: "20px", background: "white",textAlign:"justify" }}
              >
                {item.cardDescription}
              </Typography>
              {/* </CardContent> */}
              {/* </CardActionArea> */}
              {/* <CardActions> */}
              <Button
                sx={{
                  "&:hover": {
                    background: theme.palette.primary.main,
                    color: "white",
                  },
                  background: "transparent",
                  border: theme.borders.primaryBorder,
                  width: "100%",
                  height: "60px",
                  color: theme.palette.primary.main,
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  navigate(
                    item.id === "1"
                      ? `/user/dashboard/${user.email}`
                      : `/user/dashboard/${user.email}?tab=My-Products`
                  );
                }}
              >
                Next
              </Button>
              {/* </CardActions> */}
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Discover;
