import { ActionTypes } from "../../context/actionTypes";

export interface IAction {
  type: ActionTypes;
  id?: number;
  payload?: any; // unknown type
}
