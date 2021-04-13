import React from "react";
import { DetailsList } from "@fluentui/react";
import {
  mergeStyleSets,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  ScrollablePane,
  ScrollbarVisibility,
  Sticky,
  StickyPositionType,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { getTheme } from "@fluentui/react";
import { AllApplicantFilter } from "./AllApplicantListFilter";
import { InterviewStatus } from "../../models/IApplicant";

const theme = getTheme();
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
const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

const classNames = mergeStyleSets({
  table: {
    margin: "auto",
    maxWidth: "97%",
    maxHeight: 680,
  },
});


export interface IApplicant {
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
  const tooltipId = useId("tooltip");
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
        <TooltipHost
          content="Show more information"
          id={tooltipId}
          calloutProps={calloutProps}
          styles={hostStyles}
        >
          <a href="#" aria-describedby={tooltipId}>
            <i className={`ms-Icon ms-Icon--More`} />
          </a>
        </TooltipHost>
      ),
    },
  ];
  return (
    <div style={{ height: "80vh", position: "relative" }}>
      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
        <Sticky
          stickyPosition={StickyPositionType.Header}
          isScrollSynced={true}
        >
          <AllApplicantFilter></AllApplicantFilter>
        </Sticky>
        <div
          className={` ${classNames.table}`}
          style={{ boxShadow: theme.effects.elevation16, fontWeight: "bold" }}
        >
          <DetailsList
            items={applicants}
            columns={columns}
            isHeaderVisible={false}
            selectionMode={SelectionMode.multiple}
          />
        </div>
      </ScrollablePane>
    </div>
  );
};
