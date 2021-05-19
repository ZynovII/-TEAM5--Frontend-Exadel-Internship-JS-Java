import {
  AcceptStatus,
  InterviewStatus,
  PreferredTime,
} from "../models/IApplicant";
import { EventType } from "../models/IEvent";

export const preferredTimeReformer = (str: string): string => {
  switch (str) {
    case PreferredTime.First:
      return "10:00-12:00";
    case PreferredTime.Second:
      return "12:00-14:00";
    case PreferredTime.Third:
      return "14:00-16:00";
    case PreferredTime.Fourth:
      return "16:00-18:00";
    case PreferredTime.Any:
      return "Any time";
    default:
      return str;
  }
};
export const interviewStatusReformer = (str: string): string => {
  switch (str) {
    case InterviewStatus.Registered:
      return "Registered";
    case InterviewStatus.AwaitingHRInterview:
      return "Waiting for HR";
    case InterviewStatus.AwaitingTSInterview:
      return "Waiting for TS";
    case InterviewStatus.WaitingDecision:
      return "Awaiting a Decision";
    default:
      return str;
  }
};

export const acceptStatusReformer = (str: string): string => {
  switch (str) {
    case AcceptStatus.Accepted:
      return "Accepted";
    case AcceptStatus.Pending:
      return "Pending";
    case AcceptStatus.Rejected:
      return "Rejected";
    default:
      return str;
  }
};

export const dateReformer = (str: string): string => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return new Date(str).toLocaleDateString("en-GB", options);
};
export const timeReformer = (str: string): string => {
  return new Date(str).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  });
};

export const eventTypeReformer = (str: string): string => {
  switch (str) {
    case EventType.Internship:
      return "Internship";
    case EventType.MeetUp:
      return "MeetUp";
    case EventType.Training:
      return "Training";
    default:
      return str;
  }
};
