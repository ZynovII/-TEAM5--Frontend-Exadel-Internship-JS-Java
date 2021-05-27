import React, { createContext } from "react";
import { IAction } from "../models/Store/IAction";
import { IStore } from "../models/Store/IStore";

export const initialState: IStore = {
  isAuthenticated: false,
  currentUser: null,
  events: {},
  publishedEvents: {},
  archivedEvents:{},
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
