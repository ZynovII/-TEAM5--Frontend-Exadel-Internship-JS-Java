import { UserRole } from "./IUser";

export interface IInterview {
  id: string;
  interviewDate: string;
  interviewTime: any;
  fullName: string;
  interviewerID: string;
  interviewerType: UserRole;
  events: string;
  feedback: string;
}
