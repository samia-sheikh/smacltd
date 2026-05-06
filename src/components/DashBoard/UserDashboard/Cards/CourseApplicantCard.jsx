import React from "react";
import { Typography, TableCell, TableRow } from "@mui/material";
import ImageComp from "../../../globalComponents/ImageComp";

const CourseApplicantCard = ({ applicant }) => {
  return (
    <TableRow>
      <TableCell>
        <ImageComp
          sx={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={
            applicant.user.profilePic
              ? applicant.user.profilePic
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
          }
          alt="UserImage"
        />
      </TableCell>
      <TableCell>
        <Typography
          component={"span"}
          variant="h5"
          sx={{ marginBottom: "10px", display: "block" }}
        >
          Name
        </Typography>
        {applicant.user.firstName + " " + applicant.user.lastName}
      </TableCell>

      <TableCell>
        <Typography
          component={"span"}
          variant="h5"
          sx={{ marginBottom: "10px", display: "block" }}
        >
          Email
        </Typography>
        {applicant.userEmail}
      </TableCell>
    </TableRow>
  );
};

export default CourseApplicantCard;
