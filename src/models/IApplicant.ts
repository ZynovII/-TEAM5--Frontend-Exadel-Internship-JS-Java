import { IInterview } from "./IInterview";
import { ID } from "./Store/IStore";

export enum AcceptStatus {
  Accepted = "GREEN",
  Rejected = "RED",
  Pending = "YELLOW",
}
export enum InterviewStatus {
  Registered = "REGISTERED",
  AwaitingHRInterview = "AWAITING_HR",
  AwaitingTSInterview = "AWAITING_TS",
  WaitingDecision = "WAITING_DECISION",
}
export enum PreferredTime {
  First = "FROM_TEN_TO_TWELVE",
  Second = "FROM_TWELVE_TO_TWO",
  Third = "FROM_TWO_TO_FOUR",
  Fourth = "FROM_FOUR_TO_SIX",
  Any = "ANY",
}

export interface IApplicant {
  id: ID;
  fullName: string;
  email: string;
  skype: string;
  phoneNumber?: string;
  resumeLink?: string;
  technology: string;
  eventName: string;
  summary?: string;
  country: string;
  city: string;
  interviews?: IInterview[];
  preferredTime: PreferredTime;
  acceptanceStatus: AcceptStatus;
  interviewStatus: InterviewStatus;
}
export interface IApplicantDetailsFromBackEnd {
  id: ID;
  city: string;
  skype: string;
  email: string;
  phone: string;
  country: string;
  summary: string;
  fullName: string;
  eventName: string;
  status: AcceptStatus;
  interviews: IInterview[];
  preferredTime: PreferredTime;
  interviewProcess: InterviewStatus;
}
export interface IApplicantShortFromBackEnd {
  id: ID;
  event: string;
  fullName: string;
  primaryTech: string;
  status: AcceptStatus;
}
