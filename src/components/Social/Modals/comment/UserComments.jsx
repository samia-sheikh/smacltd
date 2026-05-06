import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import theme from "../../../../theme";
import useFetch from "../../../../features/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setIsCommentOpen } from "../../../../features/slice/Social/socialModelsSlice";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import TextInput from "../../../globalComponents/global_inputs/TextInput";
import ProfilePicture from "../../../globalComponents/ProfilePicture";
import { setPost } from "../../../../features/slice/postSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("lg")]: {
//       maxWidth: "500px",
//     },
//   },
// }));

const UserComments = ({ updComments }) => {
  let post = useSelector((state) => state.post);
  const [allComments, setAllComments] = useState([]);
  const [commentCount, setCommentsCount] = useState(0);
  const { loading, postData } = useFetch();

  const [postId, setPostId] = useState(null);
  const { isCommentOpen } = useSelector((state) => state.socialModels);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCommentOpen || post.post) {
      //old database scema code
      // setPostId(post?.post?.postID);
      setPostId(post?.post?.postId);
      // //console.log(post?.post?.comments?.comments, "comments");
      setAllComments(post?.post?.comments?.comments || []);
      setCommentsCount(post?.post?.comments?.count || 0);
    }
  }, [isCommentOpen, post]);

  useEffect(() => {
    dispatch(setIsCommentOpen({ data: false }));
  }, []);
  const handleCommentClose = () => {
    dispatch(setIsCommentOpen({ data: !isCommentOpen }));
    let updatedPost = post.post;
    updatedPost = {
      ...updatedPost,
      comments: { comments: allComments, count: allComments.length },
    };
    updComments(updatedPost);
    dispatch(setPost([]));
  };

  const validationSchema = Yup.object().shape({
    userComments: Yup.string()
      .matches(/^(?!\s)(?!.*\s{2,}).*$/, "No consecutive spaces is allowed")
      .required("Comment is required")
      .max(255, "Comment should be less than 255 characters"),
  });

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

  const handleCommentSubmit = (values, { resetForm }) => {
    const { userComments } = values;
    let keys = {
      commentText: userComments,
      postId: postId,
    };
    postData(
      "/api/user/post/comment",
      keys,
      undefined,
      undefined,
      undefined,
      (res) => {
        //console.log(allComments, res, "check data in comments added");
        const updComments = [...allComments, res.data];
        setAllComments(updComments);
        setCommentsCount(commentCount + 1);
        resetForm(); // Clear the form
      }
    );
  };

  return (
    <Dialog
      sx={{ ...dialogStyles }}
      open={isCommentOpen}
      // onClose={handleCommentClose}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            paddingTop: "15px",
            backgroundColor: "white",
            position: "sticky",
            top: "-30px",
            width: "100%",
            marginTop: "-15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderBottom: "1px solid #F1F1F1",
              paddingBottom: "24px",
            }}
          >
            <Typography
              variant="bold24Black"
              sx={{ textAlign: "center", width: "100%" }}
            >
              {post?.post?.user?.firstName.substring(0, 10) +
                " " +
                post?.post?.user?.lastName.substring(0, 10)}{" "}
              Post
            </Typography>
            <Box
              sx={{
                backgroundColor: "#D9D9D9",
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <Button
                onClick={handleCommentClose}
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <CloseRoundedIcon sx={{ color: "white" }} />
              </Button>
            </Box>
          </Box>
          <Box sx={{ width: "100%", padding: "24px 0px", textAlign: "center" }}>
            <Typography variant="h5Black">Comments ({commentCount})</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "center",
            alignItems: "start",
            minHeight: "200px",
          }}
        >
          {allComments?.map((item, index) => (
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                borderBottom: "1px solid #F1F1F1",
                paddingBottom: "15px",
                width: "100%",
              }}
              key={item?.commentId}
            >
              <Box>
                <ProfilePicture
                  src={item.user?.profilePic}
                  firstName={item?.user?.firstName}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Typography variant="postUserTypo">
                  {item.user?.firstName.substring(0, 10) +
                    " " +
                    item.user?.lastName.substring(0, 10)}
                </Typography>
                <Typography variant="subHeader" sx={{ wordBreak: "break-all" }}>
                  {item.commentText}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Formik
          initialValues={{ userComments: "" }}
          validationSchema={validationSchema}
          onSubmit={handleCommentSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                width: "100%",
                position: "sticky",
                bottom: "-31px",
                backgroundColor: "white",
                padding: "24px 0px 12px 0px",
                // borderRadius: "30px",
                [theme.breakpoints.down("sm")]: {
                  gap: "10px",
                },
              }}
            >
              <Box
                sx={{
                  padding: "0",
                  width: "100%",

                  borderRadius: "30px",
                }}
              >
                <Search sx={{ width: "100%" }}>
                  <Field
                    component={TextInput}
                    type="text"
                    name="userComments"
                    value={values.userComments}
                    onChange={handleChange}
                    placeholder="Write your comment here.."
                    sx={{
                      width: "100% !important",
                      borderRadius: "30px",
                      background: "#F5F5F5",
                      border: "1px solid rgba(20, 184, 166, 0.05)",
                      padding: "14px 20px",
                    }}
                  />
                </Search>
              </Box>
              <Button
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  display: "flex",
                  width: "97px",
                  padding: "19px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  height: "60px",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  },
                }}
                disabled={loading || !values.userComments}
                type="submit"
              >
                Send
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default UserComments;
