import { IApplicant } from "../IApplicant";
import { IEvent } from "../IEvent";

export interface IStore {
  loading: boolean;
  isAuthenticated: boolean;
  currentUserID: number;
  events: IEvent[]; // { [eventId: string]: IEvent };
  applicants: { [aplicantId: string]: IApplicant };
}
