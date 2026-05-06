import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Field, Formik, Form } from "formik";
import TextInput from "../../../components/globalComponents/global_inputs/TextInput";
import TextArea from "../../../components/globalComponents/global_inputs/TextArea";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import { useSelector } from "react-redux";
import useFetch from "../../../features/hooks/useFetch";
import { setUser } from "../../../features/slice/userSlice";
import * as Yup from "yup";
import Layout from "../../../components/globalComponents/Layout/Layout";
const PersonalInformation = ({ setValue, value }) => {
  let { user } = useSelector((state) => state.user);
  const { patchData, loading, fetchData } = useFetch();
  const [cities, setCities] = useState([]);
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone Number should contain digits only")
      .max(11, "Phone Number should not greater then 11 character")
      .min(11, "Phone Number should be 11 character"),
    bio: Yup.string()
      // .required("Bio is required")
      .matches(
        /^[^\s][a-z\sA-Z\s0-9\s-()][^\s$]/,
        "Consecutive white spaces are not allowed"
      )
      .max(255, "Bio cannot exceed 255 characters"),
    address: Yup.string()
      // .required("address is not allowed to be empty")
      .matches(
        /^(?!.*\s{2,})[a-zA-Z0-9!@#$%^&*(),.?":{}|<> ]+$/,
        "Consecutive white spaces are not allowed"
      )
      .max(255, "Address cannot exceed 255 characters"),
    dob: Yup.date().max(new Date(), "You cannot select a future date"),
  });
  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    dob: user?.dob || "",
    bio: user?.bio || "",
  });

  useEffect(() => {
    // Update local state when user changes
    setFormData({
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      dob: user?.dob || "",
      bio: user?.bio || "",
    });
  }, [user]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        let country;
        await fetchData("/api/user/user-extradetails", undefined, (res) => {
          country = res.data.country;
        });
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: country }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCities(data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCities();
  }, []);

  return (
    <Layout title={"Personal Information | SMAC"}>
      <Box>
        <Formik
          validationSchema={validationSchema}
          initialValues={formData}
          onSubmit={(values, { resetForm }) => {
            let payload = values;
            if (values.dob === "") {
              payload = {
                address: values.address,
                bio: values.bio,
                phoneNumber: values.phoneNumber,
                dob: null,
              };
            }
            //console.log(payload);

            patchData(
              "/api/user/user-details",
              payload,
              setUser,
              (res) => {
                setValue(2);
              },
              false
            );

            resetForm();
          }}
        >
          {({ handleChange }) => (
            <Form>
              <Box sx={{ gap: "16px", my: 12 }}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">Phone Number</Typography>
                  <Field
                    component={TextInput}
                    placeholder="0312-*******"
                    type="phoneNumber"
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="uploadFormDark">City</Typography>
                  <Field
                    component={"select"}
                    placeholder="Address"
                    type="text"
                    name="address"
                    onChange={handleChange}
                    style={{
                      height: "51px",
                      width: "100%",
                      padding: "8px",
                      borderRadius: "5px",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    {cities.map((city, index) => {
                      return (
                        <option
                          value={city}
                          key={index}
                          style={{
                            background: "white",
                            width: "100%",
                            padding: "8px",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          {city}
                        </option>
                      );
                    })}
                  </Field>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">
                    Date of Birth
                  </Typography>
                  <Field
                    component={TextInput}
                    placeholder="05-07-1999"
                    type="date"
                    name="dob"
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
                  <Typography variant="uploadFormDark">Bio</Typography>
                  <Field
                    component={TextArea}
                    placeholder="Type here...."
                    type="text"
                    name="bio"
                    onChange={handleChange}
                    style={{
                      maxWidth: "828px",
                      padding: "19px 24px",
                      margin: "10px 0px",
                      borderRadius: "15px",
                      width: "100%",
                    }}
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

export default PersonalInformation;
