import { Box, InputBase, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import theme from "../../../theme";
const TextArea = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <>
      <InputBase
        sx={{
          maxWidth: "808px",
          // here i give the 100% width to get full length text in Upload post field....
          padding: "8px",
          width: "100%",
          textIndent:"10px"
        }}
        {...props}
        {...field}
        // sx={theme.spacing(5, 12)}
        inputComponent={"textarea"}
        multiline={true}
        rows="5"
      />
      {errors[field.name] && touched[field.name] ? (
        // <span style={{ color: "red" }}>{errors[field.name]}</span>
        // <Typography sx={{ color: "red", fontSize: "12px", padding: "0px" }}>
        //   {errors[field.name]}
        // </Typography>
        <Box
          sx={{
            background: "#D94A4430",
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarningAmberIcon
            sx={{ color: "red", fontSize: "22px", padding: "0px 8px 0px 0px" }}
          />
          <Typography sx={{ color: "red", fontSize: "12px", padding: "0px" }}>
            {errors[field.name]}
          </Typography>
        </Box>
      ) : null}
    </>
  );
};

export default TextArea;
