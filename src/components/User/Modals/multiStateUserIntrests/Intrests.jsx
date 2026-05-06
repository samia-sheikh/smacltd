import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { setInterests } from "../../../../features/slice/Social/multiStateUserIntrestsSlice";

const Interests = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const { interestsArray, interest } = useSelector(
    (state) => state.multiStateUserIntrests
  );
  // //console.log(interestsArray, "Interest in the Interest");
  useEffect(() => {
    dispatch(setInterests({ data: selectedItems }));

    //dispatch the intrests array to redux
  }, [selectedItems]);
  useEffect(() => {
    // //console.log(!interest?.length === 0, interest, "check int data");
    if (interest?.length > 0) setSelectedItems(interest);
  }, []);

  function handleSelect(data) {
    const isSelected = selectedItems.some((item) => item.id === data.id);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item.id !== data.id));
    } else {
      setSelectedItems([...selectedItems, data]);
    }
  }
  // Array of different titles for each interest
  // const interestTitles = ["Technology", "Science", "Art", "Music", "Sports"];
  return (
    <Box
      sx={{
        margin: "40px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography variant="h3">What are you interested in?</Typography>
        <Typography variant="paragraph">
          This will customize your new home feed
        </Typography>
      </Box>
      <Box
        sx={{
          height: "500px",
          display: "grid",
          // justifyContent: "center",
          gap: "20px",
          // flexWrap: "wrap",
          overflowY: "scroll",
          gridTemplateColumns: "auto auto auto auto auto",
          [theme.breakpoints.down("lg")]: {
            gridTemplateColumns: "auto auto auto auto",
          },
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "auto auto auto",
          },
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "auto",
          },

          width: "100%",
        }}
      >
        {interestsArray.map((title, index) => {
          const data = { id: title.id, title: title.name };
          const isSelected = selectedItems.some((item) => item.id === data.id);
          return (
            <Box
              key={index}
              sx={{
                height: "183px",
                width: "190px",
                background: "url(/assets/photos/technologies.png)",
                position: "relative",
                borderRadius: isSelected ? `20px` : "none",
                border: isSelected
                  ? `5px solid ${theme.palette.primary.main}`
                  : "none",
                cursor: "pointer",
              }}
              onClick={() => handleSelect(data)}
            >
              <Typography
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "15px",
                  color: theme.palette.secondary.main,
                }}
              >
                {title.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Interests;
