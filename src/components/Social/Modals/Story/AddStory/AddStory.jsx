import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import ButtonComp from "../../../../globalComponents/ButtonComp";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import useFetch from "../../../../../features/hooks/useFetch";
import { useImagePreview } from "../../../../../features/hooks/useImagePreview";
import theme from "../../../../../theme";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    margin: "0px !important",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const AddStory = ({ style, setOpen, open }) => {
  const [file, setFile] = useState(null);
  const imagePreview = useImagePreview(file);

  const { loading, postData } = useFetch();

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setFile(selectedImage);
  };

  const handleStory = () => {
    // handle form submission logic here
    // e.preventDefault();
    // //console.log(file, "image file");
    let formData = new FormData();
    if (file) {
      formData.append("storyPic", file);

      // post story image
      postData("/api/user/story", formData, undefined, undefined, true, () => {
        setOpen(false);
        setFile(null);
      });
    } else {
      console.error("No image selected");
    }
  };

  // delete image
  const removeImage = () => {
    setFile("");
    // //console.log(imagePreview);
    // //console.log("null");
  };

  const handleClose = () => {
    setOpen(false);
    // //console.log("clicked close", open);
  };

  const formik = useFormik({
    initialValues: {
      image: imagePreview,
    },
  });

  return (
    <div style={{ borderRadius: "16px", ...style }}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open ? open : false}
        style={{
          borderRadius: "16px",
          width: "100%",
          maxWidth: "540px",
          margin: "0 auto",
        }}
      >
        {imagePreview ? (
          <>
            <Formik
              initialValues={formik.initialValues}
              onSubmit={formik.onSubmit}
              enableReinitialize={true}
              style={{ background: "yellow" }}
            >
              <Form onSubmit={handleStory}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    padding: "24px",
                    width: "100%",
                    maxWidth: "546px",
                    minWidth: "290px",
                    height: "728px",
                    margin: "0 !important",
                  }}
                >
                  <Box
                    sx={{
                      width: "498px",
                      height: "617px",
                      backgroundImage: `url(${imagePreview})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100%",
                      objectFit: "cover",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "16px",
                      }}
                    >
                      {/* name to be changes to user name and also to the avtar*/}
                      <Avatar src={`user.image`} />
                      {/*chanhe  this text to username */}
                      <Typography variant="editPicButton">
                        Robert Fin
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "16px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <ButtonComp
                      label={"Cancel"}
                      click={removeImage}
                      customStyles={{
                        background: "inherit",
                        color: "gray",
                        fontWeight: "400",
                        border: "none",
                        width: "70px !important",
                        height: "56px",
                      }}
                      customHover={{
                        border: "none",
                      }}
                    />
                    <ButtonComp
                      type={"submit"}
                      label={"Post"}
                      customStyles={{
                        width: "100px !important",
                        height: "56px",
                      }}
                      customHover={{
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                      }}
                      // onClick={handleStory}
                      disabled={loading}
                    />
                  </Box>
                </Box>
              </Form>
            </Formik>
          </>
        ) : (
          <>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                left: "25px",
                color: "black",
                width: "40px",
                "&:hover": {},
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent
              dividers
              sx={{
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "30px",
                padding: "60px 30px",
                margin: "0px !important",
              }}
            >
              <Box sx={{ margin: "0px !important" }}>
                <Formik
                  initialValues={formik.initialValues}
                  onSubmit={formik.onSubmit}
                  enableReinitialize={true}
                >
                  <Form>
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="image-upload">
                      <Box>
                        <CloudUploadRoundedIcon
                          sx={{
                            width: "64px",
                            height: "64px",
                            color: "#868686",
                          }}
                        />
                      </Box>
                    </label>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "24px",
                        }}
                      >
                        <Typography>Add Your Image</Typography>
                        <Typography>
                          Quickly share what you're working on. Work in Progress
                          segments expire in 24 hours.
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "24px",
                      }}
                    >
                      <ButtonComp
                        label={"Upload Image"}
                        type={"submit"}
                        customStyles={{
                          width: "100%",
                          maxWidth: "230px",
                          height: "50px",
                          fontWeight: 400,
                        }}
                        disabled={loading}
                      />
                    </Box>
                  </Form>
                </Formik>
              </Box>
            </DialogContent>
          </>
        )}
      </BootstrapDialog>
    </div>
  );
};

export default AddStory;
// {imagePreview && (
//   <>
//     <Box>
//       <Box
//         sx={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "flex-end",
//         }}
//       >
//         <Typography
//           sx={{ cursor: "pointer" }}
//           onClick={removeImage}
//         >
//           X
//         </Typography>
//       </Box>
//       <ImageComp
//         style={{
//           width: "100%",
//           maxWidth: "200px",
//           height: "150px",
//         }}
//         src={imagePreview}
//       />
//     </Box>
//   </>
// )}
