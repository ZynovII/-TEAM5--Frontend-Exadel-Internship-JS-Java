import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Spinner, SpinnerSize } from "@fluentui/react";
import { mergeStyleSets, DocumentCardActions } from "@fluentui/react";

import { useLoader } from "../../hooks/hooks";
import { useApplicants } from "../../hooks/useApplicants";
import { Registration } from "../Registration/Registration";
import { StatusForm } from "./StatusForm";
import { InfoForm } from "./InfoForm";
import { InterviewForm } from "./InterviewForm";
import { RouteParams } from "../Event";

export const CandidatePage: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const params = useParams<RouteParams>();
  const { selectedApplicant, selectApplicant } = useApplicants();
  const { loading, showLoader } = useLoader();
  useEffect(() => {
    showLoader();
    selectApplicant(params.id);
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
          <h2>{selectedApplicant.fullName}</h2>
          <DocumentCardActions
            actions={[
              {
                iconProps: { iconName: "Edit" },
                ariaLabel: "edit event",
                onClick: () => setEdit(!edit),
              },
            ]}
          />
        </div>
        <h3>{selectedApplicant.eventName}</h3>
      </header>
      <div className={contentStyles.container}>
        <StatusForm candidat={selectedApplicant} />
        <div>
          {edit ? (
            <Registration candidatePage={true} candidat={selectedApplicant} />
          ) : (
            <InfoForm candidat={selectedApplicant} />
          )}
        </div>
        <InterviewForm candidat={selectedApplicant} />
      </div>
    </>
  );
};

const contentStyles = mergeStyleSets({
  container: {
    width: "auto",
    margin: "1em 2em",
  },
});
