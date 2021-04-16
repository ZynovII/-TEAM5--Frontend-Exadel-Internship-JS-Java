import React, { useEffect } from "react";
import { useId } from "@fluentui/react-hooks";
import { useHistory } from "react-router-dom";
import {
  DetailsList,
  Sticky,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  ScrollablePane,
  ScrollbarVisibility,
  ActionButton,
  getTheme,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { InterviewListFilter } from "./InterviwListFilter";
import { InterviewStatus } from "../../models/IApplicant";
import { useApplicants } from "../../hooks/hooks";

const theme = getTheme();
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

export interface IInterviewList {
  columns: IColumn[];
  items: IInterview[];
}
export const InterviewList: React.FC = () => {
  const tooltipId = useId("tooltip");
  const history = useHistory();

  const { applicants, loading, fechApplicants } = useApplicants();

  useEffect(() => {
    fechApplicants();
  }, []);

  const applicantsList = Object.keys(applicants).map((idx) => {
    return {
      fullName: applicants[idx].fullName,
      event: applicants[idx].event,
      skill: applicants[idx].technology,
      interviewStatus: applicants[idx].interviewStatus,
      interviewDate: applicants[idx].interviewDate,
      interviewTime: applicants[idx].interviewTime,
    };
  });
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
      name: "event",
      fieldName: "event",
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
            onClick={() => history.push(`/admin/interviews/${"unknow"}`)} // selected id from state
            aria-describedby={tooltipId}
          ></ActionButton>
        </TooltipHost>
      ),
    },
  ];
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <InterviewListFilter />
      <div style={{ height: "70vh", position: "relative" }}>
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <div
            style={{ boxShadow: theme.effects.elevation16 }}
          >
            <DetailsList
              items={applicantsList}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              isHeaderVisible={true}
              onRenderDetailsHeader={
                (detailsHeaderProps, defaultRender) => (
                  <Sticky>
                    {defaultRender(detailsHeaderProps)}
                  </Sticky>
                )}
              onItemInvoked={(item) =>
                history.push(`/admin/interviews/${item.fullName}`)
              }
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
    </>
  );
};
