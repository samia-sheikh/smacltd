import { Button, Typography } from "@mui/material";
import React from "react";
import ImageComp from "./ImageComp";
import theme from "../../theme";
const ButtonComp = ({
  label,
  image,
  click,
  icon,
  customStyles,
  customHover,
  type,
  disabled,
  variant,
}) => {
  const buttonStyles = {
    fontSize: "16px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    width: "100%",
    border: theme.borders.primaryBorder,
    ...customStyles,
    "&:hover": {
      backgroundColor: image
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
      color: theme.palette.primary.main,
      border: theme.borders.primaryBorder,
      ...customHover,
    },
  };
  return (
    <React.Fragment>
      <Button
        sx={buttonStyles}
        onClick={click}
        type={type}
        disabled={disabled}
        variant={variant}
      >
        {image && (
          <ImageComp
            src={image}
            alt={label}
            styles={{ width: "1.75rem", height: "1.75rem" }}
          />
        )}
        {label && label}
        {icon && icon}
      </Button>
    </React.Fragment>
  );
};
export default ButtonComp;
