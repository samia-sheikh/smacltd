import { Dialog, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextArea from "./../globalComponents/global_inputs/TextArea";
import TextInput from "./../globalComponents/global_inputs/TextInput";
import theme from "../../theme";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsNewChat,
  setSelectedChat,
} from "../../features/slice/socketSlice";
import { useSocket } from "../../Socket/socketMiddleware";
import useFetch from "../../features/hooks/useFetch";
import {
  setConversations,
  setSelectedConversation,
} from "../../features/slice/Chat/conversationsSlice";
const StyledModal = styled(Dialog)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const Chat = () => {
  const dispatch = useDispatch();
  const { isNewChat } = useSelector((state) => state.selectedChat);
  const { sendMessage } = useSocket();
  const { fetchData } = useFetch();
  const [open, setOpen] = useState(false);
  const getAllChatOfThisConversation = async (chatId) => {
    console.log(chatId);

    await fetchData(`/api/chat/${chatId}`, undefined, (res) => {
      if (res) {
        dispatch(setSelectedConversation({ data: res?.data }));
      }
    });
  };
  const handleCommentSubmit = async (values, { resetForm }) => {
    let messageData = {
      content: values.content,
      receiverEmail: values.receiverEmail,
    };

    await sendMessage(messageData);

    // Fetch updated conversations
    await fetchData("/api/chat", undefined, (res) => {
      if (res) {
        // console.log("API:", res?.data);
        let updatedConversations = res?.data;
        // console.log("API response:", updatedConversations);

        // Dispatch to Redux
        dispatch(setConversations({ data: updatedConversations }));

        // Check if a new conversation was added
        let newConvo = updatedConversations.find(
          (conversation) => conversation.user.email === values.receiverEmail
        );

        if (newConvo) {
          // console.log("New conversation found:", newConvo);
          dispatch(setSelectedChat({ selectedChat: newConvo }));
          dispatch(setIsNewChat({ isNewChat: !isNewChat }));

          // Fetch all chats for the new conversation
          getAllChatOfThisConversation(newConvo.chatId);
        } else {
          console.log("No new conversation found.");
        }
      } else {
        console.error("Failed to fetch updated conversations.");
      }
    });

    await resetForm();
    setOpen(false);
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
      <Button
        onClick={(e) => setOpen(true)}
        title="Create Post"
        variant="outlined"
        sx={{
          fontSize: "15px",
          fontWeight: "thin",
          cursor: "pointer",
          color: "black",
          borderColor: "lightgray",
        }}
      >
        <AddCircleIcon />
        Compose
      </Button>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
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
            {({ handleChange, handleSubmit, values, errors, touched }) => (
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
                  component={TextInput}
                  type="text"
                  name="receiverEmail"
                  value={values.receiverEmail}
                  onChange={handleChange}
                  placeholder="Enter user email"
                  sx={{
                    width: "100% !important",
                    borderRadius: "30px",
                    background: "#F5F5F5",
                    border: "1px solid rgba(20, 184, 166, 0.05)",
                    padding: "14px 20px",
                  }}
                />

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
export default Chat;
