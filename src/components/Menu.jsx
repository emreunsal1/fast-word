import React from "react";
import { getContext } from "../Context";
import "../style/menu.scss";

export default function Menu({ startClickHandler }) {
  const { state, setState } = getContext();
  const { level, menuVisible } = state;
  const { setLevel, setMenuVisible } = setState;

  return (
    menuVisible && (
      <div id="Menu">
        <div className="container">
          <div className="wrapper">
            <div className="level-input">
              <input
                type="number"
                placeholder="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
            <div
              className="start-button"
              onClick={() => {
                setMenuVisible(false);
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
