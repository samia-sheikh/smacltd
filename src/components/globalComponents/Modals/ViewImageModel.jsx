import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ImageComp from "../ImageComp";
import { useDispatch, useSelector } from "react-redux";
import { setImageToPreview } from "../../../features/slice/Chat/refundChatSlice";

export default function ViewImageModel({ open, setOpen }) {
  const { imageToPreview } = useSelector((state) => state.refundChat);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    return () => dispatch(setImageToPreview({ data: null }));
  }, []);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ImageComp
              src={imageToPreview}
              sx={{
                width: "100%",
                maxWidth: "650px",
              }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
