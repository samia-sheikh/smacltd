import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import theme from "../../../../../theme";
import ImageComp from "../../../../globalComponents/ImageComp";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserServiceImages } from "../../../../../features/slice/addUserServiceSlice";
const UploadPictures = ({
  activeStep,
  setActiveStep,
  setServiceImages,
  serviceImages,
}) => {
  const [checkLoading, setCheckLoading] = useState(true);
  const dispatch = useDispatch();
  // const handlePicUpload = (e) => {
  //   e.preventDefault();
  //   const { files } = e.target;
  //   const imagesArray = Array.from(files);

  //   if (imagesArray.length > 10) {
  //     toast.error("The maximum limit of adding pictures is 10.");
  //   } else {
  //     const validImages = imagesArray.filter((file) =>
  //       file.type.startsWith("image/")
  //     );
  //     if (validImages.length !== imagesArray.length) {
  //       toast.error("Please select only images.");
  //     }
  //     setServiceImages((prev) =>
  //       Array.isArray(prev) ? [...prev, ...validImages] : [...validImages]
  //     );
  //   }
  // };

  const handlePicUpload = (e) => {
    e.preventDefault();
    const { files } = e.target;
    const imagesArray = Array.from(files);

    if (imagesArray.length > 10) {
      toast.error("The maximum limit of adding pictures is 10.");
    } else {
      const validImages = imagesArray.filter((file) =>
        file.type.startsWith("image/")
      );
      if (validImages.length !== imagesArray.length) {
        toast.error("Please select only images");
      } else {
        setServiceImages((prev) =>
          Array.isArray(prev) ? [...prev, ...validImages] : [...validImages]
        );
      }
    }

    // Reset the file input value
    e.target.value = "";
  };

  const handleDelete = (index) => {
    const updatedImages = serviceImages.filter((_, i) => i !== index);
    setServiceImages(updatedImages);
  };

  const handleNext = (e) => {
    // Optionally, dispatch the images to Redux before moving to the next step
    dispatch(setUserServiceImages({ userService: serviceImages }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };

  useEffect(() => {
    checkLoadingFun();
  }, [serviceImages]);

  const checkLoadingFun = () => {
    if (serviceImages && serviceImages.length === 0) {
      setCheckLoading(true);
    } else {
      setCheckLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Typography variant="h5">
        Upload and attach photos of your Service, maximum 10 photos.
      </Typography>

      <Box>
        <Button
          sx={{
            background: "rgba(20, 184, 166, 0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "8px",
            padding: "5px 10px",
            borderRadius: "16px",
            border: `1px dashed ${theme.palette.primary.main}`,
            width: "100%",
            height: "216px",
          }}
          component="label"
        >
          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={handlePicUpload}
            // ref={fileInputRef} // Set the ref to the input
          />
          <Box
            sx={{
              width: "80px",
              height: "80px",
              background: `rgba(20, 184, 166,0.08)`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: `rgba(20, 184, 166,0.16)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloudUploadOutlinedIcon
                sx={{
                  color: `${theme.palette.primary.main}`,
                  width: "40px",
                  height: "40px",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="uploadPictureBold">Click to upload</Typography>
            <Typography variant="h5" sx={{ ml: "3px" }}>
              or drag and drop photos
            </Typography>
          </Box>
        </Button>
      </Box>

      {serviceImages?.length > 0 && (
        <Typography variant="h5">
          {serviceImages?.length + " "}
          {`${serviceImages?.length === 1 ? "Picture" : "Pictures"}`} to upload
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {serviceImages &&
          serviceImages?.length > 0 &&
          serviceImages?.map((file, index) => (
            <Box
              key={index}
              sx={{
                height: "132px",
                width: "132px",
                borderRadius: "16px",
                border: "1px solid #F1F1F1 ",
                position: "relative",
              }}
            >
              <ImageComp
                src={URL.createObjectURL(file)}
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "10.56px",
                }}
              />
              <IconButton
                onClick={() => handleDelete(index)}
                sx={{
                  color: "black",
                  width: "20.28px",
                  height: "20.28px",
                  marginBottom: "20px",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#323232",
                  padding: "2px",
                }}
              >
                <CloseIcon
                  sx={{ color: "white", height: "15px", width: "15px" }}
                />
              </IconButton>
            </Box>
          ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "24px" }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => handleBack(activeStep)}
          sx={{ padding: "12px 40px", fontSize: "16px" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => handleNext(activeStep)}
          sx={{ padding: "12px 40px", color: "white", fontSize: "16px" }}
          disabled={checkLoading}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UploadPictures;
