import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../components/globalComponents/Layout/Layout";
import { Box, Tab, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import theme from "../../../theme";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Posts from "../../../components/Social/posts/Posts";
import useGetAPI from "../../../features/hooks/useGetAPI";
// import ForumIcon from "@mui/icons-material/Forum";
import { useParams } from "react-router-dom";
import useFetch from "../../../features/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  // setFollowing,
  setpendingAndFollowers,
} from "../../../features/slice/followSlice";
import UserComments from "../../../components/Social/Modals/comment/UserComments";
// import ProfilePicture from "../../../components/globalComponents/ProfilePicture";
import OtherUserProductTabs from "../OtherUserTabs/OtherUserProductTabs";
import OtherUserCourseTab from "../OtherUserTabs/OtherUserCourseTab";
import { setMultiplePost } from "../../../features/slice/postSlice";
import ImageComp from "../../../components/globalComponents/ImageComp";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
// import { MessagingIcon } from "../../../components/globalComponents/constants";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import { TbUserCancel } from "react-icons/tb";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineUserDelete } from "react-icons/ai";
import SkeletonLoader from "../../../components/globalComponents/SkeletonLoader";
import ChatFromOtherUser from "../../../components/Chat/ChatFromOtherUser";
import coverImage from "../../../assets/BG.png";
const OtherUser = () => {
  const { multiplePosts } = useSelector((state) => state.post);
  const [user, setUser] = useState("");
  const [value, setValue] = useState("1");

  const [isFollower, setIsFollower] = useState(false);
  const params = useParams();
  const { getData } = useGetAPI();
  const { fetchData, postData, deleteData } = useFetch();
  const { pendingAndFollowers } = useSelector((state) => state.follow);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let allPosts = useMemo(() => {
    if (multiplePosts && multiplePosts) {
      return multiplePosts;
    }
  }, [multiplePosts]);
  const getUserPosts = async () => {
    await getData(`/api/user/post/user-posts/${params.id}`, (data) => {
      dispatch(setMultiplePost(data));
    });
  };
  // gert data of specific user
  const getSpecificUser = async () => {
    await getData(`/api/user/get-user/${params.id}`, (data) => {
      setUser(data?.data);
    });
  };

  // check if this user is my follower
  const checkFollower = () => {
    const follower = pendingAndFollowers?.find(
      (follower) => follower?.followingEmail === user?.email
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

  const getAllFollowers = async () => {
    await fetchData(
      "/api/user/connection/getall",
      setpendingAndFollowers,
      (res) => {
        // dispatch(setpendingAndFollowers(res));
      }
    );
  };

  const handleFollowRequest = () => {
    postData(
      "/api/user/connection",
      { followingEmail: user?.email },
      undefined,
      undefined,
      undefined,
      getAllFollowers
    );
  };

  const handleUnFollowRequest = () => {
    deleteData(`/api/user/connection/following/${user?.email}`, () => {
      getAllFollowers();
    });
  };

  useEffect(() => {
    const handlePromises = async () => {
      await getAllFollowers();
      await getUserPosts();
      await getSpecificUser();
    };
    handlePromises();
  }, []);

  useEffect(() => {
    checkFollower();
  }, [pendingAndFollowers]);
  // const [posts, setPosts] = useState([]);
  const handleCommentUpdate = (post) => {};
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
  };
  const followingBtn = {
    width: "200px",
    height: "68px",
    fontSize: "20px",
    borderRadius: "20px",
    border: "1px solid #D6D6D6",
    background: "#F1F1F1",
    display: "flex",
    color: "#333333",
    justifyContent: "center",
    gap: "9px",
  };
  const iconColor = theme.palette.primary.main;
  return (
    <>
      <UserComments updComments={handleCommentUpdate} />
      {user ? (
        <>
          <Box
            sx={{
              height: "360px",
              backgroundImage: `url(${
                user?.coverPic ? user?.coverPic : coverImage
              })`,
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // background: "red",
            }}
          ></Box>
          <Layout title={user?.firstName + " " + user?.lastName + " | SMAC"}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "15px",
                  flexWrap: { xs: "wrap", md: "nowrap" }, // Wrap on small screens, no wrap on medium and up
                  alignItems: "center", // Center items vertically
                  minHeight: "300px", // Ensure minimum height for vertical centering
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
                    {user?.profilePic ? (
                      <ImageComp
                        src={user?.profilePic}
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "33px",
                          border: "5px solid #fff",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: `${iconColor}20`,
                          color: iconColor,
                          width: "100%",
                          height: "100%",
                          fontSize: "64px",
                          fontWeight: "bold",
                          borderRadius: "33px",
                          textTransform: "uppercase",
                        }}
                      >
                        {user?.firstName?.[0] || "U"}
                      </Box>
                    )}
                  </Box>

                  {/* User Info */}
                  <Box
                    sx={{
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
      {user?.bio ? user.bio : "No Bio Added"}
    </Typography> */}
                    <Typography sx={{ wordBreak: "break-all" }}>
                      {user?.address ? user.address : "No Location Added"}
                    </Typography>
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
                    width: { xs: "100%", md: "30%" },
                  }}
                >
                  <Box>
                    <Typography variant="h5">About</Typography>
                    <Typography
                      variant="subparagraph"
                      sx={{
                        wordBreak: "break-all",
                      }}
                    >
                      {user ? user.bio : "empty"}
                    </Typography>
                  </Box>

                  {/* Additional Info */}
                  <Box sx={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
                    <Box sx={{ display: "flex", gap: "8px" }}>
                      <CakeOutlinedIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                      <Typography>
                        Born:{" "}
                        {user?.dob
                          ? new Date(user.dob).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "No Birth Date Added"}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: "8px" }}>
                      <LocationOnOutlinedIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                      <Typography sx={{ wordBreak: "break-all" }}>
                        {user?.address ? user.address : "No Location Added"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Followers Section */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    display: "flex",
                    flexDirection: { xs: "row", md: "row" }, // Adjust flex direction based on screen size
                    // flexWrap:{xs:"wrap",md:"nowrap",lg:"nowrap"},
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "center",
                    [theme.breakpoints.down("sm")]: {
                      gap: "12px",
                      flexDirection: "column",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "9px",
                      [theme.breakpoints.down("sm")]: {
                        padding: "0px",

                        flexDirection: "row",
                      },
                    }}
                  >
                    <ChatFromOtherUser email={user?.email} />
                    {/* <ButtonComp
                      customStyles={{
                        gap: "0px",
                        width: "100%",
                        padding: "0px",
                        color: "#333333",
                        ...followingBtn,
                      }}
                      icon={<MessagingIcon />}
                      click={handleMessageRequest}
                      label="Message"
                    /> */}

                    {isFollower === true ? (
                      <ButtonComp
                        click={handleUnFollowRequest}
                        customStyles={followingBtn}
                        label={"Unfollow"}
                        icon={<AiOutlineUserDelete />}
                      />
                    ) : isFollower === false ? (
                      <ButtonComp
                        click={handleFollowRequest}
                        customStyles={followingBtn}
                        icon={<AiOutlineUserAdd />}
                        label="Follow"
                      />
                    ) : isFollower === "pending" ? (
                      <ButtonComp
                        click={handleUnFollowRequest}
                        customStyles={followingBtn}
                        icon={<TbUserCancel />}
                        label={"Cancel  Request"}
                      />
                    ) : null}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "12px",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        ...followingStyle,
                        [theme.breakpoints.down("sm")]: {
                          height: "80px",
                          padding: "15px",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: "16px" }}>
                        Followers
                      </Typography>
                      <Typography sx={{ fontWeight: "700", fontSize: "32px" }}>
                        {user.follower > 0 ? user.follower : "0"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        ...followingStyle,
                        [theme.breakpoints.down("sm")]: {
                          height: "80px",
                          padding: "15px",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: "16px" }}>
                        Following
                      </Typography>
                      <Typography sx={{ fontWeight: "700", fontSize: "32px" }}>
                        {user.following > 0 ? user.following : "0"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* this is for the tabs */}
              <hr />
              <Box sx={{ width: "100%" }}>
                <TabContext value={value}>
                  <Box
                    sx={{
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
                      <Posts myposts={allPosts ? allPosts : false} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box sx={{ padding: "40px 0px" }}>
                      <OtherUserProductTabs />
                    </Box>
                  </TabPanel>
                  <TabPanel value="3">
                    <Box sx={{ padding: "40px 0px" }}>
                      <OtherUserCourseTab />
                    </Box>
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Layout>
        </>
      ) : (
        <SkeletonLoader width={"100"} />
      )}
    </>
  );
};

export default OtherUser;
