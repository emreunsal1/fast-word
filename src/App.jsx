import React, { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import { generateRandomWord } from "./utils";
import { getContext } from "./Context";

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
    const newShowWord = showWord.filter((item, index) => letters !== item);
    setShowWord(newShowWord);
  }, [letters]);

  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      startGame();
    }
  }, [count]);

  useEffect(() => {
    if (mockLevel.current < 0) {
      console.log("clear oldu garam");
      clearInterval(intervalId.current);
      intervalId.current = null;
      mockLevel.current = null;
    }
  }, [mockLevel.current]);

  const startClickHandler = () => {
    intervalId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  const startGame = () => {
    const result = generateRandomWord(3, level * 3);
    setWords(result);
    mockLevel.current = level * 3;
    windowShowWord(result);
  };

  const windowShowWord = (result) => {
    console.log("result", result);
    intervalId.current = setInterval(() => {
      setShowWord((prev) => [...prev, result[mockLevel.current]]);
      mockLevel.current = mockLevel.current - 1;
    }, 3000);
  };

  return (
    <div className="App">
      <Menu startClickHandler={startClickHandler} />
      {!menuVisible && <div className="cont">{count}</div>}
      <div className="word"> {showWord}</div>
      <input onChange={(e) => setLetters(e.target.value)} />
    </div>
  );
}

export default App;
