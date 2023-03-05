import React from "react";
import { getContext } from "../Context";

export default function Menu({ visible }) {
  const { state, setState } = getContext();
  const { level } = state;
  const { setLevel } = setState;

  return (
    visible && (
      <div>
        <div className="container">
          <div className="start-button">Start</div>
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
