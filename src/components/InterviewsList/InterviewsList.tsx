import React, { useEffect } from "react";
import { useId } from "@fluentui/react-hooks";
import { useHistory } from "react-router-dom";
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
  getTheme,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { InterviewListFilter } from "./InterviwListFilter";
import { useInterviews } from "../../hooks/hooks";

const theme = getTheme();
// export interface IInterview extends IApplicant {
//     interviewDate: Date,
//     interviewTime: any
//    }
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

export const InterviewList: React.FC = () => {
  const tooltipId = useId("tooltip");
  const history = useHistory();

  const { interviews, loading, fetchInterviews } = useInterviews();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const applicantsList = Object.keys(interviews).map((idx) => {
    return {
      fullName: interviews[idx].fullName,
      event: interviews[idx].event,
      skill: interviews[idx].technology,
      interviewStatus: interviews[idx].interviewStatus,
      interviewDate: interviews[idx].interviewDate,
      interviewTime: interviews[idx].interviewTime,
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
            items={applicantsList}
            columns={columns}
            selectionMode={SelectionMode.multiple}
            isHeaderVisible={true}
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
  );
};
