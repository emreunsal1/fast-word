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
  const skyInterval = useRef([]);

  useEffect(() => {
    if(showWord.includes(letters)){
      const result = showWord.filter((item)=> item !== letters);
      if(result.length || showWord[0] === letters){
       setShowWord(result);
        setLetters("");
      }
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
  useEffect(() => {
    if(boxPosition.length){
      startBoxSky(boxPosition)
      return;
    }
    clearInterval(skyInterval);
  }, [boxPosition])
  

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
    let count = 0;
    intervalId.current = setInterval(() => {
      const prevMockLevel = Number(mockLevel.current);
      generateBoxPosition(100);
      setShowWord((prev) => {
        mockLevel.current = prevMockLevel - 1;
        return [...prev, result[prevMockLevel]];
      });
      count = count + 1;
    }, 3000);
  };

  const generateBoxPosition = (limit,showWords)=>{
    console.log("abc show words", showWords);
    const randomNumber = Math.floor(Math.random() * limit);
    if(boxPosition.some((item)=> item.left === randomNumber)){
        generateBoxPosition();
        return;
    }
    setBoxPosition((prev) => [...prev, { left: randomNumber, top:0 }]);
     return;
  } 

  const startBoxSky = (positions) => {
    console.log("function çalıştı", positions);
    let newPositions = positions;
    skyInterval.current = setInterval(() => {
       newPositions.map((position,index)=> {
        console.log("positions map", position);
        if(position.top >= 50){
          setShowWord(showWord.filter((word,_index)=> index !== _index))
          newPositions = newPositions.filter((position,__index)=> index !== __index);
          console.log("if içine girdi", position.top);
          setBoxPosition(newPositions);
        }
        
        position.top = position.top + 5
        console.log("if dışı pos", newPositions);
        setBoxPosition(newPositions);
       });
       
    }, 5000);
  }

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
                style={{ left: `${boxPosition[index]?.left}%`, top: `${boxPosition[index]?.top}px`}}
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
