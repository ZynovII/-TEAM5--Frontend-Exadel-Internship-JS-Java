import { IInterview } from "../IInterview";
import { IApplicant, IApplicantShortFromBackEnd } from "../IApplicant";
import { IEvent, IEventFromBackEnd } from "../IEvent";

export interface IStore {
  loading: boolean;
  isAuthenticated: boolean;
  currentUserID: number;
  events: { [eventId: number]: IEvent };
  publishedEvents: { [eventId: number]: IEvent };
  applicants: { [aplicantId: string]: IApplicantShortFromBackEnd };
  interviews: { [interviewId: string]: IInterview };
  selectedEvent: IEvent;
  selectedApplicant: IApplicant;
  selectedInterview: IInterview;
}
