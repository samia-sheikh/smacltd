import React from "react";

const ImageComp = ({ src, alt, className, sx, styles, ...otherProps }) => {
  return (
    <img
      src={src}
      alt={alt ? alt : "Broken"}
      // className={className}
      style={{ ...styles, ...sx }}
      {...otherProps}
    />
  );
};

export default ImageComp;
