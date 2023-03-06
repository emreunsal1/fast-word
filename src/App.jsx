import React, { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import { generateRandomWord } from "./utils";
import { getContext } from "./Context";

function App() {
  const { state, setState } = getContext();
  const { menuVisible, level } = state;
  const { setLevel } = setState;
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState("");
  const [showWord, setShowWord] = useState([]);
  const [count, setCount] = useState(0);
  const [mockLevel, setMockLevel] = useState(null);
  const intervalId = useRef(null);

  useEffect(() => {
    setWords(generateRandomWord(level * 2, level * 3));
  }, []);

  useEffect(() => {
    if (!menuVisible) {
      setShowWord(words[mockLevel]);
    }
    if (mockLevel === 0) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setShowWord([]);
      setTimeout(() => {
        setLevel((prev) => prev + 1);
        showWordWindow();
      }, 3000);
    }
  }, [mockLevel]);

  useEffect(() => {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setWords(generateRandomWord(level * 2, level * 3));
    setMockLevel(level * 3 - 1);
    showWordWindow();
  }, [level]);

  useEffect(() => {
    if (count === 0 && intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      showWordWindow();
    }
  }, [count]);

  useEffect(() => {
    !menuVisible && startGame();
  }, [menuVisible]);

  const startGame = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setCount(3);
    intervalId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  const showWordWindow = () => {
    console.log("show rword", intervalId.current);
    console.log("abc fmock çeve", mockLevel);
    clearInterval(intervalId.current);
    intervalId.current = null;
    intervalId.current = setInterval(() => {
      setMockLevel((prev) => prev - 1);
    }, 2000);
  };

  return (
    <div className="App">
      <Menu />
      {!menuVisible && <div className="cont">{count}</div>}
      <div className="word"> {showWord}</div>
      <input onChange={(e) => setLetters(e.target.value)} />
    </div>
  );
}

export default App;
