import React from "react";
import { DetailsList } from "@fluentui/react";
import {
  mergeStyleSets,
  SelectionMode,
  IColumn,
  TooltipHost,
} from "@fluentui/react";
import { InterviewStatus } from "../../models/IApplicant";

const applicants: IApplicant[] = [
  {
    name: "Vova Ivanov",
    event: "Internship JS & Java",
    skill: "Java",
    interviewStatus: InterviewStatus.Registered,
  },
  {
    name: "Petr Krasnow",
    event: "C++ interview",
    skill: "C++",
    interviewStatus: InterviewStatus.Registered,
  },
  {
    name: "Nike Petrov",
    event: "Internship JS & Java",
    skill: "JavaScript",
    interviewStatus: InterviewStatus.Registered,
  },
  {
    name: "Sonya Volina",
    event: "Business Analysis Meet UP",
    skill: "Business Analysis",
    interviewStatus: InterviewStatus.Registered,
  },
];
const columns: IColumn[] = [
  {
    key: "column1",
    name: "Applicant",
    fieldName: "name",
    minWidth: 100,
    maxWidth: 300,
    isResizable: true,
  },
  {
    key: "column2",
    name: "Event",
    fieldName: "event",
    minWidth: 100,
    maxWidth: 300,
    isResizable: true,
  },
  {
    key: "column3",
    name: "Main skill",
    fieldName: "skill",
    minWidth: 100,
    maxWidth: 300,
    isResizable: true,
  },
  {
    key: "column4",
    name: "Status",
    fieldName: "interviewStatus",
    minWidth: 100,
    maxWidth: 300,
    isResizable: true,
  },
  {
    key: "column5",
    name: "More",
    isIconOnly: true,
    fieldName: "",
    minWidth: 50,
    maxWidth: 50,
    isResizable: false,
    onRender: () => (
      <TooltipHost>
        <a href="#">
          <i className={`ms-Icon ms-Icon--More`} />
        </a>
      </TooltipHost>
    ),
  },
];

const classNames = mergeStyleSets({
  table: {
    margin: "auto",
    maxWidth: "73%",
    maxHeight: 680,
  },
});

export interface IApplicant {
  // revriting existed interface
  name: string;
  event: string;
  skill: string;
  interviewStatus: InterviewStatus;
}
export interface IApplicantList {
  columns: IColumn[];
  items: IApplicant[];
}
export const ApplicantList: React.FC = () => {
  return (
    <div data-is-scrollable={true}>
      <div className={` ${classNames.table}`}>
        <DetailsList
          items={applicants}
          columns={columns}
          selectionMode={SelectionMode.multiple}
        />
      </div>
    </div>
  );
};
