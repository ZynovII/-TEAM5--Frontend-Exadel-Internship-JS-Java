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

export interface IApplicant {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  skype: string;
  resumeLink?: string;
  technology: string[]; // tags
  events: number[]; // event id
  summary: string;
  country: string;
  city: string;
  acceptanceStatus: AcceptStatus;
  interviewStatus: InterviewStatus;
  assignedHRID: number;
  assignedTSID: number;
  HRFeedback: string;
  TSFeedback: string;
}
