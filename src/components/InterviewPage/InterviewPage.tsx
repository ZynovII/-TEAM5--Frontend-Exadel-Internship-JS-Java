import React, { useEffect } from "react";
import {
  Stack,
  mergeStyleSets,
  Spinner,
  SpinnerSize,
} from "@fluentui/react/lib";

import OperationsTable from "./OperationsTable";
import { useParams } from "react-router";
import { RouteParams } from "../Event";
import { useInterviews } from "../../hooks/useInterviews";
import { InfoForm } from "../CandidatePage/InfoForm";
import { StatusForm } from "../CandidatePage/StatusForm";
import { useLoader } from "../../hooks/hooks";

export const InterviewPage: React.FC = () => {
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
          <h2>{selectedInterview.candidate.fullName}</h2>
        </div>
        <h3>{selectedInterview.event.name}</h3>
      </header>
      <main>
        <StatusForm candidat={selectedInterview.candidate} />
        <div>
          <InfoForm candidat={selectedInterview.candidate} />
        </div>
        <div>
          <h2>Interviews</h2>
          <Stack
            className={contentStyles.formWrapper}
            horizontal
            tokens={{ childrenGap: "40px" }}
          >
            <Stack
              tokens={{ childrenGap: "20px" }}
              styles={{ root: { width: "100%" } }}
            >
              <OperationsTable
                operations={selectedInterview.candidate.interviews}
                candidate={selectedInterview.candidate.fullName}
              />
            </Stack>
          </Stack>
        </div>
      </main>
    </>
  );
};

const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
