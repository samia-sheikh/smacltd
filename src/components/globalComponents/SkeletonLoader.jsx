import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonLoader({ width }) {
  return (
    <Stack spacing={1} minWidth={width ? width : 250}>
      {/* For variant="text", adjust the height via font-size */}
      {/* For other variants, adjust the size with `width` and `height` */}

      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="rectangular" height={210} />
    </Stack>
  );
}
