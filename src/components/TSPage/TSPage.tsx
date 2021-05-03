import React from "react";

import { mergeStyleSets } from "@fluentui/react/lib";
import { useBoolean } from "@fluentui/react-hooks";

import {
  AcceptStatus,
  IApplicant,
  InterviewStatus,
  PreferredTime,
} from "../../models/IApplicant";

import { IInterview } from "../../models/IInterview";
import { UserRole } from "../../models/IUser";
import { useForm } from "react-hook-form";
import Wrapper from "../UI/Wrapper/Wrapper";
import OperationsTable from "../InterviewPage/OperationsTable";
import { InfoForm } from "../CandidatePage/InfoForm";
import { FeedbackForm } from "./FeedbackForm";
import ModalWindow from "./../ModalWindow";

const candidat: IApplicant = {
  id: "aefo78a0",
  fullName: "Ivan Ivanov",
  email: "iivanov@mail.ru",
  skype: "ggwp",
  phoneNumber: "+375294722147",
  country: "Belarus",
  city: "Minsk",
  technology: "Java",
  summary:
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  acceptanceStatus: AcceptStatus.Accepted,
  interviewStatus: InterviewStatus.AwaitingHRInterview,
  preferredTime: PreferredTime.First,
  eventName: "js&java",
};
const interview: IInterview = {
  id: "aefd78a0",
  interviewDate: "03.24.2021",
  interviewTime: "11:00",
  fullName: "Ivam Petrov",
  interviewerID: "aefd78sa0",
  interviewerType: UserRole.TechSpec,
  events: "java&Js",
  feedback: "",
};
const operations = [
  {
    interviewer: "TS",
    date: "18.03.2021",
    time: "13:00-14:00",
  },
  {
    interviewer: "HR",
    date: "11.03.2021",
    time: "14:00-14:30",
  },
];

const TSPage: React.FC = () => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const modalText = "Your feedback has been successfully sent!";
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IApplicant>();

  const onSave = () => {
    handleSubmit(
      (data) => {
        console.log(data);
        showModal();
      },
      (err) => {
        console.log("ошибка заполнения");
        console.log(err);
      }
    )();
  };

  return (
    <>
      <ModalWindow open={isModalOpen} text={modalText} hideModal={hideModal} />
      <Wrapper>
        <div className={contentStyles.container}>
          <div className={contentStyles.label}>
            <h3 style={{ marginBottom: 0 }}>Welcome, User!</h3>
            <span className="ms-fontSize-16">TS specialist</span>
          </div>
          <div className={contentStyles.cadidatInfo}>
            <div className={contentStyles.title}>
              <h2>Internship JS&amp;Java</h2>
            </div>
            <div className={contentStyles.infoform}>
              <InfoForm candidat={candidat} />
            </div>
          </div>
          <div>
            <h3>Interview</h3>
          </div>
          <div className={contentStyles.table}>
            <OperationsTable operations={operations} />
          </div>
          <FeedbackForm control={control} errors={errors} onSave={onSave} />
        </div>
      </Wrapper>
    </>
  );
};

export default TSPage;

const contentStyles = mergeStyleSets({
  label: {
    marginBottom: "1rem",
  },
  container: {
    padding: "1.5rem 0",
  },

  cadidatInfo: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    padding: "0rem 1rem",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginBottom: "1rem",
    "@media(min-width: 725px)": {
      padding: "4rem 4rem 1rem 4rem",
      textAlign: "start",
      marginBottom: "2rem",
    },
  },
  title: {
    //margin: "0 0 3rem 0",
  },
  infoform: {
    marginBottom: "0",
  },
  table: {
    marginBottom: "2rem",
  },
  icon: {
    fontSize: 16,
    margin: "0 0 0 10px",
  },
});
