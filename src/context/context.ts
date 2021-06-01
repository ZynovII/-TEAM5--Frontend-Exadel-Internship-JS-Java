import React, { createContext } from "react";
import { IAction } from "../models/Store/IAction";
import { IStore } from "../models/Store/IStore";
import { tokenToUser } from "../utils/tokenToUser";

let token = localStorage.getItem("token") || null;

export const initialState: IStore = {
  isAuthenticated: !!token || false,
  currentUser: !!token ? tokenToUser(token) : null,
  events: {},
  publishedEvents: {},
  archivedEvents: {},
  loading: true,
  applicants: {},
  interviews: {},
  interviewers: [],
  selectedEvent: null,
  selectedApplicant: null,
  selectedInterview: null,
};

export const Context = createContext<{
  state: IStore;
  dispatch: React.Dispatch<IAction>;
}>({ state: initialState, dispatch: () => {} });
