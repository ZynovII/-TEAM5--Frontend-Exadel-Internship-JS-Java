import React from "react";

import {
  Stack,
  IStackStyles,
  IStackItemStyles,
  ITextStyles,
  mergeStyles,
} from "@fluentui/react/lib";
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
  event: "E-learning",
  summary:
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  acceptanceStatus: AcceptStatus.Accepted,
  interviewStatus: InterviewStatus.AwaitingHRInterview,
  interviewDate: "03.24.2021",
  interviewTime: "11:00",
  assignedHRID: "111",
  assignedTSID: "999",
  HRFeedback: "",
  TSFeedback: "",
  preferredTime: PreferredTime.First,
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
      <Wrapper egdfg>
        <Stack
          horizontalAlign="start"
          styles={containerStackStyles}
          tokens={{ childrenGap: "l2" }}
        >
          <div>
            <h3 style={{ marginBottom: 0 }}>Welcome, User!</h3>
            <span className="ms-fontSize-16">TS specialist</span>
          </div>
          <Stack styles={stackStyles}>
            <Stack.Item align="start" tokens={{ margin: "0 0 3rem 0" }}>
              <h1>Internship JS&amp;Java</h1>
            </Stack.Item>
            <Stack
              horizontal
              verticalAlign="start"
              wrap
              tokens={{ childrenGap: "l2" }}
              styles={candidatInfoStyles}
            >
              <InfoForm candidat={candidat} />
            </Stack>
          </Stack>
          <div>
            <h3>Interview</h3>
          </div>
          <Stack styles={interwiStack}>
            <OperationsTable operations={operations} />
          </Stack>
          <FeedbackForm control={control} errors={errors} onSave={onSave} />
        </Stack>
      </Wrapper>
    </>
  );
};

export default TSPage;

const interwiStack: IStackStyles = {
  root: { width: "100%" },
};
const containerStackStyles: IStackStyles = {
  root: {
    padding: "0",
    display: "block",
    "@media(min-width: 725px)": {
      display: "flex",
      maxWidth: "100%",
    },
  },
};

const stackStyles: IStackStyles = {
  root: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    width: "100%",
    padding: "2rem 1rem",
    display: "block",
    textAlign: "center",
    "@media(min-width: 725px)": {
      display: "flex",
      padding: "4rem",
      textAlign: "start",
    },
  },
};

const candidatInfoStyles: IStackStyles = {
  root: {
    margin: "0 0 2rem 0",
  },
  inner: {
    flexDirection: "column",
    alignItems: "center",
    "@media(min-width: 500px)": {
      flexDirection: "row",
    },
  },
};

const tsInfoStyles1: IStackItemStyles = {
  root: {
    boxShadow: "0px 4px 10px -6px rgba(17, 17, 26, 0.1)",
    padding: "0 0.7rem 0.5rem",
    width: "100%",
  },
};
const tsInfoStyles2: IStackItemStyles = {
  root: {
    padding: "0.5rem 0.7rem 0.5rem",
    width: "100%",
  },
};
const textStyles: ITextStyles = {
  root: {
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 2px 0px",
    padding: "0.1rem 0.7rem",
  },
};
const iconClass = mergeStyles({
  fontSize: 16,

  margin: "0 0 0 10px",
});
