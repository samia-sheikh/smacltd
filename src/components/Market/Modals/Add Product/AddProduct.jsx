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
import ProductDetails from "./Single Components/ProductDetails";
import { useDispatch } from "react-redux";
import {
  setProductDetails,
  setProductImages,
} from "../../../../features/slice/addProductSlice";
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
    label: "What kind of product you want to add?",
  },
  {
    label: "Upload product photos",
  },
  {
    label: "Details",
  },
  {
    label: "Product details",
  },
];
export default function AddProduct({ setNewProduct, open, setOpen }) {
  const [activeStep, setActiveStep] = useState(0);
  const [complete, setComplete] = useState([]);

  const lastStep = steps.length;
  // const handleNext = (e) => {
  //   setActiveStep((prevActiveStep) => {
  //     //console.log(prevActiveStep + 1);

  //     return prevActiveStep + 1;
  //   });
  //   setComplete(() => {
  //     let newCompleteobj = new Set([...complete, e]);
  //     let newCompleteAray = [...newCompleteobj];
  //     // //console.log("completed: ", newCompleteAray);
  //     return newCompleteAray;
  //   });
  //   if (open === false) {
  //     setComplete([]);
  //   }
  // };

  // const handleBack = (e) => {
  //   setActiveStep((prevActiveStep) => {
  //     //console.log(prevActiveStep - 1);
  //     return prevActiveStep - 1;
  //   });
  //   setComplete(() => {
  //     let newCompleteAray = complete.filter((x) => x !== e);
  //     // //console.log("completed: ", newCompleteAray);
  //     return newCompleteAray;
  //   });
  // };
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

  const [marketImages, setMarketImages] = useState({});
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setProductDetails({ product: null }));
    dispatch(setProductImages({ product: null }));
    setMarketImages({});
    setOpen(!open);
    setActiveStep(0);
  };
  return (
    <>
      <Dialog
        sx={{
          // width: "100%",
          // maxWidth:"980px",
          // margin: "0 auto",
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
                          sx={{ marginLeft: "30px" }}
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
                      setActiveStep={setActiveStep}
                      marketImages={marketImages}
                      setMarketImages={setMarketImages}
                    />
                  ) : activeStep === 2 ? (
                    <EnterDetails
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                    />
                  ) : activeStep === 3 ? (
                    <ProductDetails
                      setNewProduct={setNewProduct}
                      activeStep={activeStep}
                      marketImages={marketImages}
                      setActiveStep={setActiveStep}
                      setMarketImages={setMarketImages}
                    />
                  ) : (
                    <>
                      <Successful
                        text={
                          "Congratulations! your product is listed successfully"
                        }
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
