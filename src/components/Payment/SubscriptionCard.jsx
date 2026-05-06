import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../theme";
import ButtonComp from "./../globalComponents/ButtonComp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DoneIcon from "@mui/icons-material/Done";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { setPrice } from "../../features/slice/Payment/subscriptionPriceSlice";
import { useNavigate } from "react-router-dom";
const SubscriptionCard = ({ data, plan }) => {
  const [dense, setDense] = React.useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handlePrice = (p) => {
    dispatch(setPrice({ price: p }));
    navigate(`/payment/${p}`);
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "404px",
        minWidth: "300px",
        borderRadius: "8px",
        border: `1px solid ${theme.palette.primary.main}`,
        padding: "40px 24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        <Typography variant="black24" sx={{ marginBottom: "16px" }}>
          {data.name}
        </Typography>
        <Typography variant="h5">{data.about}</Typography>

        <Typography variant="priceTypo">
          ${data.price}
          <span style={{ fontSize: "24px" }}>/{plan}</span>
        </Typography>
        <ButtonComp
          label={"Select"}
          customStyles={{
            marginTop: "40px",
            borderRadius: "8px",
            background: "inherit",
            color: theme.palette.primary.main,
          }}
          click={() => {
            handlePrice(data.price);
          }}
        />
      </Box>
      <List dense={dense}>
        {data.features?.map((item, i) => {
          return (
            <ListItem key={i}>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SubscriptionCard;
