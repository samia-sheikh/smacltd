import { createSlice } from "@reduxjs/toolkit";

export const DashBoardProductsSlice = createSlice({
  name: "DashBoardProductsSlice",
  initialState: {
    dashBoarduser: null,
    dashBoardproducts: null,
    dashBoardAllproducts: null,
    dashBoardcourse: null,
    dashBoardAllcourse: null,
  },
  reducers: {
    setDashboardUser: (state, action) => {
      state.dashBoarduser = action.payload;
    },
    setDashboardProducts: (state, action) => {
      state.dashBoardproducts = action.payload;
    },
    setDashboardAllProducts: (state, action) => {
      state.dashBoardAllproducts = action.payload;
    },
    setDashboardCourse: (state, action) => {
      state.dashBoardcourse = action.payload;
    },
    setDashboardAllCourse: (state, action) => {
      state.dashBoardAllcourse = action.payload;
    },
    clearDashboardUser: (state) => {
      state.dashBoarduser = null;
      state.dashBoardcourse = null;
      state.dashBoardproducts = null
    },
  },
});

export const {
  setDashboardUser,
  setDashboardProducts,
  setDashboardAllProducts,
  setDashboardCourse,
  setDashboardAllCourse,
  clearDashboardUser,
} = DashBoardProductsSlice.actions;

export default DashBoardProductsSlice.reducer;
