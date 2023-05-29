import React from "react";
import { getContext } from "../Context";
import "../style/welcome.scss";

export default function Menu({ startClickHandler }) {
  const { state, setState } = getContext();
  const { level, isStart } = state;
  const { setLevel, setIsStart } = setState;

  return (
    isStart && (
      <div id="welcome">
        <div className="container">
          <div className="title">Welcome Fast Word</div>
          <div className="button-wrapper">
            <div
              className="container"
              onClick={() => {
                setIsStart(false);
                startClickHandler();
              }}
            >
              Start
            </div>
          </div>
        </div>
      </div>
    )
  );
}
