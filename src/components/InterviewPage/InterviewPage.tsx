import React, { useEffect, useMemo } from "react";
import {
  TextField,
  Stack,
  mergeStyleSets,
  Dropdown,
  IDropdownOption,
  ProgressIndicator,
  getTheme,
  Spinner,
  SpinnerSize,
} from "@fluentui/react/lib";

import OperationsTable from "./OperationsTable";
import { IApplicant } from "../../models/IApplicant";
import { useParams } from "react-router";
import { RouteParams } from "../Event";
import { useInterviews } from "../../hooks/useInterviews";
import { InfoForm } from "../CandidatePage/InfoForm";
import { StatusForm } from "../CandidatePage/StatusForm";
import { useLoader } from "../../hooks/hooks";

export interface IInterviewProps {
  candidat: IApplicant;
}
const theme = getTheme();

const options: object[] = [
  { key: "Interview", text: "Interview" },
  { key: "HR", text: "HR" },
  { key: "TS", text: "TS" },
];

const desicion: IDropdownOption[] = [
  { key: "Accept", text: "Accept" },
  { key: "Reject", text: "Reject" },
];

const filterDisplay = {
  display: "flex",
  justifyContent: "space-between",
  //position: 'absolute',
  marginTop: -21,
  zIndex: 1,
} as const;
const operations = [
  {
    interviewer: "TS",
    date: "18.03.2021",
    time: "13:00-14:00",
  },
  {
    interviewer: "HR",
    date: "11.03.2021",
    time: "14:00-14:30",
  },
];

export const InterviewPage: React.FC<IInterviewProps> = () => {
  const params = useParams<RouteParams>();
  const { selectInterview, selectedInterview } = useInterviews();
  const { loading } = useLoader();

  useEffect(() => {
    selectInterview(params.id);
  }, []);
  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "20%",
            alignItems: "flex-end",
          }}
        >
          <h2>{selectedInterview?.fullName}</h2>
        </div>
        <h3>{selectedInterview?.eventName}</h3>
      </header>
      <div className={contentStyles?.container}>
        <StatusForm candidat={selectedInterview} />
        <div>
          <InfoForm candidat={selectedInterview} />
        </div>
        <div>
          <h1>Iterview</h1>
          <Stack
            className={contentStyles.formWrapper}
            horizontal
            tokens={{ childrenGap: "40px" }}
          >
            <Stack
              tokens={{ childrenGap: "20px" }}
              styles={{ root: { width: "100%" } }}
            >
              <OperationsTable operations={operations} />
            </Stack>
          </Stack>
        </div>
      </div>
    </>
  );
};

const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  container: {
    width: "73%",
    margin: "2em auto",
  },
});
