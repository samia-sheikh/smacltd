import { Box, Typography } from "@mui/material";
import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import TextInput from "../../../components/globalComponents/global_inputs/TextInput";
import * as Yup from "yup";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import useFetch from "../../../features/hooks/useFetch";
import Layout from "../../../components/globalComponents/Layout/Layout";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#.]/,
      "Password must contain at least one special character"
    )
    .max(16, "Password can not be of more than 16 characters")
    .required("New password is required"),
  currentPassword: Yup.string()
    .min(8, "Current password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .max(16, "Password can not be of more than 16 characters")
    .matches(
      /[@$!%*?&#.]/,
      "Password must contain at least one special character"
    )
    .required("Current password is required"),
  // currentPassword: Yup.string()
  //   .min(8, "Current password must be at least 8 characters")
  //   .required("Current password is required"),
  confirmPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#.]/,
      "Password must contain at least one special character"
    )
    .required("Confirm your password"),
});

const ChangePassword = () => {
  const { loading, patchData } = useFetch();
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const initialValues = {
    // Define your form initial values here
    newPassword: newPassword,
    currentPassword: currentPassword,
    confirmPassword: confirmPassword,
  };
  const onSubmit = async (values, { resetForm }) => {
    let payload = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    patchData(
      "/api/user/change-password",
      payload,
      undefined,
      (res) => {
        //console.log(res, "res of change password");
        setNewPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
      },
      false
    );
    resetForm();
  };
  return (
    <Layout title={"Change Password | SMAC"}>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Box sx={{ gap: "16px", my: 12 }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "828px",
                  padding: "19px 24px",
                }}
              >
                <Typography variant="uploadFormDark">
                  Current Password
                </Typography>
                <Field
                  component={TextInput}
                  placeholder="Current Password"
                  type="password"
                  name="currentPassword"
                  label="Current Password"
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "828px",
                  padding: "19px 24px",
                }}
              >
                <Typography variant="uploadFormDark">New Password</Typography>
                <Field
                  component={TextInput}
                  placeholder="New Password"
                  type="password"
                  name="newPassword"
                  label="New Password"
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "828px",
                  padding: "19px 24px",
                }}
              >
                <Typography variant="uploadFormDark">
                  Confirm Password
                </Typography>
                <Field
                  component={TextInput}
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                />
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ButtonComp
                type={"submit"}
                label={"Save Changes"}
                customStyles={{
                  fontSize: "16px",
                  width: "100%",
                  maxWidth: "154px",
                  height: "60px",
                  marginRight: "22px",
                  padding: "0px",
                }}
                disabled={loading}
              />
            </Box>
          </Form>
        </Formik>
      </Box>
    </Layout>
  );
};

export default ChangePassword;
