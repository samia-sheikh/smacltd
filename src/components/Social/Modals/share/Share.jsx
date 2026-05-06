import {
  Box,
  Checkbox,
  Dialog,
  FormControl,
  Typography,
  Button,
} from "@mui/material";
import ButtonComp from "../../../globalComponents/ButtonComp";
import React, { useState } from "react";
import ImageComp from "../../../globalComponents/ImageComp";
import { styled, alpha } from "@mui/material/styles";
import { share } from "../../../dummyModalData";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InputBase from "@mui/material/InputBase";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import theme from "../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { setIsShareOpen } from "../../../../features/slice/Social/socialModelsSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  //   marginRight: theme.spacing(2),
  //marginLeft: 0,

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "500px",
    },
  },
}));
const Share = () => {
  const dispatch = useDispatch();
  const { isShareOpen } = useSelector((state) => state.socialModels);
  // const [checked, setChecked] = React.useState(false);
  // const [checkedStates, setCheckedStates] = React.useState(() =>
  //   share.map((item) => false)
  // );
  let [shareUsers, setShareUsers] = useState([]);
  // const handleShareUsers = (e)=>{
  //   let value = e.target.value
  //   let checked =e.target.checked
  //   if(checked){
  //     setShareUsers([...shareUsers,value])
  //     //console.log("shareUsers",shareUsers);
  //   }

  // }

  const handleShareUsers = (e) => {
    let value = JSON.parse(e.target.value);
    let checked = e.target.checked;

    if (checked) {
      setShareUsers((prevShareUsers) => {
        const updatedShareUsers = [...prevShareUsers, value];
        //console.log("shareUsers", updatedShareUsers);
        return updatedShareUsers;
      });
    } else {
      setShareUsers((afterRemoval) => {
        let updatedArr = afterRemoval.filter((v) => v.id !== value.id);
        //console.log("shareUsers after Removal", updatedArr);
        return updatedArr;
      });
    }
  };
  const handleShareClose = () => {
    dispatch(setIsShareOpen({ data: !isShareOpen }));
  };
  const dialogStyles = {
    "& .css-hz1bth-MuiDialog-container": {
      width: "100%",
      padding: "30px",
      margin: 0,
      "& .css-fzk8t3-MuiPaper-root-MuiDialog-paper": {
        // padding: "35px !important",
        width: "100%",
        padding: "30px",
        margin: 0,
        // maxWidth: activeStep === lastStep ? "540px" : "980px",
        borderRadius: "16px",
      },
    },
  };
  return (
    <Dialog
      sx={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        ...dialogStyles,
      }}
      open={isShareOpen}
      // un comment this if you want to close the comment section on click outside the dialog box
      //   onClose={handleCommentClose}
    >
      {/* name to be latter added dynamically */}
      <Box
        sx={{
          display: "flex",
          gap: "70px",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2">Robin Fin's Post Share</Typography>

        <Box
          sx={{
            backgroundColor: "#D9D9D9",
            width: "35px",
            // maxWidth: "30px !important",
            display: "flex",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <Button
            onClick={handleShareClose}
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
          >
            <CloseRoundedIcon sx={{ color: "white" }} />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          // padding: "16px",
          width: "100%",
          borderTop: "1px solid #F1F1F1",
          borderBottom: "1px solid #F1F1F1",
        }}
      >
        <Search
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100% !important",

            // border: "1px solid rgba(20, 184, 166, 0.05)",
            // background: " rgba(20, 184, 166, 0.03)",
          }}
        >
          <Typography variant="postUserTypo">To:</Typography>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            sx={{
              width: "100% !important",
              borderRadius: "0px",
              border: "none",
            }}
          />
        </Search>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "94px",
        }}
      >
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormGroup aria-label="position" row>
            {share.map((item, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    borderBottom: "1px solid #F1F1F1",
                    paddingBottom: "15px",
                    width: "100%",
                    justifyContent: "space-between",
                    padding: "16px 0px",
                  }}
                  key={item.id}
                >
                  <Box>
                    <Box sx={{ display: "flex", gap: "8px" }}>
                      <ImageComp
                        src={item.picture}
                        alt={"story_image"}
                        sx={{
                          borderRadius: "50%",
                          height: "61px",
                          width: "61px",
                          backgroundSize: "cover",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                            "@media (max-width:600px)": {
                              fontSize: "16px",
                            },
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="subHeader">
                          {item.userName}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* <Checkbox
                checked={checkedStates[index]}
                onClick={handleCheckboxChange}
                // inputProps={{ "aria-label": "controlled" }}
              /> */}
                  <FormControlLabel
                    value={JSON.stringify(item)}
                    control={<Checkbox />}
                    // onChange={handleShareUsers}
                    onChange={(e) => {
                      handleShareUsers(e);
                    }}
                    sx={{ marginRight: "0px !important" }}
                  />
                </Box>
              );
            })}
          </FormGroup>
        </FormControl>

        <ButtonComp
          customStyles={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            display: " flex",
            width: "100%",
            padding: "19px 16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            height: "60px",
            borderRadius: "30px",
            position: "sticky",
          }}
          click={() => {
            dispatch(setIsShareOpen({ data: !isShareOpen }));
          }}
          label={"Send"}
        ></ButtonComp>
      </Box>
    </Dialog>
  );
};

export default Share;
