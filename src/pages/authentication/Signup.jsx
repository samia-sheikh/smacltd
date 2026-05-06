import React, { useState } from "react";
import LogInWithBtn from "../../components/globalComponents/LogInWithBtn";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageComp from "../../components/globalComponents/ImageComp";
import { Container, Typography } from "@mui/material";
import TextInput from "../../components/globalComponents/global_inputs/TextInput";
import ButtonComp from "../../components/globalComponents/ButtonComp";
import Links from "../../components/globalComponents/Links";
import useFetch from "../../features/hooks/useFetch";
import VerificationModal from "../../components/User/Modals/VerificationModal/VerificationModal";
// import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import smacLogo from "../../assets/logo/logo.png";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import ImageSlider from "../../components/globalComponents/ImageSlider";
import theme from "../../theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setUserAuth } from "../../features/slice/userSlice";
import getSocket from "../../Socket/socket";
import { setSelectedChat } from "../../features/slice/socketSlice";
import { useDispatch } from "react-redux";

// formik
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z ]+$/,
      "First Name should not contain special characters and numbers"
    )
    .matches(
      /^(?!.*\s{2,})[a-zA-Z0-9!@#$%^&*(),.?":{}|<> ]+$/,
      "Consecutive white spaces are not allowed"
    )
    .min(3, "First Name must be at least 3 characters")
    .max(16, "First Name can not be of more than 16 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .max(16, "Last Name can not be of more than 16 characters")
    .matches(
      /^[a-zA-Z ]+$/,
      "Last Name should not contain special characters and numbers"
    )
    .matches(
      /^(?!.*\s{2,})[a-zA-Z0-9!@#$%^&*(),.?":{}|<> ]+$/,
      "Consecutive white spaces are not allowed"
    )
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // phoneNumber: Yup.string().required("Phone Number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password can not exceed more than 16 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*.]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});
const initialValues = {
  // Define your form initial values here
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [showPassword, setPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const { loading, postData } = useFetch();
  const dispatch = useDispatch();

  // signup with google
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      //console.log("login", codeResponse);
      let data = {
        accessToken: codeResponse.access_token,
      };
      postData(
        "/api/auth/user/login/google",
        data,
        setUserAuth,
        undefined,
        undefined,
        (res) => {
          // setOpen(true);
          //console.log(res)
          // ;
          getSocket(res.data.token);
          dispatch(setSelectedChat({ selectedChat: null }));
        }
      );
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const onSubmit = (values, { resetForm }) => {
    postData(
      "/api/auth/user/register-user",
      values,
      undefined,
      undefined,
      undefined,
      (res) => {
        setOpen(true);
      }
    );
    // Handle form submission logic here
    // Reset the form if needed

    resetForm();
  };
  // let navigate = useNavigate();
  const flexCol = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
  return (
    <>
      <VerificationModal open={open} close={setOpen} />
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
                    <Typography variant="h2">Sign up with SMAC</Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        width: "100%",
                        maxWidth: { xl: "380px", lg: "360px", xs: "300px" },
                      }}
                    >
                      Connect, Grow, and Succeed with SMAC
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
                      <Field
                        component={TextInput}
                        placeholder="First Name"
                        type="firstName"
                        name="firstName"
                        label="firstName"
                      />
                      <Field
                        component={TextInput}
                        placeholder="Last Name"
                        type="lastName"
                        name="lastName"
                        label="lastName"
                      />
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
                            top: "20px",
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
                    </Box>

                    <ButtonComp
                      label={"Sign up"}
                      type={"submit"}
                      disabled={loading}
                      //added just to check flow
                      click={() => {
                        //console.log("form submitted");
                        // navigate("/");
                      }}
                    />
                    <LogInWithBtn click={login} login={"Sign up with Google"} />
                  </Form>
                </Formik>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"16px"}
                  mt={12}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      "@media (max-width:420px)": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    Already have an account?
                  </Typography>
                  <Links label={"Sign in"} href={"/signin"} />
                </Box>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Signup;
