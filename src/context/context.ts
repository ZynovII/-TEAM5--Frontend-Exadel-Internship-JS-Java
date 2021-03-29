import React, { createContext } from "react";
import { IAction } from "../models/Store/IAction";
import { IStore } from "../models/Store/IStore";

export const initialState: IStore = {
    isAuthenticated: false,
    events: [],
    applicants: [],
};

export const Context = createContext<{
    state: IStore;
    dispatch: React.Dispatch<IAction>;
}>({ state: initialState, dispatch: () => {} });
