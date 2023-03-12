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
  const [count, setCount] = useState(3);
  const [boxPosition, setBoxPosition] = useState([]);

  const intervalId = useRef(null);
  const mockLevel = useRef(null);

  useEffect(() => {
    if (letters === showWord[0]) {
      const newArray = Array.from(showWord);
      newArray.shift();
      setShowWord(newArray);
      setLetters("");
    }
  }, [letters]);

  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      startGame(level);
    }
  }, [count]);

  useEffect(() => {
    if (mockLevel.current < 0) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      mockLevel.current = null;
      setBoxPosition([]);
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
    }
  }, [showWord]);

  const startClickHandler = () => {
    intervalId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  const startGame = (level) => {
    const result = generateRandomWord(3, level * 3);
    setWords(result);
    mockLevel.current = level * 3 - 1;
    windowShowWord(result);
  };

  const windowShowWord = (result) => {
    intervalId.current = setInterval(() => {
      const prevMockLevel = Number(mockLevel.current);
      setBoxPosition((prev) => [...prev, Math.floor(Math.random() * 100)]);
      setShowWord((prev) => {
        mockLevel.current = prevMockLevel - 1;
        return [...prev, result[prevMockLevel]];
      });
    }, 3000);
  };

  return (
    <div className="App">
      <div className="container">
        <Menu startClickHandler={startClickHandler} />
        {!menuVisible && count !== 0 && <div className="cont">{count}</div>}
        <div className="fly-body">
          {showWord.map((word, index) => {
            return (
              <div
                className="word-box"
                style={{ left: `${boxPosition[index]}%` }}
                key={index}
              >
                {word.split("").map((letter, index) => (
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
        <div className="input-container">
          <input onChange={(e) => setLetters(e.target.value)} value={letters} />
        </div>
      </div>
    </div>
  );
}

export default App;
