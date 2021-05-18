import { InterviewStatus } from "./IApplicant";
import { UserRole } from "./IUser";
import { ID } from "./Store/IStore";

export interface IInterview {
  id: ID;
  interviewDate: string;
  interviewTime: any;
  fullName: string;
  interviewerID: string;
  interviewerType: UserRole;
  events: string;
  feedback: string;
}
export interface IInterviewFromBackEnd {
  candidate: string;
  candidatePrimaryTech: string;
  employee: string;
  idInterview: ID;
  interviewProcess: InterviewStatus;
  interviewTime: string;
}
