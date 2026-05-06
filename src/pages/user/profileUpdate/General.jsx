import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Field, Formik, Form } from "formik";
import TextInput from "../../../components/globalComponents/global_inputs/TextInput";
// import Dropdown from "./../../../components/globalComponents/Dropdown";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import { useSelector } from "react-redux";
import useFetch from "../../../features/hooks/useFetch";
import { setUser } from "../../../features/slice/userSlice";
import * as Yup from "yup";
import Layout from "../../../components/globalComponents/Layout/Layout";
const General = () => {
  // const dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  const { putData, loading } = useFetch();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(
        /^(?!.*\s{2,})(?!.*[^a-zA-Z0-9\s]).*$/,
        "No consecutive spaces or special characters allowed"
      )
      .min(3, "First Name must be greater than 3 characters")
      .max(16, "First Name must not be greater than 16 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(
        /^(?!.*\s{2,})(?!.*[^a-zA-Z0-9\s]).*$/,
        "No consecutive spaces or special characters allowed"
      )
      .min(3, "Last Name must be greater than 3 characters")
      .max(16, "Last Name must not be greater than 16 characters"),
  });
  useEffect(() => {
    // Update local state when user changes
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    });
    // //console.log(user, "user");
  }, [user]);

  return (
    <Layout title={"Basic Info | SMAC"}>
      <Box>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            putData(
              "/api/user/user-personal",
              values,
              setUser,
              () => {
                // //console.log(res, "Tich buttna di jori");
              },
              false
            );

            resetForm();
          }}
        >
          {({ handleChange }) => (
            <Form>
              <Box sx={{ gap: "16px", my: 12, width: "100%" }}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">First Name</Typography>
                  <Field
                    component={TextInput}
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">Last Name</Typography>
                  <Field
                    component={TextInput}
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">Email</Typography>
                  <Field
                    disabled
                    component={TextInput}
                    placeholder={user?.email || ""}
                    type="email"
                    name="email"
                    onChange={handleChange}
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
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default General;
