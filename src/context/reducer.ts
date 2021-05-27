import { IStore } from "../models/Store/IStore";
import { IAction } from "../models/Store/IAction";
import { ActionTypes } from "./actionTypes";
import { IEvent } from "../models/IEvent";
import { IApplicant, IApplicantShortFromBackEnd } from "../models/IApplicant";
import { IInterview, IInterviewFromBackEnd } from "../models/IInterview";

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
        currentUser: payload,
        loading: false,
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        loading: false,
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

    case ActionTypes.CLEAR_EVENTS:
      return {
        ...state,
        events: {},
      };
    case ActionTypes.CLEAR_PUBLISHED_EVENTS:
      return {
        ...state,
        publishedEvents: {},
      };
    case ActionTypes.CLEAR_ARCHIVED_EVENTS:
      return {
        ...state,
        archivedEvents: {},
      };
    case ActionTypes.FETCH_ARCHIVED_EVENTS:{
      const newEvents: {
        [eventId: string]: IEvent;
      } = (payload as IEvent[]).reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item,
        }),
        {}
      );

      return{
        ...state,
        archivedEvents:{...state.archivedEvents,...newEvents},
        loading: false,
      }
    }
    case ActionTypes.FETCH_PUBLISHED_EVENTS:
      const newEvent: {
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
        publishedEvents: { ...state.publishedEvents, ...newEvent },
        loading: false,
      };
    case ActionTypes.FETCH_INTERVIEWS:
      const newInterviews: {
        [interviewId: string]: IInterviewFromBackEnd;
      } = (payload as IInterviewFromBackEnd[]).reduce(
        (acc, item) => ({
          ...acc,
          [item.idInterview]: item,
        }),
        {}
      );
      return {
        ...state,
        interviews: { ...state.interviews, ...newInterviews },
        loading: false,
      };
    case ActionTypes.FETCH_INTERVIEWERS:
      return {
        ...state,
        interviewers: payload,
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
        loading: false,
      };
    case ActionTypes.SELECT_INTERVIEW:
      return {
        ...state,
        selectedInterview: payload,
      };
    case ActionTypes.FETCH_FILTERED_APPLICANTS:
      const filteredApplicants: {
        [aplicantId: string]: IApplicantShortFromBackEnd;
      } = (payload as IApplicant[]).reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {}
      );
      return {
        ...state,
        applicants: filteredApplicants,
        loading: false,
      };
    default:
      return state;
  }
};
