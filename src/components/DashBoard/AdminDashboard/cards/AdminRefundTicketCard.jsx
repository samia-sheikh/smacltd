import {
  Box,
  // IconButton,
  // Menu,
  // MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
// import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
// import DropDownIcons from "../../../../assets/DropDown.png";
import { useNavigate } from "react-router-dom";
// import useFetch from "../../../../features/hooks/useFetch";
const AdminRefundTicketCard = ({ refundData }) => {
  // //console.log(refundData, "refund");
  // const { putData } = useFetch();
  const navigate = useNavigate();
  // const [localTicketState, setLocalTicketState] = useState("");
  // const handleStatus = (refundTicket, status) => {
  //   //console.log(refundTicket, "tickets");

  //   putData(
  //     `/api/admin/service/orders/refunds/${refundTicket?.refundId}`,
  //     { status },
  //     undefined,
  //     (res) => {
  //       // //console.log(res, "res");
  //       setLocalTicketState(res?.data?.status);
  //     },
  //     undefined
  //   );
  // };
  if (refundData?.course) {
    console.log(refundData, "refundData if");
  }

  return (
    <TableRow>
      <TableCell>
        <Typography
          component={"span"}
          variant="h6Grey"
          sx={{ display: "block" }}
        >
          Ticket Number
        </Typography>

        <Typography variant="h5BlackBold">
          {refundData?.ticketNumber}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          component={"span"}
          variant="h6Grey"
          sx={{ display: "block" }}
        >
          Service Provider
        </Typography>{" "}
        <Typography variant="h5BlackBold" sx={{ textWrap: "nowrap" }}>
          {refundData?.service
            ? refundData?.service?.user?.firstName +
              " " +
              refundData?.service?.user?.lastName
            : refundData?.course?.user?.firstName +
              " " +
              refundData?.course?.user?.lastName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          component={"span"}
          variant="h6Grey"
          sx={{ display: "block" }}
        >
          Complaint
        </Typography>

        <Typography variant="h5BlackBold" sx={{ textWrap: "nowrap" }}>
          {refundData?.user.firstName.substring(0, 10) +
            " " +
            refundData?.user.lastName.substring(0, 10)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          component={"span"}
          variant="h6Grey"
          sx={{ display: "block", textWrap: "nowrap" }}
        >
          service Name
        </Typography>

        <Typography variant="h5BlackBold" sx={{ textWrap: "nowrap" }}>
          {refundData?.service
            ? refundData?.service?.title.substring(0, 20)
            : refundData?.course?.title.substring(0, 20)}
        </Typography>
      </TableCell>
      <TableCell
      //   onClick={() => {
      //     //console.log(userDetails, "Detailsss");
      //   }}
      >
        <Typography
          component={"span"}
          variant="h6Grey"
          sx={{
            display: "block",
            "@media (max-width:600px)": {
              marginBottom: "10px",
            },
          }}
        >
          Status
        </Typography>
        <Typography
          variant="h5BlackBold"
          sx={{
            border: "0.5px solid #F9A11D",
            borderRadius: "6px",
            padding: "8px 14px",
            width: "max-content",
            marginTop: "2px",
            color: "#F9A11D",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {refundData?.status}
        </Typography>
        {/* {localTicketState ? (
          <Typography
            variant="h5BlackBold"
            sx={{
              border: "0.5px solid #F9A11D",
              borderRadius: "6px",
              padding: "8px 14px",
              width: "max-content",
              marginTop: "2px",
              color: "#F9A11D",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            {localTicketState}
          </Typography>
        ) : (
          <Box>
            {refundData?.status === "Closed" ? (
              <Typography
                variant="h5BlackBold"
                sx={{
                  border: "0.5px solid #F9A11D",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  width: "max-content",
                  marginTop: "2px",
                  color: "#F9A11D",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {refundData?.status}
              </Typography>
            ) : refundData?.status === "Pending" ? (
              <Box
                sx={{
                  border: "0.5px solid #F9A11D",
                  borderRadius: "6px",
                  padding: "0px 8px",
                  width: "max-content",
                  marginTop: "2px",
                  color: "#F9A11D",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <IconButton
                        sx={{
                          fontSize: "12px",
                          color: "#F9A11D",
                          "&:hover": {
                            background: "unset",
                          },
                        }}
                        variant="contained"
                        {...bindTrigger(popupState)}
                      >
                        {refundData?.status}
                        <img src={DropDownIcons} alt=" " />
                      </IconButton>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem
                          onClick={(e) => {
                            handleStatus(refundData, "Approved");
                          }}
                        >
                          Approved
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            handleStatus(refundData, "Rejected");
                          }}
                        >
                          Rejected
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </Box>
            ) : (
              <>
                <Typography
                  variant="h5BlackBold"
                  sx={{
                    border: "0.5px solid #F9A11D",
                    borderRadius: "6px",
                    padding: "8px 14px",
                    width: "max-content",
                    marginTop: "2px",
                    color: "#F9A11D",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {refundData.status}
                </Typography>
              </>
            )}
          </Box>
        )} */}
      </TableCell>
      <TableCell>
        <Typography
          component={"span"}
          variant="h6Grey"
          sx={{ display: "block" }}
        >
          Actions
        </Typography>

        {/* <Typography variant="h5BlackBold">Closed</Typography> */}
        <Box
          // disabled={true}
          // onClick={closeTicket}
          sx={{
            border: "0.5px solid #14B8A6",
            borderRadius: "6px",
            padding: "5px 8px",
            width: "max-content",
            marginTop: "2px",
            color: "#14B8A6",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => {
            if (refundData.course) {
              navigate(`/refund/ticket/${refundData.refundId}`);
            } else {
              navigate(`/refund/service/ticket/${refundData.refundId}`);
            }
          }}
        >
          Open
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default AdminRefundTicketCard;
