import {
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import ImageComp from "../../../../components/globalComponents/ImageComp";
import useFetch from "../../../../features/hooks/useFetch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const CourseListCard = ({ row, updateDataOnDelete,onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);
  const { deleteData } = useFetch();
  const handleDeleteOptionClick = (course) => {
    setAnchorEl(null);
    deleteData(`/api/admin/course/${course.courseId}`, (res) => {
      //after deleting data filter current data and set updated courses data
      updateDataOnDelete(course.courseId);
    });
  };
  const handleDeleteIconClick = (event, courseId) => {
    setAnchorEl(event.currentTarget);
    // ////console.log(courseId, "course icon Click");
    setSelectedCourseId(courseId);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  function convertCreatedAtTime(params) {
    const date = new Date(params);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <TableRow>
      <TableCell
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "none",
        }}
        onClick={onClick}
      >
        <ImageComp
          src={row.images[0]}
          sx={{
            width: "53px",
            height: "53px",
            borderRadius: "6px",
            objectFit: "cover",
          }}
          alt="Market"
        />
      </TableCell>
      <TableCell sx={{ borderBottom: "none", width: "20%" }}>
        <Typography variant="h6Grey">
          {row.title.length > 25
            ? row.title.substring(0, 25) + "....."
            : row.title}
        </Typography>
      </TableCell>
      <TableCell sx={{ borderBottom: "none", width: "20%" }}>
        <Typography variant="h6Grey">
          {row?.user?.firstName + " " + row?.user?.lastName}
        </Typography>
      </TableCell>
      <TableCell sx={{ borderBottom: "none", width: "20%" }}>
        <Typography variant="h6Grey">{convertCreatedAtTime(row.createdAt)}</Typography>
      </TableCell>
      <TableCell sx={{ borderBottom: "none", width: "20%" }}>
        <Typography variant="h6Grey">Listed</Typography>
      </TableCell>
      <TableCell sx={{ borderBottom: "none", width: "20%" }}>
        <IconButton
          sx={{
            margin: "5px 5px 0px 0px",
            isolation: "isolate",
            // mixBlendMode:"difference",
            color: "white",
            backgroundColor: "black",
            filter: "invert(1)",
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteIconClick(event, row);
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
              handleDeleteOptionClick(selectedCourseId);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default CourseListCard;
