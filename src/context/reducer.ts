import { IStore } from "../models/Store/IStore";
import { IAction } from "../models/Store/IAction";
import { ActionTypes } from "./actionTypes";

export const reducer = (state: IStore, action: IAction): IStore => {
    const { type, payload, id } = action;
    switch (type) {
        case ActionTypes.SIGN_IN:
            return { ...state, isAuthenticated: true };
        case ActionTypes.SIGN_OUT:
            return { ...state, isAuthenticated: false };
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
        default:
            return state;
    }
};
