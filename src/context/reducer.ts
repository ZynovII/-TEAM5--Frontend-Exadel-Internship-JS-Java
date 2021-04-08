import { IStore } from "../models/Store/IStore";
import { IAction } from "../models/Store/IAction";
import { ActionTypes } from "./actionTypes";

export const reducer = (state: IStore, action: IAction): IStore => {
  const { type, payload, id } = action;
  switch (type) {
    case ActionTypes.SHOW_LOADER:
      return { ...state, loading: true };
    case ActionTypes.SIGN_IN:
      return { ...state, isAuthenticated: true, loading: false };
    case ActionTypes.SIGN_OUT:
      return { ...state, isAuthenticated: false, loading: false };
    case ActionTypes.CREATE_EVENT:
      return { ...state, events: { ...state.events, [id]: payload } };
    case ActionTypes.UPDATE_EVENT:
      return {
        ...state,
        events: { ...state.events, [id]: payload },
      };
    case ActionTypes.CREATE_APPLICANT:
      return {
        ...state,
        applicants: { ...state.applicants, [id]: payload },
      };
    case ActionTypes.UPDATE_APPLICANT:
      return {
        ...state,
        applicants: { ...state.applicants, [id]: payload },
      };
    case ActionTypes.FETCH_APPLICANTS:
      return {
        ...state,
        applicants: payload,
        loading: false,
      };
    case ActionTypes.FETCH_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };
    case ActionTypes.FETCH_MORE_EVENTS:
      return {
        ...state,
        events: { ...state.events, ...payload },
      };
    case ActionTypes.FETCH_MORE_APPLICANTS:
      return {
        ...state,
        applicants: { ...state.applicants, ...payload },
      };
    default:
      return state;
  }
};
