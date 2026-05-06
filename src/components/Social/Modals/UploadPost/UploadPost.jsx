import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ImageComp from "../../../globalComponents/ImageComp";
import ButtonComp from "../../../globalComponents/ButtonComp";
import TextArea from "../../../globalComponents/global_inputs/TextArea";
import { useImagePreview } from "../../../../features/hooks/useImagePreview";
import useFetch from "../../../../features/hooks/useFetch";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import MultipleSelect from "../../../globalComponents/global_inputs/MultipleSelectInput";
// import { intrests } from "../../../data";
import { setPostInterests } from "../../../../features/slice/autoCompleteSlice";
import { useDispatch } from "react-redux";
import Loader from "../../../globalComponents/loader";
// import DragAndDrop from "../../../globalComponents/global_inputs/DragAndDrop";
import theme from "../../../../theme";
import ProfilePicture from "../../../globalComponents/ProfilePicture";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  overflow: "scroll",
  "& .MuiDialog-container": {
    padding: "30px 0px 30px 0px",
    margin: 0,
    minHeight: "max-content",
  },
  "& .MuiDialog-paper": {
    margin: 0,
    height: "auto",

    // overflow: "scroll"
  },
  "& .css-fjx642-MuiPaper-root-MuiDialog-paper": {
    maxHeight: "max-content",
  },
  "@media(max-width:420px)": {
    "& .css-hz1bth-MuiDialog-container": {
      padding: "15px",
      "& .css-fzk8t3-MuiPaper-root-MuiDialog-paper": {
        padding: "15px",
      },
    },
  },
}));

const dialogStyles = {
  // "& .css-hz1bth-MuiDialog-container": {
  //   width: "100%",
  //   padding: "30px",
  //   margin: 0,
  //   "& .css-fzk8t3-MuiPaper-root-MuiDialog-paper": {
  //     // padding: "35px !important",
  //     width: "100%",
  //     padding: "30px",
  //     margin: 0,
  //     // maxWidth: activeStep === lastStep ? "540px" : "980px",
  //     borderRadius: "16px",
  //   },
  // },
};

