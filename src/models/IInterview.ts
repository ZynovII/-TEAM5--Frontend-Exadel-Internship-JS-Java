import { IApplicantDetailsFromBackEnd, InterviewStatus } from "./IApplicant";
import { IEvent } from "./IEvent";
import { UserRole } from "./IUser";
import { ID } from "./Store/IStore";

export interface IInterview {
  id: ID;
  interviewDate: string;
  interviewer: string;
  candidate: IApplicantDetailsFromBackEnd;
  event: IEvent;
  feedback: string;
}
export interface IInterviewInCandite {
  id: ID;
  feedback: string;
  interviewerName: string;
  startTime: string;
  endTime: string;
}
export interface IInterviewFromBackEnd {
  candidate: string;
  candidatePrimaryTech: string;
  employee: string;
  idInterview: ID;
  interviewProcess: InterviewStatus;
  interviewTime: string;
}
