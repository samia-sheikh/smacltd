import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import ImageComp from "../globalComponents/ImageComp";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";
import ProfilePicture from "../globalComponents/ProfilePicture";
const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "544px",
        cursor: "pointer",
        borderRadius: "1rem",
        ":hover": {
          boxShadow: "0px 0px 10px 0px rgba(105,105,105,0.5)",
        },
        "@media(max-width:1000px)": {
          width: "100%",
          maxWidth: "400px",
        },
        "@media(max-width:420px)": {
          width: "100%",
          maxWidth: "360px",
        },
      }}
      onClick={() => {
        navigate(`/course/${course?.courseId}`);
      }}
    >
      <Box sx={{ padding: "1rem" }}>
        <Box height={270}>
          <ImageComp
            src={course?.images[0]}
            alt={course?.title}
            sx={{
              height: "270px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "12px",
              mb: "1rem",
            }}
          />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
              {course?.title.length > 30
                ? `${course?.title.substring(0, 30)} ...`
                : course?.title.substring(0, 30)}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: "12px",
                [theme.breakpoints.down("sm")]: {
                  gap: "8px",
                  flexWrap: "wrap",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#EDEDED",
                  // width: "max-content",
                  // display: "flex",
                  minWidth: "155px",
                  gap: "8px",
                  padding: "5px 8px",
                  borderRadius: "4px",
                  [theme.breakpoints.down("sm")]: {
                    // width: "100%",
                  },
                }}
              >
                <Typography variant="subHeaderBlack" fontSize={"15px"}>
                  Course Duration:{" "}
                </Typography>
                <Typography variant="subHeader" fontSize={"14px"}>
                  {course?.courseDuration}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#EDEDED",
                  // width: "100%",
                  // display: "flex",
                  minWidth: "155px",
                  gap: "8px",
                  padding: "5px 8px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="subHeaderBlack" fontSize={"15px"}>
                  Class Duration:{" "}
                </Typography>
                <Typography variant="subHeader" fontSize={"14px"}>
                  {course?.classDuration}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          alignItems: "center",
          flexWrap: "wrap-reverse",
          gap: "8px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ProfilePicture
            src={course?.user?.profilePic}
            firstName={course?.user?.firstName}
          />
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "1.25rem",
              color: "#333333",
              fontWeight: 700,
              width: "max-content",
            }}
          >
            {course?.user?.firstName.substring(0, 10) +
              " " +
              course?.user?.lastName.substring(0, 10)}
          </Typography>
        </Box>

        <Box
          sx={{
            color: theme.palette.primary.main,
            padding: "5px 16px",
            fontWeight: 700,
            borderRadius: "9px",
            border: "1px solid #CFCFCF",
            fontStyle: "italic",
            height: "max-content",
            width: "95%",
            maxWidth: "max-content",
            textWrap: "wrap",
            boxShadow: "0px 5.13px 18.35px 0px #93939338",
          }}
        >
          PKR{course?.courseFee}
        </Box>
      </Box>
    </Paper>
  );
};

export default CourseCard;
