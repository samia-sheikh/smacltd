import React from "react";
import "./comingSoon.css";
const comingSoon = () => {
  return (
    <div>
      <div
        oncontextmenu="return false"
        onselectstart="return false"
        ondragstart="return false"
      />
      <div id="YakındaYazı">
        █ █ █ █ █ █ █ █{" "}
        <span
          className="testng"
          style={{
            color: "black",
          }}
        >
          █ █ █{" "}
        </span>
        80%
        <br />
        &gt; Hello Visitor
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        <br />
        &gt; We're Coming Soon <span id="imleç">█</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default comingSoon;
