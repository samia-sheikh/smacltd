import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
// import { Field, Formik, Form } from "formik";
// import * as Yup from "yup";
import useFetch from "../../../../features/hooks/useFetch";
// import TextInput from "../../../globalComponents/global_inputs/TextInput";
import ButtonComp from "../../../globalComponents/ButtonComp";
// import theme from "../../../../theme";

const DeleteCategory = ({
  isOpen,
  setIsOpen,
  onClose,
  url,
  category,
  anyChanges,
}) => {
  const { loading, deleteData } = useFetch();
  let handleDelete = async () => {
    try {
      await deleteData(url, () => {
        anyChanges((prev) => !prev);
        setIsOpen(!isOpen);
      });
    } catch (error) {
      //console.log("catch", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "clamp(20rem, 15.66vw + 9.958rem, 28.75rem)",
          padding:
            "clamp(1.5rem, 1.79vw + 0.352rem, 2.5rem) clamp(1.25rem, 1.79vw + 0.102rem, 2.25rem)",
          borderRadius: "clamp(1.5rem, 0.895vw + 0.926rem, 2rem)",
        },
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "clamp(1.125rem, 0.671vw + 0.695rem, 1.5rem)",
            fontWeight: 600,
            textAlign: "center",
            color: "#333333",
          }}
        >
          Delete Category Permanently?
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            textAlign: "center",
            color: "#6D6D6D",
          }}
        >
          {category.name} will be permanently deleted and never recovered again!
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          mt: "16px",
        }}
      >
        <ButtonComp
          label={"Delete"}
          type={"submit"}
          disabled={loading}
          click={handleDelete}
          customStyles={{
            width: "clamp(8.125rem, 6.581vw + 5.04rem, 12.938rem)",
            background: "#ECECEC",
            border: "1px solid #CFCFCF",
            boxShadow: "0px 4px 14.3px 0px #93939338",
            color: "#525252",
          }}
        />
        <ButtonComp
          label={"Cancel"}
          type={"submit"}
          disabled={loading}
          click={() => {
            setIsOpen(!isOpen);
          }}
          customStyles={{
            width: "clamp(8.125rem, 6.581vw + 5.04rem, 12.938rem)",
            background: "#F04E48",
            border: "1px solid #CFCFCF",
            boxShadow: "0px 4px 14.3px 0px #93939338",
            color: "white",
          }}
        />
      </Box>
    </Dialog>
  );
};

export default DeleteCategory;
