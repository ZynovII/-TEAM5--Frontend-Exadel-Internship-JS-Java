import { IInterview } from "../IInterview";
import { IApplicant, IApplicantShortFromBackEnd } from "../IApplicant";
import { IEvent } from "../IEvent";

export type ID = string | number;

export interface IStore {
  loading: boolean;
  isAuthenticated: boolean;
  currentUserID: number;
  events: { [eventId: string]: IEvent };
  applicants: { [aplicantId: string]: IApplicantShortFromBackEnd };
  interviews: { [interviewId: string]: IInterview };
  selectedEvent: IEvent;
  selectedApplicant: IApplicant;
  selectedInterview: IInterview;
}
