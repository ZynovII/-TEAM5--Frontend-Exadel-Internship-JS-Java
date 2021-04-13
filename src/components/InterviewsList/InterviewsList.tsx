import React from "react";
import { useId } from "@fluentui/react-hooks";
import {
  mergeStyleSets,
  DetailsList,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  ScrollablePane,
  ScrollbarVisibility,
  Sticky,
  StickyPositionType,
  ActionButton,
} from "@fluentui/react";
import { getTheme } from "@fluentui/react";
import { InterviewListFilter } from "./InterviwListFilter";
import { InterviewStatus, IApplicant } from "../../models/IApplicant";
import { useHistory } from "react-router-dom";

const theme = getTheme();
// export interface IInterview extends IApplicant {
//     interviewDate: Date,
//     interviewTime: any
//    }
export interface IInterview {
  interviewDate: string;
  interviewTime: any;
  fullName: string;
  events: string;
  interviewStatus: InterviewStatus.Registered;
}
const calloutProps = { gapSpace: 0 };

const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};
const applicants: IInterview[] = [
  {
    interviewDate: "2017-05-24",
    interviewTime: "18:00",
    fullName: "Vova Ivanov",
    events: "Internship JS & Java",
    interviewStatus: InterviewStatus.Registered,
  },
  {
    interviewDate: "2017-05-24",
    interviewTime: "15:00",
    fullName: "Petr Krasnow",
    events: "C++ interview",
    interviewStatus: InterviewStatus.Registered,
  },
  {
    interviewDate: "2017-05-24",
    interviewTime: "10:00",
    fullName: "Nike Petrov",
    events: "Internship JS & Java",
    interviewStatus: InterviewStatus.Registered,
  },
  {
    interviewDate: "2017-05-24",
    interviewTime: "16:00",
    fullName: "Sonya Volina",
    events: "Business Analysis Meet UP",
    interviewStatus: InterviewStatus.Registered,
  },
];

const classNames = mergeStyleSets({
  table: {
    margin: "auto",
    maxWidth: "97%",
    maxHeight: 680,
  },
});

export interface IInterviewList {
  columns: IColumn[];
  items: IInterview[];
}
export const InterviewList: React.FC = () => {
  const tooltipId = useId("tooltip");
  const history = useHistory();
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "interviewDate",
      fieldName: "interviewDate",
      minWidth: 70,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "column2",
      name: "interviewTime",
      fieldName: "interviewTime",
      minWidth: 70,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "column3",
      name: "fullName",
      fieldName: "fullName",
      minWidth: 100,
      maxWidth: 250,
      isResizable: true,
    },
    {
      key: "column4",
      name: "events",
      fieldName: "events",
      minWidth: 100,
      maxWidth: 250,
      isResizable: true,
    },
    {
      key: "column5",
      name: "interviewStatus",
      fieldName: "interviewStatus",
      minWidth: 100,
      maxWidth: 250,
      isResizable: false,
    },
    {
      key: "column6",
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
          <ActionButton
            iconProps={{ iconName: "D365TalentHRCore" }}
            onClick={() =>
              history.push(`/admin/interviews/${applicants[0].fullName}`)
            }
            aria-describedby={tooltipId}
          ></ActionButton>
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
          <InterviewListFilter />
        </Sticky>
        <div
          className={` ${classNames.table}`}
          style={{ boxShadow: theme.effects.elevation16, fontWeight: "bold" }}
        >
          <DetailsList
            items={applicants}
            columns={columns}
            selectionMode={SelectionMode.multiple}
            isHeaderVisible={true}
            onRenderRow={(props, defaultRender) => (
              <div>
                {defaultRender({
                  ...props,
                  styles: { root: { fontSize: 18 } },
                })}
              </div>
            )}
          />
        </div>
      </ScrollablePane>
    </div>
  );
};
