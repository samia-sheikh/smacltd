import React from "react";

import styled from "styled-components";
import pageNotFound from "../assets/sample/pageNotFound.svg";
import { Box } from "@mui/material";

const CustomSection = styled(Box)`
  min-height: ${({ height }) => (height ? height : "80dvh")};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    width: ${({ width }) =>
      width ? `clamp(260px, 100%, ${width})` : `clamp(260px, 100%, 728px)`};
  }
`;

function PageNotFound({ width, height }) {
  return (
    <CustomSection backgroundColor="#fff" width={width} height={height}>
      <img src={pageNotFound} alt="" width="" />
    </CustomSection>
  );
}

export default PageNotFound;
