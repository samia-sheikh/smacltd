import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
} from "@mui/material";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import useFetch from "../../../features/hooks/useFetch";
import Layout from "../../../components/globalComponents/Layout/Layout";
const PrivacyAndDisplay = () => {
  const { loading } = useFetch();
  const [messageValue, setMessageValue] = useState("anyone");
  const [commentValue, setCommentValue] = useState("noOne");

  const handleCommentRadioChange = (event) => {
    setCommentValue(event.target.value);
  };
  const handleMessageRadioChange = (event) => {
    setMessageValue(event.target.value);
  };

  return (
    <Layout title={"Privacy And Display | SMAC"}>
      <Box>
        <Box sx={{ gap: "16px", my: 12, width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "828px",
              padding: "19px 24px",
            }}
          >
            <Typography variant="uploadFormDark">
              Users who can message you directly
            </Typography>
            <Box>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={messageValue}
                  onChange={handleMessageRadioChange}
                >
                  <FormControlLabel
                    value="anyone"
                    control={<Radio />}
                    label="Anyone"
                  />
                  <FormControlLabel
                    value="notifyMe"
                    control={<Radio />}
                    label="Notify me ealier"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              maxWidth: "828px",
              padding: "19px 24px",
            }}
          >
            <Typography variant="uploadFormDark">
              Who can tag you in a comment
            </Typography>
            <Box>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={commentValue}
                  onChange={handleCommentRadioChange}
                >
                  <FormControlLabel
                    value="anyone"
                    control={<Radio />}
                    label="Anyone"
                  />
                  <FormControlLabel
                    value="noOne"
                    control={<Radio />}
                    label="No one"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonComp
            type={"submit"}
            label={"Save Changes"}
            customStyles={{
              fontSize: "16px",
              width: "100%",
              maxWidth: "154px",
              height: "60px",
              marginRight: "22px",
              padding: "0px",
            }}
            disabled={loading}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default PrivacyAndDisplay;
