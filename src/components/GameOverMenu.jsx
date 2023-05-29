import React from "react";
import '../style/gameOverMenu.scss'
import { getContext } from "../Context";

export default function GameOverMenu({score, resetGame}) {

  const tryButtonClickHandler = ()=>{
   resetGame();
  }
  return (
    <div id="gameOver">
      <div className="container">
        <div className="title">Game Over</div>
        <div className="score">Score {score}</div>
        <div className="button-wrapper">
            <div
              className="container"
              onClick={()=> tryButtonClickHandler()}
            >
              Try again
            </div>
          </div>
      </div>
    </div>
  );
}
