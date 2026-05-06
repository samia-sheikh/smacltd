import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: null,
  users: null,
  posts: null,
  products: null,
  courses: null,
  services: null,
};

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload.data;
    },
    setUsers: (state, action) => {
      state.users = action.payload.data;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.data;
    },
    setProducts: (state, action) => {
      state.products = action.payload.data;
    },
    setCourses: (state, action) => {
      state.courses = action.payload.data;
    },
    setServices: (state, action) => {
      state.services = action.payload.data;
    },
  },
});

export const {
  setUsers,
  setPosts,
  setProducts,
  setCourses,
  setSearchValue,
  setServices,
} = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
