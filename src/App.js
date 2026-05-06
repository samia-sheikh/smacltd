import React from "react";
import Router from "./config/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <Router />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
