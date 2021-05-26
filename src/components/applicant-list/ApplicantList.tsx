import React, { useMemo } from "react";
import {
  DetailsList,
  getTheme,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  Spinner,
  SpinnerSize,
  Sticky,
} from "@fluentui/react";
import { useHistory } from "react-router";

import { useId } from "@fluentui/react-hooks";

import { IApplicant } from "../../models/IApplicant";
import { useApplicants } from "../../hooks/useApplicants";
import { useLoader } from "../../hooks/hooks";
import { AllApplicantFilter } from "./AllApplicantListFilter";
import { acceptStatusReformer } from "../../utils/stringReformers";

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
  const { applicants } = useApplicants();
  const { loading, showLoader } = useLoader();
  const history = useHistory();

  const applicantsList = useMemo(() => {
    return Object.values(applicants).map((item) => {
      return {
        id: item.id,
        name: item.fullName,
        event: item.event,
        skill: item.primaryTech,
        interviewStatus: acceptStatusReformer(item.status), // wrong status
      };
    });
  }, [applicants]);

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
        onRender: (item) => (
          <TooltipHost
            content="Show more information"
            id={tooltipId}
            calloutProps={calloutProps}
            styles={hostStyles}
          >
            <i
              className={`ms-Icon ms-Icon--More`}
              onClick={() => {
                history.push(`/admin/candidates/${item.id}`);
                showLoader();
              }}
              style={{ cursor: "pointer" }}
            />
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

      <div
        style={{
          boxShadow: theme.effects.elevation16,
          fontWeight: "bold",
          marginTop: "2rem",
        }}
      >
        <DetailsList
          items={applicantsList}
          columns={columns}
          isHeaderVisible={true}
          selectionMode={SelectionMode.none}
          onItemInvoked={(item) => {
            history.push(`/admin/candidates/${item.id}`);
            showLoader();
          }}
          onRenderDetailsHeader={(detailsHeaderProps, defaultRender) => (
            <Sticky>{defaultRender(detailsHeaderProps)}</Sticky>
          )}
        />
      </div>
    </>
  );
};

export default ApplicantList;
