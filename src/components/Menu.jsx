import React from "react";
import { getContext } from "../Context";

export default function Menu() {
  const { state, setState } = getContext();
  const { level, menuVisible } = state;
  const { setLevel, setMenuVisible } = setState;

  return (
    menuVisible && (
      <div>
        <div className="container">
          <div className="start-button" onClick={() => setMenuVisible(false)}>
            Start
          </div>
          <div className="level-input">
            <input
              type="number"
              placeholder="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  );
}
