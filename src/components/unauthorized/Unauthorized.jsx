import React from "react";
import Layout from "../globalComponents/Layout/Layout";

const Unauthorized = () => {
  return (
    <div style={{ backgroundColor: "#100", width: "100%", height: "100vh" }}>
      <Layout>
        <div
          className="w3-display-middle "
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            className="w3-jumbo w3-animate-top w3-center"
            style={{ color: "red" }}
          >
            <code>Access Denied</code>
          </h1>
          <hr
            className="w3-border-white w3-animate-left"
            style={{ margin: "auto", width: "50%" }}
          />
          <h3 className="w3-center w3-animate-right">
            You dont have permission to view this site.
          </h3>
          <h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
          <h6
            className="w3-center w3-animate-zoom"
            style={{ color: "red", fontWeight: "100", textDecoration: "none" }}
          >
            <strong>Error Code</strong>: 403 forbidden
          </h6>
        </div>
      </Layout>
    </div>
  );
};

export default Unauthorized;
