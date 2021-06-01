import React from "react";
import { DetailsList, IColumn } from "@fluentui/react/lib";
import { dateReformer, timeReformer } from "../../utils/stringReformers";
import DialogFeedback from "./DialogFedback";
import { IInterviewInCandite } from "../../models/IInterview";

const columns: IColumn[] = [
  {
    key: "column1",
    name: "Interviewer",
    fieldName: "interviewerName",
    minWidth: 200,
    maxWidth: 450,
    isResizable: false,
  },
  {
    key: "column3",
    name: "Date",
    fieldName: "startTime",
    onRender: (item) => dateReformer(item.startTime),
    minWidth: 150,
    maxWidth: 200,
    isResizable: false,
  },
  {
    key: "column4",
    name: "Start",
    fieldName: "startTime",
    onRender: (item) => timeReformer(item.startTime),
    minWidth: 100,
    maxWidth: 200,
    isResizable: false,
  },
  {
    key: "column5",
    name: "End",
    fieldName: "endTime",
    onRender: (item) => timeReformer(item.startTime),
    minWidth: 100,
    maxWidth: 200,
    isResizable: false,
  },
  {
    key: "column6",
    name: "Feedback",
    fieldName: "button",
    minWidth: 100,
    isResizable: false,
  },
];

export interface IOperationTableProps {
  operations: IInterviewInCandite[];
  candidate: string;
  currentUserName: string;
  isModalOpen: boolean;
  onSave(feedback: string): void;
  hideModal(): void;
  showModal(feedback: IInterviewInCandite): void;
  selectedFeedback: IInterviewInCandite;
}

const OperationsTable: React.FC<IOperationTableProps> = ({
  operations,
  candidate,
  currentUserName,
  isModalOpen,
  onSave,
  hideModal,
  showModal,
  selectedFeedback,
}) => {
  return (
    <>
      <div data-is-scrollable={true}>
        <div>
          <DetailsList
            items={operations}
            onRenderRow={(props, defaultRender) => {
              props.columns[props.columns.length - 1].onRender = (
                item: IInterviewInCandite
              ) => (
                <button onClick={() => showModal(item)} className="button">
                  <span className="ms-fontColor-white" style={{ padding: 5 }}>
                    Feedback
                  </span>
                </button>
              );
              if (props.item.interviewerName === currentUserName) {
                return defaultRender({
                  ...props,
                  styles: {
                    root: {
                      backgroundColor: "rgb( 190, 230, 190)",
                      ":hover": { backgroundColor: "rgb( 150, 200, 150)" },
                    },
                  },
                });
              }
              return defaultRender(props);
            }}
            columns={columns}
            selectionMode={0}
            setKey="set"
          />
        </div>
      </div>
      {selectedFeedback && (
        <DialogFeedback
          content={selectedFeedback.feedback}
          candidate={candidate}
          onSave={onSave}
          isModalOpen={isModalOpen}
          hideModal={hideModal}
        />
      )}
    </>
  );
};

export default React.memo(OperationsTable);
