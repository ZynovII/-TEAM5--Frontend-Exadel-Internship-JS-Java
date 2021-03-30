import { IApplicant } from "../IApplicant";
import { IEvent } from "../IEvent";

export interface IStore {
    isAuthenticated: boolean;
    currentUserID: number;
    events: { [eventId: string]: IEvent };
    applicants: { [aplicantId: string]: IApplicant };
}
