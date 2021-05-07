import React, { createContext, useContext } from "react";
import { IAction } from "../models/Store/IAction";
import { IStore } from "../models/Store/IStore";

export const initialState: IStore = {
  isAuthenticated: true,
  currentUserID: null,
  events: {},
  publishedEvents: {},
  loading: true,
  applicants: {},
  interviews: {},
  selectedEvent: null,
  selectedApplicant: null,
  selectedInterview: null,
};

export const Context = createContext<{
  state: IStore;
  dispatch: React.Dispatch<IAction>;
}>({ state: initialState, dispatch: () => {} });
