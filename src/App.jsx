import React, { useEffect, useState } from "react";
import randomSentence from "random-sentence";

function App() {
  const [sentences, setSentences] = useState([]);

  const generateRandomSentence = () => {
    const response = randomSentence({ words: 5 });
    console.log(response);
  };
  useEffect(() => {
    generateRandomSentence();
  }, []);

  return <div className="App"></div>;
}

export default App;
