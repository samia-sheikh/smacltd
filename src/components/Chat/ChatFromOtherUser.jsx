import { Dialog, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import TextArea from "./../globalComponents/global_inputs/TextArea";
import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewChat } from "../../features/slice/socketSlice";
import { useSocket } from "../../Socket/socketMiddleware";
import ButtonComp from "../globalComponents/ButtonComp";
import { MessagingIcon } from "../globalComponents/constants";
const StyledModal = styled(Dialog)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const ChatFromOtherUser = ({ email, buttonStyles }) => {
  const dispatch = useDispatch();
  const { isNewChat } = useSelector((state) => state.selectedChat);

  const { sendMessage } = useSocket();
  const [open, setOpen] = useState(false);
  const handleCommentSubmit = (values, { resetForm }) => {
    let messageData = {
      content: values.content,
      receiverEmail: email,
    };

    sendMessage(messageData);
    dispatch(setIsNewChat({ isNewChat: !isNewChat }));
    setOpen(false);
    resetForm();
  };
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Please Type a Message"),
  });
  const initialValues = {
    content: "",
    receiverEmail: "",
    chatId: "",
  };
  return (
    <>
      <ButtonComp
        customStyles={{
          padding: "0px",
          color: "#333333",
          width: "200px",
          height: "68px",
          fontSize: "20px",
          borderRadius: "20px",
          border: "1px solid #D6D6D6",
          background: "#F1F1F1",
          display: "flex",

          justifyContent: "center",
          gap: "9px",
          ...buttonStyles,
        }}
        icon={<MessagingIcon size={"1.25rem"} />}
        click={() => setOpen(true)}
        label="Message"
      />
      <StyledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "683px",
            padding: "clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem)",
            "& .css-1pxv6u5": {
              borderRadius: "16px",
            },
          }}
        >
          <Typography
            variant="h6"
            color={"Black"}
            textAlign={"center"}
            fontWeight={"bold"}
          >
            New Message
          </Typography>
          <Typography
            variant="paragraph"
            color={"Black"}
            textAlign={"center"}
            maxWidth={400}
            sx={{ mt: "16px", mb: "16px" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting.
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCommentSubmit}
          >
            {({ handleChange, handleSubmit, values }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Field
                  component={TextArea}
                  type="text"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  placeholder="Write your comment here.."
                  sx={{
                    width: "100% !important",
                    borderRadius: "30px",
                    background: "#F5F5F5",
                    border: "1px solid rgba(20, 184, 166, 0.05)",
                    padding: "14px 20px",
                  }}
                />

                <Button
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    display: "flex",
                    width: "100%",
                    padding: "19px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    height: "60px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                  type="submit"
                >
                  Send
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </StyledModal>
    </>
  );
};
export default ChatFromOtherUser;
