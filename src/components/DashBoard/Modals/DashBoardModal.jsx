import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { Fade, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import ImageComp from "../../globalComponents/ImageComp";
import theme from "../../../theme";
import ButtonComp from "../../globalComponents/ButtonComp";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import useFetch from "../../../features/hooks/useFetch";
import { useNavigate } from "react-router-dom";
export default function DashBoardModal({ open, handleClose, dataShow }) {
  const navigate = useNavigate();
  const { deleteData } = useFetch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const users = useSelector(
    (state) => state.DashBoardProductsSlice.dashBoarduser
  );
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleChangeWidth = () => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  };
  const handleDeleteIconClick = (event, courseId) => {
    setAnchorEl(event.currentTarget);
    // //console.log(courseId, "course icon Click");
    // setSelectedCourseId(courseId);
  };
  //get course ID from event and hit delete course as admin
  const handleDeleteOptionClick = (courseId) => {
    //console.log(courseId, "Course for deleting on handle Delete button");
    setAnchorEl(null);
    deleteData(`/api/admin/course/${courseId}`, (res) => {
      //after deleting data filter current data and set updated courses data
      // const afterDelete = coursesData.filter((valueData) => {
      //   return valueData.courseId !== courseId;
      // });
      // setCoursesData(afterDelete);
      handleClose(res);
    });
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const dialogStyles = {
    "& .css-hz1bth-MuiDialog-container": {
      width: "100%",
      padding: "30px",
      margin: 0,
      // background: "green",
      "& .MuiDialog-paper": {
        // background: "red",
        // padding: "35px !important",
        width: "100%",
        maxWidth: `1676px`,
        // maxWidth: `${activeStep === 2 ? "1110px" : "450px"}`,
        padding: "30px",
        margin: 0,
        // maxWidth: activeStep === lastStep ? "540px" : "980px",
        borderRadius: "16px",
      },
    },
  };
  React.useEffect(() => {
    handleChangeWidth();
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth={true}
      sx={{ ...dialogStyles }}
    >
      <Fade in={open}>
        {/* <ModalContent sx={{width:"100%"}}> */}

        <Paper
          sx={{
            borderRadius: "22px",
            padding: `${width > 850 ? "66px" : "20px"}`,
            // display: "flex",
            // flexDirection: `${width > 850 ? "row" : "column"}`,
            display: "flex",
            flexDirection: `${width > 1100 ? "row" : "column"}`,
            gap: "40px",
            // width:"clamp(360px,100%,800px)",
            // background:"red",
          }}
        >
          <Box
            sx={{
              width: "100%",
              // minWidth: "778px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                gap: "1.5rem",
                wordBreak: "break-all",
              }}
            >
              <Typography variant="h1" sx={{ width: "100%" }}>
                {dataShow?.title}
              </Typography>

              <Typography variant="h4Black">
                <ul>
                  <li>{dataShow?.createdAt.substring(0, 10)}</li>
                </ul>
              </Typography>
            </Box>
            <Typography variant="h4Black" sx={{ wordBreak: "break-all" }}>
              {dataShow?.description}
            </Typography>
            <ButtonComp
              label={"More..."}
              click={() => navigate(`/course/${dataShow.courseId}`)}
              // label={`Buy this course/${
              //   dataShow ? dataShow.courseFee : dataShow.price
              // }PKR`}
              customStyles={{ maxWidth: "337px", borderRadius: " 4px" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "24px",

              flexDirection: "column",
              width: "100%",
              // maxWidth: "686px",
            }}
          >
            <Typography variant="h2">Course Details</Typography>

            <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Box
                sx={{
                  backgroundColor: "#EDEDED",
                  width: "max-content",
                  display: "flex",
                  gap: "8px",
                  padding: "5px 8px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="subHeaderBlack">Course Type: </Typography>
                <Typography variant="subHeader">{dataShow?.mode}</Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#EDEDED",
                  width: "max-content",
                  display: "flex",
                  gap: "8px",
                  padding: "5px 8px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="subHeaderBlack">
                  Course Duration:{" "}
                </Typography>
                <Typography variant="subHeader">
                  {dataShow?.courseDuration}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#EDEDED",
                  width: "max-content",
                  display: "flex",
                  gap: "8px",
                  padding: "5px 8px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="subHeaderBlack">
                  Class Duration:{" "}
                </Typography>
                <Typography variant="subHeader">
                  {dataShow?.classDuration}
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: "#EDEDED",
                  width: "max-content",
                  display: "flex",
                  gap: "8px",
                  padding: "5px 8px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="subHeaderBlack">Class Days: </Typography>
                <Typography variant="subHeader">
                  {dataShow?.classDays?.map((d) => {
                    return d + "," + " ";
                  })}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h2">Instructor</Typography>
              {dataShow.user ? (
                <>
                  <Box sx={{ display: "flex", gap: "24px", marginTop: "24px" }}>
                    <ImageComp
                      src={dataShow ? dataShow.user?.profilePic : ""}
                      alt={"story_image"}
                      sx={{
                        borderRadius: "50%",
                        height: "100px",
                        width: "100px",
                        backgroundSize: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <Typography
                        variant="black24"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {dataShow?.user?.firstName +
                          " " +
                          dataShow?.user?.lastName}
                      </Typography>
                      <Typography variant="h4Black">
                        {dataShow?.user?.bio
                          ? dataShow?.user?.bio.substring(0, 30)
                          : ""}
                      </Typography>
                      <Link
                        to={`/user/${dataShow?.user?.email}`}
                        style={{
                          color: theme.palette.primary.main,
                          fontSize: "18px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                          textDecoration: "none",
                          textTransform: "capitalize",
                        }}
                      >{`view profile of ${
                        dataShow?.user?.firstName +
                        " " +
                        dataShow?.user?.lastName
                      }`}</Link>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: "24px", marginTop: "24px" }}>
                  <ImageComp
                    src={users?.profilePic}
                    alt={"story_image"}
                    sx={{
                      borderRadius: "50%",
                      height: "100px",
                      width: "100px",
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <Typography
                      variant="black24"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {users?.firstName + " " + users?.lastName}
                    </Typography>
                    <Typography variant="h4Black">
                      {users?.bio ? users?.bio.substring(0, 30) : ""}
                    </Typography>
                    <Link
                      to={`/user/${users.email}`}
                      style={{
                        color: theme.palette.primary.main,
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                        textDecoration: "none",
                        textTransform: "capitalize",
                      }}
                    >{`view profile of ${
                      users?.firstName + " " + users?.lastName
                    }`}</Link>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "5px 5px 0px 0px",
              color: "black",
              isolation: "isolate",
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteIconClick(event, dataShow.courseId);
            }}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteOptionClick(dataShow?.courseId);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Paper>
        {/* </ModalContent> */}
      </Fade>
    </Dialog>
    // </Layout>
  );
}
