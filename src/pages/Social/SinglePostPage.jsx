import React, { useEffect, useState, useMemo } from "react";
import Layout from "./../../components/globalComponents/Layout/Layout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PendingIcon from "@mui/icons-material/Pending";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  MenuList,
  Typography,
  IconButton,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Paper,
  Menu,
  MenuItem,
  Fade,
  Divider,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
// import { setIsCommentOpen } from "../../features/slice/Social/socialModelsSlice";
import ProfilePicture from "../../components/globalComponents/ProfilePicture";
import useFetch from "../../features/hooks/useFetch";
import theme from "../../theme";
import TextInput from "../../components/globalComponents/global_inputs/TextInput";
import Posts from "../../components/Social/posts/Posts";
import useGetAPI from "../../features/hooks/useGetAPI";
import SkeletonLoader from "../../components/globalComponents/SkeletonLoader";
const validationSchema = Yup.object().shape({
  userComments: Yup.string()
    .matches(/^(?!\s)(?!.*\s{2,}).*$/, "No consecutive spaces is allowed")
    .required("Comment is required")
    .max(255, "Comment should be less than 255 characters"),
});
const SinglePostPage = () => {
  // //console.log("logging post in single post",post);
  const params = useParams();
  const navigate = useNavigate();
  const { loading, deleteData, postData, fetchData } = useFetch();
  const { pendingAndFollowers } = useSelector((state) => state.follow);
  // not using comment  modal here
  // const { isCommentOpen } = useSelector((state) => state.socialModels);
  // const { isShareOpen } = useSelector((state) => state.socialModels);
  const { user } = useSelector((state) => state.user);
  let [isLiked, setIsLiked] = useState(false);
  let [likesCount, setLikesCount] = useState(0);
  let [commentCount, setCommentCount] = useState(0);
  let [isFollower, setIsFollower] = useState(false);
  let [flag, setFlag] = useState(false);
  const [post, setPost] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [del, setDel] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { getData, getRes } = useGetAPI();
  const checkFollower = () => {
    let follower = pendingAndFollowers?.find(
      (follower) => follower?.followingEmail === post?.email
    );

    ////console.log("Follower found:", follower, pendingAndFollowers);

    if (follower) {
      if (follower.status === "accepted") {
        setIsFollower(true);
      } else if (follower.status === "pending") {
        setIsFollower("pending");
      }
    } else {
      setIsFollower(false);
    }
  };
  let allPosts = useMemo(() => {
    if (getRes && getRes?.data) {
      return getRes.data;
    }
  }, [getRes]);

  // this is for check the pending request....
  // const getAllFollowers = async (data) => {
  //   await fetchData(
  //     "/api/user/connection/getall",
  //     setpendingAndFollowers,
  //     (res) => {
  //       // dispatch(setpendingAndFollowers(res));
  //     }
  //   );
  // };

  const iconColors = [theme.palette.primary.main];
  const iconColor = iconColors[Math.floor(Math.random() * iconColors.length)];
  async function toggleLike(id) {
    // ////console.log(id,"data after Liked");
    let postid = {
      postId: id.postId,
    };
    await postData(
      "/api/user/post/like",
      postid,
      undefined,
      undefined,
      undefined,
      (value) => {
        // ////console.log(value,"value in the single Post");
        //when liked update ui with updated data
        if (isLiked) {
          setIsLiked(false);
          setLikesCount(likesCount - 1);
        } else {
          setIsLiked(true);
          setLikesCount(likesCount + 1);
        }
      }
    );
  }

  const getSinglePost = () => {
    fetchData(`/api/user/post/${params.postId}`, undefined, (res) => {
      setPost(res?.data);
      //console.log(res?.data, "single post page details");
      setAllComments(res?.data?.comments?.comments || []);
      //this api call will get all the posts of the user
      getData(`/api/user/post/user-posts/${res?.data?.email}`);
    });
    // dispatch(setIsCommentOpen({ data: !isCommentOpen }));
  };
  let handleDelete = async () => {
    try {
      await deleteData(`/api/user/post/${post?.postId}`, (res) => {
        // use a state to refetch  the posts after deleting one
        // delCb(post.postID);
        if (res) {
          navigate(-1);
        }
      });
    } catch (error) {
      //console.log("catch", error);
    }
  };

  let toFollow = {
    followingEmail: post?.email,
  };
  const handleFollow = async () => {
    try {
      await postData(
        "/api/user/connection",
        toFollow,
        undefined,
        undefined,
        undefined,
        (res) => {
          setIsFollower("pending");
          // getAllFollowers()
        }
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (email) => {
    try {
      await deleteData(`/api/user/connection/following/${email}`, (res) => {
        ////console.log("Unfollow request sent");
        setIsFollower(false);
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCommentSubmit = (values, { resetForm }) => {
    const { userComments } = values;
    let keys = {
      commentText: userComments,
      postId: post?.postId,
    };
    //console.log(post, "post before comment");

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
        setCommentCount(commentCount + 1);
        resetForm(); // Clear the form
      }
    );
  };
  useEffect(() => {
    let liked = post?.likes.likes || [];
    setCommentCount(post?.comments.count || 0);
    setLikesCount(post?.likes?.count || 0);
    let userLiked = liked.some((a) => a.user.email === user?.email);
    setIsLiked(userLiked);
  }, [post, user?.email]);
  useEffect(() => {
    checkFollower();
    // getAllFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getSinglePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del]);
  return (
    <Layout
      styles={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        paddingTop: "2rem",
      }}
    >
      <Paper
        sx={{
          padding: "2rem",
          width: "100%",
          display: "flex",
          gap: "1.75rem",
          borderRadius: "1.5rem",
          justifyContent: "space-between",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        }}
      >
        {post?.user ? (
          <>
            <Card
              sx={{
                border: "none",
                boxShadow: " 0px 0px 0px 0px rgba(0, 0, 0, 0.05)",
                borderRadius: "16px",
                margin: 0,
                width: "100%",
                // maxWidth: { lg: "683px", md: "500px", sm: "450px", xs: "90%" },
                overflow: "hidden", // Ensure the parent container hides the overflow
                position: "relative",
              }}
            >
              <CardHeader
                sx={{ padding: "0px !important", marginBottom: "1rem" }}
                avatar={
                  <>
                    <ProfilePicture
                      src={post?.user?.profilePic}
                      firstName={post?.user?.firstName}
                    />
                  </>
                }
                action={
                  // <IconButton
                  //   aria-label="settings"
                  //   sx={{ zIndex: 3 }}
                  //   onClick={() => {
                  //     setHideMore(!hideMore);
                  //   }}
                  // >
                  //   {hideMore ? <HighlightOffIcon /> : <MoreVertIcon />}
                  // </IconButton>
                  <div>
                    <IconButton
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      {/* Dashboard */}
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                      elevation={0}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuList
                        sx={{ boxShadow: "0px 4px 40px 0px #0000000D" }}
                      >
                        {post?.email === user?.email ? (
                          <Box>
                            <MenuItem
                              aria-label="follow"
                              disabled={loading}
                              sx={{
                                borderRadius: "10px",
                                width: "185px",
                                gap: 5,
                                "&:hover": {
                                  background: theme.palette.primary.main,
                                  color: "white",
                                },
                              }}
                              onClick={(pid) => handleDelete(pid)}
                            >
                              <DeleteForeverIcon />{" "}
                              <Typography>Delete</Typography>
                            </MenuItem>
                          </Box>
                        ) : (
                          <Box>
                            {isFollower === "pending" ? (
                              <MenuItem
                                onClick={() => {
                                  handleUnfollow(post?.email);
                                }}
                                aria-label="pending"
                                sx={{
                                  borderRadius: "10px",
                                  width: "185px",
                                  gap: 5,
                                  "&:hover": {
                                    background: theme.palette.primary.main,
                                    color: "white",
                                  },
                                }}
                              >
                                <PendingIcon /> <Typography>pending</Typography>
                              </MenuItem>
                            ) : isFollower === true ? (
                              <MenuItem
                                aria-label="unfollow"
                                sx={{
                                  borderRadius: "10px",
                                  width: "185px",
                                  gap: 2,
                                  "&:hover": {
                                    background: theme.palette.primary.main,
                                    color: "white",
                                  },
                                }}
                                onClick={() => {
                                  handleUnfollow(post?.email);
                                }}
                              >
                                <PersonRemoveIcon />{" "}
                                <Typography>Unfollow</Typography>
                              </MenuItem>
                            ) : isFollower === false ? (
                              <MenuItem
                                aria-label="follow"
                                sx={{
                                  borderRadius: "10px",
                                  width: "185px",
                                  gap: 5,
                                  "&:hover": {
                                    background: theme.palette.primary.main,
                                    color: "white",
                                  },
                                }}
                                onClick={handleFollow}
                              >
                                <PersonAddIcon />{" "}
                                <Typography>Follow</Typography>
                              </MenuItem>
                            ) : null}

                            {/*this is for the second phase of the company/project*/}
                            {/* <MenuItem
                      aria-label="settings"
                      sx={{
                        borderRadius: "10px",
                        width: "185px",
                        gap: 5,
                        "&:hover": {
                          background: theme.palette.primary.main,
                          color: "white",
                        },
                      }}
                    >
                      <VolumeOffIcon />
                      <Typography>Mute</Typography>
                    </MenuItem> */}
                          </Box>
                        )}
                      </MenuList>
                    </Menu>
                  </div>
                }
                title={
                  <Typography
                    variant="postUserTypo"
                    sx={{ cursor: "pointer", wordBreak: "break-all" }}
                    onClick={() =>
                      navigate(
                        post?.user?.email === user?.email
                          ? "/profile-user"
                          : `/user/${post?.user?.email}`
                      )
                    }
                  >
                    {post?.user?.firstName.substring(0, 10) +
                      " " +
                      post?.user?.lastName.substring(0, 10)}
                  </Typography>
                }
                subheader={moment
                  .utc(post?.createdAt)
                  .local()
                  .startOf("seconds")
                  .fromNow()}
              />
              <Divider />
              <CardContent
                sx={{
                  padding: "2rem 0px !important",

                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ wordBreak: "break-all" }}
                  color={theme.palette.grey.main}
                >
                  {post?.postText}
                </Typography>
                <Box sx={{ display: "flex", gap: "4px" }}>
                  {post?.interests?.map((interest) => {
                    return (
                      <Typography
                        sx={{ color: theme.palette.primary.main }}
                        key={interest.id}
                      >
                        #{interest?.name}
                      </Typography>
                    );
                  })}
                </Box>
                <CardActions
                  sx={{
                    padding: "0px !important",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    sx={{
                      color: iconColor,
                      "&:hover": {
                        // borderRadius:"50% !important",
                      },
                      padding: "0px !important",
                    }}
                    onClick={() => {
                      toggleLike(post);
                    }}
                  >
                    {isLiked ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                    {
                      <p style={{ fontSize: "13px", marginLeft: "8px" }}>
                        {likesCount}
                      </p>
                    }
                  </IconButton>
                  <IconButton
                    aria-label="share"
                    sx={{ margin: "0 !important", padding: "0px !important" }}
                  >
                    <ModeCommentOutlinedIcon sx={{ color: "primary.main" }} />
                    {
                      <p style={{ fontSize: "13px", marginLeft: "10px" }}>
                        {commentCount}
                      </p>
                    }
                  </IconButton>
                </CardActions>
              </CardContent>
              <Divider />
              <Box sx={{ display: "relative" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0px",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontSize: "14px" }}
                  >
                    {commentCount} comments
                  </Typography>
                  <KeyboardArrowDownIcon
                    onClick={() => {
                      setFlag(!flag);
                    }}
                    sx={{
                      rotate: flag ? "180deg" : "0deg",
                      transition: "ease 0.5s",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    justifyContent: "center",
                    height: "100%",
                    maxHeight: flag ? "130px" : "0px",
                    overflow: "hidden",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    transition: "ease 0.5s",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  {allComments?.map((item) => (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: "8px",
                        mt: "8px",
                      }}
                      key={item?.commentId}
                    >
                      <ProfilePicture
                        src={item.user?.profilePic}
                        firstName={item?.user?.firstName}
                      />
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
                        <Typography
                          variant="subHeader"
                          sx={{ wordBreak: "break-all" }}
                        >
                          {item.commentText}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
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
                      <Box sx={{ width: "100%" }}>
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
                      </Box>
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
            </Card>
            <>
              {post?.images?.length ? (
                <CardMedia
                  component="img"
                  image={post?.images[0]}
                  alt="Broken Image"
                  sx={{
                    backgroundSize: "cover",
                    objectFit: "contain",
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "2rem",
                    // transition: "transform 0.3s ease",
                    // "&:hover": {
                    //   transform: "scale(1.1)",
                    // },
                  }}
                />
              ) : null}
            </>
          </>
        ) : (
          <SkeletonLoader width={"100%"} />
        )}
      </Paper>
      {post?.user?.name ? (
        <>
          <Box>
            <Typography variant="uploadFormDark" component={"div"}>
              Some other posts of{" "}
              {post?.user?.firstName + " " + post?.user?.lastName}
            </Typography>
            <Typography variant="subHeader">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
          </Box>
          <Box>
            <Posts delCb={setDel} myposts={allPosts ? allPosts : false} />
          </Box>
        </>
      ) : (
        <SkeletonLoader width={"100%"} />
      )}
    </Layout>
  );
};

export default SinglePostPage;
