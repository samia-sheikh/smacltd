import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../globalComponents/global_inputs/TextInput";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useFetch from "../../../features/hooks/useFetch";
import ButtonComp from "../../globalComponents/ButtonComp";
import ImageComp from "../../globalComponents/ImageComp";
import deletePic from "../../../assets/delete.png";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password can not be of more than 16 characters")
    .required("Password is required"),
});
const initialValues = {
  // Define your form initial values here
  email: "",
  password: "",
};
const DeleteAccountModel = ({ isOpen, setIsOpen, onClose }) => {
  const { loading, postData } = useFetch();
  const [showPassword, setPassword] = useState(false);
  const onSubmit = (values, { resetForm }) => {
    postData(
      "/api/auth/user/delete-user",
      values,
      undefined,
      undefined,
      undefined,
      (res) => {
        if (res) {
          // resetForm();
          // setIsOpen(false);
          //console.log(res);
        }
      }
    );
    // //console.log(values,"test submit",setUserAuth);

    // Reset the form if needed
  };
  const flexCol = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "clamp(18.75rem, 30.375vw + 12.675rem, 49.125rem)",
          padding:
            "clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem) clamp(1.25rem, 1.79vw + 0.102rem, 2.25rem)",
          borderRadius: "clamp(1.125rem, 2.5vw + 0.625rem, 3.625rem)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
        <ImageComp
          src={deletePic}
          styles={{
            width: "clamp(7.5rem, 1.375vw + 7.225rem, 8.875rem)",
            height: "clamp(7.5rem, 1.375vw + 7.225rem, 8.875rem)",
          }}
        />
        <Typography
          sx={{
            fontSize: "clamp(1.125rem, 0.671vw + 0.695rem, 1.5rem)",
            fontWeight: 600,
            textAlign: "center",
            color: "#333333",
          }}
        >
          Delete Account Permanently?
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            textAlign: "center",
            color: "#6D6D6D",
          }}
        >
          Your account will be permanently deleted and never recovered again!
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          // style={{ height: "100%" }}
        >
          <Form>
            <Box {...flexCol} sx={{ gap: "16px", my: 12 }}>
              <Field
                component={TextInput}
                placeholder="Email"
                type="text"
                name="email"
                label="email"
              />
              <Box sx={{ position: "relative", width: "100%" }}>
                <Field
                  component={TextInput}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="password"
                />

                <Typography
                  sx={{
                    position: "absolute",
                    right: "20px",
                    top: "12px",
                  }}
                  onClick={() => {
                    setPassword(!showPassword);
                  }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <ButtonComp
                label={"Delete"}
                type={"submit"}
                disabled={loading}
                click={() => {
                  setIsOpen(!isOpen);
                }}
                customStyles={{
                  width: "clamp(8.125rem, 6.581vw + 5.04rem, 12.938rem)",
                  background: "#ECECEC",
                  border: "1px solid #CFCFCF",
                  boxShadow: "0px 4px 14.3px 0px #93939338",
                  color: "#525252",
                }}
              />
              <ButtonComp
                label={"Cancel"}
                type={"submit"}
                disabled={loading}
                click={() => {
                  setIsOpen(!isOpen);
                }}
                customStyles={{
                  width: "clamp(8.125rem, 6.581vw + 5.04rem, 12.938rem)",
                  background: "#F04E48",
                  border: "1px solid #CFCFCF",
                  boxShadow: "0px 4px 14.3px 0px #93939338",
                  color: "white",
                }}
              />
            </Box>
          </Form>
        </Formik>
      </Box>
    </Dialog>
  );
};

export default DeleteAccountModel;
