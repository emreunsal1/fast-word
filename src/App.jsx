import React, { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import { generateRandomWord } from "./utils";
import { getContext } from "./Context";
import "./style/index.scss";
import GameOverMenu from "./components/GameOverMenu";

function App() {
  const { state, setState } = getContext();
  const { menuVisible, level } = state;
  const { setLevel } = setState;
  const [words, setWords] = useState();
  const [letters, setLetters] = useState("");
  const [showWord, setShowWord] = useState([]);
  const [timer, setTimer] = useState(3);
  const [point, setPoint] = useState(0);

  const intervalId = useRef(null);
  const mockLevel = useRef(null);
  const healt = useRef(3);

  useEffect(() => {
    
   if(timer == 0 || timer == null && healt > 0){
    console.log('timer', timer)
    showWord.map((item) => {
      if (item.word === letters && item.visible === true) {
        item.visible = false;
        setPoint((prev) => prev + 10);
        setLetters("");
      }
    });
    if (!showWord.some((item) => item.visible === true)) {
      setShowWord([]);
    }
   }
  }, [letters]);

  useEffect(() => {
    if (healt.current === 0) {
      setLetters("");
      clearInterval(intervalId);
      setShowWord([]);
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
      menuVisible === false &&
      mockLevel.current === null &&
      healt.current > 0
    ) {
      setLevel((prev) => prev + 1);
      startGame(level + 1);
    } else if (showWord.length !== 0 && healt.current > 0) {
      const removeBoxInterval = setInterval(() => {
        const updatedBox = showWord.map((box) => {
          const newTop = box.top + 5 + level;
          if (newTop >= 300 && box.visible) {
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
    intervalId.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  };

  const startGame = (level) => {
    const result = generateRandomWord(3, level * 3);
    setWords(result);
    mockLevel.current = level * 3 - 1;
    generateBox(result);
  };

  const generateBox = (result) => {
    let count = 0;
    intervalId.current = setInterval(
      () => {
        const prevMockLevel = Number(mockLevel.current);
        const xPostion = getRandomNumberInRange(0, 100);
        if(healt.current === 0){
          clearInterval(intervalId);
          return;
        }
        setShowWord((prev) => {
          mockLevel.current = prevMockLevel - 1;
          return [
            ...prev,
            {
              word: result[prevMockLevel],
              top: 10,
              left: xPostion,
              visible: true,
            },
          ];
        });
        count = count + 1;
      },
      3000 - level * 300 < 0 ? 100 : 3000 - level * 300
    );
  };

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="App">
      <div className="container">
        <Menu startClickHandler={startClickHandler} />
        {!menuVisible && timer !== 0 && (
          <div className="cont">timer:{timer}</div>
        )}
        <div className="level">level:{level}</div>
        <div className="level">healt:{healt.current}</div>
        <div className="level">point:{point}</div>
        <div className="fly-body">
          {showWord.map((box, index) => {
            if (box.visible) {
              return (
                <div
                  className="word-box"
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
            }
          })}
        </div>
        {healt.current === 0 && <GameOverMenu/>}
        <div className="input-container">
          <input onChange={(e) => setLetters(e.target.value)} value={letters} />
        </div>
      </div>
    </div>
  );
}

export default App;
