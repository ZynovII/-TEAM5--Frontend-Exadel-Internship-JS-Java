import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import {
  DetailsList,
  SelectionMode,
  IColumn,
  ActionButton,
  getTheme,
  Spinner,
  SpinnerSize,
  Sticky,
} from "@fluentui/react";
import { InterviewListFilter } from "./InterviewListFilter";
import { useInterviews } from "../../hooks/useInterviews";
import { useLoader } from "../../hooks/hooks";
import { useAuth } from "../../hooks/useAuth";
import {
  dateReformer,
  interviewStatusReformer,
  timeReformer,
} from "../../utils/stringReformers";

const theme = getTheme();

const InterviewList: React.FC = () => {
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
          id: interviews[idx].idInterview,
          fullName: interviews[idx].candidate,
          skill: interviews[idx].candidatePrimaryTech,
          interviewStatus: interviewStatusReformer(
            interviews[idx].interviewProcess
          ),
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
        name: "Date",
        fieldName: "interviewDate",
        minWidth: 70,
        maxWidth: 150,
        isResizable: true,
      },
      {
        key: "column2",
        name: "Time",
        fieldName: "interviewTime",
        minWidth: 70,
        maxWidth: 100,
        isResizable: true,
      },
      {
        key: "column3",
        name: "Candidate",
        fieldName: "fullName",
        minWidth: 100,
        maxWidth: 450,
        isResizable: true,
      },
      {
        key: "column4",
        name: "Skill",
        fieldName: "skill",
        minWidth: 100,
        maxWidth: 250,
      },
      {
        key: "column5",
        name: "Interview Status",
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
        isResizable: false,
        onRender: (item) => (
          <ActionButton
            iconProps={{ iconName: "D365TalentHRCore" }}
            onClick={(e) => {
              e.preventDefault();
              showLoader();
              history.push(`/admin/interviews/${item.id}`);
            }}
          ></ActionButton>
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
            selectionMode={SelectionMode.none}
            isHeaderVisible={true}
            onItemInvoked={(item) => {
              showLoader();
              history.push(`/admin/interviews/${item.id}`);
            }}
            onRenderDetailsHeader={(detailsHeaderProps, defaultRender) => (
              <Sticky>{defaultRender(detailsHeaderProps)}</Sticky>
            )}
            onRenderRow={(props, defaultRender) =>
              defaultRender({
                ...props,
                styles: { root: { fontSize: 16 } },
              })
            }
          />
        </div>
      </>
    );
  }
};

export default InterviewList;
