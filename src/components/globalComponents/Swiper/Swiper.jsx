import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../../../theme";
const drawerBleeding = 56;

const Root = styled("div")(() => ({
  height: "100%",
  //   backgroundColor: "inherit",
}));

const StyledBox = styled("div")(() => ({
  // backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
  backgroundColor: `${theme.palette.blackColor.main}`,
  width: "100%",
  maxWidth: "540px",
  margin: "0 auto",
}));

const Puller = styled("div")(({ theme }) => ({
  //   width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  //   position: "absolute",
  //   top: 8,
  //   left: "calc(50% - 15px)",
}));

function Swiper({ modalContainerRef }) {
  //   const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    // //console.log(modalContainerRef.width);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  // This is used only for the example
  //   const container =
  //     window !== undefined ? () => window().document.body : undefined;

  //   const modalContainer = React.useRef(null);
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "hidden",
            backgroundColor: "inherit",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button
          sx={{ height: "50px" }}
          variant="contained"
          onClick={toggleDrawer(true)}
        >
          <Typography color={"white"}>Views</Typography>
          <VisibilityIcon sx={{ color: "white" }} />
        </Button>
        {/* <Button onClick={toggleDrawer(true)}>Open</Button> */}
      </Box>
      <SwipeableDrawer
        container={modalContainerRef.current}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={modalContainerRef.width}
        disableSwipeToOpen={false}
        // ModalProps={{
        //   keepMounted: true,
        // }}
        // sx={{ backgroundColor: "yellow" }}
      >
        <StyledBox
          sx={{
            // position: "absolute",
            // top: -drawerBleeding,
            // borderTopLeftRadius: 8,
            // borderTopRightRadius: 8,
            visibility: "visible",
            // right: 0,
            // left: 0,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            // overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box></Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px",
              }}
            >
              {/* avatar is to be changed to user's story*/}
              <Avatar src={`user.image`} />
            </Box>
            <Button
              onClick={toggleDrawer(false)}
              sx={{ "& :hover": { background: "transparent" } }}
            >
              <Tooltip title="Close" arrow sx={{ backgroundColor: "white" }}>
                <ClearIcon sx={{ color: "white" }} />
              </Tooltip>
            </Button>
          </Box>

          <Box sx={{ backgroundColor: "white", width: "100%" }}>
            <List>
              {/* <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={10}
                overscanCount={5}
              > */}
              {[1, 2131, 4, 5, 6, 7, 8].map((v, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography color="black">RobertFin</Typography>}
                      secondary={
                        <Typography color="black">@RobertFin22</Typography>
                      }
                    />
                  </ListItem>
                );
              })}
              {/* </FixedSizeList> */}
            </List>
          </Box>
          {/* <Skeleton variant="rectangular" height="100%" /> */}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

// Swiper.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default Swiper;
