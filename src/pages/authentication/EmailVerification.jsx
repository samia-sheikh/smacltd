// src/EmailVerification.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmailSuccessful from "./EmailSuccessful";
import EmailErrorMessage from "./EmailErrorMessage";
const EmailVerification = () => {
  const location = useLocation();
  const jwt = new URLSearchParams(location.search).get("jwt");
  const [message, setMessage] = useState("Verifying...");
  // const navigate = useNavigate();
  const [emailVerification, setEmailVerfication] = useState(false);
  useEffect(() => {
    // Replace with your backend endpoint
    // //console.log("jwt in verify email", jwt);

    fetch(`/api/auth/user/verify-email?jwt=${jwt}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data, "check data");

        if (data?.status === 200) {
          setMessage(
            "Your email is registered successfully! Now you are able to explore new opportunities and lift your professional journey with SMAC. "
          );
          setEmailVerfication(true);
          // setTimeout(() => {
          //   navigate("/");
          // }, 3000);
        } else {
          setMessage(
            "Oops! It looks like there was an issue registering your email. Please re-check your account details and try again to join SMAC'S booming community."
          );
          setEmailVerfication(false);
        }
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again later.");
        setEmailVerfication(false);
        // console.error("Error verifying email:", error);
      });
  }, [jwt]);

  return (
    <div>
      {emailVerification ? (
        <EmailSuccessful message={message} />
      ) : (
        <EmailErrorMessage ErrorMessage={message} />
      )}
      {/* <p>{message}</p> */}
    </div>
  );
};

export default EmailVerification;
