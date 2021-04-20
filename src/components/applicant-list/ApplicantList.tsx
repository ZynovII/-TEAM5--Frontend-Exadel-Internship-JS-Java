import React, { useEffect } from "react";
import {
  DetailsList,
  getTheme,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  ScrollablePane,
  ScrollbarVisibility,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { useHistory } from "react-router";
import { useId } from "@fluentui/react-hooks";
import { IApplicant } from "../../models/IApplicant";
import { useApplicants } from "../../hooks/hooks";
import { AllApplicantFilter } from "./AllApplicantListFilter"
const theme = getTheme();
const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

export interface IApplicantList {
  columns: IColumn[];
  items: IApplicant[];
}
export const ApplicantList: React.FC = () => {
  const { applicants, loading, fechApplicants } = useApplicants();
  const history = useHistory();
  useEffect(() => {
    fechApplicants();
  }, []);

  const applicantsList = Object.keys(applicants).map((idx) => {
    return {
      name: applicants[idx].fullName,
      event: applicants[idx].event,
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
    <>
    <AllApplicantFilter />
    <div style={{ height: "70vh", position: "relative" }}>
      <div style={{ boxShadow: theme.effects.elevation16, fontWeight: "bold" }} >
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <DetailsList
            items={applicantsList}
            columns={columns}
            isHeaderVisible={false}
            selectionMode={SelectionMode.multiple}
            onItemInvoked={(item) =>
              history.push(`/admin/candidates/${item.name}`)
            }
          />
        </ScrollablePane>
      </div>
    </div>
    </>
  );
};
