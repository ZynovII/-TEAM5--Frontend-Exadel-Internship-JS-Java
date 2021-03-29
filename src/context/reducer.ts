import { IStore } from "../models/Store/IStore";
import { IAction } from "../models/Store/IAction";
import { ActionTypes } from "./actionTypes";

export const reducer = (state: IStore, action: IAction): IStore => {
    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return { ...state, isAuthenticated: true };
        case ActionTypes.SIGN_OUT:
            return { ...state, isAuthenticated: false };
        case ActionTypes.CREATE_EVENT:
            return { ...state, events: [...state.events, action.payload] };
        case ActionTypes.UPDATE_EVENT:
            return {
                ...state,
                events: state.events.map((event) =>
                    event.id === action.payload.id ? action.payload : event
                ),
            };
        case ActionTypes.CREATE_APPLICANT:
            return {
                ...state,
                applicants: [...state.applicants, action.payload],
            };
        case ActionTypes.UPDATE_APPLICANT:
            return {
                ...state,
                applicants: state.applicants.map((applicant) =>
                    applicant.id === action.payload.id
                        ? action.payload
                        : applicant
                ),
            };
        default:
            return state;
    }
};
