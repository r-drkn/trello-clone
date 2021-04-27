import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [lists, setLists] = useState([]);

  return (
    <GlobalContext.Provider value={{ cards, setCards, lists, setLists }}>
      {children}
    </GlobalContext.Provider>
  );
}
