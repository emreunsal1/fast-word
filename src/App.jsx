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
      setShowWord((prev) => {
        mockLevel.current = prevMockLevel - 1;
        return [...prev, result[prevMockLevel]];
      });
    }, 3000);
  };

  return (
    <div className="App">
      <Menu startClickHandler={startClickHandler} />
      {!menuVisible && <div className="cont">{count}</div>}
      {showWord.map((word, index) => {
        return (
          <div className="word" key={index}>
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
      <input onChange={(e) => setLetters(e.target.value)} value={letters} />
    </div>
  );
}

export default App;
