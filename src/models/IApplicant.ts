import { IInterview } from "./IInterview";

export enum AcceptStatus {
  Accepted = "Accepted",
  Rejected = "Rejected",
  Pending = "Pending",
}
export enum InterviewStatus {
  Registered = "Registered",
  AwaitingHRInterview = "Awaiting HR interview",
  AwaitingTSInterview = "Awaiting TS interview",
  WaitingDesicion = "WaitingDesicion",
}
export enum PreferredTime {
  First = "9:00 - 12:00",
  Second = "12:00 - 14:00",
  Third = "14:00 - 16:00",
  Forth = "16:00 - 18:00",
  Any = "Any",
  None = "None",
}

export interface IApplicant {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  skype: string;
  resumeLink?: string;
  technology: string; // tags
  event: string; // event id
  summary?: string;
  country: string;
  city: string;
  preferredTime: PreferredTime;
  acceptanceStatus: AcceptStatus;
  interviewStatus: InterviewStatus;
  interviews?: IInterview[];
  // remove
  assignedHRID: string; //
  assignedTSID: string; //
  HRFeedback: string; //
  TSFeedback: string; //
  interviewDate: string; // ?
  interviewTime: string; // ?
}
