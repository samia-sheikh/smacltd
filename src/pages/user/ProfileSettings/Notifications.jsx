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
const Notifications = () => {
  const { loading } = useFetch();
  const [emailNotificationsValue, setEmailNotificationsValue] = useState("on");
  const [communityNotificationsValue, setCommunityNotificationsValue] =
    useState("on");

  const handleCommunityRadioChange = (event) => {
    setCommunityNotificationsValue(event.target.value);
  };
  const handleEmailRadioChange = (event) => {
    setEmailNotificationsValue(event.target.value);
  };

  return (
    <Layout title={"Notifications | SMAC"}>
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
              Email Notifications
            </Typography>
            <Box>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={emailNotificationsValue}
                  onChange={handleEmailRadioChange}
                >
                  <FormControlLabel value="on" control={<Radio />} label="On" />
                  <FormControlLabel
                    value="Off"
                    control={<Radio />}
                    label="Off"
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
              Browser notification to stay update with SMAC community
            </Typography>
            <Box>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={communityNotificationsValue}
                  onChange={handleCommunityRadioChange}
                >
                  <FormControlLabel value="on" control={<Radio />} label="On" />
                  <FormControlLabel
                    value="Off"
                    control={<Radio />}
                    label="Off"
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

export default Notifications;
