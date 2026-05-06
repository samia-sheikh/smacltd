import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
// import { intrests } from "../../../components/data";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import useFetch from "../../../features/hooks/useFetch";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import NewAutoComplete from "../../../components/globalComponents/global_inputs/NewAutoComplete";
import MultipleSelect from "../../../components/globalComponents/global_inputs/MultipleSelectInput";
import {
  setCurrentUserInterests,
  setUserInterests,
} from "../../../features/slice/autoCompleteSlice";
import {
  countryList,
  genderList,
  languageList,
} from "../../../components/dummyModalData";
import Layout from "../../../components/globalComponents/Layout/Layout";

const AdditionalDetails = () => {
  const { loading, putData, fetchData } = useFetch();
  const { userInterests, currentUserInterests } = useSelector(
    (state) => state.autoComplete
  );
  const [country, setCountryData] = useState(
    countryList[0]?.countryName || null
  );
  const [gender, setGender] = useState(genderList[0]?.genderName || null);
  const [language, setLanguage] = useState(
    languageList[0]?.languageName || null
  );
  const [userCountry, setUserCountry] = useState({});
  const [userLanguage, setUserLanguage] = useState({});
  const [userGender, setUserGender] = useState({});
  const [intrestsArray, setIntrestsArray] = useState([]);
  const [selectedUserIntrests, setSelectedUserIntrests] = useState([]);
  const initialValues = {
    country: country,
    language: language,
    gender: gender,
  };

  const validationSchema = Yup.object().shape({
    country: Yup.string().max(
      16,
      "length must be less than or equal to 16 characters long"
    ),
  });

  let dispatch = useDispatch();
  const getAdditionalDetails = () => {
    fetchData("/api/user/user-extradetails", undefined, (res) => {
      //console.log(res);
      let country = setCountryFun(res);
      let language = setUserLanguageFun(res);
      let gender = setUserGenderFun(res);
      setUserCountry(country);
      setUserLanguage(language);
      setUserGender(gender);
      setSelectedUserIntrests(res?.userDetails?.interests);
    });
    fetchData("/api/interest", undefined, (res) => {
      setIntrestsArray(res?.data);
      //console.log(res?.data);
    });
  };

  function setCountryFun(res) {
    let element;
    for (let index = 0; index < countryList.length; index++) {
      if (countryList[index].countryName === res?.data?.country) {
        element = countryList[index];
      }
    }
    //console.log(element, "user country");
    return element;
  }
  function setUserLanguageFun(res) {
    let element;
    for (let index = 0; index < languageList.length; index++) {
      if (languageList[index].languageName === res?.data?.language) {
        element = languageList[index];
      }
    }
    //console.log(element, "user lan");
    return element;
  }
  function setUserGenderFun(res) {
    let element;
    for (let index = 0; index < genderList.length; index++) {
      if (genderList[index].genderName === res?.data?.gender) {
        element = genderList[index];
      }
    }
    //console.log(element, "user gender");
    return element;
  }
  const onSubmit = async (values, { resetForm }) => {
    let interets = [];
    for (let index = 0; index < userInterests?.length; index++) {
      interets.push(userInterests[index]?.id);
    }

    let payload = {
      country: country,
      language: language,
      gender: gender,
      interests: interets,
    };

    putData(
      "/api/user/update-details",
      payload,
      undefined,
      (res) => {
        //console.log(res);

        dispatch(setUserInterests({ userInterests: [] }));
        dispatch(
          setCurrentUserInterests({
            currentUserInterests: res?.data?.interests,
          })
        );
      },
      false
    );
    resetForm();
  };
  useEffect(() => {
    getAdditionalDetails();
    // dispatch(setUserInterests({ userInterests: userIntrests }));
  }, []);
  // useEffect(() => {
  //   add
  // }, [userInterests]);

  return (
    <Layout title={"Additional Details | SMAC"}>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          style={{ height: "100%" }}
        >
          <Form>
            <Box sx={{ gap: "16px", my: 12 }}>
              {userCountry?.countryName && (
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">Country</Typography>
                  <Autocomplete
                    options={countryList}
                    sx={{ border: "none" }}
                    getOptionLabel={(option) => option.countryName}
                    defaultValue={userCountry}
                    isOptionEqualToValue={(o, v) => o.id === v.id}
                    onChange={(e, value) => {
                      setCountryData(value ? value.countryName : null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select a Country"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              )}
              {userLanguage?.languageName && (
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">Language</Typography>
                  <Autocomplete
                    options={languageList}
                    sx={{ border: "none" }}
                    getOptionLabel={(option) => option.languageName}
                    defaultValue={userLanguage}
                    onChange={(e, value) => {
                      setLanguage(value ? value.languageName : null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select a Language"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              )}
              {userGender?.genderName && (
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">Gender</Typography>
                  <Autocomplete
                    options={genderList}
                    sx={{ border: "none" }}
                    getOptionLabel={(option) => option.genderName}
                    defaultValue={userGender}
                    onChange={(e, value) => {
                      setGender(value ? value.genderName : null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select a Gender"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              )}

              {currentUserInterests?.length >= 0 && (
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "828px",
                    padding: "19px 24px",
                  }}
                >
                  <Typography variant="uploadFormDark">Interests</Typography>

                  <MultipleSelect
                    sx={{ backgroundColor: "green" }}
                    placeholder={"Hashtags"}
                    dataArray={intrestsArray}
                    name="interests"
                    defaltValue={
                      currentUserInterests ? [...currentUserInterests] : []
                    }
                    optionLabel={(option) => option.name}
                  />
                </Box>
              )}
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

export default AdditionalDetails;
