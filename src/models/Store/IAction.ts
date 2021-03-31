import { ActionTypes } from "../../context/actionTypes";

export interface IAction {
    type: ActionTypes;
    id: string;
    payload?: any; // unknown type
}
