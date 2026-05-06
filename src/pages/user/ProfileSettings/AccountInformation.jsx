import React from "react";
import { Box, Typography } from "@mui/material";
import { Field, Formik, Form } from "formik";
import TextInput from "../../../components/globalComponents/global_inputs/TextInput";

// import ButtonComp from "../../../components/globalComponents/ButtonComp";
import { useSelector } from "react-redux";
// import useFetch from "../../../features/hooks/useFetch";

import Layout from "../../../components/globalComponents/Layout/Layout";
const AccountInformation = () => {
  let { user } = useSelector((state) => state.user);
  // const { loading } = useFetch();

  return (
    <Layout title={"Account Information | SMAC"}>
      <Box>
        <Formik>
          <Form>
            <Box sx={{ gap: "16px", my: 12, width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "828px",
                  padding: "19px 24px",
                }}
              >
                <Typography variant="uploadFormDark">Your ID</Typography>
                <Field
                  disabled
                  component={TextInput}
                  placeholder={user?.email || ""}
                  type="email"
                  name="email"
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "828px",
                  padding: "19px 24px",
                }}
              >
                <Typography variant="uploadFormDark">URL</Typography>
                <Field
                  disabled
                  component={TextInput}
                  placeholder={"https://www.smacltd.com/user/" + user?.id || ""}
                  type="email"
                  name="email"
                />
              </Box>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Layout>
  );
};

export default AccountInformation;
