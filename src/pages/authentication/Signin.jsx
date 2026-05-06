import React, { useState } from "react";
import LogInWithBtn from "../../components/globalComponents/LogInWithBtn";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageComp from "../../components/globalComponents/ImageComp";
import { Container, Typography } from "@mui/material";
import TextInput from "../../components/globalComponents/global_inputs/TextInput";
import ButtonComp from "../../components/globalComponents/ButtonComp";
import useFetch from "../../features/hooks/useFetch";
// import { useLocation } from "react-router-dom";
import { setUserAuth } from "../../features/slice/userSlice";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import Links from "../../components/globalComponents/Links";
import { useGoogleLogin } from "@react-oauth/google";
import ImageSlider from "../../components/globalComponents/ImageSlider";
// import { useNavigate } from "react-router-dom";
import theme from "./../../theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
//this library is used for test purpose we will change this to RTK and persist
import smacLogo from "../../assets/logo/logo.png";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../features/slice/socketSlice";
import getSocket from "../../Socket/socket";
// formik
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

const Signin = () => {
  // const [login, setLogin] = useState(false);
  const { loading, postData } = useFetch();
  const [showPassword, setPassword] = useState(false);
  // const { state } = useLocation();
  const dispatch = useDispatch();
  const onSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    postData(
      "/api/auth/user/login",
      values,
      setUserAuth,
      undefined,
      undefined,
      (res) => {
        // console.log(res.data.token, "check user data on login");
        getSocket(res.data.token);
        dispatch(setSelectedChat({ selectedChat: null }));
        resetForm();
      }
    );
    // console.log(values,"test submit",setUserAuth);

    // Reset the form if needed
  };
  //sign in with googlex
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // console.log("login", codeResponse);
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
          getSocket(res.data.token);
          dispatch(setSelectedChat({ selectedChat: null }));

          // setOpen(true);
          // console.log(res);
        }
      );
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // let navigate = useNavigate();
  const flexCol = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        spacing={0}
        columns={12}
        sx={{
          overflow: "hidden",
          height: "100%",
          // minHeight: { md: "800px" },
          marginTop: { xs: "30px", md: "0px" },
        }}
      >
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            // background: "url(./assets/photos/logImage.png)",
            // backgroundSize: "cover",
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          <ImageSlider />
        </Grid>
        <Grid item xs={12} md={6} sx={{ alignContent: "center" }}>
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
                  sx={{
                    backgroundSize: "cover",
                    width: "200px",
                    // height: "100px",
                  }}
                />
                <Box {...flexCol} sx={{ textAlign: "center", gap: "16px" }}>
                  <Typography variant="h2">Sign in to SMAC</Typography>
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
                <LogInWithBtn click={login} login={"Login with Google"} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  {" "}
                  <ImageComp
                    src={"assets/png/line.png"}
                    alt="line"
                    styles={{
                      width: "calc(50% - 84px)",
                      height: "2px",
                    }}
                  />{" "}
                  <Typography
                    sx={{
                      width: "100%",
                      minWidth: "160px",
                      textAlign: "center",
                    }}
                  >
                    or sign in with email
                  </Typography>
                  <ImageComp
                    src={"assets/png/line.png"}
                    alt="line"
                    styles={{
                      width: "calc(50% - 84px)",
                      height: "2px",
                    }}
                  />
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
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    gap={"16px"}
                    //  mt={6}
                    mb={6}
                  >
                    <Links
                      label={"Forgot Password?"}
                      href={"/password"}
                      // style={{ transform: "underline" }}
                    />
                  </Box>
                  <ButtonComp
                    label={"Sign in"}
                    type={"submit"}
                    disabled={loading}
                    //added just to check flow
                    // click={() => {
                    //   console.log("form submitted");
                    //   // navigate("/");
                    // }}
                  />
                </Form>
              </Formik>

              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"16px"}
                mt={12}
              >
                {/* <NavLink
                  className="signup"
                  // to={path.register}  
                  state={state}
                >
                </NavLink> */}
                <Typography
                  variant="h6Grey"
                  sx={{
                    "@media (max-width:420px)": {
                      fontSize: "12px",
                    },
                  }}
                >
                  Don’t have an account?
                </Typography>
                <Links label={"Sign up"} href={"/signup"} s />
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signin;
