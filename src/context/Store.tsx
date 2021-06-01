import React, { useReducer, useEffect } from "react";
import { IStore } from "../models/Store/IStore";

import { Context } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./context";

export const Store: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
