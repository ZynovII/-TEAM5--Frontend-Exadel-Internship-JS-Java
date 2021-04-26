import React, { useMemo } from "react";
import {
  Stack,
  ProgressIndicator,
  mergeStyleSets,
  IDropdownOption,
  DefaultButton,
} from "@fluentui/react";
import { useForm } from "react-hook-form";
import { ControlledDropdown } from "../../hook-form/Controlled";
import {
  AcceptStatus,
  IApplicant,
  InterviewStatus,
} from "../../models/IApplicant";

const desicion: IDropdownOption[] = [
  { key: AcceptStatus.Accepted, text: "Accept" },
  { key: AcceptStatus.Rejected, text: "Reject" },
  { key: AcceptStatus.Pending, text: "Pending" },
];

export const StatusForm: React.FC<{ candidat: IApplicant }> = (props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const status = useMemo(() => {
    switch (props.candidat.interviewStatus) {
      case InterviewStatus.Registered:
        return 0;
      case InterviewStatus.AwaitingHRInterview:
        return 0.25;
      case InterviewStatus.AwaitingTSInterview:
        return 0.5;
      case InterviewStatus.WaitingDesicion:
        return 0.75;
      default:
        return 0;
    }
  }, [props.candidat.interviewStatus]);

  const onSave = () => {
    handleSubmit((data) => console.log(data))();
  };

  return (
    <Stack
      className={contentStyles.formWrapper}
      horizontal
      tokens={{ childrenGap: "40px" }}
    >
      <Stack
        tokens={{ childrenGap: "10px" }}
        styles={{ root: { width: "20%" } }}
      >
        <h3
          style={{
            color:
              (props.candidat.acceptanceStatus === AcceptStatus.Accepted &&
                "#00cc00") ||
              (props.candidat.acceptanceStatus === AcceptStatus.Pending &&
                "#DBDE36") ||
              (props.candidat.acceptanceStatus === AcceptStatus.Rejected &&
                "red"),
          }}
        >
          {props.candidat.acceptanceStatus}
        </h3>
      </Stack>
      <Stack
        tokens={{ childrenGap: "0px" }}
        styles={{ root: { width: "50%" } }}
      >
        <ProgressIndicator
          barHeight={20}
          percentComplete={status}
          label={props.candidat.interviewStatus}
          styles={{
            itemName: {
              paddingLeft: status * 100 + "%",
            },
          }}
        />
      </Stack>
      <Stack
        styles={{
          root: {
            flexFlow: "row nowrap",
            justifyContent: "space-around",
            width: "30%",
          },
        }}
      >
        <ControlledDropdown
          control={control}
          name={"acceptanceStatus"}
          placeholder="Choose Status"
          defaultSelectedKey={""}
          errors={errors}
          options={desicion}
          style={{ width: "150px" }}
        />
        <DefaultButton text="Submit" onClick={() => onSave()} />
      </Stack>
    </Stack>
  );
};

const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
