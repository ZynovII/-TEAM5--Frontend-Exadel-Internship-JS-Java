import React from "react";
import { CandidatePage } from "./CandidatePage";
import {
  IApplicant,
  AcceptStatus,
  InterviewStatus,
  PreferredTime,
} from "../../models/IApplicant";

const candidat: IApplicant[] = [
  {
    id: "aefo78a0",
    fullName: "Ivan Ivanov",
    email: "iivanov@mail.ru",
    skype: " ",
    phoneNumber: "+375294722147",
    country: "Belarus",
    city: "Minsk",
    technology: "Java",
    event: "E-learning",
    summary: " ",
    preferredTime: PreferredTime.First,
    acceptanceStatus: AcceptStatus.Accepted,
    interviewStatus: InterviewStatus.AwaitingHRInterview,
    interviewDate: "03.24.2021",
    interviewTime: "11:00",
    assignedHRID: "111",
    assignedTSID: "999",
    HRFeedback: "",
    TSFeedback: "",
  },
];

export const CandidatInfo: React.FC = () => {
  return (
    <section>
      {candidat.map((obj: IApplicant) => (
        <CandidatePage key={obj.id} candidat={obj} />
      ))}
    </section>
  );
};
export default CandidatInfo;
