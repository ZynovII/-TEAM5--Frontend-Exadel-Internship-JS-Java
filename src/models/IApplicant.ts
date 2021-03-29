import { IEvent } from "./IEvent";

export interface IApplicant {
    id: number;
    fullName: string;
    email: string;
    phoneNumber?: string;
    skype: string;
    resumeLink?: string;
    technology: string[];                           // that should be tags?
    events: IEvent[];
    summary: string;
    country: string;
    city: string;
    acceptanceStatus: 'Accepted' | 'Rejected' | 'Pending';                              // ???
    interviewStatus: 'Registered' | 'Awaiting HR interview' | 'Awaiting TS interview';  // ???
    assignedHRID: number;
    assignedTSID: number;
    HRFeedback: string;
    TSFeedback: string;
}