const UploadPost = ({ style, cb }) => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);
  const [text, setText] = useState("");
  const [postPic, setPostPic] = useState(null);
  const [interests, setInterests] = useState(null);
  // intrests
  const [postContent, setPostContent] = useState({
    images: "",
    postText: "",
    interests: [],
  });
  const postPicPreview = useImagePreview(postPic);
  const userName = user?.firstName + " " + user?.lastName;
  const { loading, postData } = useFetch();
  //these are the values of intrests which user will enter
  const { postInterests } = useSelector((state) => state.autoComplete);
  const { fetchData } = useFetch();
  const dispatch = useDispatch();
  const proceed = (values) => {
    // //console.log(postInterests, "auto complete array");
    if (postInterests) {
      if (postPic || values.post) {
        setText(values.post);
        setData(!data);
        let image = postPic ? postPic : null;
        let post = values.post;
        let intrestIds = [];
        for (let index = 0; index < postInterests?.length; index++) {
          intrestIds.push(postInterests[index].id);
        }
        //console.log(intrestIds, "intrests ids");
        // //console.log();
        setPostContent({
          interests: intrestIds,
          images: image,
          postText: post,
        });
      } else {
        //console.log("both img and text need to be selected");
      }
    }
  };

  //function to get all Intrests
  const getAllIntrests = async () => {
    await fetchData("/api/interest", undefined, (res) => {
      if (res?.data.length > 0) {
        // let element = [];
        // for (let index = 0; index < res?.data.length; index++) {
        //   element.push(res?.data[index].name);
        // }
        if (res?.data) setInterests(res?.data);
      }
    });
  };
  const onSubmit = () => {
    if (postPic || text) {
      postData(
        "/api/user/post",
        postContent,
        undefined,
        undefined,
        true,
        (res) => {
          if (!loading) {
            setOpen(false);
            setPostContent({ images: "", postText: "", interests: [] });
            setPostPic(null);
            setText("");
            setData(false);
            cb(res);
            dispatch(setPostInterests({ postInterests: null }));
          }
        }
      );
    } else {
      console.error("No image selected");
    }
  };

  const validationSchema = Yup.object().shape({
    post: Yup.string()
      .min(3, "Post description must contain minimum 3 characters")
      .max(250, "Post description should be less than 250 characters.")
      .required("Post description is required")
      .matches(
        /^[^\s][a-zA-Z0-9\s!@#$%^&*()_+=[\]{}|;:'",.<>/?\\-]*$/
,
        "Consecutive white spaces are not allowed"
      ),
    image: Yup.mixed().test(
      "fileFormat",
      "Only PNG, JPG, WEBP, JPEG and SVG files are allowed",
      (value) => {
        if (postPicPreview === null) {
          //console.log(value, "from upload post file valuve");
          !value ||
            [
              "image/webp",
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/svg",
            ].includes(value.type);
        } else {
          return true;
        }
      }
    ),
    // .test(
    //   "isBlob",
    //   "The file must be a blob",
    //   (value) => value instanceof Blob
    // ),
  });

  const handleFileChange = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage) {
      // //console.log("post pic is selected");
      setPostPic(selectedImage);
      // //console.log("post text: ", text);
    }
  };

  // const handlePaste = (e) => {
  //   e.preventDefault();
  // };

  const handleBack = () => {
    setData(!data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData(false);
    setPostPic(null);
    setText("");
    dispatch(setPostInterests({ postInterests: null }));
  };

  let initialValues = {
    // interests: postInterests || null,
    post: text,
    image: postPicPreview,
  };
  // drag drop file component

  // drag state

  // ref
  const inputRef = React.useRef(null);

  const handleDelete = (e) => {
    if (postPicPreview) {
      // let newFilteredArray = [];
      // newFilteredArray = postPic.filter((item) => item.name !== e.name);
      // setPostPic(newFilteredArray);
      setPostPic(null);
    }
  };
  useEffect(() => {
    getAllIntrests();
  }, []);

  return (
    <div style={{ ...style }}>
      <Button
        onClick={handleClickOpen}
        sx={{
          display: "flex",
          gap: "8px",
          fontWeight: "bolder",
          background: "#14B8A6",
          color: "#ffffff",
          padding: "10px 20px",

          transition: "background-color 0.3s ease, transform 0.3s ease", // Add transition here
          "&:hover": {
            backgroundColor: "#099e8e",
            transform: "scale(1.1)",
          },
        }}
      >
        <Typography variant="subtitle1">Post</Typography>
        <AddRoundedIcon />
      </Button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        // maxWidth={false} // Ensure maxWidth is not applied
        // fullWidth // Apply full width to the modal
        sx={{
          ".MuiDialog-paper": {
            width: "100% !important",
            maxWidth: "546px !important",
            padding: "15px !important",
          },
        }}
      >
        <Box sx={{}}>
          {data ? (
            <IconButton
              aria-label="close"
              onClick={handleBack}
              sx={{
                color: "black",
                padding: "0px !important",
                "&:hover": {},
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          ) : (
            <>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  color: "black",
                  padding: "10px !important",
                  "&:hover": {},
                }}
              >
                <CloseIcon
                  sx={{
                    "@media(max-width:420px)": {
                      position: "relative",

                      // left: "-36px",
                      // bottom: "8px",
                    },
                  }}
                />
              </IconButton>
            </>
          )}
        </Box>

        <DialogContent
          dividers
          sx={{
            border: "none",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "0px 10px 10px 10px !important",

            "@media(max-width:420px)": {
              padding: "0px",
            },
            ...dialogStyles,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <ProfilePicture
                src={user?.profilePic}
                firstName={user?.firstName}
              />
              <Typography
                variant="uploadForm"
                sx={{ textTransform: "capitalize" }}
              >
                {userName}
              </Typography>
            </Box>
            {data ? (
              <Box
                sx={{
                  marginTop: "16px",
                  width: "100%",
                  // maxWidth: "497px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    border: "1px solid #00000040",
                    padding: "8px",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 15px 0.5px #00000040",
                    width: "100%",
                    // width: "calc(100% - 25px)",
                  }}
                >
                  {postInterests?.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          backgroundColor: "#F1F1F1",

                          width: "max-content",
                          padding: "6px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        <Typography variant="h5BlackBold">
                          {item.name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
                <Typography sx={{ wordBreak: "break-all" }}>{text}</Typography>
                <Box sx={{ width: "100%", maxWidth: "497px" }}>
                  <ImageComp
                    src={postPicPreview}
                    sx={{ width: "inherit", objectFit: "cover" }}
                  />
                </Box>
                <Box
                  sx={{
                    width: `calc(100% - 28px)`,
                    height: "46px",
                    margin: "0 auto",
                  }}
                >
                  <ButtonComp
                    label={"Post"}
                    disabled={loading}
                    click={onSubmit}
                    icon={loading ? <Loader /> : null}
                  />
                </Box>
              </Box>
            ) : (
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={proceed}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Box
                        sx={{
                          margin: "8px 0px 10px 0px",
                        }}
                      >
                        <MultipleSelect
                          placeholder={"Hashtags*"}
                          dataArray={interests ? interests : null}
                          name="uploadPost"
                          defaltValue={postInterests ? [...postInterests] : []}
                          optionLabel={(option) => option.name}
                        />
                      </Box>
                      <Box
                        sx={{
                          border: "1px solid #D3D3D3",
                          borderRadius: "8px",
                        }}
                      >
                        <Field
                          type="text"
                          label="post"
                          name="post"
                          component={TextArea}
                          placeholder="Type here you want..."
                          style={{
                            padding: "15px",
                            borderRadius: "10px",
                            width: "100%",
                            border: "none",
                          }}
                          // onPaste={handlePaste}
                        />
                      </Box>

                      <input
                        ref={inputRef}
                        type="file"
                        name="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="postImg-upload"
                        onChange={(e) => {
                          handleFileChange(e);
                          setFieldValue("image", e.target.files[0]);
                        }}
                      />
                      {/* <DragAndDrop
                        onFilesSelected={setFiles}
                        width="300px"
                        height="400px"
                      /> */}
                      <label htmlFor="postImg-upload">
                        {!postPicPreview && (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "12px 0px",
                                border: `1px dashed ${theme.palette.primary.main}`,
                                borderRadius: "12px",
                                padding: "16px 0px",
                                // color:theme.palette.primary.main
                              }}
                            >
                              <Box
                                sx={{
                                  width: "80px",
                                  height: "80px",
                                  background: `rgba(20, 184, 166,0.08)`,
                                  // opacity: "0.08",
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
                                    // opacity: "0.16 !important",
                                    borderRadius: "50%",
                                    background: `rgba(20, 184, 166,0.16)`,
                                    //   background: `${theme.palette.primary.main}`,
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
                              <Typography variant="uploadForm">
                                Add Your Image
                              </Typography>
                              <Typography variant="h5">
                                Share what you're working on.
                              </Typography>
                            </Box>
                          </>
                        )}
                      </label>

                      {/* image rendering */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          maxWidth: "100%",
                        }}
                      >
                        {postPicPreview && (
                          <Box sx={{ position: "relative" }}>
                            <ImageComp
                              style={{
                                width: "100%",
                                height: "250px",
                                borderRadius: "15px",
                                objectFit: "contain",
                              }}
                              src={postPicPreview}
                            />
                            <IconButton
                              onClick={(e) => handleDelete(e)}
                              sx={{
                                color: "black",
                                width: "20.28px",
                                height: "20.28px",
                                marginBottom: "20 px",
                                position: "absolute",
                                top: "10px",
                                right: "10px",

                                padding: "2px",
                              }}
                            >
                              <CloseIcon
                                sx={{
                                  color: "black",
                                  height: "15px",
                                  width: "15px",
                                }}
                              />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                      <ErrorMessage
                        name="image"
                        component="span"
                        style={{ color: "red", fontSize: "12px" }}
                      />
                      <Box
                        sx={{
                          width: `calc(100% - 28px)`,
                          height: "46px",
                          margin: "0 auto",
                        }}
                      >
                        <ButtonComp
                          label={"Proceed Next"}
                          type={"submit"}
                          disabled={loading}
                        />
                      </Box>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default UploadPost;
