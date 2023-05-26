import React, { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import { generateRandomWord } from "./utils";
import { getContext } from "./Context";
import "./style/index.scss";

function App() {
  const { state, setState } = getContext();
  const { menuVisible, level } = state;
  const { setLevel } = setState;
  const [words, setWords] = useState();
  const [letters, setLetters] = useState("");
  const [showWord, setShowWord] = useState([]);
  const [timer, setTimer] = useState(3);

  const intervalId = useRef(null);
  const mockLevel = useRef(null);

  useEffect(() => {
    if (showWord.includes(letters)) {
      const result = showWord.filter((item) => item !== letters);
      if (result.length || showWord[0] === letters) {
        setShowWord(result);
        setLetters("");
      }
    }
  }, [letters]);

  useEffect(() => {
    if (timer === 0) {
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
      mockLevel.current === null
    ) {
      setLevel((prev) => prev + 1);
      startGame(level + 1);
    } else if(showWord.length !== 0) {
      console.log("tick")
      const removeBoxInterval = setInterval(() => {
        const updatedBox = showWord.map((box) => {
          const newTop = box.top + 5;
          if (newTop >= 200) {
            return { ...box, visible: false };
          }
          return { ...box, top: newTop };
        });
        setShowWord(updatedBox);
      }, 100);
      return ()=> clearInterval(removeBoxInterval);
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
    intervalId.current = setInterval(() => {
      const prevMockLevel = Number(mockLevel.current);
      const xPostion = getRandomNumberInRange(0, 100);
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
    }, 3000);
  };

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="App">
      <div className="container">
        <Menu startClickHandler={startClickHandler} />
        {!menuVisible && timer !== 0 && <div className="cont">{timer}</div>}
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
        <div className="input-container">
          <input onChange={(e) => setLetters(e.target.value)} value={letters} />
        </div>
      </div>
    </div>
  );
}

export default App;
