import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import {
  setAutoCompleteArray,
  setPostInterests,
  setUserInterests,
} from "../../../features/slice/autoCompleteSlice";

export default function MultipleSelectInput({
  dataArray,
  label,
  placeholder,
  defaltValue,
  optionLabel,
  name,
}) {
  const yourData = dataArray;
  let dispatch = useDispatch();
  return (
    <div className="App">
      <Autocomplete
        multiple
        id="multiple-limit-tags"
        limitTags={2}
        options={yourData}
        defaultValue={defaltValue}
        isOptionEqualToValue={(option, value) => value.id === option.id}
        getOptionLabel={optionLabel}
        filterSelectedOptions
        // getOptionLabel={(option) =>
        //   typeof option === "string" ? option : option.optionLabel
        // }
        required
        sx={{
          width: "100%",
          maxWidth: "808px",
        }}
        onChange={(e, valueTags) => {
          e.preventDefault();

          //user will specify the name with the component and the data will be set on the specific reducer
          if (name === "interests") {
            dispatch(setUserInterests({ userInterests: valueTags }));
          } else if (name === "uploadPost") {
            dispatch(setPostInterests({ postInterests: valueTags }));
          } else {
            dispatch(setAutoCompleteArray({ autoCompleteArray: valueTags }));
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={`Select ${placeholder}`}
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: "808px",
            }}
          />
        )}
      />
    </div>
  );
}
