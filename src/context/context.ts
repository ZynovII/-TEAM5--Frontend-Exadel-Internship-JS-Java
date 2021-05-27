import React, { createContext } from "react";
import { IAction } from "../models/Store/IAction";
import { IStore } from "../models/Store/IStore";
import { tokenToUser } from "../utils/tokenToUser";

export const initialState: IStore = {
  isAuthenticated: !!localStorage.getItem("token") || false,
  currentUser: tokenToUser(localStorage.getItem("token")),
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
