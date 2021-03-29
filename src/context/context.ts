import React, { createContext } from "react";
import { IAction } from "../models/Store/IAction";
import { IStore } from "../models/Store/IStore";
import { initialState } from "./Store";

export const Context = createContext<{
    state: IStore;
    dispatch: React.Dispatch<IAction>;
}>({ state: initialState, dispatch: () => {} });
