import React, { useEffect, useMemo, useState } from "react";
import Layout from "./../../components/globalComponents/Layout/Layout";
import ImageComp from "../../components/globalComponents/ImageComp";
import { Box, Button, Tab, Typography } from "@mui/material";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import theme from "../../theme";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Posts from "../../components/Social/posts/Posts";
import UploadPost from "../../components/Social/Modals/UploadPost/UploadPost";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAPI from "../../features/hooks/useGetAPI";
import useFetch from "../../features/hooks/useFetch";
import { useImagePreview } from "../../features/hooks/useImagePreview";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { setUser } from "../../features/slice/userSlice";
import AddStory from "../../components/Social/Modals/Story/AddStory/AddStory";
import { setMultiplePost } from "../../features/slice/postSlice";
import UserComments from "../../components/Social/Modals/comment/UserComments";
import { toast } from "react-toastify";
import ProductsTab from "./tabComponents/ProductsTab";
import CoursesTab from "./tabComponents/CoursesTab";
import { LiaUserEditSolid } from "react-icons/lia";
const UserProfile = () => {
  // get user from store
  const { user } = useSelector((state) => state.user);
  const { followers } = useSelector((state) => state.follow);
  const { following } = useSelector((state) => state.follow);
  const [invitation, setInvitation] = useState(null);
  const { fetchData } = useFetch();
  // //console.log(followers);
  // //console.log(following);
  // //console.log(user,"User");
  const { multiplePosts } = useSelector((state) => state.post);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [flag, setFlag] = useState(false);
  const [coverFlag, setCoverFlag] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [del, setDel] = useState(null);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  var profilePicPreview = useImagePreview(profilePic);
  var CoverPicPreview = useImagePreview(coverPic);

  const { patchData, loading } = useFetch();
  const navigate = useNavigate();
  const { getData } = useGetAPI();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //get posts of only the logged in user
  const getUserPosts = async () => {
    await getData("/api/user/post/my-posts", (res) => {
      // //console.log(res, "userPosts");
      dispatch(setMultiplePost(res));
    });
  };
  // eslint-disable-next-line
  useEffect(() => {
    getUserPosts();
  }, [newPost, del]);
  // eslint-disable-next-line
  let allPosts = useMemo(() => {
    if (multiplePosts) {
      return multiplePosts;
    }
  }, [multiplePosts]);
  //to change profile pic
  const handleSelectProfilePic = (e) => {
    let selectedImage = e.target.files[0];
    // //console.log(selectedImage, "Profile");
    // //console.log(selectedImage.type.startsWith(
    //   "image/jpeg"
    // ), "Profile test");
    const imageTypes = [
      "image/webp",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg",
    ];
    const isValidImageType = imageTypes.some((type) =>
      selectedImage.type.startsWith(type)
    );
    if (isValidImageType) {
      setProfilePic(selectedImage);
      setFlag(true);
    } else {
      toast.error(
        "Invalid image type.Please select only jpg,png,svg and jpeg."
      );
    }
  };

  const profileChange = async () => {
    let formData = new FormData();

    formData.append("profilePic", profilePic);
    await patchData(
      "/api/user/profilepic",
      formData,
      setUser,
      (res) => {
        //console.log(res, "response for the Profile Photo");
        setFlag(false);
        setProfilePic(null);
        if (profilePic === null) {
        }
      },
      true
    );
  };

  //to change cover photo validation and conversion
  const handleSelectCoverPic = (e) => {
    let selectedImage = e.target.files[0];
    const imageTypes = [
      "image/webp",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg",
    ];
    const isValidImageType = imageTypes.some((type) =>
      selectedImage.type.startsWith(type)
    );
    if (isValidImageType) {
      setCoverPic(selectedImage);
      setCoverFlag(true);
    } else {
      toast.error(
        "Invalid image type.Please select only jpg,png,svg and jpeg."
      );
    }
  };
  //change cover photo
  const coverChange = async () => {
    let formData = new FormData();
    formData.append("coverPic", coverPic);
    await patchData(
      "/api/user/coverPic",
      formData,
      setUser,
      (res) => {
        setCoverFlag(false);
        setCoverPic(null);
      },
      true
    );
  };
  //add story handler
  // const handleClickOpen = () => {
  //   setOpen(!open);
  // };

  const getFollowRequests = async () => {
    fetchData("/api/user/connection/request", undefined, (res) => {
      setInvitation(res?.data.length);
    });
  };
  useEffect(() => {
    getFollowRequests();
  }, []);

  const buttonStyles = {
    display: "flex",
    padding: "8px 12px",
    alignItems: "center",
    gap: "8px",
    background: "#F1F1F1",
    border: "0.52px solid #D6D6D6",
    borderRadius: "10.33px",
    height: "40px",
    width: "100%",
    maxWidth: "140px",
    fontSize: "12.33px",
    fontWeight: "400",
    color: "#333333",
  };
  const followingStyle = {
    width: "100%",
    maxWidth: "225px",
    height: "145px",
    backgroundColor: "#F1F1F1",
    border: "1px solid #D6D6D6",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
  };
  const buttonHover = {
    color: theme.palette.primary.main,
    background: "white",
    border: `1px solid ${theme.palette.primary.main}`,
  };
  const handleCommentUpdate = (post) => {
    setPosts(
      multiplePosts.map((p) => {
        // //console.log(p);
        return p.postID === post.postID ? post : p;
      })
    );
  };

  const iconColor = theme.palette.primary.main;
  return (
    <>
      {/* //models for comment and add story */}
      <UserComments updComments={handleCommentUpdate} />
      <AddStory open={open} setOpen={setOpen} />

      {/* this is for the Cover Photo... */}
      <Box
        sx={{
          height: "360px",
          backgroundImage: `url(${
            CoverPicPreview
              ? CoverPicPreview
              : user?.coverPic
              ? user?.coverPic
              : "assets/photos/profile-cover.png"
          })`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {coverFlag ? (
          <>
            <Button
              sx={{
                background: "#333",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "5px 10px",
                borderRadius: "30px",
              }}
              disabled={loading}
              component="label"
              onClick={coverChange}
            >
              <DoneRoundedIcon sx={{ color: "white" }} />
              <Typography variant="editPicButton">Save changes</Typography>
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{
                background: "#333",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "5px 10px",
                borderRadius: "30px",
              }}
              component="label"
            >
              <input
                type="file"
                name="file"
                accept="image/*"
                id="cover-upload"
                hidden
                onChange={handleSelectCoverPic}
              />
              <CameraAltRoundedIcon sx={{ color: "white" }} />
              <Typography variant="editPicButton">Edit cover photo</Typography>
            </Button>
          </>
        )}
      </Box>
      {/* <ImageComp src={"assets/photos/story.png"} /> */}
      <Layout title={"My - Space | SMAC"}>
        <Box>
          {/* this is for the Change the Profie Picture */}

          <Box
            sx={{
              display: "flex",
              gap: "15px",
              flexWrap: { xs: "wrap", md: "nowrap" }, // Wrap on small screens, no wrap on medium and up
              alignItems: "center", // Center items vertically
              minHeight: "248px", // Ensure minimum height for vertical centering
              [theme.breakpoints.down("lg")]: {
                gap: "30px",
                marginBottom: "20px",
              },
            }}
          >
            {/* Profile Picture Section */}
            <Box
              sx={{
                position: "relative",
                bottom: { xs: "20px", md: "60px" },
                width: { xs: "100%", md: "30%" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {/* Profile Picture and Button Wrapper */}
              <Box
                sx={{
                  position: "relative",
                  width: "170px",
                  height: "170px",
                  margin: "0 auto", // Center the container on mobile
                  [theme.breakpoints.down("sm")]: {
                    marginTop: "-85px",
                  },
                }}
              >
                {profilePicPreview || user?.profilePic ? (
                  <ImageComp
                    src={
                      profilePicPreview ? profilePicPreview : user?.profilePic
                    }
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "33px",
                      border: "5px solid #fff",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  // Display the first letter of the user's name with a colored background if no profile image
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: `${iconColor}70`,
                      color: " white",
                      width: "100%",
                      height: "100%",
                      fontSize: "64px",
                      fontWeight: "bold",
                      borderRadius: "33px",
                    }}
                  >
                    {user?.firstName?.[0] || "U"}
                  </Box>
                )}
                {/* Button for camera or done */}
                {flag ? (
                  <Button
                    sx={{
                      position: "absolute",
                      bottom: "0px", // Position button near the bottom of the image
                      right: "0px", // Adjust position for mobile
                      background: "#333",
                      minWidth: "37px",
                      height: "37px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    accept="image/*"
                    component="label"
                    onClick={profileChange}
                    disabled={loading}
                  >
                    <DoneRoundedIcon />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                      background: "#333",
                      minWidth: "37px",
                      height: "37px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    component="label"
                  >
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      id="profile-upload"
                      hidden
                      onChange={handleSelectProfilePic}
                    />
                    <CameraAltRoundedIcon sx={{ color: "white" }} />
                  </Button>
                )}
              </Box>

              {/* User Info */}
              <Box
                sx={{
                  marginTop: "10px",
                  gap: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "center" },
                }}
              >
                <Typography variant="h3" sx={{ wordBreak: "break-all" }}>
                  {user?.firstName + " " + user?.lastName}
                </Typography>
                {/* <Typography variant="h5" sx={{ wordBreak: "break-all" }}>
      {user.bio ? user.bio : "No Bio Added"}
    </Typography> */}
                <Typography sx={{ wordBreak: "break-all" }}>
                  {user.address ? user.address : "No Location Added"}
                </Typography>
                <Button
                  sx={{
                    ...buttonStyles,
                    "&:hover": { ...buttonHover },
                  }}
                  onClick={() => {
                    navigate("/update");
                  }}
                >
                  <LiaUserEditSolid
                    style={{
                      fontSize: "14px",
                    }}
                  />
                  Edit profile
                </Button>
              </Box>
            </Box>

            {/* Divider */}
            <Box
              sx={{
                width: "1px",
                backgroundColor: "#A6A6A6",
                height: "80%", // Set divider height
                minHeight: "150px", // Ensure minimum height so divider is visible
                display: { xs: "none", md: "block" }, // Hide divider on small screens
              }}
            ></Box>

            {/* About Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                gap: "17px",
                width: { xs: "100%", md: "40%" },
              }}
            >
              {user?.bio && (
                <Box
                  sx={{
                    lineHeight: 2,
                  }}
                >
                  <Typography variant="h5">About</Typography>
                  <Typography variant="subparagraph">{user.bio}</Typography>
                </Box>
              )}

              {/* Additional Info */}
              <Box sx={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
                {user?.dob && (
                  <Box sx={{ display: "flex", gap: "8px" }}>
                    <CakeOutlinedIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Typography>
                      Born:{" "}
                      {user.dob
                        ? new Date(user.dob).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "No Birth Date Added"}
                    </Typography>
                  </Box>
                )}
                {user?.address && (
                  <Box sx={{ display: "flex", gap: "8px" }}>
                    <LocationOnOutlinedIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Typography sx={{ wordBreak: "break-all" }}>
                      {user.address ? user.address : "No Location Added"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Followers Section */}
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                display: "flex",
                flexDirection: { xs: "row", md: "row" }, // Adjust flex direction based on screen size
                alignItems: "center",
                gap: "17px",
                justifyContent: "center",
                [theme.breakpoints.down("sm")]: {
                  gap: "12px",
                },
              }}
            >
              <Box
                sx={{
                  ...followingStyle,
                  [theme.breakpoints.down("sm")]: {
                    height: "100px",
                    padding: "15px",
                  },
                }}
                onClick={() => {
                  navigate("/connections?tab=Followers");
                }}
              >
                <Typography sx={{ fontSize: "16px" }}>Followers</Typography>
                <Typography sx={{ fontWeight: "700", fontSize: "32px" }}>
                  {followers ? followers.length : "0"}
                </Typography>
              </Box>
              <Box
                sx={{
                  ...followingStyle,
                  [theme.breakpoints.down("sm")]: {
                    height: "100px",
                    padding: "15px",
                  },
                }}
                onClick={() => {
                  navigate("/connections?tab=Following");
                }}
              >
                <Typography sx={{ fontSize: "16px" }}>Following</Typography>
                <Typography sx={{ fontWeight: "700", fontSize: "32px" }}>
                  {following ? following.length : "0"}
                </Typography>
              </Box>
              <Box
                sx={{
                  ...followingStyle,
                  [theme.breakpoints.down("sm")]: {
                    height: "100px",
                    padding: "15px",
                  },
                }}
                onClick={() => {
                  navigate("/connections?tab=Invitations");
                }}
              >
                <Typography sx={{ fontSize: "16px" }}>Invitation</Typography>
                <Typography sx={{ fontWeight: "700", fontSize: "32px" }}>
                  {invitation ? invitation : "0"}
                  {/* {invitation} */}
                </Typography>
              </Box>
            </Box>
          </Box>

          <hr />
          {/* This is for the Post Tabs  */}

          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  // borderTop: 1,

                  display: "flex",
                  justifyContent: "center",
                  padding: "1.5rem .5rem",
                }}
              >
                <TabList
                  onChange={handleChange}
                  centered
                  sx={{
                    "& span": {
                      position: "block",
                      display: "none",
                      height: "0px",
                    },
                    boxShadow: " 0px 0px 4px 0px #00000040",
                    borderRadius: "12px",
                    background: "white",
                    width: "100%",
                    maxWidth: "683px",
                    display: "flex",
                    padding: "8px 10px",
                  }}
                >
                  <Tab label={"Posts"} value="1" />
                  <Tab label={"Products"} value="2" />
                  <Tab label={"Courses"} value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{ padding: "40px 0px" }}>
                  <Posts
                    delCb={setDel}
                    myposts={allPosts ? allPosts : false}
                    key={0}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box sx={{ padding: "40px 0px" }}>
                  {" "}
                  <ProductsTab />
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box sx={{ padding: "40px 0px" }}>
                  <CoursesTab />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
        <UploadPost
          cb={setNewPost}
          style={{
            position: "sticky",
            left: "92.5%",
            bottom: "6.7%",
            width: "105px",
          }}
        />
      </Layout>
    </>
  );
};

export default UserProfile;
