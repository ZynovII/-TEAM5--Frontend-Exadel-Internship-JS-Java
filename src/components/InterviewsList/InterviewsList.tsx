import React, { useEffect, useMemo } from "react";
import { useId } from "@fluentui/react-hooks";
import { useHistory } from "react-router-dom";
import {
  DetailsList,
  SelectionMode,
  IColumn,
  TooltipHost,
  ITooltipHostStyles,
  ActionButton,
  getTheme,
  Spinner,
  SpinnerSize,
  Sticky,
} from "@fluentui/react";
import { InterviewListFilter } from "./InterviwListFilter";
import { useInterviews } from "../../hooks/useInterwievs";
import { useLoader } from "../../hooks/hooks";
import { useAuth } from "../../hooks/useAuth";
import { dateReformer, timeReformer } from "../../utils/stringReformers";

const theme = getTheme();

const calloutProps = { gapSpace: 0 };

const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

const InterviewList: React.FC = () => {
  const tooltipId = useId("tooltip");
  const history = useHistory();
  const { currentUser } = useAuth();

  const { interviews, fetchInterviews } = useInterviews();
  const { loading, showLoader } = useLoader();

  useEffect(() => {
    showLoader();
    fetchInterviews(currentUser.id);
  }, []);

  const interviewsList = useMemo(
    () =>
      Object.keys(interviews).map((idx) => {
        return {
          fullName: interviews[idx].candidate,
          skill: interviews[idx].candidatePrimaryTech,
          interviewStatus: interviews[idx].interviewProcess,
          interviewDate: dateReformer(interviews[idx].interviewTime),
          interviewTime: timeReformer(interviews[idx].interviewTime),
        };
      }),
    [interviews]
  );

  const columns: IColumn[] = useMemo(
    () => [
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
        name: "Skill",
        fieldName: "skill",
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
    ],
    []
  );
  if (loading) {
    return <Spinner size={SpinnerSize.large} className="margin2em" />;
  } else if (interviewsList.length === 0) {
    return <h1 style={{ margin: "1rem" }}>No scheduled interviews yet</h1>;
  } else {
    return (
      <>
        <InterviewListFilter />
        <div
          style={{ boxShadow: theme.effects.elevation16, marginTop: "2rem" }}
        >
          <DetailsList
            items={interviewsList}
            columns={columns}
            selectionMode={SelectionMode.multiple}
            isHeaderVisible={true}
            onItemInvoked={(item) =>
              history.push(`/admin/interviews/${item.fullName}`)
            }
            onRenderDetailsHeader={(detailsHeaderProps, defaultRender) => (
              <Sticky>{defaultRender(detailsHeaderProps)}</Sticky>
            )}
            onRenderRow={(props, defaultRender) => (
              <div>
                {defaultRender({
                  ...props,
                  styles: { root: { fontSize: 16 } },
                })}
              </div>
            )}
          />
        </div>
      </>
    );
  }
};

export default InterviewList;
