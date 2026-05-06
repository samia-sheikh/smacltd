import React from "react";
import { Box, InputBase, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
const TextInput = ({ field, form: { touched, errors }, sx, ...props }) => {
  // //console.log("errors ", errors);
  return (
    <>
      <InputBase fullWidth {...props} {...field} sx={{ ...sx }} />
      {errors[field.name] && touched[field.name] ? (
        // <span style={{ color: "red" }}>{errors[field.name]}</span>
        <Box
          sx={{
            mt:
              field.name === "password" ||
              "currentPassword" ||
              "newPassword" ||
              "confirmPassword"
                ? "16px"
                : "0px",
            background: "#D94A4430",
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarningAmberIcon
            sx={{ color: "red", fontSize: "22px", padding: "0px 8px 0px 0px" }}
          />
          <Typography sx={{ color: "red", fontSize: "12px", padding: "0px" }}>
            {errors[field.name]}
          </Typography>
        </Box>
      ) : null}
    </>
  );
};

export default TextInput;
