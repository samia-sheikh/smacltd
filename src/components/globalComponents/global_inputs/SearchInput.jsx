import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AutoCompleteInput from "./AutoComplete";
import { RxCross2 } from "react-icons/rx";
// import { alpha } from "@mui/material";
const SearchInput = ({
  inputType,
  display,
  margin,
  backgroundColor,
  Icondisply,
  dropDownData,
  autoCompleteStyles,
  area,
  width,
  onChange,
  setInputWidth,
}) => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: alpha(theme.palette.common.white, 0.15),

    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      // marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    marginTop: "1px",
    height: "100%",
    maxHeight: "40px",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#868686",
    // background:"green"
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(0, 1, 0, 1),
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        maxWidth: "500px",
      },
    },
  }));
  const [query, setQuery] = useState("");
  const [flag, setFlag] = useState(false);
  const handleKeyPressEvent = (e) => {
    if (e.key === "Enter") {
      onChange(e);
      setQuery(e.target.value);
    }
  };

  // const location = useLocation();
  // const query = new URLSearchParams(location.search).get("searchQuery");
  return (
    <Search
      sx={{
        width: `${area ? "100%" : width ? "90%" : "500px"} !important`,
        "@media (max-width:600px)": {
          display: display ? { xs: "none", sm: "none", md: "block" } : "block",
          margin: margin,
        },
      }}
    >
      <SearchIconWrapper>
        <SearchIcon sx={Icondisply} />
      </SearchIconWrapper>
      {inputType === "multitag" ? (
        <AutoCompleteInput dropDownData={dropDownData} />
      ) : (
        <>
          <StyledInputBase
            // onChange={onChange}
            onKeyDown={handleKeyPressEvent}
            placeholder="Search…"
            autoFocus={flag}
            inputProps={{ "aria-label": "search" }}
            sx={{
              width: "100% !important",
              borderRadius: "6px",
              backgroundColor: `${
                backgroundColor ? backgroundColor : " rgba(20, 184, 166, 0.03)"
              } `,
              border: "1px solid rgba(20, 184, 166, 0.05)",
              ...autoCompleteStyles,
            }}
            defaultValue={query}
            onBlur={() => {
              setInputWidth && setInputWidth(false);
              setFlag(false);
            }}
            onFocusCapture={(event) => {
              //console.log(event.target,"check target");
              setFlag(true);

              setInputWidth && setInputWidth(true);
            }}
          />
        </>
      )}
      {query ? (
        <RxCross2
          onClick={() => {
            setInputWidth && setInputWidth(false);
            setQuery("");
          }}
          style={{ position: "absolute", right: 12, top: 12 }}
        />
      ) : null}
    </Search>
  );
};

export default SearchInput;
