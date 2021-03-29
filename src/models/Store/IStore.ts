import { IApplicant } from "../IApplicant";
import { IEvent } from "../IEvent";

export interface IStore {
    isAuthenticated: boolean;
    events: IEvent[];
    applicants: IApplicant[];
}
