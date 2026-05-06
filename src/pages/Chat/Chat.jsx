import { Box } from "@mui/material";
import React from "react";
import Layout from "../../components/globalComponents/Layout/Layout";
import Main from "../../components/Chat/Main";
const Chat = () => {
  return (
    <>
      <Box
        sx={{
          "& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
            backgroundColor: "white !important",
          },
        }}
      >
        <Layout>
          <Main />
        </Layout>
      </Box>
    </>
  );
};

export default Chat;
