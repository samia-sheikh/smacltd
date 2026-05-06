import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import theme from "../../theme";
import ImageComp from "./ImageComp";

const ProfilePicture = ({
  src,
  firstName,
  sx,
  innerBox,
  font,
  defaultColor,
}) => {
  const initials = useMemo(() => {
    if (!src && firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    return null;
  }, [src, firstName]);

  const iconColor = useMemo(() => {
    return theme.palette.primary.main;
  }, []);

  return (
    <>
      {src ? (
        <ImageComp
          src={src}
          alt="Profile Picture"
          sx={{
            borderRadius: "50%",
            height: "61px",
            width: "61px",
            backgroundSize: "cover",
            ...sx,
          }}
        />
      ) : (
        <Box
          sx={{
            borderRadius: "50%",
            height: "60px",
            width: "60px",
            background: `${iconColor}20`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...sx,
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              height: "50px",
              width: "50px",
              background: iconColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...innerBox,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "white",
                ...font,
              }}
            >
              {initials}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default React.memo(ProfilePicture);
