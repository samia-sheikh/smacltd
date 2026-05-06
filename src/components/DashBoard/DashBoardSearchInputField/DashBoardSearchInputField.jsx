import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import useFetch from "../../../features/hooks/useFetch";
import { Chip, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDashboardUser,
  setDashboardCourse,
  setDashboardProducts,
  setDashboardUser,
} from "../../../features/slice/DashBoardProductsSlice";

export default function DashBoardSearchInputField({ url, cb }) {
  //console.log("API URL:", url);

  const allproducts = useSelector(
    (state) => state.DashBoardProductsSlice.dashBoardAllproducts
  );
  const { fetchData } = useFetch();
  const [userSearch, setUserSearch] = React.useState("");
  const [userData, setUserData] = React.useState(null);
  // const [userProdctsData, setUserProductsData] = React.useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const dispatch = useDispatch();
  // const [lengthFlags, setLengthFlags] = React.useState(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(userSearch);
    }, 300); // Adjust the delay time as needed

    return () => clearTimeout(delay);
  }, [userSearch]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      //console.log("Fetching data for:", debouncedSearchTerm);
      fetchData(
        `/api/admin/user?filter=${debouncedSearchTerm}`,
        undefined,
        (res) => {
          //console.log("API Response:", res);
          setUserData(res.data.length > 0 ? res.data : null);
        }
      );
    } else {
      setUserData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserSearch(value);
  };

  const handleClick = (values) => {
    // //console.log("Selected User:", values);
    setUserSearch(`${values.firstName} ${values.lastName}`);

    if (values.email.trim() !== "") {
      const data = values.email;
      //console.log("check url",`${url}getSingle/`);
      fetchData(`${url}/` + data, undefined, (res) => {
        // //console.log("API Response for user data:", res);
        // setLengthFlags(res?.data?.length);
        dispatch(setDashboardUser(values));

        if (url === "/api/admin/course/") {
          dispatch(setDashboardCourse(res.data));
          // //console.log("Dispatched setDashboardCourse:", res.data);
        } else if (url === "/api/admin/product/") {
          dispatch(setDashboardProducts(res.data));
          // //console.log("Dispatched setDashboardProducts:", res.data);
        }
      });
    } else {
      // setUserProductsData(null);
    }
  };

  useEffect(() => {
    // Clear user from Redux when input is cleared
    if (userSearch.trim() === "") {
      // //console.log("User search input cleared, resetting data...");
      dispatch(clearDashboardUser());
      if (url === "api/admin/product/") {
        cb(allproducts);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSearch]);

  return (
    <Box
      sx={{
        width: "100%",
        zIndex: 1,
        position: "relative",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search..."
        id="search-input"
        value={userSearch}
        onChange={handleChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "0px 8px",
          },
        }}
      />
      {userData !== null && (
        <>
          <Typography
            component={"span"}
            sx={{
              color: "#CCCCCC",
              display: "block",
              marginTop: "10px",
            }}
          >
            Suggested Users:
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            gap={2}
            sx={{ flexWrap: "wrap", marginTop: "10px" }}
          >
            {userData.map((DashBoardSearch, index) => {
              const fullName = `${DashBoardSearch.firstName} ${DashBoardSearch.lastName}`;
              return (
                <Chip
                  onClick={() => handleClick(DashBoardSearch)}
                  value={userSearch}
                  label={fullName}
                  key={DashBoardSearch.updatedAt}
                  sx={{
                    borderRadius: "5px",
                  }}
                />
              );
            })}
          </Stack>
        </>
      )}
      {userData === null && userSearch.trim() !== "" && (
        <Typography
          component={"span"}
          sx={{
            color: "#CCCCCC",
            display: "block",
            marginTop: "10px",
          }}
        >
          No User Found
        </Typography>
      )}
    </Box>
  );
}
