import { IInterview } from "../IInterview";
import { IApplicant, IApplicantShortFromBackEnd } from "../IApplicant";
import { IEvent } from "../IEvent";

export interface IStore {
  loading: boolean;
  isAuthenticated: boolean;
  currentUserID: number;
  events: { [eventId: string]: IEvent };
  applicants: { [aplicantId: string]: IApplicantShortFromBackEnd };
  interviews: { [interviewId: string]: IInterview };
  selectedEventId: string;
  selectedApplicantId: string;
  selectedInterviewId: string;
}
