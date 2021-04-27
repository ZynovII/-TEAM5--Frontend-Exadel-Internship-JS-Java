import { AcceptStatus, PreferredTime } from "../models/IApplicant";

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
    case PreferredTime.None:
      return "Any time";
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
