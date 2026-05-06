import React, { useState } from "react";
import {
  Box,
  Typography,
  // RadioGroup,
  // FormControlLabel,
  // FormControl,
  // Radio,
} from "@mui/material";
// import ButtonComp from "../../../components/globalComponents/ButtonComp";
// import useFetch from "../../../features/hooks/useFetch";
import Layout from "../../../components/globalComponents/Layout/Layout";
import theme from "../../../theme";
import DeleteAccountModel from "./../../../components/User/Modals/DeleteAccountModel";
import { useSelector } from "react-redux";
const DeleteAccount = () => {
  const { user } = useSelector((state) => state.user);
  // const { loading } = useFetch();
  // const [messageValue, setMessageValue] = useState("anyone");
  // const [commentValue, setCommentValue] = useState("noOne");
  const [isOpen, setIsOpen] = useState(false);

  // const handleCommentRadioChange = (event) => {
  //   setCommentValue(event.target.value);
  // };
  // const handleMessageRadioChange = (event) => {
  //   setMessageValue(event.target.value);
  // };

  return (
    <Layout title={"Privacy And Display | SMAC"}>
      <Box>
        <Box sx={{ gap: "16px", my: 12, width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "828px",
              padding: "19px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Typography variant="uploadFormDark">Delete Account</Typography>

            <Typography variant="subHeader" component={"div"}>
              Would you like to delete your ZNZ account: {user.email}? Deleting
              your account will remove all of your content and data associated
              with your ZNZ profile. This action will not delete your ZNZ
              account.
            </Typography>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                cursor: "pointer",
                width: "max-content",
              }}
              onClick={() => setIsOpen(!isOpen)}
            >
              I want to delete my znz account
            </Typography>
          </Box>
        </Box>
      </Box>
      <DeleteAccountModel
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        setIsOpen={setIsOpen}
      />
    </Layout>
  );
};

export default DeleteAccount;
