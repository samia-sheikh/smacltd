import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Dialog from "@mui/material/Dialog";
import "./muiStateStyles.css";
import ButtonComp from "../../../globalComponents/ButtonComp";
import LanguageAndCountry from "./LanguageAndCountry";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Gender from "./Gender";
import Intrests from "./Intrests";
import useFetch from "../../../../features/hooks/useFetch";
import useGetAPI from "../../../../features/hooks/useGetAPI";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setCountry,
  setGender,
  setInterests,
  setInterestsArray,
  setLanguage,
} from "../../../../features/slice/Social/multiStateUserIntrestsSlice";
const steps = [
  { id: "1", data: "" },
  { id: "2", data: "" },
  { id: "3", data: "" },
];
const MultiStateUserIntrests = () => {
  const { postData } = useFetch();
  const { getData } = useGetAPI();
  let interestStr = [];

  //modal functions
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { gender, interest, country, language } = useSelector(
    (state) => state.multiStateUserIntrests
  );
  // THIS IS FOR CHECK THE USER-DETAILS IS AVAILABLE OR NOT......
  useEffect(() => {
    getData("/api/interest", (res) => {
      dispatch(setInterestsArray({ data: res?.data }));
      //console.log(res, "else");
    });
    getData("/api/user/user-extradetails", (data) => {
      // //console.log(data, "data in the MultiStateUser");
      if (data?.data) {
        setOpen(false);
        // getData("/api/interest", (res) => {
        //   // //console.log(res, "interests from model");
        //   dispatch(setInterestsArray({ data: res?.data }));
        // });
      } else {
        setOpen(true);
      }
    });
  }, []);
  const formValue = { language: language, country: country, gender: gender };
  // steper functions
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    //console.log(newActiveStep, "active step");
  };

  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => {
      delete completed[activeStep - 1];
      setCompleted(completed);
      //console.log(completed, "completed");
      return prevActiveStep - 1;
    });
  };

  // const handleStep = (step) => () => {
  //   setActiveStep(step);
  //   const newCompleted = completed;
  //   newCompleted[step] = true;
  //   //console.log(newCompleted, "data of the PopUp");
  //   setCompleted(newCompleted);
  // };

  const handleComplete = () => {
    if (activeStep === 2 && interest?.length === 0) {
      // If it's the interest step and interest is empty, prevent advancing
      return;
    }
    // //console.log(completed, "completed");
    if (Object.keys(completed).length === 2) {
      for (let index = 0; index < interest?.length; index++) {
        const element = interest[index];
        interestStr.push(element.id);
      }
      //console.log(interest);
      formValue.interests = interestStr;
      // end Point add-details
      postData("/api/user/add-details", formValue);
    }

    const newCompleted = completed;
    newCompleted[activeStep] = true;
    // //console.log(newCompleted, "data of the PopUp");
    setCompleted(newCompleted);
    handleNext();
    if (activeStep === totalSteps() - 1) {
      dispatch(setLanguage({ data: null }));
      dispatch(setInterests({ data: null }));
      dispatch(setCountry({ data: null }));
      dispatch(setGender({ data: null }));
      setOpen(false);
    }
  };

  // const dialogStyles = {
  //   "& .css-hz1bth-MuiDialog-container": {
  //     width: "100%",
  //     padding: "30px",
  //     margin: 0,
  //     // background: "green",
  //     "& .css-fzk8t3-MuiPaper-root-MuiDialog-paper": {
  //       // background: "red",
  //       // padding: "35px !important",
  //       width: "100%",
  //       // maxWidth: `1110px`,
  //       maxWidth: `${activeStep === 2 ? "1110px" : "450px"}`,
  //       padding: "30px",
  //       margin: 0,
  //       // maxWidth: activeStep === lastStep ? "540px" : "980px",
  //       borderRadius: "16px",
  //     },
  //   },
  // };
  const dialogStyles = {
    "& .MuiDialog-container": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px", // Remove container padding if necessary
    },
    "& .MuiDialog-paper": {
      width: "100%", // Ensures full width of the modal
      maxWidth: `${activeStep === 2 ? "1110px" : "450px"}`,
      padding: "30px", // Applies the desired padding
      margin: "0", // Remove any margins
      borderRadius: "16px", // Border radius if needed
      boxSizing: "border-box", // Ensures padding is inside the width
    },
  };
  return (
    <>
      <Dialog open={open} sx={{ ...dialogStyles }}>
        <Box>
          <KeyboardBackspaceIcon
            onClick={handleBack}
            disabled={activeStep === 0 ? true : false}
            sx={{
              display: `${activeStep === 0 ? "none" : "block"}`,
              width: "30px",
              mr: "2px",
            }}
          />

          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step
                key={label.id}
                completed={completed[index]}
                sx={{ padding: "0px", margin: "0" }}
              >
                <StepButton
                  color="inherit"
                  // onClick={handleStep(index)}
                  sx={{ padding: "0px", margin: "0" }}
                ></StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            <>
              <Box
                sx={{
                  height: "auto",
                }}
              >
                {activeStep === 0 ? (
                  <LanguageAndCountry />
                ) : activeStep === 1 ? (
                  <Gender />
                ) : (
                  <Intrests />
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <ButtonComp
                  click={handleComplete}
                  label={activeStep < totalSteps() - 1 ? "Next" : "Finish"}
                  disabled={
                    activeStep < totalSteps() - 1 && interestStr?.length > 0
                      ? true
                      : false
                  }
                ></ButtonComp>
              </Box>
            </>
          </div>
        </Box>
      </Dialog>
    </>
  );
};
export default MultiStateUserIntrests;
