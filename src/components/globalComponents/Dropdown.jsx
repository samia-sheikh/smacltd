import React, { useState } from "react";
// import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// import NativeSelect from "@mui/material/NativeSelect";

import { Box, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountry,
  setLanguage,
} from "../../features/slice/Social/multiStateUserIntrestsSlice";
const Dropdown = ({ data, cb, objKey, name, width }) => {
  const { country, language } = useSelector(
    (state) => state.multiStateUserIntrests
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [array, setArray] = useState(null);
  const [objectKey, setObjectKey] = useState(null);
  const dispatch = useDispatch();
  // Set default value  when component mounts
  React.useEffect(() => {
    // //console.log(selectedOption,"selected");
    if (data) {
      setArray(data);
      setObjectKey(objKey);

      setSelectedOption(data[0][objKey] ? data[0][objKey] : data[0]);
      if (
        name === "market" ||
        name === "course" ||
        name === "singleCategoryCourses"
      ) {
        setSelectedOption("Select Categories");
      }

      if (name === "country") {
        if (!country) dispatch(setCountry({ data: data[0][objKey] }));
        setSelectedOption(country);
      }
      if (name === "Language") {
        if (!language) dispatch(setLanguage({ data: data[0][objKey] }));
        setSelectedOption(language);
      }
    } else {
      setArray(dummyData);
      setObjectKey("subCategories");
      setSelectedOption(
        dummyData[0]["subCategories"]
          ? dummyData[0]["subCategories"][0]
          : dummyData[0]
      );
    }
    if (cb) {
      cb(selectedOption); // Notify parent component of the default value
    }
  }, [language, country]); // Empty dependency array to run only once on mount

  function handleChange(event) {
    if (cb) {
      cb(event.target.value);
    }
    setSelectedOption(event.target.value);

    if (name === "country") {
      //console.log(event.target.value, "Country");
      dispatch(setCountry({ data: event.target.value }));
    }
    if (name === "Language") {
      dispatch(setLanguage({ data: event.target.value }));
      //console.log(event.target.value, "Language");
    }
  }
  // let styles = {
  //   "&:focused": {
  //     border: "2px solid black",
  //   },
  // };
  let dummyData = [
    {
      subCategories: ["loading.."],
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        // minWidth: width ? width : 120,
      }}
    >
      {/* <FormControl fullWidth >
        <NativeSelect variant="outlined"
          sx={{ border: "none", width: "250px", height: "50px", padding: "10px" }}
          //defaultValue={data[0].objKey}
          inputProps={{
            name: "countryName",
            id: "uncontrolled-native",
          }}
        >
          {data.map((item, index) => {
            return (
              <option value={item[objKey]} key={index}>
                {item[objKey]}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl> */}
      <FormControl fullWidth>
        <Select
          variant="standard"
          disableUnderline
          sx={{
            border: "none",
            borderRadius: "8px 0px 0px 8px",
            width: width ? width : "250px",
            height: "50px",
            padding: "0px 0px 0px 20px",
            "& .Mui-focused": {
              border: "none",
            },
            "& .MuiSelect-select": {
              border: "none",
              borderRight: "1px solid #d4d4d4",
              backgroundColor: "white",
            },
            "& .MuiInput-root": {
              "&:before, &:after": {
                display: "none", // Remove underline hover and focus
              },
              "&:hover:not(.Mui-disabled):before": {
                border: "none", // No border on hover
              },
            },
            "&.Mui-focused": {
              border: "none", // Remove border on focus
            },
            "&:hover": {
              border: "none", // Remove border on hover
            },
            // ...styles,
          }}
          value={selectedOption}
          onChange={handleChange}
          name={name}
        >
          {name === "market" || name === "course" ? (
            <MenuItem value={"Select Categories"}>All</MenuItem>
          ) : null}
          {array?.map((item, index) => {
            return (
              <MenuItem
                value={item[objectKey] ? item[objectKey] : item}
                key={item.id ? item.id : index}
              >
                {item[objectKey] ? item[objKey] : item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
