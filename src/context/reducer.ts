import { IStore } from "../models/Store/IStore";
import { IAction } from "../models/Store/IAction";
import { ActionTypes } from "./actionTypes";
import { IEvent } from "../models/IEvent";
import { IApplicant, IApplicantShortFromBackEnd } from "../models/IApplicant";
import { IInterview } from "../models/IInterview";

export const reducer = (state: IStore, action: IAction): IStore => {
  const { type, payload, id } = action;
  switch (type) {
    case ActionTypes.SHOW_LOADER:
      return { ...state, loading: true };
    case ActionTypes.HIDE_LOADER:
      return { ...state, loading: false };
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        currentUserID: payload,
        loading: false,
      };
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
      const newApplicants: {
        [aplicantId: string]: IApplicantShortFromBackEnd;
      } = (payload as IApplicant[]).reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {}
      );
      return {
        ...state,
        applicants: { ...state.applicants, ...newApplicants },
        loading: false,
      };
    case ActionTypes.FETCH_EVENTS:
      const newEvents: {
        [eventId: string]: IEvent;
      } = (payload as IEvent[]).reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item,
        }),
        {}
      );
      return {
        ...state,
        events: { ...state.events, ...newEvents },
        loading: false,
      };
    case ActionTypes.FETCH_INTERVIEWS:
      const newInterviews: {
        [interviewId: string]: IInterview;
      } = (payload as IInterview[]).reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item,
        }),
        {}
      );
      return {
        ...state,
        interviews: { ...state.interviews, ...newInterviews },
        loading: false,
      };
    case ActionTypes.SELECT_EVENT:
      return {
        ...state,
        selectedEvent: payload,
        loading: false,
      };
    case ActionTypes.SELECT_APPLICANT:
      return {
        ...state,
        selectedApplicant: payload,
      };
    case ActionTypes.SELECT_INTERVIEW:
      return {
        ...state,
        selectedInterview: payload,
      };
    default:
      return state;
  }
};
