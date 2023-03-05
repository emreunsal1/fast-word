import React, { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import { generateRandomWord } from "./utils";
import { getContext } from "./Context";

function App() {
  const { state, setState } = getContext();
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState("");
  const [showWord, setShowWord] = useState([]);
  const [count, setCount] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);
  const intervalId = useRef(null);

  useEffect(() => {
    setWords(generateRandomWord());
  }, []);

  useEffect(() => {
    if (count === 0 && intervalId.current !== null) {
      return clearInterval(intervalId.current);
    }
    setShowWord(words[count - 1]);
  }, [count]);

  const startGame = () => {
    intervalId.current !== null && clearInterval(intervalId.current);
    setCount(5);
    intervalId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  return (
    <div className="App">
      <Menu visible={menuVisible} />
      <div className="cont">{count}</div>
      <div className="word"> {showWord}</div>
      <input
        onFocus={() => startGame()}
        onChange={(e) => setLetters(e.target.value)}
      />
    </div>
  );
}

export default App;
