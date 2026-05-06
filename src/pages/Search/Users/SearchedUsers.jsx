import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SingleSearchedUserCard from "../../../components/User/SingleSearchedUserCard";

const SearchedUsers = () => {
  const { users, searchValue } = useSelector((state) => state.globalSearch);

  return (
    <Box>
      {users?.length === 0 ? (
        <Typography variant="h4Black">
          There are no users for query {searchValue}
        </Typography>
      ) : (
        users?.map((item, index) => {
          return <SingleSearchedUserCard item={item} key={index} />;
        })
      )}
    </Box>
  );
};

export default SearchedUsers;
