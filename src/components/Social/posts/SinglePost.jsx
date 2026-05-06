import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PendingIcon from "@mui/icons-material/Pending";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
//this icon is for testing
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
} from "@mui/material";
import theme from "../../../theme";
import useFetch from "../../../features/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../features/slice/postSlice";
import { useNavigate } from "react-router-dom";
import {
  setIsCommentOpen,
  // setIsShareOpen,
} from "../../../features/slice/Social/socialModelsSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import moment from "moment";
import ProfilePicture from "../../globalComponents/ProfilePicture";
// import { setpendingAndFollowers } from "../../../features/slice/followSlice";
const SinglePost = ({ post, delCb, setPosts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, deleteData, postData, fetchData } = useFetch();
  const { pendingAndFollowers } = useSelector((state) => state.follow);
  const { isCommentOpen } = useSelector((state) => state.socialModels);
  // const { isShareOpen } = useSelector((state) => state.socialModels);
  const { user } = useSelector((state) => state.user);

  let [isLiked, setIsLiked] = useState(false);
  let [likesCount, setLikesCount] = useState(0);
  // let [sharesCount, setSharesCount] = useState([]);
  let [commentCount, setCommentCount] = useState([]);
  let [isFollower, setIsFollower] = useState(false);

  const checkFollower = () => {
    let follower = pendingAndFollowers?.find(
      (follower) => follower?.followingEmail === post?.email
    );
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
  useEffect(() => {
    let liked = post?.likes?.likes || [];
    // setSharesCount(0);
    setCommentCount(post?.comments?.count || 0);
    setLikesCount(post?.likes?.count || 0);

    let userLiked = liked.some((a) => a.user.email === user.email);
    setIsLiked(userLiked);
  }, [post, user.email]);
  useEffect(() => {
    checkFollower();
    // getAllFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconColors = [
    theme.palette.primary.main,
    theme.palette.hearts.blue,
    theme.palette.hearts.pink,
    theme.palette.hearts.black,
    theme.palette.hearts.red,
    theme.palette.hearts.yellow,
  ];
  const iconColor = iconColors[Math.floor(Math.random() * iconColors.length)];
  async function toggleLike(id) {
    // ////console.log(id,"data after Liked");
    let postId = {
      postId: id.postId,
    };
    //old database code
    // let postId = {
    //   postId: id.postID,
    // };

    await postData(
      "/api/user/post/like",
      postId,
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

  const handleCommentDialog = async () => {
    await fetchData(`/api/user/post/${post.postId}`, undefined, (res) => {
      let data = res.data;
      let payload = {
        post: { ...data, user: post.user },
      };
      // here i dispatch complete data of post on which i click
      dispatch(setPost(payload));
      // ////console.log(payload, post, "resposne for fetch comments");
    });
    dispatch(setIsCommentOpen({ data: !isCommentOpen }));
  };
  // const handleShareDialog = (pid) => {
  //   dispatch(setIsShareOpen({ data: !isShareOpen }));
  // };
  let handleDelete = async () => {
    try {
      await deleteData(`/api/user/post/${post.postId}`, (res) => {
        // use a state to refetch  the posts after deleting one
        delCb(post.postId);
      });
    } catch (error) {
      //console.log("catch", error);
    }
  };

  let toFollow = {
    followingEmail: post.email,
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        border: "1px solid #F8F8F8",
        boxShadow: " 0px 4px 10px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: { lg: "16px", md: "14px", sm: "12px", xs: "12px" },
        margin: 0,
        width: "100%",
        maxWidth: { lg: "550px", md: "400px", sm: "450px", xs: "100%" },
        overflow: "hidden", // Ensure the parent container hides the overflow
        position: "relative",
        "&:hover": {
          // background: theme.palette.background.hover
          boxShadow: "0px 0px 10px 0px rgb(190,190,190)",
        },
      }}
    >
      <CardHeader
        sx={{ padding: "16px 16px 0px 16px" }}
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
              <MenuList sx={{ boxShadow: "0px 4px 40px 0px #0000000D" }}>
                {post.email === user?.email ? (
                  <>
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
                      <DeleteForeverIcon /> <Typography>Delete</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    {isFollower === "pending" ? (
                      <MenuItem
                        onClick={() => {
                          handleUnfollow(post.email);
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
                          handleUnfollow(post.email);
                        }}
                      >
                        <PersonRemoveIcon /> <Typography>Unfollow</Typography>
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
                        <PersonAddIcon /> <Typography>Follow</Typography>
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
                  </>
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
                post.user.email === user.email
                  ? "/profile-user"
                  : `/user/${post?.user?.id}`
              )
            }
          >
            {post?.user?.firstName.substring(0, 10) +
              " " +
              post?.user?.lastName.substring(0, 10)}
          </Typography>
        }
        subheader={moment
          .utc(post.createdAt)
          .local()
          .startOf("seconds")
          .fromNow()}
      />

      {/* if we have an image  use this condition*/}
      <Box
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/post/${post.postId}`);
        }}
      >
        {post?.images?.length > 0 ? (
          <>
            <CardContent sx={{ padding: "8px 16px 8px 16px" }}>
              {/* this is for image caption.... */}
              <Typography
                variant="paragraph"
                color={theme.palette.grey.main}
                sx={{ margin: "0px 10px", wordBreak: "break-all" }}
              >
                {post.postText}
              </Typography>
            </CardContent>
            <Box
              sx={{
                width: "93%",
                overflow: "hidden",
                margin: "0 auto",
                borderRadius: "8px",
              }}
            >
              <CardMedia
                component="img"
                image={post.images[0]}
                alt="Broken Image"
                sx={{
                  backgroundSize: "cover",
                  objectFit: "cover",

                  width: "100%",

                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Box>
          </>
        ) : (
          // if we have text only use this image
          <CardContent sx={{ padding: "8px 16px 8px 16px" }}>
            <Typography
              variant="paragraph"
              sx={{ margin: "0px 10px", wordBreak: "break-all" }}
              color={theme.palette.grey.main}
            >
              {post.postText}
            </Typography>
          </CardContent>
        )}
      </Box>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          sx={{
            color: iconColor,
            "&:hover": {
              // borderRadius:"50% !important",
            },
          }}
          onClick={() => {
            toggleLike(post);
          }}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          {<p style={{ fontSize: "13px", marginLeft: "10px" }}>{likesCount}</p>}
        </IconButton>
        {/* <IconButton
          aria-label="share"
          sx={{ margin: "0 !important" }}
          onClick={handleShareDialog}
        >
          <ImageComp src={"assets/photos/share.png"} alt={"share.png"} /> */}
        {/* <ShareIcon sx={{ color: "primary.main" }} /> */}
        {/* {
            <p style={{ fontSize: "18px ", marginLeft: "10px" }}>
              {sharesCount}
            </p>
          }
        </IconButton> */}
        <IconButton
          aria-label="share"
          sx={{ margin: "0 !important" }}
          onClick={() => {
            handleCommentDialog();
          }}
        >
          <ModeCommentOutlinedIcon sx={{ color: "primary.main" }} />
          {
            <p style={{ fontSize: "13px", marginLeft: "10px" }}>
              {commentCount}
            </p>
          }
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SinglePost;
