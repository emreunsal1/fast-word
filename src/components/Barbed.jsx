import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import barbed from "../assets/barbed.svg";
import "../style/barbed.scss";

export default function Barbed({ count }) {
  return (
    <div id="barbed" style={{top: window.innerHeight - 250 + 90}}>
      {Array(count)
        .fill(<img src={barbed} />)
        .map((item, index) => (
          <div className="img-wrapper" key={index}>
            {item}
          </div>
        ))}
    </div>
  );
}
