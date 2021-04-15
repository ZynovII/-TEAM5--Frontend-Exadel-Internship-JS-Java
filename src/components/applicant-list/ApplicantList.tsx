import React, { useEffect } from "react";
import {
  DetailsList,
  getTheme,
  mergeStyleSets,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  ScrollablePane,
  ScrollbarVisibility,
  Sticky,
  StickyPositionType,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { AllApplicantFilter } from "./AllApplicantListFilter";
import { IApplicant } from "../../models/IApplicant";
import { useApplicants } from "../../hooks/hooks";

const theme = getTheme();
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

export interface IApplicantList {
  columns: IColumn[];
  items: IApplicant[];
}
export const ApplicantList: React.FC = () => {
  const { applicants, loading, fechApplicants } = useApplicants();
  useEffect(() => {
    fechApplicants();
  }, []);
  const applicantsList = Object.keys(applicants).map((idx) => {
    return {
      name: applicants[idx].fullName,
      event: applicants[idx].events,
      skill: applicants[idx].technology,
      interviewStatus: applicants[idx].interviewStatus,
    };
  });

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
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <div style={{ height: "80vh", position: "relative" }}>
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
        <AllApplicantFilter></AllApplicantFilter>
      </Sticky>
      <div
        className={` ${classNames.table}`}
        style={{ boxShadow: theme.effects.elevation16, fontWeight: "bold" }}
      >
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <DetailsList
            items={applicantsList}
            columns={columns}
            isHeaderVisible={true}
            selectionMode={SelectionMode.multiple}
          />
        </ScrollablePane>
      </div>
    </div>
  );
};
