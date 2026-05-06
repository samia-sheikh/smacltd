import { Box, Typography } from "@mui/material";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { setGender } from "../../../../features/slice/Social/multiStateUserIntrestsSlice";

const Gender = () => {
  const { gender } = useSelector((state) => state.multiStateUserIntrests);
  const [value, setValue] = React.useState(gender || "Male");
  //console.log(gender, "Gender from the redux");

  const dispatch = useDispatch();
  // Set default value of female when component mounts
  dispatch(setGender({ data: value }));
  const handleChange = (event) => {
    const selectedGender = event.target.value;
    //console.log(selectedGender, "Selected Gender");
    setValue(selectedGender);
    dispatch(setGender({ data: selectedGender }));
  };

  return (
    <Box
      sx={{
        margin: "40px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          maxWidth: "368px",
        }}
      >
        <Typography variant="h3">What’s your gender?</Typography>
        <Typography variant="paragraph">
          This help us find you more relevant content. We won’t show it on your
          profile.
        </Typography>
      </Box>
      <Box sx={{ width: "100%", display: "flex" }}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={value}
            onChange={handleChange}
            name="radio-buttons-group"
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Gender;
