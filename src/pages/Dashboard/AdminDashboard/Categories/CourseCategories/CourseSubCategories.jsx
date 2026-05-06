import {
  Box,
  Divider,
  Table,
  Typography,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetch from "../../../../../features/hooks/useFetch";
import ButtonComp from "../../../../../components/globalComponents/ButtonComp";
import moment from "moment";
import DeleteCategory from "../../../../../components/DashBoard/AdminDashboard/Models/DeleteCategory";
import { useSelector } from "react-redux";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import AddSubCategory from "../../../../../components/DashBoard/AdminDashboard/Models/AddSubCategory";
import SearchInput from "../../../../../components/globalComponents/global_inputs/SearchInput";
const CourseSubCategories = ({ setCourseCategory }) => {
  const { fetchData } = useFetch();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddSubOpen, setIsAddSubOpen] = useState(false);
  const [anyCategoryChanges, setAnyCategoryChanges] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);
  const { singleParentCategoryCourse } = useSelector(
    (state) => state.parentCategories
  );
  useEffect(() => {
    fetchData(
      `/api/course/sub?parentCategoryId=${singleParentCategoryCourse?.courseParentCategoryId}`,
      undefined,
      (res) => {
        setCourseCategories(res.data);
      }
    );
  }, [anyCategoryChanges]);
  const handleGlobalSearch = (event) => {
    event.preventDefault();

    try {
      fetchData(
        `/api/admin/course/sub/search/${singleParentCategoryCourse?.courseParentCategoryId}/?searchQuery=${event.target.value}`,
        undefined,
        (res) => {
          if (res) {
            setCourseCategories(res.data);
          }
        }
      );

      // fetchData()
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <>
      {" "}
      <AddSubCategory
        isOpen={isAddSubOpen}
        onClose={() => {
          setIsAddSubOpen(false);
        }}
        setIsOpen={setIsAddSubOpen}
        url={"/api//admin/course/sub"}
        parentCategory={singleParentCategoryCourse}
        module={"course"}
        anyChanges={setAnyCategoryChanges}
      />
      {deleteCategory ? (
        <DeleteCategory
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
          }}
          setIsOpen={setIsDeleteOpen}
          category={deleteCategory}
          //   url={"/api/admin/course/parent"}
          url={`api/admin/course/sub/${deleteCategory?.courseSubCategoryId}`}
          anyChanges={setAnyCategoryChanges}
        />
      ) : null}
      <Box
        sx={{
          // backgroundColor: "red",
          padding: "15px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          sx={{
            margin: "10px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowBackIosRoundedIcon
              onClick={() => {
                setCourseCategory(true);
              }}
              sx={{ cursor: "pointer" }}
            />
            <Typography
              component={"span"}
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                lineHeight: "20px",
              }}
            >
              {singleParentCategoryCourse?.name}
            </Typography>
          </Box>
          <Box sx={{ width: "170px" }}>
            <ButtonComp
              label={"Add Sub Category"}
              click={() => setIsAddSubOpen(!isAddSubOpen)}
            />
          </Box>
        </Box>

        <Divider
          sx={{
            width: "100%",
          }}
        />
        <Box
          sx={{
            margin: "10px 0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchInput display={true} onChange={handleGlobalSearch} area />
          {/* <DashBoardSearchInputField url={"api/admin/user?filter=test"} /> */}
        </Box>
        <Box>
          <Table aria-label="simple table">
            {courseCategories?.map((category) => (
              <TableRow key={category.courseSubCategoryId}>
                <TableCell>
                  <Typography
                    component={"span"}
                    variant="h6Grey"
                    sx={{ display: "block" }}
                  >
                    Category Name
                  </Typography>

                  <Typography variant="h5BlackBold">{category.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component={"span"}
                    variant="h6Grey"
                    sx={{ display: "block" }}
                  >
                    Date & time
                  </Typography>{" "}
                  <Typography variant="h5BlackBold" sx={{ textWrap: "nowrap" }}>
                    {moment(category.createdAt).utc().format("DD-MM-YYYY")}
                  </Typography>
                </TableCell>

                <TableCell width={230}>
                  <Typography
                    component={"span"}
                    variant="h6Grey"
                    sx={{ display: "block" }}
                  >
                    Actions
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <ButtonComp
                      // disabled={true}
                      // onClick={closeTicket}
                      customStyles={{
                        border: "0.5px solid #14B8A6",
                        borderRadius: "6px",
                        width: "140px",
                        padding: "5px 8px",
                        marginTop: "2px",
                        color: "#14B8A6",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: "transparent",
                      }}
                      label={"Edit"}
                    />

                    <ButtonComp
                      // disabled={true}
                      // onClick={closeTicket}
                      customStyles={{
                        border: "0.5px solid red",
                        borderRadius: "6px",
                        width: "100px",
                        padding: "5px 8px",
                        marginTop: "2px",
                        color: "red",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: "transparent",
                      }}
                      customHover={{ border: "0.5px solid red", color: "red" }}
                      label={"Delete"}
                      click={() => {
                        setDeleteCategory(category);
                        setIsDeleteOpen(!isOpen);
                      }}
                    />
                  </Box>
                  {/* <Typography variant="h5BlackBold">Closed</Typography> */}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default CourseSubCategories;
