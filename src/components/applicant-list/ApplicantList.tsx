import React, { useEffect, useMemo } from "react";
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
  Sticky,
} from "@fluentui/react";
import { useHistory } from "react-router";
import { useId } from "@fluentui/react-hooks";

import { AcceptStatus, IApplicant } from "../../models/IApplicant";
import { useApplicants, useLoader } from "../../hooks/hooks";
import { AllApplicantFilter } from "./AllApplicantListFilter";

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
  const { applicants, fetchApplicants } = useApplicants();
  const { loading, showLoader } = useLoader();
  const history = useHistory();
  useEffect(() => {
    showLoader();
    fetchApplicants();
  }, []);

  const applicantsList = useMemo(
    () =>
      Object.keys(applicants).map((idx) => {
        let status: string;
        switch (applicants[idx].status) {
          case AcceptStatus.Accepted:
            status = "Accepted";
            break;
          case AcceptStatus.Rejected:
            status = "Rejected";
            break;
          default:
            status = "Waiting";
        }
        return {
          name: applicants[idx].fullName,
          event: applicants[idx].event,
          skill: applicants[idx].primaryTech,
          interviewStatus: status,
        };
      }),
    []
  );

  const tooltipId = useId("tooltip");
  const columns: IColumn[] = useMemo(
    () => [
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
    ],
    []
  );
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <AllApplicantFilter />
      <div style={{ height: "70vh", position: "relative" }}>
        <div
          style={{ boxShadow: theme.effects.elevation16, fontWeight: "bold" }}
        >
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <DetailsList
              items={applicantsList}
              columns={columns}
              isHeaderVisible={true}
              selectionMode={SelectionMode.multiple}
              onItemInvoked={(item) =>
                history.push(`/admin/candidates/${item.name}`)
              }
              onRenderDetailsHeader={(detailsHeaderProps, defaultRender) => (
                <Sticky>{defaultRender(detailsHeaderProps)}</Sticky>
              )}
            />
          </ScrollablePane>
        </div>
      </div>
    </>
  );
};

export default ApplicantList;
