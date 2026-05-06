import React from "react";
// import LogInWithBtn from "../../components/globalComponents/LogInWithBtn";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageComp from "../../components/globalComponents/ImageComp";
import { Container, Typography } from "@mui/material";
import TextInput from "../../components/globalComponents/global_inputs/TextInput";
import ButtonComp from "../../components/globalComponents/ButtonComp";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import useFetch from "../../features/hooks/useFetch";
import ImageSlider from "../../components/globalComponents/ImageSlider";
import theme from "../../theme";
import smacLogo from "../../assets/logo/logo.png";
// formik
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const initialValues = {
  // Define your form initial values here
  email: "",
};

const ForgotPassword = () => {
  // const [reqSent, setReqSent] = useState(false);
  const { loading, patchData } = useFetch();
  const navigate = useNavigate();

  const onSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    // send new password link and data from form in header
    patchData("/api/user/forgot-password", values, undefined, (data) => {
      //console.log(data, "check...........");
      navigate("/signin");
    });

    // //console.log(values,"test submit");

    // const configuration = {
    //   method: "post",
    //   url: "http://192.168.1.64:8080/api/auth/user/reset-pass",
    //   data:values
    // };
    //    axios(configuration)
    //       .then((result) => {
    //         if(result){
    //           alert('Reset Password Email Sent');
    //           setReqSent(true);
    //         }
    //        //console.log(result,"check data when signin");
    //        //add conditions when we sign in then show tost and redirect to home page
    //       })
    //       .catch((error) => {
    //         error = new Error();
    //       });
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
                  <Typography variant="h2">Forgot your password</Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      maxWidth: { xl: "380px", lg: "360px", xs: "300px" },
                    }}
                  >
                    Don’t worry! Resetting your password is easy. Just type the
                    email address you used to register for SMAC.
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
                      placeholder="Email"
                      type="email"
                      name="email"
                      label="email"
                    />
                  </Box>

                  <ButtonComp
                    label={"Reset Password Link"}
                    type={"submit"}
                    disabled={loading}

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

export default ForgotPassword;
