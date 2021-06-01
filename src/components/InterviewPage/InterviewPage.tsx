import React, { useEffect, useState } from "react";
import {
  Stack,
  mergeStyleSets,
  Spinner,
  SpinnerSize,
} from "@fluentui/react/lib";
import { useParams } from "react-router";

import OperationsTable from "./OperationsTable";
import { RouteParams } from "../Event";
import { useInterviews } from "../../hooks/useInterviews";
import { InfoForm } from "../CandidatePage/InfoForm";
import { StatusForm } from "../CandidatePage/StatusForm";
import { useLoader } from "../../hooks/hooks";
import { useAuth } from "../../hooks/useAuth";
import { IInterviewInCandite } from "../../models/IInterview";

export const InterviewPage: React.FC = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<IInterviewInCandite>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectInterview, selectedInterview, editFeedback } = useInterviews();
  const { loading, showLoader } = useLoader();
  const { currentUser } = useAuth();
  const params = useParams<RouteParams>();

  const hideModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
  };

  const showModal = (feedback: IInterviewInCandite) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const onSave = (feedback: string) => {
    editFeedback(selectedFeedback.id, feedback).then((res) => {
      setSelectedFeedback(null);
      hideModal();
      showLoader();
      selectInterview(params.id);
    });
  };

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
                currentUserName={currentUser.fullName}
                isModalOpen={isModalOpen}
                showModal={showModal}
                hideModal={hideModal}
                onSave={onSave}
                selectedFeedback={selectedFeedback}
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
