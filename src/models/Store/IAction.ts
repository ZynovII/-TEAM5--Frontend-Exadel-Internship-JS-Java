import { ActionTypes } from "../../context/actionTypes";
import { ID } from "./IStore";

export interface IAction {
  type: ActionTypes;
  id?: ID;
  payload?: any; // unknown type
}
