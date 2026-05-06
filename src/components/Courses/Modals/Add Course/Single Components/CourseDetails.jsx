import { Box, Typography, Button } from "@mui/material";
import React from "react";
// import ImageComp from "../../../../globalComponents/ImageComp";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  setServiceDetails,
  // setServiceImages,
  // setImageService,
} from "../../../../../features/slice/addServiceSlice";
import useFetch from "../../../../../features/hooks/useFetch";
import Loader from "../../../../globalComponents/loader";
const CourseDetails = ({
  addNewCourse,
  activeStep,
  setActiveStep,
  courseImages,
  setCourseImages,
}) => {
  // let { serviceImages } = useSelector((state) => state.addService);
  const { serviceDetails } = useSelector((state) => state.addService);
  const { loading, postData } = useFetch();
  let dispatch = useDispatch();

  // serviceImages=JSON.parse(serviceImages)
  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };
  let daysLength = serviceDetails?.classDays?.length;

  const handleAddCourse = () => {
    let selectedItemId = [];
    for (
      let index = 0;
      index < serviceDetails?.subCategories?.length;
      index++
    ) {
      selectedItemId.push(serviceDetails?.subCategories[index]?.id);
    }

    let payload = {
      ...serviceDetails,
      images: courseImages,
      parentCategory: serviceDetails?.parentCategory?.courseParentCategoryId,
      subCategories: selectedItemId,
    };

    if (courseImages?.length && serviceDetails) {
      postData("/api/course", payload, undefined, undefined, true, (data) => {
        addNewCourse(data.data);
        dispatch(setServiceDetails({ service: null }));
        // here i use the setServiceImages to set the state of images null bcz of the serviceImages is an array of images and when we add the service we need to set the state
        setCourseImages("");
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
        {courseImages?.length > 0 && (
          <Typography variant="h5">
            {courseImages?.length + " "}
            {`${courseImages?.length === 1 ? "Picture" : "Pictures"}`} to upload
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {
          courseImages?.length &&
            //
            Object.keys(courseImages).map((key) => {
              if (key !== "length") {
                const fileObject = courseImages[key];
                return (
                  <img
                    key={key}
                    src={URL.createObjectURL(fileObject)}
                    alt={fileObject.fileName}
                    style={{ width: "200px", height: "auto" }}
                  />
                );
              }
              return null;
            })

          //
        }
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Box
          sx={{
            // width: "max-content",
            width: "100%",
            display: "flex",
            gap: "8px",
          }}
        >
          <Typography variant="subHeaderBlack">Title</Typography>
          <Typography variant="subHeader" sx={{ wordBreak: "break-all" }}>
            {serviceDetails?.title}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "max-content",
            display: "flex",
            gap: "8px",
          }}
        >
          <Typography variant="subHeaderBlack">Course Type</Typography>
          <Typography variant="subHeader">{serviceDetails?.mode}</Typography>
        </Box>
        <Box
          sx={{
            width: "max-content",
            display: "flex",
            gap: "8px",
          }}
        >
          <Typography variant="subHeaderBlack">Course Duration:</Typography>
          <Typography variant="subHeader">
            {serviceDetails?.courseDuration}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "max-content",
            display: "flex",
            gap: "8px",
          }}
        >
          <Typography variant="subHeaderBlack">Class Days:</Typography>
          <Typography variant="subHeader">
            {serviceDetails?.classDays.map((d, i) => {
              return d + `${daysLength === i ? null : ","}` + " ";
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "max-content",
            display: "flex",
            gap: "8px",
          }}
        >
          <Typography variant="subHeaderBlack">Class Duration:</Typography>
          <Typography variant="subHeader">
            {serviceDetails?.classDuration}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "max-content",
            display: "flex",
            gap: "8px",
          }}
        >
          <Typography variant="subHeaderBlack">Course Fee:</Typography>
          <Typography variant="subHeader">
            {serviceDetails?.courseFee}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            width: "100%",
            maxWidth: "920px",
            "@media(max-width:420px)": {
              flexDirection: "column",
            },
          }}
        >
          <Typography variant="subHeaderBlack">Description:</Typography>
          <Typography variant="subHeader" sx={{ wordBreak: "break-all" }}>
            {serviceDetails?.description}
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
          onClick={handleAddCourse}
          sx={{ padding: "12px 40px", fontSize: "16px", color: "white" }}
          disabled={loading}
        >
          Add Now {loading ? <Loader /> : null}
        </Button>
      </Box>
    </Box>
  );
};

export default CourseDetails;
