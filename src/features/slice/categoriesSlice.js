import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseParentCategories: null,
  productParentCategories: null,
  serviceParentCategories: null,
  singleParentCategoryProduct: null,
  singleParentCategoryCourse: null,
  singleParentCategoryService: null,
};

const categoriesSlice = createSlice({
  name: "parentCategories",
  initialState,
  reducers: {
    setCourseParentCategories: (state, action) => {
      state.courseParentCategories = action.payload.data;
    },
    setProductParentCategories: (state, action) => {
      state.productParentCategories = action.payload.data;
    },
    setServiceParentCategories: (state, action) => {
      state.serviceParentCategories = action.payload.data;
    },
    setSingleParentCategoryProduct: (state, action) => {
      state.singleParentCategoryProduct = action.payload.data;
    },
    setSingleParentCategoryCourse: (state, action) => {
      state.singleParentCategoryCourse = action.payload.data;
    },
    setSingleParentCategoryService: (state, action) => {
      state.singleParentCategoryService = action.payload.data;
    },
  },
});

export const {
  setCourseParentCategories,
  setProductParentCategories,
  setSingleParentCategoryCourse,
  setSingleParentCategoryProduct,
  setSingleParentCategoryService,
  setServiceParentCategories
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
