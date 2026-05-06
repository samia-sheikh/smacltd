import React, { useEffect, useState } from "react";
import Posts from "../../components/Social/posts/Posts";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { Tab, Box } from "@mui/material";
import UploadPost from "../../components/Social/Modals/UploadPost/UploadPost";
import Layout from "../../components/globalComponents/Layout/Layout";
import UserComments from "../../components/Social/Modals/comment/UserComments";
// import Share from "../../components/Social/Modals/share/Share";
// import AddStoryBtn from "../../components/Social/Stories/AddStoryBtn";
// import AddStory from "../../components/Social/Modals/Story/AddStory/AddStory";
// import StoriesSlider from "../../components/Social/Stories/CustomStories/StoriesSlider";
import useFetch from "../../features/hooks/useFetch";
import MultiStateUserIntrests from "./../../components/User/Modals/multiStateUserIntrests/MultiStateUserIntrests";
import { setpendingAndFollowers } from "../../features/slice/followSlice";
import { useDispatch } from "react-redux";
import useInfiniteScroll from "../../features/hooks/infiniteScroll";
import { setCurrentUserInterests } from "../../features/slice/autoCompleteSlice";
import { SyncLoader } from "react-spinners";
import Explore from "./Explore";
import { useLocation } from "react-router-dom";
import theme from "../../theme";
const HomePage = () => {
  const location = useLocation();
  const [value, setValue] = useState("1");
  // const [open, setOpen] = useState(false);
  const [del, setDel] = useState(null);
  const [newPost, setNewPost] = useState(null);
  const [posts, setPosts] = useState([]);
  let dispatch = useDispatch();
  // const { getData } = useGetAPI();

  //yet to be use
  let { fetchScrollData, isFetching } = useInfiniteScroll();
  //api/user/post
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { fetchData } = useFetch();
  useEffect(() => {
    if (newPost?.postAdd) {
      setPosts((pre) => [newPost.postAdd, ...pre]);
    }
  }, [newPost]);
  // const [stories, setStories] = useState([]);
  // const [myStories, setMyStories] = useState([]);
  // const [userDetails, setUserDetails] = useState("");

  // const getAllStories = async () => {
  //   await fetchData("/api/user/story", undefined, (res) => {
  //     // currently only friends sstories are being hit
  //     setStories(res?.data?.friendsStories);
  //     setMyStories(res?.data?.stories);
  //     setUserDetails(res?.data?.user);
  //   });
  // };
  const getAdditionalDetails = () => {
    fetchData("/api/user/user-extradetails", undefined, (res) => {
      dispatch(
        setCurrentUserInterests({
          currentUserInterests: res?.data?.interests,
        })
      );
    });
  };
  const getAllFollowers = async (data) => {
    await fetchData(
      "/api/user/connection/getall",
      setpendingAndFollowers,
      (res) => {
        // dispatch(setpendingAndFollowers(res));
      }
    );
  };
  const filterPostData = () => {
    //console.log(del, "check post to delete", posts);
    setPosts((posts) => posts.filter((p) => p.postId !== del));
  };
  //use infinite scroll and fetch data
  useEffect(() => {
    if (!isFetching) return;
    fetchScrollData(setPosts); // <--- Pass setLocalData as an argument
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
  const getAllPosts = async () => {
    fetchScrollData(setPosts);
  };
  //  hit api to get people you are following
  // const getFollowing = async () => {
  //   fetchData("/api/user/connection/following", undefined, (res) => {
  //     dispatch(setFollowing(res));
  //     getAllPosts();
  //   });
  // };

  // const getFollowers = async () => {
  //   fetchData("/api/user/connection/follower", undefined, (res) => {
  //     // setShowFollowers(res?.data);
  //     dispatch(setFollowers(res));
  //   });
  // };

  useEffect(() => {
    // getAllFollowers() this is for get all the status of the follower
    getAllFollowers();
    getAllPosts();
    // getFollowers();
    // getFollowing();
    // getAllStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);
  // here i use the filterPostData to filter the post which i am deleting...
  useEffect(() => {
    getAllFollowers();
    filterPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del]);
  useEffect(() => {
    getAdditionalDetails();
    const query = new URLSearchParams(location.search).get("tab");
    // //console.log(query,"Test");
    if (query === "explore") setValue("2");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleCommentUpdate = (post) => {
    //console.log(posts, "check posts");
    if (post.postId)
      setPosts((data) =>
        data.map((p) => {
          //console.log(p, post, "check data in handle comment log");
          return p.postId === post.postId ? post : p;
        })
      );
  };
  return (
    <>
      <MultiStateUserIntrests />
      <UserComments updComments={handleCommentUpdate} />
      {/* <Share /> */}
      {/* <AddStory setOpen={setOpen} open={open} /> */}
      <Layout title={"SMAC | Freelance And Marketplace"}>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginTop: "43px",
          }}
        >
          <AddStoryBtn click={handleClickOpen} />

          <StoriesSlider stories={stories} myStories={myStories} />
        </Box> */}
        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <TabContext value={value}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",

                top: "4rem",
                zIndex: 10,
                background: "#f8f8f8",

                paddingBottom: "5px",
                flexWrap: "wrap",
                [theme.breakpoints.down("sm")]: {
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                },
              }}
            >
              <TabList
                onChange={handleChange}
                //remove underline from tabs
                sx={{
                  "& span": {
                    position: "block",
                    display: "none",
                    height: "0px",
                  },
                  mt: "0.25rem",
                  borderRadius: "12px",
                  background: "white",
                  width: "100%",
                  maxWidth: {
                    lg: "450px",
                    md: "450px",
                    sm: "450px",
                    xs: "100%",
                  },
                  padding: "8px",
                  // border: "1px solid black",
                  border: "1px solid #86868650",
                  height: "55px",
                  display: "flex",
                  justifyContent: "space-between !important",
                  "& .css-heg063-MuiTabs-flexContainer": {
                    justifyContent: "space-between",
                  },
                }}
              >
                {/* tab buttons? */}
                <Tab
                  label={"For You"}
                  value="1"
                  sx={{
                    width: "100%",
                    maxWidth: {
                      lg: "213px",
                      md: "213px",
                      sm: "213px",
                      xs: "48%",
                    },
                    minHeight: "38px",
                    // marginRight: "6px",
                  }}
                />
                <Tab
                  label={"Explore"}
                  value="2"
                  sx={{
                    minHeight: "40px",
                    width: "100%",
                    maxWidth: {
                      lg: "213px",
                      md: "213px",
                      sm: "213px",
                      xs: "48%",
                    },
                  }}
                />
              </TabList>
              <UploadPost
                cb={setNewPost}
                style={{
                  marginRight: "6px",
                  zIndex: 5,
                }}
              />
            </Box>
            <TabPanel value="1" sx={{ padding: "0" }}>
              <Box
                sx={{
                  padding: {
                    lg: "40px 0px",
                    md: "30px 0px",
                    sm: "20px 0",
                    xs: "10px 0",
                  },
                }}
              >
                <Posts delCb={setDel} myposts={posts ? posts : null} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SyncLoader
                    color="#5AB9A6"
                    loading={isFetching}
                    margin={4}
                    size={10}
                    speedMultiplier={1}
                  />
                </div>
                {/* post button code/\ */}
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Explore />
            </TabPanel>
          </TabContext>
        </Box>
      </Layout>
    </>
  );
};

export default HomePage;
