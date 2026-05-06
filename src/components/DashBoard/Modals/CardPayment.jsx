import { Box } from "@mui/material";
import React, { useState } from "react";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import Cards from "react-credit-cards-2";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import useFetch from "../../../features/hooks/useFetch.js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CardPayment = ({ url, item, setIsAddDetailsOpen }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const { postData } = useFetch();
  const [state, setState] = useState({
    number: "",
    cvc: "",
    name: "",
    expiry: "",
    focus: "",
  });

  const handleInputChangeNumber = (evt) => {
    const { name, value } = evt.target;
    if (name === "number") {
      let number = evt.target.value;
      // Enforce a maximum limit of 16 digits
      if (number.length > 16) {
        number = number.slice(0, 16);
      }

      setState((prev) => ({ ...prev, [name]: number }));
    } else if (name === "cvc") {
      let cvc = evt.target.value;

      // Enforce a maximum limit of 19 digits
      if (cvc.length > 3) {
        cvc = cvc.slice(0, 3);
      }
      setState((prev) => ({ ...prev, [name]: cvc }));
    } else if (name === "expiry") {
      let expiry = evt.target.value;

      // Enforce a maximum limit of 19 digits
      if (expiry.length > 4) {
        expiry = expiry.slice(0, 4);
      }
      setState((prev) => ({ ...prev, [name]: expiry }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocusNumber = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleRegisterCard = (payload) => {
    if (state.number && state.cvc && state.name && state.expiry) {
    console.log(payload);
    postData(url, payload, undefined, undefined, undefined, (res) => {
      setIsAddDetailsOpen(false);
      if (res?.status === 201) {
        navigate("/payments/response", { state: location.pathname });
      }
      console.log(res);
    });
    } else {
      toast.error("Please select all fields or check credentials properly");
    }
  };

  let cardInputStyles = {
    height: "45px",
    width: "100%",
    marginTop: "8px",
    borderRadius: "6px",
    border: "1px solid #787878",
    padding: "2px 10px",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  };
  let labelStyle = {
    fontSize: "12px",
    fontWeight: 600,
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "25px",
        flexDirection: "column",
        paddingTop: "16px",
      }}
    >
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "12px",
        }}
      >
        <div>
          <label style={labelStyle}>Card Number</label>
          <input
            style={cardInputStyles}
            type="number"
            name="number"
            placeholder="**** **** **** ****"
            value={state.number}
            onChange={handleInputChangeNumber}
            onFocus={handleInputFocusNumber}
          />
        </div>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <div>
            <label style={labelStyle}>CVC</label>
            <input
              style={cardInputStyles}
              type="number"
              name="cvc"
              placeholder="***"
              value={state.cvc}
              onChange={handleInputChangeNumber}
              onFocus={handleInputFocusNumber}
            />
          </div>
          <div>
            <label style={labelStyle}>Expiry Date (MM/YY)</label>
            <input
              style={cardInputStyles}
              type="text"
              name="expiry"
              placeholder="**/**"
              value={state.expiry}
              onChange={handleInputChangeNumber}
              onFocus={handleInputFocusNumber}
            />
          </div>
        </Box>
        <div>
          <label style={labelStyle}>Card Holder Name</label>
          <input
            style={cardInputStyles}
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={state.name}
            onChange={handleInputChangeNumber}
            onFocus={handleInputFocusNumber}
          />
        </div>
        <ButtonComp label={"Buy"} click={handleRegisterCard} />
      </form>
    </Box>
  );
};

export default CardPayment;
