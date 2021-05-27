import { IInterview, IInterviewFromBackEnd } from "../IInterview";
import {
  IApplicant,
  IApplicantShortFromBackEnd,
  IApplicantDetailsFromBackEnd,
} from "../IApplicant";
import { IEvent } from "../IEvent";
import { IUser } from "../IUser";

export type ID = string | number;

export interface IStore {
  loading: boolean;
  isAuthenticated: boolean;
  currentUser: IUser;
  events: { [eventId: string]: IEvent };
  publishedEvents: { [eventId: string]: IEvent };
  archivedEvents: { [eventId: string]: IEvent };
  applicants: { [aplicantId: string]: IApplicantShortFromBackEnd };
  interviews: { [interviewId: string]: IInterviewFromBackEnd };
  selectedEvent: IEvent;
  selectedApplicant: IApplicantDetailsFromBackEnd;
  selectedInterview: IInterview;
  interviewers: any; // поправь
}
