import React, { useState, createContext, useContext } from "react";

const Context = createContext();
function ContextProvider({ children }) {
  const [options, setoptions] = useState({ maxL: 20, minL: 3, length: 3 });
  const [level, setLevel] = useState(1);
  const value = {
    state: { level, options },
    setState: { setLevel, setoptions },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const getContext = () => useContext(Context);

export default ContextProvider;
