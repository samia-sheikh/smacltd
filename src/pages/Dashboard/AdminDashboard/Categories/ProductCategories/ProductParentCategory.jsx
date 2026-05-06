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
import AddParentCategory from "../../../../../components/DashBoard/AdminDashboard/Models/AddParentCategory";
// import DeleteCategory from "../../../../../components/DashBoard/AdminDashboard/Models/DeleteCategory";
import { useDispatch } from "react-redux";
import { setSingleParentCategoryProduct } from "../../../../../features/slice/categoriesSlice";
import SearchInput from "../../../../../components/globalComponents/global_inputs/SearchInput";
import EditParentCategory from "../../../../../components/DashBoard/AdminDashboard/Models/EditParentCategory";
// import DashBoardSearchInputField from "./../../../../../components/DashBoard/DashBoardSearchInputField/DashBoardSearchInputField";

const ProductParentCategory = ({ setProductCategory }) => {
  const { fetchData } = useFetch();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  // const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // const [deleteCategory, setDeleteCategory] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [productCategories, setProductCategories] = useState([]);
  const [anyCategoryChanges, setAnyCategoryChanges] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData("/api/product/parent", undefined, (res) => {
      setProductCategories(res.data);
    });
  }, [anyCategoryChanges]);
  const handleGlobalSearch = (event) => {
    event.preventDefault();

    try {
      fetchData(
        `/api/admin/product/parent/search?searchQuery=${event.target.value}`,
        undefined,
        (res) => {
          if (res) {
            setProductCategories(res.data);
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
      <AddParentCategory
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        setIsOpen={setIsOpen}
        url={"/api/admin/product/parent"}
        anyChanges={setAnyCategoryChanges}
      />
      {categoryToEdit && (
        <EditParentCategory
          selectedCategory={categoryToEdit}
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
          }}
          url={`/api/admin/product/parent/${categoryToEdit?.productParentCategoryId}`}
          anyChanges={setAnyCategoryChanges}
        />
      )}
      {/* {deleteCategory ? (
        <DeleteCategory
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
          }}
          anyChanges={setAnyCategoryChanges}
          setIsOpen={setIsDeleteOpen}
          category={deleteCategory}
          url={`/api/admin/product/parent/${deleteCategory.productParentCategoryId}`}
        />
      ) : null} */}
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
          <Typography component={"span"} variant="h4">
            Product Categories
          </Typography>
          <Box sx={{ width: "150px" }}>
            <ButtonComp
              label={"Add Category"}
              click={() => setIsOpen(!isOpen)}
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
          {/* <DashBoardSearchInputField
            url={`/api/admin/product/parent/${deleteCategory.productParentCategoryId}`}
          /> */}
        </Box>
        <Box>
          <Table aria-label="simple table">
            {productCategories?.map((category, index) => (
              <TableRow key={index}>
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
                      label={"Sub Categories"}
                      click={(prev) => {
                        dispatch(
                          setSingleParentCategoryProduct({ data: category })
                        );
                        setProductCategory(!prev);
                      }}
                    />
                    <ButtonComp
                      // disabled={true}
                      // onClick={closeTicket}
                      customStyles={{
                        border: "0.5px solid #14B8A6",
                        borderRadius: "6px",
                        width: "100px",
                        padding: "5px 8px",
                        marginTop: "2px",
                        color: "#14B8A6",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: "transparent",
                      }}
                      label={"Edit"}
                      click={() => {
                        dispatch(
                          setSingleParentCategoryProduct({ data: category })
                        );
                        setIsEditOpen(true);
                        setCategoryToEdit(category);
                      }}
                    />

                    {/* <ButtonComp
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
                    /> */}
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

export default ProductParentCategory;
