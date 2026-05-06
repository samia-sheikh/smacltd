import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageComp from "../../components/globalComponents/ImageComp";
import { Container, Typography } from "@mui/material";
import TextInput from "../../components/globalComponents/global_inputs/TextInput";
import ButtonComp from "../../components/globalComponents/ButtonComp";
// import Links from "../../components/globalComponents/Links";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import useFetch from "../../features/hooks/useFetch";
import theme from "../../theme";
import ImageSlider from "../../components/globalComponents/ImageSlider";
// formik
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import smacLogo from "../../assets/logo/logo.png";
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*.]/,
      "Password must contain at least one special character"
    )
    .max(16, "Password can not be of more than 16 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    // .min(8, "Password must be at least 8 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .max(16, "Password can not be of more than 16 characters")
    // .matches(
    //   /[!@#$%^&*.]/,
    //   "Password must contain at least one special character"
    // )
    .required("Confirm your password"),
});
const initialValues = {
  // Define your form initial values here
  password: "",
  confirmPassword: "",
};

const NewPassword = () => {
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  // state holding token
  const [getToken, setGetToken] = useState();

  // useEffect for getting token from params
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("jwt");
    setGetToken(token);
  }, []);

  let navigate = useNavigate();
  const { patchPass } = useFetch();

  const onSubmit = (values, { resetForm }) => {
    //console.log("Token:", getToken);

    // Handle form submission logic here

    patchPass(
      "/api/user/setnew-password",
      values,
      undefined,
      (data) => {
        //console.log(data, "chcek data in patchPass");
        navigate("/signin");
      },
      undefined,
      getToken
    );

    // Reset the form if needed
    resetForm();
  };
  const flexCol = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid
        container
        spacing={0}
        columns={12}
        sx={{
          overflow: "hidden",
          height: "100%",
          minHeight: { md: "800px" },
          marginTop: { xs: "30px", md: "0px" },
        }}
      >
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          <ImageSlider />
        </Grid>
        <Grid item xs={12} md={6}>
          <Container
            // maxWidth="sm"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box gap={"24px"} sx={{ width: "90%", maxWidth: "480px" }}>
              {/* logo and typo container  */}
              <Box {...flexCol} gap={"24px"}>
                <ImageComp
                  src={smacLogo}
                  alt="photo"
                  sx={{ backgroundSize: "cover", width: "200px" }}
                />
                <Box {...flexCol} sx={{ textAlign: "center", gap: "16px" }}>
                  <Typography variant="h2">Reset password</Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      maxWidth: { xl: "380px", lg: "360px", xs: "300px" },
                    }}
                  >
                    Please enter your new password
                  </Typography>
                </Box>
              </Box>
              {/* input fields  */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                // style={{ height: "100%" }}
              >
                <Form>
                  <Box {...flexCol} sx={{ gap: "16px", my: 12 }}>
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
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </Typography>
                    </Box>
                    <Box sx={{ position: "relative", width: "100%" }}>
                      <Field
                        component={TextInput}
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        label="newPassword"
                      />
                      <Typography
                        sx={{
                          position: "absolute",
                          right: "20px",
                          top: "18px",
                        }}
                        onClick={() => {
                          setConfirmPassword(!showConfirmPassword);
                        }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  <ButtonComp
                    label={"Update Password"}
                    type={"submit"}
                    //added just to check flow
                    // click={() => {
                    //   //console.log("form submitted");

                    //   // navigate("/");
                    // }}
                  />
                </Form>
              </Formik>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewPassword;
