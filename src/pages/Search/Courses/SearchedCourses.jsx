import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ImageComp from "../../../components/globalComponents/ImageComp";
import theme from "../../../theme";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SearchedCourses = () => {
  const navigate = useNavigate();
  const { courses, searchValue } = useSelector((state) => state.globalSearch);
  return (
    <Box
      sx={{
        margin: "0 auto",
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "32% 32% 32%",
        [theme.breakpoints.down("lg")]: {
          gridTemplateColumns: "50% 50%",
        },
        [theme.breakpoints.down("md")]: {
          gridTemplateColumns: "auto",
          justifyItems: "center",
        },
        // [theme.breakpoints.down("sm")]: {
        //   gridTemplateColumns: "auto",
        //   justifyItems: "center",
        // },
      }}
    >
      {courses?.length === 0 ? (
        <Typography variant="h4Black">
          There are no courses for query {searchValue}
        </Typography>
      ) : (
        courses?.map((c) => {
          return (
            <Paper
              sx={{
                width: "100%",
                maxWidth: "544px",
                cursor: "pointer",
                ":hover": {
                  boxShadow: "0px 0px 10px 0px rgba(105,105,105,0.5)",
                },

                "@media(max-width:375px)": {
                  maxWidth: "300px",
                },
              }}
              key={c.courseId}
              onClick={() => {
                navigate(`/course/${c.courseId}`);
              }}
            >
              <ImageComp
                src={c.images[0]}
                alt={c.title}
                sx={{ height: "270px", width: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  padding: "24px",
                  "@media (max-width:375px)": {
                    padding: "12px",
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      marginBottom: "24px",
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {c.title.length > 30
                        ? `${c.title.substring(0, 30)} ...`
                        : c.title.substring(0, 30)}
                    </Typography>
                    <Typography
                      variant="h4Black"
                      sx={{ wordBreak: "break-all" }}
                    >
                      {c.description.substring(0, 100)}
                    </Typography>
                    <Box sx={{ display: "flex", gap: "20px" }}>
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
                          Course Type:
                        </Typography>
                        <Typography variant="subHeader">{c.mode}</Typography>
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
                          {c.courseDuration}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#EDEDED",
                        // width: "max-content",
                        width: "100%",

                        display: "flex",
                        gap: "8px",
                        padding: "5px 8px",
                        borderRadius: "4px",
                        "@media(max-width:375px)": {
                          gap: "0px",
                          padding: "5px 5px",
                        },
                      }}
                    >
                      <Typography variant="subHeaderBlack">
                        Class Days:{" "}
                      </Typography>
                      <Typography variant="subHeader">
                        {c.classDays?.map((d, i) => {
                          let str = i === c.classDays.length - 1 ? " " : ", ";
                          return d + str;
                        })}
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
                        {c.classDuration}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h4Black"
                      sx={{ textTransform: "capitalize" }}
                    >
                      By:{" "}
                      {c.user?.firstName.substring(0, 10) +
                        " " +
                        c.user?.lastName.substring(0, 10)}
                    </Typography>
                    <Typography variant="h4Black">
                      {moment

                        .utc(c.createdAt)
                        .local()
                        .startOf("seconds")
                        .fromNow()}
                    </Typography>
                    <Typography
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        padding: "5px 16px",
                        color: "white",
                        borderRadius: "4px",
                      }}
                    >
                      {c.courseFee}PKR
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          );
        })
      )}
    </Box>
  );
};

export default SearchedCourses;
