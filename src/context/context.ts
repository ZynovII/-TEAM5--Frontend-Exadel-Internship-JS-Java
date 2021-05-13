import React, { createContext } from "react";
import { IAction } from "../models/Store/IAction";
import { IStore } from "../models/Store/IStore";

export const initialState: IStore = {
  isAuthenticated: localStorage.user ? true : false,
  currentUser: localStorage.user ? JSON.parse(localStorage.user) : null,
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
