import React from "react";
import {
  DetailsList,
  TextField,
  TooltipHost,
  IColumn,
} from "@fluentui/react/lib";
const calloutProps = { gapSpace: 0 };

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

const columns: IColumn[] = [
  {
    key: "column1",
    name: "Interviewer",
    fieldName: "interviewer",
    minWidth: 50,
    maxWidth: 150,
    isResizable: false,
  },
  {
    key: "column2",
    name: "Date",
    fieldName: "date",
    minWidth: 50,
    maxWidth: 150,
    isResizable: false,
  },
  {
    key: "column3",
    name: "Time",
    fieldName: "time",
    minWidth: 50,
    maxWidth: 150,
    isResizable: false,
  },
  {
    key: "column4",
    name: "Feedback",
    fieldName: "feedback",
    minWidth: 50,
    maxWidth: 500,
    isResizable: false,
    onRender: () => <TextField value={"Some text"} disabled />,
  },
  {
    key: "column5",
    name: "",
    fieldName: "button",
    minWidth: 50,
    isResizable: true,
    onRender: () => (
      /*<TooltipHost
        content="Show more information"
        calloutProps={calloutProps}
      >
          <i className={`ms-Icon ms-Icon--More`} />
      </TooltipHost>*/
      <button>View</button>
    ),
  },
];

const OperationsTable = (props) => {
  return (
    <div data-is-scrollable={true}>
      <div>
        <DetailsList
          items={props.operations}
          columns={columns}
          selectionMode={0}
          setKey="set"
        />
      </div>
    </div>
  );
};

export default OperationsTable;
