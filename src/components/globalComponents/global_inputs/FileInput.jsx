import React from "react";
import { Field } from "formik";
import { Box, Typography } from "@mui/material";

const FileInput = ({ field, form }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    form.setFieldValue(field.name, file);
  };
  return (
    <div>
      <Box>
        <label htmlFor={field.name}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <Typography variant="uploadForm">Upload Image</Typography>
          </Box>
        </label>
        <input
          type="file"
          id={field.name}
          name={field.name}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {form.touched[field.name] && form.errors[field.name] && (
          <Typography variant="error">{form.errors[field.name]}</Typography>
        )}
      </Box>
    </div>
  );
};

export default FileInput;
