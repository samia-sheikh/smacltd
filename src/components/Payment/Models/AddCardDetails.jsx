import {
  Box,
  Dialog,
  Divider,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ButtonComp from "../../globalComponents/ButtonComp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../features/hooks/useFetch";
import { toast } from "react-toastify";
const AddCardDetails = ({
  isAddDetailsOpen,
  setIsAddDetailsOpen,
  onClose,
  courseId,
  courseFee,
}) => {
  const { user } = useSelector((state) => state.user);
  const [cardNumber, setCardNumber] = React.useState("");
  const { postData } = useFetch();
  const handleChange = (event) => {
    setCardNumber(event.target.value);
  };
  const handleBuyCourse = () => {
    if (cardNumber) {
      postData(
        `/api/course/${courseId}/orders`,
        undefined,
        undefined,
        undefined,
        undefined,
        (res) => {
          setIsAddDetailsOpen(false);
        }
      );
    } else {
      toast.error("Please select a card");
    }
  };
  const cardList = [
    {
      id: "1",
      value: "5002 0320 5002 0235",
      show: "500* **** **** *235",
    },
    {
      id: "2",
      value: "4586 9586 2658 1457",
      show: "458* **** **** *457",
    },
    {
      id: "3",
      value: "1234 9874 5621 0012",
      show: "123* **** **** *012",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Dialog
        sx={{
          borderRadius: "12px",
        }}
        open={isAddDetailsOpen}
        onClose={onClose}
        PaperProps={{ sx: { width: "clamp(280px, 50vw, 800px)" } }}
      >
        <Box
          sx={{
            background: "#f8f8f8",
            padding: "24px",
            // minWidth: "290px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Box>
            <Typography variant="postUserTypo">Course Prize</Typography>
            <Box
              sx={{
                background: "white",
                padding: "10px 16px",
                border: "1px solid #00000033",
                boxShadow: "0px 0px 12px 0px #00000033",
                color: "#B9B7B7",
                fontSize: "24px",
                borderRadius: "10px",
                mt: "12px",
              }}
            >
              {courseFee}
            </Box>
          </Box>
          <Box>
            <Typography variant="postUserTypo">
              Select Payment Method
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                mt: "12px",
                // background: "red",
              }}
            >
              <IconButton
                sx={{
                  background: "#f8f8f8",

                  border: "1px solid #00000033",
                  boxShadow: "0px 0px 12px 0px #00000033",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  color: "#14B8A6",
                  height: "65px",
                  "&:hover": {
                    background: "unset",
                  },
                }}
                onClick={() => {
                  navigate(`/user/dashboard/${user?.email}?tab=Payments`);
                }}
              >
                <AddIcon sx={{ padding: "0" }} />
                <Typography
                  sx={{ color: "#14B8A6", fontSize: "12px", padding: "0" }}
                >
                  Add new
                </Typography>
              </IconButton>

              <FormControl sx={{ width: "100%", height: "inherit" }}>
                {/* <InputLabel id="demo-multiple-name-label">Select a card</InputLabel> */}
                <Select
                  value={cardNumber}
                  onChange={handleChange}
                  placeholder="Select a credit card"
                >
                  {cardList?.map((card) => {
                    return (
                      <MenuItem value={card.value} key={card.id}>
                        {card.show}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider sx={{ marginTop: "35px", marginBottom: "16px" }} />
          <ButtonComp label={"Buy Now"} click={handleBuyCourse} />
        </Box>
      </Dialog>
    </>
  );
};

export default AddCardDetails;
