import React, { useState, createContext, useContext } from "react";

const Context = createContext();
function ContextProvider({ children }) {
  const [options, setoptions] = useState({ maxL: 20, minL: 3, length: 3 });
  const [level, setLevel] = useState(1);
  const [menuVisible, setMenuVisible] = useState(true);
  const value = {
    state: { level, options, menuVisible },
    setState: { setLevel, setoptions, setMenuVisible },
    func: {},
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const getContext = () => useContext(Context);

export default ContextProvider;
