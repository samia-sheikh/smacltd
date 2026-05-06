import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "styled-components";
import SelectCategory from "./Single Components/SelectCategory";
import { Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../../../theme";
import Successful from "../../../globalComponents/Modals/Successful";
import EnterDetails from "./Single Components/EnterDetails";
import UploadPictures from "./Single Components/UploadPictures";
import CourseDetails from "./Single Components/CourseDetails";
import {
  setServiceDetails,
  setServiceImages,
} from "../../../../features/slice/addServiceSlice";
import { useDispatch } from "react-redux";
const StepperContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;
const Step = styled.div`
  display: flex;
  justify-content: start;
  gap: 25px;
`;
const StepLabelContainer = styled.div`
  display: flex;
  justify-content: start;
`;
const StepLabel = styled.div``;
const StepCounter = styled.div``;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isactive || props.$completed ? theme.palette.primary.main : "#ddd"};
  color: ${(props) => (props.$isactive || props.$completed ? "#fff" : "#333")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
  margin-bottom: 70px;
  ${(props) => (props.$isactive ? `` : null)};
`;
const StepNumberContainer = styled.div`
  @media (max-width: 375px) {
    display: none;
  }
`;
const StepContent = styled.div`
  width: 100%;
`;

const steps = [
  {
    label: "What kind of Course you want to add?",
  },
  {
    label: "Upload and attach files",
  },
  {
    label: "Details",
  },
  {
    label: "Course Details",
  },
];
export default function AddCourse({addNewCourse, open, setOpen }) {
  const [activeStep, setActiveStep] = useState(0);
  const [complete, setComplete] = useState([]);
  const lastStep = steps.length;

  const handleDone = () => {
    setTimeout(() => {
      setActiveStep(0);
      setComplete([]);
    }, 500);
    setOpen(!open);
  };
  const dialogStyles = {
    "& .MuiDialog-container": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px", // Remove container padding if necessary
    },
    "& .MuiDialog-paper": {
      width: "100%", // Ensures full width of the modal
      maxWidth: "980px", // Sets max width to 980px
      padding: "30px", // Applies the desired padding
      margin: "0", // Remove any margins
      borderRadius: "16px", // Border radius if needed
      boxSizing: "border-box", // Ensures padding is inside the width
    },
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setServiceDetails({ service: null }));
    dispatch(setServiceImages({ service: null }));
    setOpen(!open);
    setActiveStep(0);
  };

  const [courseImages, setCourseImages] = useState({});

  return (
    <>
      <Dialog
        sx={{
          ...dialogStyles,
        }}
        open={open}
        onClose={() => setOpen(!open)}
      >
        <Box>
          <IconButton
            onClick={handleClose}
            sx={{
              color: "black",
              width: "40px",
              marginBottom: "20px",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box>
            <StepperContainer>
              {activeStep === lastStep ? null : (
                <StepLabelContainer>
                  <StepCounter>
                    <Typography variant="h5" sx={{ maxWidth: "47px" }}>
                      Step {activeStep + 1}
                    </Typography>
                  </StepCounter>
                  {steps.map((step, index) => (
                    <StepLabel key={index}>
                      {activeStep === index ? (
                        <Typography
                          variant="black24"
                          sx={{ marginLeft: "27px" }}
                        >
                          {step.label}
                        </Typography>
                      ) : null}
                    </StepLabel>
                  ))}
                </StepLabelContainer>
              )}
              <Step>
                {activeStep === lastStep - 1 ||
                activeStep === lastStep ? null : (
                  <StepNumberContainer>
                    {steps.map((step, index) => (
                      <StepNumber
                        key={index}
                        $isactive={index === activeStep ? true : false}
                        $completed={complete.includes(index) ? true : false}
                      >
                        {index + 1}
                      </StepNumber>
                    ))}
                  </StepNumberContainer>
                )}
                <StepContent>
                  {activeStep === 0 ? (
                    <SelectCategory
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                    />
                  ) : activeStep === 1 ? (
                    <UploadPictures
                      activeStep={activeStep}
                      courseImages={courseImages}
                      setCourseImages={setCourseImages}
                      setActiveStep={setActiveStep}
                    />
                  ) : activeStep === 2 ? (
                    <EnterDetails
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                    />
                  ) : activeStep === 3 ? (
                    <CourseDetails
                     addNewCourse={addNewCourse} 
                      courseImages={courseImages}
                      activeStep={activeStep}
                      setCourseImages={setCourseImages}
                      setActiveStep={setActiveStep}
                    />
                  ) : (
                    <>
                      <Successful
                        text={"Congratulations! your Courses are listed successfully"}
                      />
                    </>
                  )}
                </StepContent>
              </Step>
            </StepperContainer>
            <Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== lastStep ? null : (
                    <Box sx={{ width: "100%" }}>
                      <Button
                        variant="contained"
                        onClick={handleDone}
                        sx={{ width: "90%", color: "white", margin: "0 auto" }}
                      >
                        Done
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
