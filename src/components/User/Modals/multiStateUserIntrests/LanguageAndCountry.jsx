import { Box, Typography } from "@mui/material";
import React from "react";
import Dropdown from "../../../globalComponents/Dropdown";
import { countryList, languageList } from "../../../dummyModalData";
const LanguageAndCountry = ({countData,langData}) => {
  

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
          width: "100%",
          maxWidth: "368px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography variant="h3">
          What’s your language and where do you live?
        </Typography>
        <Typography variant="paragraph">
          This help us find you more relevant content. We won’t show it on your
          profile.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <Dropdown
          // cb={countData}
          // initailValue={country || ""}
          name="country"
          data={countryList}
          objKey={"countryName"}
        />
        <Dropdown
          // cb={langData}
          // initailValue={language || ""}
          name={"Language"}
          data={languageList}
          objKey={"languageName"}
        />
      </Box>
    </Box>
  );
};

export default LanguageAndCountry;
