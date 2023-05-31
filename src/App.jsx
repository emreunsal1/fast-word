import React, { useEffect, useRef, useState } from "react";
import Welcome from "./components/welcome";
import { generateRandomWord } from "./utils";
import { getContext } from "./Context";
import "./style/index.scss";
import GameOverMenu from "./components/GameOverMenu";
import Barbed from "./components/Barbed";

function App() {
  const { state, setState } = getContext();
  const { isStart, level } = state;
  const { setLevel, setIsStart } = setState;
  const [letters, setLetters] = useState("");
  const [showWord, setShowWord] = useState([]);
  const [timer, setTimer] = useState(3);

  const intervalId = useRef(null);
  const mockLevel = useRef(null);
  const healt = useRef(3);
  const point = useRef(0);

  const textInput = useRef(null);

  useEffect(() => {
    if (timer == 0 || (timer == null && healt > 0)) {
      showWord.map((item) => {
        if (item.word === letters && item.visible === true) {
          item.visible = false;
          point.current = point.current + 5;
          setLetters("");
        }
      });
    }
  }, [letters]);

  useEffect(() => {
    if (healt.current === 0) {
      setLetters("");
      clearInterval(intervalId);
      setShowWord([]);
      mockLevel.current = null;
    }
  }, [healt.current]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      startGame(level);
    }
  }, [timer]);

  useEffect(() => {
    if (mockLevel.current < 0) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      mockLevel.current = null;
      return;
    }
  }, [mockLevel.current]);

  useEffect(() => {
    if (
      showWord.length === 0 &&
      isStart === false &&
      mockLevel.current === null &&
      healt.current > 0
    ) {
      setLevel((prev) => prev + 1);
      startGame(level + 1);
    } else if (showWord.length !== 0 && healt.current > 0) {
      const removeBoxInterval = setInterval(() => {
        if (healt.current === 0) {
          clearInterval(removeBoxInterval);
        }
        const updatedBox = showWord.map((box) => {
          const newTop = box.top + 6 + level;
          if (newTop >= window.innerHeight - 280 && box.visible) {
            document.body.style.boxShadow = "inset 0px 0px 100px -10px red";
            setTimeout(() => {
              document.body.style.boxShadow = "none";
            }, 200);
            healt.current = healt.current - 1;
            return { ...box, visible: false };
          }
          return { ...box, top: newTop };
        });
        if (!showWord.some((item) => item.visible === true)) {
          return setShowWord([]);
        }
        setShowWord(updatedBox);
      }, 100);
      return () => clearInterval(removeBoxInterval);
    }
  }, [showWord]);

  const startClickHandler = () => {
    healt.current = 3;
    intervalId.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  };

  const startGame = (level) => {
    textInput.current.focus();
    const result = generateRandomWord(3, level * 3);
    mockLevel.current = level * 3 - 1;
    generateBox(result);
  };

  const generateBox = (result) => {
    intervalId.current = setInterval(
      () => {
        const prevMockLevel = Number(mockLevel.current);
        const xPostion = getRandomNumberInRange(10, 90);
        if (healt.current === 0) {
          clearInterval(intervalId);
          return;
        }
        setShowWord((prev) => {
          mockLevel.current = prevMockLevel - 1;
          return [
            ...prev,
            {
              word: result[prevMockLevel],
              top: -100,
              left: xPostion,
              visible: true,
            },
          ];
        });
      },
      3000 - level * 300 < 0 ? 100 : 3000 - level * 500
    );
  };

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const resetGame = () => {
    clearInterval(intervalId);
    setShowWord([]);
    setTimer(3);
    setLetters("");
    setLevel(1);
    mockLevel.current = null;
    point.current = 0;
    setIsStart(true);
  };

  return (
    <div className="App">
      <div className="container">
        <Welcome startClickHandler={startClickHandler} />
        {!isStart && timer !== 0 && (
          <div className="timer">
            <div className="count-wrapper">{timer}</div>
          </div>
        )}
        <div className="header">
          <div className="score-wrapper">
            <div className="score"> Scrore: {point.current}</div>
          </div>
          <div className="healt-wrapper">
            <div className="healt"> 🤍 {healt.current}</div>
          </div>
          <div className="level-wrapper">
            <div className="level">Level: {level} </div>
          </div>
        </div>
        <div className="fly-body">
          {showWord.map((box, index) => {
            return (
              <div
                className={`word-box ${!box.visible && "destroy"}`}
                style={{ left: `${box.left}%`, top: `${box.top}px` }}
                key={index}
              >
                {box.word.split("").map((letter, index) => (
                  <span
                    key={index}
                    className={letters[index] === letter ? "active" : ""}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
        {healt.current === 0 && (
          <GameOverMenu score={point.current} resetGame={resetGame} />
        )}
        {!isStart && healt.current !== 0 && (
          <>
            <Barbed count={Math.round(window.innerWidth / 150)} />
            <div className="input-container">
              <input
                onChange={(e) => setLetters(e.target.value)}
                value={letters}
                placeholder="Write !!"
                id="textInput"
                ref={textInput}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
