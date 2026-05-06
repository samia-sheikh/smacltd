import { Box, Typography, Button } from "@mui/material";
import React from "react";
import ImageComp from "../../../../globalComponents/ImageComp";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../../features/hooks/useFetch";
import Loader from "../../../../globalComponents/loader";
// import { clearAddUserService } from "../../../../../features/slice/addUserServiceSlice";
import { setServiceDetails } from "../../../../../features/slice/addServiceSlice";

const ServiceDetails = ({
  activeStep,
  setActiveStep,
  serviceImages,
  setServiceImages,
  addNewUserService,
  // setOpen
}) => {
  const { userServiceDetails } = useSelector((state) => state.addUserService);
  const { loading, postData } = useFetch();
  let dispatch = useDispatch();
  // handler for back in  stepper/multistate
  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };
  //add product function
  //console.log(userServiceDetails);
  //   const handleAddUserService = () => {
  //     let subCat = userServiceDetails.subCategories.map((c) => {
  //       // return c.title;
  //       return c;
  //     });
  //     let selectedItemId = [];
  //     for (
  //       let index = 0;
  //       index < userServiceDetails?.subCategories?.length;
  //       index++
  //     ) {
  //       selectedItemId.push(userServiceDetails?.subCategories[index].id);
  //     }

  //     // formate payload as required
  //     let payload = {
  //       ...userServiceDetails,
  //       images: serviceImages,
  //       subCategories: selectedItemId,
  //       parentCategory: userServiceDetails?.parentCategory?.serviceParentCategoryId,
  //     };
  // //console.log(payload,"payload");

  //     if (serviceImages?.length && userServiceDetails) {
  //       postData("/api/service", payload, undefined, undefined, true, (res) => {
  //         //reset redux after adding product
  //         //console.log(res,"response");
  //         addNewUserService(res.data);
  //         // setNewProduct(res.data);
  //         dispatch(setServiceDetails({ userService: null }));
  //         dispatch(setServiceImages({ userService: null }));
  //         setActiveStep(0); // Reset stepper to initial state

  //         // Close the modal
  //         setOpen(false);
  //       });
  //     }
  //   };
  const handleAddUserService = () => {
    let selectedItemId =
      userServiceDetails?.subCategories?.map((c) => c.id) || [];

    let payload = {
      ...userServiceDetails,
      images: serviceImages,
      subCategories: selectedItemId,
      parentCategory:
        userServiceDetails?.parentCategory?.serviceParentCategoryId,
    };

    if (serviceImages?.length && userServiceDetails) {
      postData("/api/service", payload, undefined, undefined, true, (res) => {
        // //console.log("resssssssss", res);
        addNewUserService(res.data);
        // Dispatch actions to clear Redux
        dispatch(setServiceDetails({ userService: null }));
        // here i use the setServiceImages to set the state of images null bcz of the serviceImages is an array of images and when we add the service we need to set the state
        setServiceImages("");
        setActiveStep((prevActiveStep) => {
          return prevActiveStep + 1;
        });
      });
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "13.5px", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <CollectionsOutlinedIcon sx={{ color: "#0FA5E9" }} />
        {serviceImages?.length > 0 && (
          <Typography variant="h5">
            {serviceImages?.length + " "}
            {`${serviceImages?.length === 1 ? "Picture" : "Pictures"}`} to
            upload
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {serviceImages?.length &&
          Object.keys(serviceImages).map((key) => {
            if (key !== "length") {
              const fileObject = serviceImages[key];
              return (
                <ImageComp
                  key={key}
                  src={URL.createObjectURL(fileObject)}
                  sx={{
                    width: "256px",
                    height: "152px",
                    borderRadius: "8px",
                    obectFit: "contain",
                  }}
                />
              );
            }
            return null;
          })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          wordBreak: "break-all",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "8px",
            maxWidth: "100%",
          }}
        >
          <Typography
            variant="subHeaderBlack"
            sx={{ width: "100%", maxWidth: "43px" }}
          >
            Title
          </Typography>
          <Typography variant="subHeader">
            {userServiceDetails?.title}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "8px",

            maxWidth: "100%",
          }}
        >
          <Typography variant="subHeaderBlack">Product Price:</Typography>
          <Typography variant="subHeader">
            {userServiceDetails?.serviceFee}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "8px",
            "@media(max-width:420px)": {
              flexDirection: "column",
            },
          }}
        >
          <Typography
            variant="subHeaderBlack"
            sx={{ width: "100%", maxWidth: "105px" }}
          >
            Description:
          </Typography>
          <Typography
            variant="subHeader"
            sx={{ width: "100%", wordBreak: "break-all" }}
          >
            {userServiceDetails?.description}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => handleBack(activeStep)}
          sx={{ padding: "12px 40px", fontSize: "16px" }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleAddUserService}
          sx={{ padding: "12px 40px", fontSize: "16px" }}
          disabled={loading}
        >
          Add Now {loading ? <Loader /> : null}
        </Button>
      </Box>
    </Box>
  );
};
export default ServiceDetails;
