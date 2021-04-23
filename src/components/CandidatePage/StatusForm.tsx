import React from "react";
import {
  Stack,
  Dropdown,
  ProgressIndicator,
  mergeStyleSets,
  IDropdownOption,
} from "@fluentui/react";
import { AcceptStatus} from "../../models/IApplicant";

const desicion: IDropdownOption[] = [
  { key: "Accept", text: "Accept" },
  { key: "Reject", text: "Reject" },
];

export const StatusForm: React.FC<{candidat:any}> = (props) => {
  return (
    <Stack
    className={contentStyles.formWrapper}
    horizontal
    tokens={{ childrenGap: "40px" }}
  >
    <Stack
      tokens={{ childrenGap: "10px" }}
      styles={{ root: { width: "220px" } }}
    >
      <h3
        style={{
          color:
            (props.candidat.acceptanceStatus ===
              AcceptStatus.Accepted &&
              "#00cc00") ||
            (props.candidat.acceptanceStatus === AcceptStatus.Pending &&
              "#DBDE36") ||
            (props.candidat.acceptanceStatus ===
              AcceptStatus.Rejected &&
              "red"),
        }}
      >
        {props.candidat.acceptanceStatus}
      </h3>
    </Stack>
    <Stack
      tokens={{ childrenGap: "0px" }}
      styles={{ root: { width: "520px" } }}
    >
      {/* <div style={filterDisplay}>
        <p>Registered</p>
        <p>Waiting HR</p>
        <p>Waiting TS</p>
        <p>Waiting desicion</p>
      </div> */}
      <ProgressIndicator
        barHeight={20}
        percentComplete={0.25}
        label={'Waiting HR'}
        // styles={{ root: { position: "relative" } }}
      />
    </Stack>
    <Stack
      tokens={{ childrenGap: "20px" }}
      styles={{ root: { width: "220px" } }}
    >
      <Dropdown
        placeholder="Select a desition"
        options={desicion}
        styles={{ root: { width: "220px" } }}
      />
    </Stack>
  </Stack>
  )
}

const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  }
});

// const filterDisplay = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginTop: -21,
//   zIndex: 1,
// }